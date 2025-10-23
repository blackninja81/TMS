// app/page.tsx or components/Home.tsx
import React from "react";
import "./landing.scss";

const Home = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Your Journey Starts Here</h1>
        <p className="hero__subtitle">
          From Nairobi to Mombasa and beyond—book in seconds.
        </p>
      </div>

      <form className="hero__form">
        {/* Stations Row */}
        <div className="form-groups">
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
            <select id="to" name="to">
              <option value="">Destination Station</option>
              <option value="nairobi">Nairobi</option>
              <option value="mombasa">Mombasa</option>
              <option value="kisumu">Kisumu</option>
              <option value="nakuru">Nakuru</option>
              <option value="embu">Embu</option>
            </select>
          </div>
        </div>

        {/* Dates Row */}
        <div className="form-groups">
          <div className="form-group">
            <label htmlFor="departure">Departure Date</label>
            <input type="date" id="departure" name="departure" />
          </div>

          <div className="form-group">
            <label htmlFor="return">Return Date</label>
            <input type="date" id="return" name="return" />
          </div>
        </div>

        {/* Passengers Row */}
        <div className="form-groups">
          <div className="form-group">
            <label htmlFor="adults">Adults</label>
            <input type="number" id="adults" name="adults" min="1" defaultValue={1} />
          </div>

          <div className="form-group">
            <label htmlFor="children">Children</label>
            <input type="number" id="children" name="children" min="0" defaultValue={0} />
          </div>
        </div>

        <button type="submit" className="hero__submit-btn">
          Search Trains
        </button>
      </form>
    </section>
  );
};

export default Home;