# 📱 Waynex Travels - Backend API Documentation for Android APK

## 🌐 Base URL

```
Production: https://www.server.waynextravels.com/api
```

**Important Notes:**
- Always use `www.server.waynextravels.com` (with www prefix)
- The base URL `/api` is just a prefix - append the specific endpoint path
- Testing `https://www.server.waynextravels.com/api` directly returns 404 (expected)
- All endpoints support their designated HTTP methods (GET, POST, PUT, DELETE)
- **Working example:** `https://www.server.waynextravels.com/api/auth/login` (POST)

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Bookings](#bookings)
4. [Admin Routes](#admin-routes)
5. [Error Handling](#error-handling)
6. [Response Formats](#response-formats)

---

## 🔐 Authentication

### 1. User Signup

**Endpoint:** `POST /auth/signup`

**Description:** Register a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "9876543210"
}
```

**Required Fields:**
- `email` (string, valid email)
- `password` (string, minimum 6 characters)
- `first_name` (string)
- `last_name` (string)

**Optional Fields:**
- `phone` (string)
- `address_street` (string)
- `address_city` (string)
- `address_state` (string)
- `address_pincode` (string)
- `address_country` (string)

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "9876543210",
    "address": {
      "street": null,
      "city": null,
      "state": null,
      "pincode": null,
      "country": null
    },
    "is_admin": false,
    "created_at": "2025-02-01T10:30:00.000Z"
  }
}
```

**Error Response (400):**
```json
{
  "error": "Email already registered"
}
```

**Android Example (Java):**
```java
// Using Retrofit or Volley
JSONObject requestBody = new JSONObject();
requestBody.put("email", "user@example.com");
requestBody.put("password", "securePassword123");
requestBody.put("first_name", "John");
requestBody.put("last_name", "Doe");
requestBody.put("phone", "9876543210");

// POST to: https://www.server.waynextravels.com/api/auth/signup
```

---

### 2. User Login

**Endpoint:** `POST /auth/login`

**Description:** Login with email and password

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Required Fields:**
- `email` (string, valid email)
- `password` (string)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "9876543210",
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "country": "India"
    },
    "is_admin": false,
    "created_at": "2025-02-01T10:30:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

**Android Example (Java):**
```java
JSONObject requestBody = new JSONObject();
requestBody.put("email", "user@example.com");
requestBody.put("password", "securePassword123");

// POST to: https://www.server.waynextravels.com/api/auth/login

// Store user data locally after successful login
SharedPreferences prefs = getSharedPreferences("WaynexAuth", MODE_PRIVATE);
prefs.edit()
    .putInt("user_id", userResponse.getInt("id"))
    .putString("user_email", userResponse.getString("email"))
    .putString("user_name", userResponse.getString("first_name"))
    .apply();
```

---

### 3. User Logout

**Endpoint:** `POST /auth/logout`

**Description:** Logout user (clears server-side session if any)

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Android Example (Java):**
```java
JSONObject requestBody = new JSONObject();
requestBody.put("email", userEmail);

// POST to: https://www.server.waynextravels.com/api/auth/logout

// Clear local storage
SharedPreferences prefs = getSharedPreferences("WaynexAuth", MODE_PRIVATE);
prefs.edit().clear().apply();
```

---

## 👤 User Management

### 1. Get User Profile

**Endpoint:** `GET /users/{user_id}`

**Description:** Get user profile details

**URL Parameters:**
- `user_id` (integer) - User ID

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "9876543210",
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "country": "India"
    },
    "is_admin": false,
    "created_at": "2025-02-01T10:30:00.000Z",
    "updated_at": "2025-02-01T10:30:00.000Z"
  }
}
```

**Android Example (Java):**
```java
int userId = 1; // From login response
String url = "https://www.server.waynextravels.com/api/users/" + userId;

