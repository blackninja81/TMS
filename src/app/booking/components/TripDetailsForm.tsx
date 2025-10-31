"use client";

import React from "react";
import type { BookingHook } from "../hooks/useBookingLogic";
import type { TimeSlot } from "../types/booking";

const TripDetailsForm: React.FC<{ booking: BookingHook }> = ({ booking }) => {
  const {
    origin,
    destination,
    setOrigin,
    setDestination,
    stations,
    tripType,
    setTripType,
    travelDate,
    setTravelDate,
    returnDate,
    setReturnDate,
    preferredTime,
    setPreferredTime,
    availableTimes,
    seatClass,
    setSeatClass,
    isSubmitting,
    sameClassBothWays,
    setSameClassBothWays,
    returnSeatClass,
    setReturnSeatClass,
    getAvailableReturnTimes,
    returnTime,
    setReturnTime,
  } = booking;

  const todayIso = new Date().toISOString().split("T")[0];

  return (
    <div className="booking__section">
      <h3>Trip Details</h3>

      <div className="form-row">
        <select value={origin} onChange={(e) => setOrigin(e.target.value)} required disabled={isSubmitting}>
          <option value="">Select Origin</option>
          {stations.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select value={destination} onChange={(e) => setDestination(e.target.value)} required disabled={isSubmitting}>
          <option value="">Select Destination</option>
          {stations.filter((s) => s !== origin).map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="form-row">
        <select value={tripType} onChange={(e) => setTripType(e.target.value as "one-way" | "return")} disabled={isSubmitting}>
          <option value="one-way">One-way</option>
          <option value="return">Return</option>
        </select>

        <input type="date" value={travelDate} min={todayIso} onChange={(e) => setTravelDate(e.target.value)} required disabled={isSubmitting} />

        {tripType === "return" && (
          <input type="date" value={returnDate} min={travelDate || todayIso} onChange={(e) => setReturnDate(e.target.value)} required disabled={isSubmitting} />
        )}
      </div>

      <div className="form-row">
        <select value={preferredTime} onChange={(e) => setPreferredTime(e.target.value as TimeSlot | "")} required disabled={isSubmitting}>
          <option value="">Select Preferred Time</option>
          {availableTimes.length > 0 ? (
            availableTimes.map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)
          ) : (
            <option disabled>No times available today</option>
          )}
        </select>

        <select value={seatClass} onChange={(e) => setSeatClass(e.target.value)} disabled={isSubmitting}>
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First</option>
        </select>
      </div>

      {tripType === "return" && (
        <>
          <div className="form-row">
            <label>
              <input type="checkbox" checked={sameClassBothWays} onChange={() => setSameClassBothWays(!sameClassBothWays)} disabled={isSubmitting} />
              Same class for return trip
            </label>
          </div>

          {!sameClassBothWays && (
            <div className="form-row">
              <select value={returnSeatClass} onChange={(e) => setReturnSeatClass(e.target.value)} required disabled={isSubmitting}>
                <option value="">Return class</option>
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>
          )}

          {preferredTime && getAvailableReturnTimes(preferredTime).length === 0 && (
            <p className="warning-text">⚠️ No valid return times for same-day travel. Change times or date.</p>
          )}

          <div className="form-row">
            <select value={returnTime} onChange={(e) => setReturnTime(e.target.value as TimeSlot | "")} required disabled={isSubmitting || getAvailableReturnTimes(preferredTime).length === 0}>
              <option value="">Select Return Time</option>
              {getAvailableReturnTimes(preferredTime).map((t) => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default TripDetailsForm;