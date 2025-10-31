// components/booking/useBookingLogic.ts
"use client";

import { useState } from "react";
import { usePassengers } from "./usePassengers";
import { useSeats } from "./useSeats";
import { useTripDetails } from "./useTripDetails";
import { useContactInfo } from "./useContactInfo";
import { validateBookingForm } from "./validation";
import { getAvailableReturnTimes } from "../utils/timeUtils";
import { submitBookingToAPI } from "./bookingService";
import { BookingPayload } from "../types/booking";

export const useBookingLogic = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Compose all sub-hooks
  const passengers = usePassengers();
  const tripDetails = useTripDetails();
  const contactInfo = useContactInfo();
  const seats = useSeats(passengers.totalTravelers);

  const getAvailableReturnTimesForCurrentTrip = (departTime: string) => {
    return getAvailableReturnTimes(
      tripDetails.travelDate,
      tripDetails.returnDate,
      departTime
    );
  };

  const validateForm = (): boolean => {
    return validateBookingForm({
      ...tripDetails,
      ...passengers,
      ...contactInfo,
      ...seats,
      totalTravelers: passengers.totalTravelers,
      getAvailableReturnTimes: getAvailableReturnTimesForCurrentTrip,
    });
  };

  const submitBooking = async (): Promise<boolean> => {
    if (!validateForm()) return false;

    setIsSubmitting(true);

    const payload: BookingPayload = {
      contactName: contactInfo.contactName,
      email: contactInfo.email,
      phone: contactInfo.phone,
      origin: tripDetails.origin,
      destination: tripDetails.destination,
      tripType: tripDetails.tripType,
      travelDate: tripDetails.travelDate,
      returnDate: tripDetails.tripType === "return" ? tripDetails.returnDate : null,
      preferredTime: tripDetails.preferredTime,
      seatClass: tripDetails.seatClass,
      sameClassBothWays: tripDetails.sameClassBothWays,
      returnSeatClass: tripDetails.sameClassBothWays
        ? tripDetails.seatClass
        : tripDetails.returnSeatClass,
      returnTime: tripDetails.tripType === "return" ? tripDetails.returnTime : null,
      adults: passengers.adults,
      children: passengers.children,
      adultDetails: passengers.adultDetails,
      childDetails: passengers.childDetails,
      selectedSeats: seats.selectedSeats,
      createdAt: new Date().toISOString(),
    };

    try {
      await submitBookingToAPI(payload);
      alert("Booking submitted successfully (simulated).");
      return true;
    } catch (err) {
      console.error(err);
      alert("Failed to submit booking.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State from sub-hooks
    ...passengers,
    ...tripDetails,
    ...contactInfo,
    ...seats,
    isSubmitting,

    // Computed
    getAvailableReturnTimes: getAvailableReturnTimesForCurrentTrip,

    // Actions
    validateForm,
    submitBooking,
    setIsSubmitting,
  } as const;
};

export type BookingHook = ReturnType<typeof useBookingLogic>;