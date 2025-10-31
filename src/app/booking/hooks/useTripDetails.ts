// hooks/useTripDetails.ts
"use client";

import { useState, useEffect } from "react";
import { TripType, TimeSlot } from "../types/booking";
import { getAvailableTimesForDate } from "../utils/timeUtils";

export const useTripDetails = () => {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [tripType, setTripType] = useState<TripType>("one-way");
  const [travelDate, setTravelDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [seatClass, setSeatClass] = useState<string>("economy");
  const [sameClassBothWays, setSameClassBothWays] = useState<boolean>(true);
  const [returnSeatClass, setReturnSeatClass] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<TimeSlot | "">("");
  const [returnTime, setReturnTime] = useState<TimeSlot | "">("");
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([
    "morning",
    "afternoon",
    "evening",
  ]);

  const stations = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Malindi",
    "Voi",
  ];

  // Update available times when travel date changes
  useEffect(() => {
    if (!travelDate) return;

    const times = getAvailableTimesForDate(travelDate);
    setAvailableTimes(times);

    // Clear preferred time if no longer available
    if (preferredTime && !times.includes(preferredTime)) {
      setPreferredTime("");
    }
  }, [travelDate, preferredTime]);

  return {
    origin,
    destination,
    tripType,
    travelDate,
    returnDate,
    seatClass,
    sameClassBothWays,
    returnSeatClass,
    preferredTime,
    returnTime,
    availableTimes,
    stations,
    setOrigin,
    setDestination,
    setTripType,
    setTravelDate,
    setReturnDate,
    setSeatClass,
    setSameClassBothWays,
    setReturnSeatClass,
    setPreferredTime,
    setReturnTime,
  };
};