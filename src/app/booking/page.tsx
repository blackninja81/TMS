"use client";

import React, { useState, useEffect } from "react";
import "./booking.scss";

// Type definitions
interface AdultDetail {
  name: string;
  id: string;
}

interface ChildDetail {
  guardianName: string;
  guardianId: string;
}

const BookingPage: React.FC = () => {
  // 🧍 Passenger Counts
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [adultDetails, setAdultDetails] = useState<AdultDetail[]>([
    { name: "", id: "" },
  ]);
  const [childDetails, setChildDetails] = useState<ChildDetail[]>([]);

  // 🚉 Trip Details
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [travelDate, setTravelDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [seatClass, setSeatClass] = useState("economy");
  const [sameClassBothWays, setSameClassBothWays] = useState(true);
  const [returnSeatClass, setReturnSeatClass] = useState("");
  const [returnTime, setReturnTime] = useState("");

  // 📞 Contact Info
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 💺 Seat Selection
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const totalSeats = 40;
  const totalTravelers = adults + children;

  const [preferredTime, setPreferredTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([
    "morning",
    "afternoon",
    "evening",
  ]);

  // 🔄 Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Stations
  const stations = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Malindi",
    "Voi",
  ];

  // Update available times based on selected date
  useEffect(() => {
    const now = new Date();
    const selectedDate = new Date(travelDate);
    // console.log(now.toString())
    // console.log(selectedDate.toString())

    let times = ["morning", "afternoon", "evening"];

    if (travelDate && selectedDate.toDateString() === now.toDateString()) {
      const hour = now.getHours();

      if (hour >= 8 && hour < 12) {
        times = ["afternoon", "evening"];
      } else if (hour >= 12 && hour < 18) {
        times = ["evening"];
      } else if (hour >= 18) {
        times = [];
      }
    }

    setAvailableTimes(times);

    if (!times.includes(preferredTime)) setPreferredTime("");
  }, [travelDate, preferredTime]);

  // Reset seats if passenger count decreases
  useEffect(() => {
    if (selectedSeats.length > totalTravelers && totalTravelers > 0) {
      alert(
        `Passenger count reduced. Please reselect ${totalTravelers} seat(s).`
      );
      setSelectedSeats([]);
    }
  }, [totalTravelers, selectedSeats.length]);

  const getAvailableReturnTimes = (departTime: string) => {
    if (travelDate !== returnDate) return ["morning", "afternoon", "evening"];

    switch (departTime) {
      case "morning":
        return ["afternoon", "evening"];
      case "afternoon":
        return ["evening"];
      default:
        return [];
    }
  };

  // --- HANDLE CHANGES ---
  const handleAdultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(0, Number(e.target.value) || 0);
    setAdults(count);
    setAdultDetails(
      Array.from(
        { length: count },
        (_, i) => adultDetails[i] || { name: "", id: "" }
      )
    );
  };

  const handleChildrenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = Math.max(0, Number(e.target.value) || 0);
    setChildren(count);
    setChildDetails(
      Array.from(
        { length: count },
        (_, i) => childDetails[i] || { guardianName: "", guardianId: "" }
      )
    );
  };

  const handleAdultDetailChange = (
    index: number,
    field: "name" | "id",
    value: string
  ) => {
    const updated = [...adultDetails];
    updated[index][field] = value;
    setAdultDetails(updated);
  };

  const handleChildDetailChange = (
    index: number,
    field: "guardianName" | "guardianId",
    value: string
  ) => {
    const updated = [...childDetails];
    updated[index][field] = value;
    setChildDetails(updated);
  };

  // --- SEAT SELECTION LOGIC ---
  const toggleSeat = (seat: string) => {
    if (totalTravelers === 0) {
      alert("Please add at least one passenger before selecting seats.");
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      } else if (prev.length < totalTravelers) {
        return [...prev, seat];
      } else {
        alert(`You can only select up to ${totalTravelers} seats.`);
        return prev;
      }
    });
  };

  // --- VALIDATION ---
  const validateForm = (): boolean => {
    // Basic trip details
    if (!origin || !destination || !travelDate) {
      alert("Please fill out all trip details.");
      return false;
    }

    // Check origin and destination are different
    if (origin === destination) {
      alert("Origin and destination must be different stations.");
      return false;
    }

    // Check traveler count
    if (totalTravelers === 0) {
      alert("Please add at least one traveller.");
      return false;
    }

    // Check seat selection
    if (selectedSeats.length !== totalTravelers) {
      alert(`Please select exactly ${totalTravelers} seat(s).`);
      return false;
    }

    // Check preferred time is selected
    if (!preferredTime) {
      alert("Please select a preferred departure time.");
      return false;
    }

    // Return trip validations
    if (tripType === "return") {
      if (!returnDate) {
        alert("Please select a return date.");
        return false;
      }

      if (!sameClassBothWays && !returnSeatClass) {
        alert("Please select a seat class for the return trip.");
        return false;
      }

      if (!returnTime) {
        alert("Please select a return time.");
        return false;
      }

      // Check if same-day return is possible
      if (
        travelDate === returnDate &&
        getAvailableReturnTimes(preferredTime).length === 0
      ) {
        alert(
          "No available return times for same-day travel with selected departure time. Please choose a different date or time."
        );
        return false;
      }
    }

    // Validate contact info
    if (!contactName || !email || !phone) {
      alert("Please fill out all contact information.");
      return false;
    }

    // Validate phone number format (basic check)
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
      alert("Please enter a valid phone number (10-15 digits).");
      return false;
    }

    // Validate adult details
    for (let i = 0; i < adultDetails.length; i++) {
      if (!adultDetails[i].name || !adultDetails[i].id) {
        alert(`Please fill out all details for Adult ${i + 1}.`);
        return false;
      }
    }

    // Validate child details
    for (let i = 0; i < childDetails.length; i++) {
      if (!childDetails[i].guardianName || !childDetails[i].guardianId) {
        alert(`Please fill out all guardian details for Child ${i + 1}.`);
        return false;
      }
    }

    return true;
  };

  // --- SUBMIT HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const bookingData = {
      contactName,
      email,
      phone,
      origin,
      destination,
      tripType,
      travelDate,
      returnDate: tripType === "return" ? returnDate : null,
      preferredTime,
      seatClass,
      sameClassBothWays,
      returnSeatClass: sameClassBothWays ? seatClass : returnSeatClass,
      returnTime: tripType === "return" ? returnTime : null,
      adults,
      children,
      adultDetails,
      childDetails,
      selectedSeats,
    };

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API call
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bookingData)
      // });

      console.log("✅ Booking Submitted:", bookingData);
      alert("Booking submitted successfully! You will receive a confirmation email shortly.");

      // Reset form after successful submission
      // Uncomment if you want to reset the form
      // resetForm();
    } catch (error) {
      console.error("Booking error:", error);
      alert("An error occurred while submitting your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- UI ---
  return (
    <div className="booking">
      <div className="booking__container">
        <h2 className="booking__title">Train Ticket Booking</h2>

        <form className="booking__form" onSubmit={handleSubmit}>
          {/* CONTACT INFO */}
          <div className="booking__section">
            <h3>Contact Information</h3>
            <div className="form-row">
              <input
                type="text"
                placeholder="Full Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <input
                type="tel"
                placeholder="Phone Number (10-15 digits)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                pattern="[0-9\s\-\(\)]{10,15}"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* TRIP DETAILS */}
          <div className="booking__section">
            <h3>Trip Details</h3>
            <div className="form-row">
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
                disabled={isSubmitting}
              >
                <option value="">Select Origin</option>
                {stations.map((station) => (
                  <option key={station} value={station}>
                    {station}
                  </option>
                ))}
              </select>

              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                disabled={isSubmitting}
              >
                <option value="">Select Destination</option>
                {stations
                  .filter((s) => s !== origin)
                  .map((station) => (
                    <option key={station} value={station}>
                      {station}
                    </option>
                  ))}
              </select>
            </div>

            <div className="form-row">
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="one-way">One-way</option>
                <option value="return">Return</option>
              </select>

              <input
                type="date"
                value={travelDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setTravelDate(e.target.value)}
                required
                disabled={isSubmitting}
              />

              {tripType === "return" && (
                <input
                  type="date"
                  value={returnDate}
                  min={travelDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              )}
            </div>

            <div className="form-row">
              <select
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                required
                disabled={isSubmitting}
              >
                <option value="">Select Preferred Time</option>
                {availableTimes.length > 0 ? (
                  availableTimes.map((time) => (
                    <option key={time} value={time}>
                      {time.charAt(0).toUpperCase() + time.slice(1)}
                    </option>
                  ))
                ) : (
                  <option disabled>No available times today</option>
                )}
              </select>

              <select
                value={seatClass}
                onChange={(e) => setSeatClass(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="economy">Economy</option>
                <option value="business">Business</option>
                <option value="first">First</option>
              </select>
            </div>

            {tripType === "return" && (
              <>
                <div className="form-row">
                  <div className="return-checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={sameClassBothWays}
                        onChange={() =>
                          setSameClassBothWays(!sameClassBothWays)
                        }
                        disabled={isSubmitting}
                      />
                      Same class for return trip
                    </label>
                  </div>
                </div>

                {!sameClassBothWays && (
                  <div className="form-row">
                    <select
                      value={returnSeatClass}
                      onChange={(e) => setReturnSeatClass(e.target.value)}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select Return Class</option>
                      <option value="economy">Economy</option>
                      <option value="business">Business</option>
                      <option value="first">First</option>
                    </select>
                  </div>
                )}

                {preferredTime &&
                  getAvailableReturnTimes(preferredTime).length === 0 && (
                    <p className="warning-text">
                      ⚠️ No valid return times for the same day. Please change
                      departure time or select a different return date.
                    </p>
                  )}

                <div className="form-row">
                  <select
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    required
                    disabled={
                      isSubmitting ||
                      getAvailableReturnTimes(preferredTime).length === 0
                    }
                  >
                    <option value="">Select Return Time</option>
                    {getAvailableReturnTimes(preferredTime).map((time) => (
                      <option key={time} value={time}>
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* TRAVELLERS */}
          <div className="booking__section">
            <h3>Travellers</h3>
            <div className="form-row">
              <label>
                Adults:
                <input
                  type="number"
                  min="0"
                  value={adults}
                  onChange={handleAdultChange}
                  disabled={isSubmitting}
                />
              </label>
              <label>
                Children:
                <input
                  type="number"
                  min="0"
                  value={children}
                  onChange={handleChildrenChange}
                  disabled={isSubmitting}
                />
              </label>
            </div>

            {adults > 0 && (
              <div className="booking__subsection">
                <h4>Adult Details</h4>
                {adultDetails.map((adult, i) => (
                  <div className="form-row" key={i}>
                    <input
                      type="text"
                      placeholder={`Adult ${i + 1} Name`}
                      value={adult.name}
                      onChange={(e) =>
                        handleAdultDetailChange(i, "name", e.target.value)
                      }
                      required
                      disabled={isSubmitting}
                    />
                    <input
                      type="text"
                      placeholder={`Adult ${i + 1} ID Number`}
                      value={adult.id}
                      onChange={(e) =>
                        handleAdultDetailChange(i, "id", e.target.value)
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                ))}
              </div>
            )}

            {children > 0 && (
              <div className="booking__subsection">
                <h4>Children (Guardian Details)</h4>
                {childDetails.map((child, i) => (
                  <div className="form-row" key={i}>
                    <input
                      type="text"
                      placeholder={`Child ${i + 1} Guardian Name`}
                      value={child.guardianName}
                      onChange={(e) =>
                        handleChildDetailChange(
                          i,
                          "guardianName",
                          e.target.value
                        )
                      }
                      required
                      disabled={isSubmitting}
                    />
                    <input
                      type="text"
                      placeholder={`Child ${i + 1} Guardian ID Number`}
                      value={child.guardianId}
                      onChange={(e) =>
                        handleChildDetailChange(i, "guardianId", e.target.value)
                      }
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SEAT SELECTION */}
          <div className="booking__section">
            <h3>Seat Selection</h3>
            <p className="booking__seat-note">
              {totalTravelers > 0
                ? `Select ${totalTravelers} seat(s) - ${selectedSeats.length} selected`
                : "Add passengers to select seats"}
            </p>
            <div className="seat-map">
              {Array.from({ length: totalSeats }, (_, i) => {
                const seat = `S${i + 1}`;
                const isSelected = selectedSeats.includes(seat);
                const disabled =
                  isSubmitting ||
                  totalTravelers === 0 ||
                  (!isSelected &&
                    selectedSeats.length >= totalTravelers &&
                    totalTravelers > 0);

                return (
                  <div
                    key={seat}
                    className={`seat ${isSelected ? "selected" : ""} ${
                      disabled ? "disabled" : ""
                    }`}
                    onClick={() => !disabled && toggleSeat(seat)}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="booking__button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;