// components/booking/TravellersForm.tsx
"use client";

import React from "react";
import type { BookingHook } from "../hooks/useBookingLogic";


const TravellersForm: React.FC<{ booking: BookingHook }> = ({ booking }) => {
  const {
    adults,
    children,
    setAdults,
    setChildren,
    adultDetails,
    childDetails,
    updateAdultDetail,
    updateChildDetail,
    isSubmitting,
  } = booking;

  return (
    <div className="booking__section">
      <h3>Travellers</h3>

      <div className="form-row">
        <label>
          Adults:
          <input type="number" min={0} value={adults} onChange={(e) => setAdults(Number(e.target.value) || 0)} disabled={isSubmitting} />
        </label>

        <label>
          Children:
          <input type="number" min={0} value={children} onChange={(e) => setChildren(Number(e.target.value) || 0)} disabled={isSubmitting} />
        </label>
      </div>

      {adults > 0 && (
        <div className="booking__subsection">
          <h4>Adult Details</h4>
          {adultDetails.map((a, idx) => (
            <div className="form-row" key={idx}>
              <input placeholder={`Adult ${idx + 1} Name`} value={a.name} onChange={(e) => updateAdultDetail(idx, "name", e.target.value)} required disabled={isSubmitting} />
              <input placeholder={`Adult ${idx + 1} ID`} value={a.id} onChange={(e) => updateAdultDetail(idx, "id", e.target.value)} required disabled={isSubmitting} />
            </div>
          ))}
        </div>
      )}

      {children > 0 && (
        <div className="booking__subsection">
          <h4>Children (Guardian Details)</h4>
          {childDetails.map((c, idx) => (
            <div className="form-row" key={idx}>
              <input placeholder={`Child ${idx + 1} Guardian Name`} value={c.guardianName} onChange={(e) => updateChildDetail(idx, "guardianName", e.target.value)} required disabled={isSubmitting} />
              <input placeholder={`Child ${idx + 1} Guardian ID`} value={c.guardianId} onChange={(e) => updateChildDetail(idx, "guardianId", e.target.value)} required disabled={isSubmitting} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TravellersForm;