// GET request
```

---

### 2. Update User Profile

**Endpoint:** `PUT /users/{user_id}`

**Description:** Update user profile information

**URL Parameters:**
- `user_id` (integer) - User ID

**Request Body (all fields optional):**
```json
{
  "first_name": "John",
  "last_name": "Smith",
  "phone": "9876543210",
  "address_street": "456 New Street",
  "address_city": "Delhi",
  "address_state": "Delhi",
  "address_pincode": "110001",
  "address_country": "India"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Smith",
    "phone": "9876543210",
    "address": {
      "street": "456 New Street",
      "city": "Delhi",
      "state": "Delhi",
      "pincode": "110001",
      "country": "India"
    }
  }
}
```

**Android Example (Java):**
```java
int userId = 1;
String url = "https://www.server.waynextravels.com/api/users/" + userId;

JSONObject requestBody = new JSONObject();
requestBody.put("phone", "9876543210");
requestBody.put("address_city", "Delhi");

// PUT request
```

---

### 3. Get User Bookings

**Endpoint:** `GET /users/{user_id}/bookings`

**Description:** Get all bookings for a specific user

**URL Parameters:**
- `user_id` (integer) - User ID

**Success Response (200):**
```json
{
  "success": true,
  "bookings": [
    {
      "id": 1,
      "booking_id": "BK-20250201-ABC123",
      "user_id": 1,
      "user_email": "user@example.com",
      "order_type": "tour",
      "package_name": "Andaman Island Tour",
      "package_type": "Domestic",
      "destination": "Port Blair",
      "travel_date": "2025-12-25",
      "return_date": null,
      "num_adults": 2,
      "num_children": 0,
      "price_per_person": 12999.00,
      "total_amount": 25998.00,
      "tax_amount": 0.00,
      "discount_amount": 0.00,
      "final_amount": 25998.00,
      "status": "Pending",
      "payment_status": "Unpaid",
      "special_requests": "Need wheelchair accessible room",
      "booking_date": "2025-02-01T10:45:00.000Z"
    }
  ],
  "total": 1
}
```

**Android Example (Java):**
```java
int userId = 1;
String url = "https://www.server.waynextravels.com/api/users/" + userId + "/bookings";

// GET request - Display in RecyclerView
```

---

## 📦 Bookings

### 1. Create Booking

**Endpoint:** `POST /bookings/`

**Description:** Create a new tour or visa booking

**Request Body:**
```json
{
  "user_id": 1,
  "order_type": "tour",
  "package_name": "Andaman Island Tour",
  "package_type": "Domestic",
  "destination": "Port Blair",
  "travel_date": "2025-12-25",
  "num_adults": 2,
  "num_children": 0,
  "price_per_person": 12999,
  "special_requests": "Need wheelchair accessible room"
}
```

**Required Fields:**
- `user_id` (integer) - User ID from login
- `order_type` (string) - "tour" or "visa"
- `package_name` (string) - Name of package/service
- `travel_date` (string, format: YYYY-MM-DD) - Travel date
- `num_adults` (integer, min: 1) - Number of adults
- `price_per_person` (number) - Price per person

**Optional Fields:**
- `package_type` (string) - e.g., "Domestic", "International"
- `destination` (string) - Destination name
- `return_date` (string, format: YYYY-MM-DD)
- `num_children` (integer, default: 0)
- `discount_amount` (number, default: 0)
- `special_requests` (string)

**Success Response (201):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "booking": {
    "id": 1,
    "booking_id": "BK-20250201-ABC123",
    "user_id": 1,
    "user_email": "user@example.com",
    "order_type": "tour",
    "package_name": "Andaman Island Tour",
    "package_type": "Domestic",
    "destination": "Port Blair",
    "travel_date": "2025-12-25",
    "num_adults": 2,
    "num_children": 0,
    "price_per_person": 12999.00,
    "total_amount": 25998.00,
    "tax_amount": 0.00,
    "discount_amount": 0.00,
    "final_amount": 25998.00,
    "status": "Pending",
    "payment_status": "Unpaid",
    "special_requests": "Need wheelchair accessible room",
    "booking_date": "2025-02-01T10:45:00.000Z"
  },
  "invoice": {
    "invoice_number": "INV-20250201-XYZ789",
    "total_amount": 25998.00,
    "status": "Unpaid"
  }
}
```

