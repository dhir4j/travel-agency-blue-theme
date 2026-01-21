'use client'

export default function TourSearch() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <section className="tour-search">
      <div className="container">
        <form onSubmit={handleSubmit} className="tour-search-form">
          <div className="input-wrapper">
            <label htmlFor="destination" className="input-label">Search Destination</label>
            <input type="text" name="destination" id="destination" required placeholder="Enter Destination" className="input-field" />
          </div>

          <div className="input-wrapper">
            <label htmlFor="people" className="input-label">Number of People</label>
            <input type="number" name="people" id="people" required placeholder="Enter Number of People" className="input-field" />
          </div>

          <div className="input-wrapper">
            <label htmlFor="checkin" className="input-label">Check-in Date</label>
            <input type="date" name="checkin" id="checkin" required className="input-field" />
          </div>

          <div className="input-wrapper">
            <label htmlFor="checkout" className="input-label">Check-out Date</label>
            <input type="date" name="checkout" id="checkout" required className="input-field" />
          </div>

          <button type="submit" className="btn btn-secondary">Inquire Now</button>
        </form>
      </div>
    </section>
  )
}
