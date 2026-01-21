# Waynex Tours and Travels

A modern, responsive travel and tours website built with Next.js 14, featuring a beautiful UI design with smooth animations and interactive components.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean and professional design with smooth transitions
- **Interactive Components**: Dynamic navigation, scroll effects, and interactive elements
- **Tour Search**: Comprehensive tour search form with date pickers
- **Popular Destinations**: Showcase of top travel destinations
- **Package Listings**: Detailed tour packages with pricing and ratings
- **Visa Services**: Complete visa application services for 40+ countries
  - Dynamic country-specific visa pages
  - Video/image backgrounds for each destination
  - Processing time and pricing information
  - Required documents checklist
  - Visa type and validity details
- **Photo Gallery**: Beautiful image gallery from travelers
- **Newsletter Subscription**: Email subscription form in footer
- **SEO Optimized**: Proper meta tags and semantic HTML

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript (React)
- **Styling**: CSS3 with CSS Variables
- **Icons**: Ionicons
- **Fonts**: Google Fonts (Poppins, Montserrat, Turret Road)

## Project Structure

```
Waynex Travels/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global styles + visa styles
│   │   ├── layout.js             # Root layout
│   │   ├── page.js               # Home page
│   │   └── visa/
│   │       ├── page.js           # All visa services page
│   │       └── [country]/
│   │           └── page.js       # Dynamic country visa page
│   └── components/
│       ├── Header.js             # Navigation header
│       ├── Hero.js               # Hero section
│       ├── TourSearch.js         # Tour search form
│       ├── Popular.js            # Popular destinations
│       ├── Package.js            # Tour packages
│       ├── VisaServices.js       # Visa services section
│       ├── Gallery.js            # Photo gallery
│       ├── CTA.js                # Call to action
│       ├── Footer.js             # Footer
│       └── GoTop.js              # Back to top button
├── data/
│   └── data.json                 # Visa data for 40+ countries
├── public/                       # Static assets
├── package.json                  # Dependencies
├── next.config.js                # Next.js configuration
└── README.md                     # This file
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd "Waynex Travels"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Build for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Key Components

### Header
- Sticky navigation with scroll effect
- Mobile-responsive menu
- Social media links
- Contact information

### Hero Section
- Full-width background image
- Call-to-action buttons
- Engaging tagline

### Tour Search
- Destination search
- Date pickers for check-in/out
- Number of travelers input
- Inquiry form submission

### Popular Destinations
- Grid layout of featured destinations
- Star ratings
- Clickable destination cards

### Packages
- Detailed tour package information
- Pricing and duration
- Reviews and ratings
- Meta information (duration, people, location)

### Visa Services
- **Home Page Section**: Featured visa services (6 countries)
- **Main Visa Page** (`/visa`): Complete list of all 40+ countries
  - Filter by processing time (instant, week, month)
  - Detailed visa cards with pricing, processing time, and requirements
- **Individual Country Pages** (`/visa/[country]`):
  - Video or image hero backgrounds
  - Processing time and cost breakdown
  - Complete visa information (type, validity, entry, stay duration)
  - Required documents checklist
  - Application process steps
  - Dynamic routing for all countries

### Gallery
- Responsive image grid
- Hover effects
- Traveler-submitted photos

### Footer
- Brand information
- Contact details
- Newsletter subscription
- Social links
- Legal links

## Customization

### Updating Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
    --bright-navy-blue: hsl(214, 57%, 51%);
    --united-nations-blue: hsl(214, 56%, 58%);
    /* Add your custom colors */
}
```

### Updating Content

- **Destinations**: Edit the `destinations` array in `src/components/Popular.js`
- **Packages**: Edit the `packages` array in `src/components/Package.js`
- **Gallery Images**: Edit the `galleryImages` array in `src/components/Gallery.js`
- **Contact Info**: Update contact details in `src/components/Header.js` and `src/components/Footer.js`

### Adding Images

Place custom images in the `public/` directory and reference them using relative paths:

```jsx
<img src="/your-image.jpg" alt="Description" />
```

## Performance Optimization

- **Image Loading**: Uses lazy loading for images
- **Code Splitting**: Automatic code splitting with Next.js
- **CSS Optimization**: Optimized CSS with minimal redundancy
- **Client Components**: Only interactive components use 'use client' directive

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Backend integration for booking system
- User authentication and profiles
- Payment gateway integration
- Dynamic content management
- Multi-language support
- Advanced search filters
- Blog section
- Customer reviews and testimonials

## License

This project is created for Waynex Tours and Travels.

## Contact

For questions or support regarding this website:
- Email: info@waynextravels.com
- Phone: +1 (123) 456 7890
- Address: 3145 Koontz, California

---

Built with ❤️ using Next.js