**Android Example (Java):**
```java
JSONObject requestBody = new JSONObject();
requestBody.put("user_id", userId);
requestBody.put("order_type", "tour"); // or "visa"
requestBody.put("package_name", "Andaman Island Tour");
requestBody.put("package_type", "Domestic");
requestBody.put("destination", "Port Blair");
requestBody.put("travel_date", "2025-12-25");
requestBody.put("num_adults", 2);
requestBody.put("num_children", 0);
requestBody.put("price_per_person", 12999);
requestBody.put("special_requests", "Need wheelchair accessible room");

// POST to: https://www.server.waynextravels.com/api/bookings/

// After success, navigate to payment screen with booking_id
Intent intent = new Intent(this, PaymentActivity.class);
intent.putExtra("booking_id", bookingResponse.getInt("id"));
intent.putExtra("amount", bookingResponse.getDouble("final_amount"));
startActivity(intent);
```

**Example - Visa Booking:**
```java
JSONObject requestBody = new JSONObject();
requestBody.put("user_id", userId);
requestBody.put("order_type", "visa");
requestBody.put("package_name", "USA Tourist Visa");
requestBody.put("destination", "USA");
requestBody.put("travel_date", "2025-06-01");
requestBody.put("num_adults", 1);
requestBody.put("price_per_person", 15000);

// POST to: https://www.server.waynextravels.com/api/bookings/
```

---

### 2. Get Booking by ID

**Endpoint:** `GET /bookings/{id}`

**Description:** Get details of a specific booking

**URL Parameters:**
- `id` (integer) - Booking ID

**Success Response (200):**
```json
{
  "success": true,
  "booking": {
    "id": 1,
    "booking_id": "BK-20250201-ABC123",
    "user_id": 1,
    "user_email": "user@example.com",
    "order_type": "tour",
    "package_name": "Andaman Island Tour",
    "package_type": "Domestic",
    "destination": "Port Blair",
    "travel_date": "2025-12-25",
    "return_date": null,
    "num_adults": 2,
    "num_children": 0,
    "price_per_person": 12999.00,
    "total_amount": 25998.00,
    "tax_amount": 0.00,
    "discount_amount": 0.00,
    "final_amount": 25998.00,
    "status": "Pending",
    "payment_status": "Unpaid",
    "special_requests": "Need wheelchair accessible room",
    "notes": null,
    "booking_date": "2025-02-01T10:45:00.000Z",
    "updated_at": "2025-02-01T10:45:00.000Z"
  }
}
```

**Android Example (Java):**
```java
int bookingId = 1;
String url = "https://www.server.waynextravels.com/api/bookings/" + bookingId;

// GET request - Show in booking details screen
```

---

### 3. Get Booking by Booking ID (String)

**Endpoint:** `GET /bookings/by-booking-id/{booking_id}`

**Description:** Get booking using the string booking ID (e.g., BK-20250201-ABC123)

**URL Parameters:**
- `booking_id` (string) - Booking ID string

**Success Response (200):**
```json
{
  "success": true,
  "booking": {
    "id": 1,
    "booking_id": "BK-20250201-ABC123",
    // ... rest of booking details
  }
}
```

**Android Example (Java):**
```java
String bookingId = "BK-20250201-ABC123";
String url = "https://www.server.waynextravels.com/api/bookings/by-booking-id/" + bookingId;

// GET request
```

---

### 4. Get All Bookings (with filters)

**Endpoint:** `GET /bookings`

**Description:** Get all bookings (admin use) or filtered bookings

