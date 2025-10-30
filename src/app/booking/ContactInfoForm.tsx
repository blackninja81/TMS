"use client";

import React from "react";
import type { BookingHook } from "./useBookingLogic";

const ContactInfoForm: React.FC<{ booking: BookingHook }> = ({ booking }) => {
  const { contactName, email, phone, setContactName, setEmail, setPhone, isSubmitting } = booking;

  return (
    <div className="booking__section">
      <h3>Contact Information</h3>
      <div className="form-row">
        <input
          placeholder="Full Name"
          value={contactName}
          onChange={(e) => setContactName(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <input
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <input
          placeholder="Phone Number (10-15 digits)"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ContactInfoForm;
