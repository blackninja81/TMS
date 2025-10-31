// hooks/useSeats.ts
"use client";

import { useState, useEffect } from "react";

export const useSeats = (totalTravelers: number) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const totalSeats = 40;

  // Clear seats if passenger count drops below selected seats
  useEffect(() => {
    if (selectedSeats.length > totalTravelers) {
      alert(
        `Passenger count reduced. Please reselect ${totalTravelers} seat(s).`
      );
      setSelectedSeats([]);
    }

    if (totalTravelers === 0 && selectedSeats.length > 0) {
      setSelectedSeats([]);
    }
  }, [totalTravelers, selectedSeats.length]);

  const toggleSeat = (seat: string) => {
    if (totalTravelers === 0) {
      alert("Please add at least one passenger before selecting seats.");
      return;
    }

    setSelectedSeats((prev) => {
      // Deselect if already selected
      if (prev.includes(seat)) {
        return prev.filter((s) => s !== seat);
      }

      // Add if under limit
      if (prev.length < totalTravelers) {
        return [...prev, seat];
      }

      // At limit
      alert(`You can only select up to ${totalTravelers} seat(s).`);
      return prev;
    });
  };

  return {
    selectedSeats,
    totalSeats,
    setSelectedSeats,
    toggleSeat,
  };
};