**Query Parameters (all optional):**
- `user_id` (integer) - Filter by user
- `status` (string) - Filter by status (Pending, Confirmed, Cancelled, Completed)
- `payment_status` (string) - Filter by payment (Unpaid, Partial, Paid)
- `order_type` (string) - Filter by type (tour, visa)

**Example Request:**
```
GET /bookings?user_id=1&status=Pending
```

**Success Response (200):**
```json
{
  "success": true,
  "bookings": [
    {
      "id": 1,
      "booking_id": "BK-20250201-ABC123",
      // ... booking details
    }
  ],
  "total": 1
}
```

**Android Example (Java):**
```java
// Get all bookings for logged-in user
int userId = 1;
String url = "https://www.server.waynextravels.com/api/bookings?user_id=" + userId;

// Get only pending bookings
String url = "https://www.server.waynextravels.com/api/bookings?user_id=" + userId + "&status=Pending";

// GET request
```

---

### 5. Update Booking

**Endpoint:** `PUT /bookings/{id}`

**Description:** Update booking details (user can update before confirmation)

**URL Parameters:**
- `id` (integer) - Booking ID

**Request Body (all fields optional):**
```json
{
  "package_name": "Updated Package Name",
  "travel_date": "2025-12-26",
  "num_adults": 3,
  "special_requests": "Updated requests",
  "status": "Confirmed",
  "payment_status": "Paid"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Booking updated successfully",
  "booking": {
    "id": 1,
    "booking_id": "BK-20250201-ABC123",
    // ... updated booking details
  }
}
```

**Android Example (Java):**
```java
int bookingId = 1;
String url = "https://www.server.waynextravels.com/api/bookings/" + bookingId;

JSONObject requestBody = new JSONObject();
requestBody.put("num_adults", 3);
requestBody.put("special_requests", "Updated: Need airport pickup");

// PUT request
```

---

## 👨‍💼 Admin Routes

### 1. Admin Login

**Endpoint:** `POST /auth/admin/login`

**Description:** Admin login (for admin panel)

**Request Body:**
```json
{
  "email": "admin@waynextravels.com",
  "password": "adminPassword"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin login successful",
  "user": {
    "id": 1,
    "email": "admin@waynextravels.com",
    "first_name": "Admin",
    "last_name": "User",
    "is_admin": true
  }
}
```

---

### 2. Get Dashboard Stats (Admin)

**Endpoint:** `GET /admin/stats/dashboard`

**Description:** Get dashboard statistics

**Success Response (200):**
```json
{
  "success": true,
  "stats": {
    "total_users": 150,
    "total_bookings": 250,
    "pending_bookings": 45,
    "confirmed_bookings": 180,
    "cancelled_bookings": 25,
    "total_revenue": 5250000.00,
    "unpaid_amount": 450000.00
  }
}
```

---

### 3. Get All Users (Admin)

**Endpoint:** `GET /admin/users`

**Description:** Get all registered users

**Query Parameters (optional):**
- `search` (string) - Search by name or email

