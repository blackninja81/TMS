// components/booking/BookingPage.tsx
"use client";

import React from "react";
import "./booking.scss";
import { useBookingLogic } from "./hooks/useBookingLogic";
import ContactInfoForm from "./components/ContactInfoForm";
import TripDetailsForm from "./components/TripDetailsForm";
import TravellersForm from "./components/TravellersForm";
import SeatSelection from "./components/SeatSelection";

const BookingPage: React.FC = () => {
  const booking = useBookingLogic();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await booking.submitBooking();
    if (success) {
      // Optionally reset form or navigate
      // window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="booking">
      <div className="booking__container">
        <h2 className="booking__title">Train Ticket Booking</h2>

        <form className="booking__form" onSubmit={handleSubmit}>
          <ContactInfoForm booking={booking} />
          <TripDetailsForm booking={booking} />
          <TravellersForm booking={booking} />
          <SeatSelection booking={booking} />

          <div className="actions">
            <button type="submit" className="booking__button" disabled={booking.isSubmitting}>
              {booking.isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
