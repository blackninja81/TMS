"use client";

import React from "react";
import type { BookingHook } from "../hooks/useBookingLogic";

const SeatSelection: React.FC<{ booking: BookingHook }> = ({ booking }) => {
  const { totalSeats, selectedSeats, toggleSeat, totalTravelers, isSubmitting } = booking;

  return (
    <div className="booking__section">
      <h3>Seat Selection</h3>
      <p className="booking__seat-note">
        {totalTravelers > 0 ? `Select ${totalTravelers} seat(s) - ${selectedSeats.length} selected` : "Add passengers to select seats"}
      </p>

      <div className="seat-map">
        {Array.from({ length: totalSeats }, (_, i) => {
          const seat = `S${i + 1}`;
          const isSelected = selectedSeats.includes(seat);
          const disabled = isSubmitting || totalTravelers === 0 || (!isSelected && selectedSeats.length >= totalTravelers && totalTravelers > 0);

          return (
            <button
              key={seat}
              type="button"
              className={`seat ${isSelected ? "selected" : ""} ${disabled ? "disabled" : ""}`}
              onClick={() => !disabled && toggleSeat(seat)}
              disabled={disabled}
            >
              {seat}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatSelection;