**Success Response (200):**
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "phone": "9876543210",
      "created_at": "2025-02-01T10:30:00.000Z"
    }
  ],
  "total": 1
}
```

---

### 4. Get All Bookings (Admin)

**Endpoint:** `GET /admin/bookings`

**Description:** Get all bookings with filters

**Query Parameters (optional):**
- `status` (string)
- `payment_status` (string)
- `search` (string) - Search by booking ID or user email

**Success Response (200):**
```json
{
  "success": true,
  "bookings": [
    {
      "id": 1,
      "booking_id": "BK-20250201-ABC123",
      "user_email": "user@example.com",
      "package_name": "Andaman Island Tour",
      "order_type": "tour",
      "final_amount": 25998.00,
      "status": "Pending",
      "payment_status": "Unpaid",
      "booking_date": "2025-02-01T10:45:00.000Z"
    }
  ],
  "total": 1
}
```

---

### 5. Download Reports (Admin)

**CSV Export:**
```
GET /admin/reports/bookings/csv
```

**Excel Export:**
```
GET /admin/reports/bookings/excel
```

**Response:** File download

---

## ⚠️ Error Handling

### Common Error Responses

**400 Bad Request:**
```json
{
  "error": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "error": "Invalid email or password"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

### Android Error Handling Example:

```java
public void handleApiError(VolleyError error) {
    if (error.networkResponse != null) {
        int statusCode = error.networkResponse.statusCode;
        String errorMessage = new String(error.networkResponse.data);

        try {
            JSONObject errorJson = new JSONObject(errorMessage);
            String message = errorJson.getString("error");

            switch (statusCode) {
                case 400:
                    Toast.makeText(this, "Invalid input: " + message, Toast.LENGTH_SHORT).show();
                    break;
                case 401:
                    Toast.makeText(this, "Authentication failed", Toast.LENGTH_SHORT).show();
                    // Redirect to login
                    break;
                case 404:
                    Toast.makeText(this, "Not found: " + message, Toast.LENGTH_SHORT).show();
                    break;
                case 500:
                    Toast.makeText(this, "Server error. Please try again later.", Toast.LENGTH_SHORT).show();
                    break;
                default:
                    Toast.makeText(this, "Error: " + message, Toast.LENGTH_SHORT).show();
            }
        } catch (JSONException e) {
            Toast.makeText(this, "Unknown error occurred", Toast.LENGTH_SHORT).show();
        }
    } else {
        Toast.makeText(this, "Network error. Check your connection.", Toast.LENGTH_SHORT).show();
    }
}
```

---

## 📋 Response Formats

### Success Response Structure

All successful API responses follow this pattern:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Pagination (if implemented)

```json
{
  "success": true,
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

---

## 🔧 Complete Android Integration Example

### 1. Setup API Client

```java
public class ApiClient {
    private static final String BASE_URL = "https://www.server.waynextravels.com/api";

    public static String getBaseUrl() {
        return BASE_URL;
    }

    // Using Retrofit
    private static Retrofit retrofit = null;

    public static Retrofit getClient() {
        if (retrofit == null) {
            retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        }
        return retrofit;
    }
}
```

### 2. Define API Interface

```java
public interface WaynexApiService {

    @POST("/auth/signup")
    Call<SignupResponse> signup(@Body SignupRequest request);

    @POST("/auth/login")
    Call<LoginResponse> login(@Body LoginRequest request);

    @POST("/bookings/")
    Call<BookingResponse> createBooking(@Body BookingRequest request);

    @GET("/users/{id}/bookings")
    Call<BookingsListResponse> getUserBookings(@Path("id") int userId);

    @GET("/bookings/{id}")
    Call<BookingDetailResponse> getBookingDetails(@Path("id") int bookingId);
}
```

### 3. Make API Calls

```java
// Login Example
public void loginUser(String email, String password) {
    WaynexApiService apiService = ApiClient.getClient().create(WaynexApiService.class);

    LoginRequest request = new LoginRequest(email, password);

    Call<LoginResponse> call = apiService.login(request);
    call.enqueue(new Callback<LoginResponse>() {
        @Override
        public void onResponse(Call<LoginResponse> call, Response<LoginResponse> response) {
            if (response.isSuccessful() && response.body() != null) {
                LoginResponse loginResponse = response.body();

                // Save user data
                SharedPreferences prefs = getSharedPreferences("WaynexAuth", MODE_PRIVATE);
                prefs.edit()
                    .putInt("user_id", loginResponse.getUser().getId())
                    .putString("user_email", loginResponse.getUser().getEmail())
                    .putString("user_name", loginResponse.getUser().getFirstName())
                    .apply();

                // Navigate to home screen
                Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
                startActivity(intent);
                finish();
            } else {
                Toast.makeText(LoginActivity.this, "Login failed", Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Call<LoginResponse> call, Throwable t) {
            Toast.makeText(LoginActivity.this, "Network error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
        }
    });
}

// Create Booking Example
public void createBooking(BookingData data) {
    WaynexApiService apiService = ApiClient.getClient().create(WaynexApiService.class);

    BookingRequest request = new BookingRequest(
        data.getUserId(),
        "tour", // order_type
        data.getPackageName(),
        data.getPackageType(),
        data.getDestination(),
        data.getTravelDate(),
        data.getNumAdults(),
        data.getNumChildren(),
        data.getPricePerPerson(),
        data.getSpecialRequests()
    );

    Call<BookingResponse> call = apiService.createBooking(request);
    call.enqueue(new Callback<BookingResponse>() {
        @Override
        public void onResponse(Call<BookingResponse> call, Response<BookingResponse> response) {
            if (response.isSuccessful() && response.body() != null) {
                BookingResponse bookingResponse = response.body();

                // Navigate to payment screen
                Intent intent = new Intent(BookingActivity.this, PaymentActivity.class);
                intent.putExtra("booking_id", bookingResponse.getBooking().getId());
                intent.putExtra("amount", bookingResponse.getBooking().getFinalAmount());
                startActivity(intent);
            } else {
                Toast.makeText(BookingActivity.this, "Booking failed", Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Call<BookingResponse> call, Throwable t) {
            Toast.makeText(BookingActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
        }
    });
}
```

---

## 🎯 Quick Reference Table

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/auth/signup` | POST | User registration | No |
| `/auth/login` | POST | User login | No |
| `/auth/logout` | POST | User logout | No |
| `/users/{id}` | GET | Get user profile | Yes |
| `/users/{id}` | PUT | Update user profile | Yes |
| `/users/{id}/bookings` | GET | Get user's bookings | Yes |
| `/bookings/` | POST | Create booking | Yes |
| `/bookings/{id}` | GET | Get booking details | Yes |
| `/bookings/{id}` | PUT | Update booking | Yes |
| `/bookings` | GET | List all bookings | Yes |
| `/admin/stats/dashboard` | GET | Dashboard stats | Admin |
| `/admin/users` | GET | List all users | Admin |
| `/admin/bookings` | GET | List all bookings | Admin |

---

## 🔧 Troubleshooting

### Common Issues

**Q: Why does `/api` return 404 Not Found?**
- **A:** The `/api` path by itself doesn't exist. You need to call specific endpoints like `/api/auth/login`, `/api/bookings/`, etc.
- **Correct:** `https://www.server.waynextravels.com/api/auth/login`
- **Incorrect:** `https://www.server.waynextravels.com/api`

**Q: Are all HTTP methods supported?**
- **A:** Yes! All endpoints support their designated methods:
  - GET requests: User profiles, bookings list, booking details
  - POST requests: Signup, login, create booking
  - PUT requests: Update user profile, update booking
  - DELETE requests: Delete booking (admin)

**Q: Do I need trailing slashes?**
- **A:** Some endpoints require trailing slashes:
  - `/api/bookings/` - Required for GET all bookings and POST create booking
  - `/api/bookings/123` - No trailing slash for specific booking
  - Follow the examples in this documentation

**Q: Getting 308 Permanent Redirect?**
- **A:** You're missing a trailing slash. Add `/` to endpoints like `/api/bookings/`

**Q: Getting CORS errors?**
- **A:** Make sure you're including proper headers:
  ```java
  headers.put("Content-Type", "application/json");
  ```

---

## 📞 Support

For API issues or questions:
- Email: support@waynextravels.com
- Documentation: https://www.waynextravels.com/api-docs

---

## 🔄 Changelog

**Version 1.0** (Feb 2025)
- Initial API documentation
- User authentication
- Booking management
- Admin routes

---

**✅ All API endpoints documented and ready for APK integration!**
