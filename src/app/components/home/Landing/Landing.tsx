// app/page.tsx or components/Home.tsx
import React from "react";
import "./landing.scss";

const Home = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Book Your Next Train Journey</h1>
        <p className="hero__subtitle">
          Fast, reliable, and affordable travel across the country.
        </p>
      </div>

      <form className="hero__form">
        <div className="form-group">
          <label htmlFor="from">From</label>
          <select id="from" name="from">
            <option value="">Origin Station</option>
            <option value="nairobi">Nairobi</option>
            <option value="mombasa">Mombasa</option>
            <option value="kisumu">Kisumu</option>
            <option value="nakuru">Nakuru</option>
            <option value="embu">Embu</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="to">To</label>
          <select id="to" name="to" className="to-station">
            <option value="">Destination Station</option>
            <option value="nairobi">Nairobi</option>
            <option value="mombasa">Mombasa</option>
            <option value="kisumu">Kisumu</option>
            <option value="nakuru">Nakuru</option>
            <option value="embu">Embu</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Departure Date</label>
          <input type="date" id="date" />
        </div>

        <div className="form-group">
          <label htmlFor="passengers">Passengers</label>
          <input type="number" id="passengers" min="1" defaultValue={1} />
        </div>

        <button type="submit" className="hero__submit-btn">
          Search Trains
        </button>
      </form>
    </section>
  );
};

export default Home;
