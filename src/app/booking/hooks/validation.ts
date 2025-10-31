// utils/validation.ts

import { AdultDetail, ChildDetail, TripType } from "../types/booking";

interface ValidationParams {
  origin: string;
  destination: string;
  travelDate: string;
  returnDate: string;
  tripType: TripType;
  totalTravelers: number;
  selectedSeats: string[];
  preferredTime: string;
  returnTime: string;
  sameClassBothWays: boolean;
  returnSeatClass: string;
  contactName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  adultDetails: AdultDetail[];
  childDetails: ChildDetail[];
  getAvailableReturnTimes: (departTime: string) => string[];
}

export const validateBookingForm = (params: ValidationParams): boolean => {
  const {
    origin,
    destination,
    travelDate,
    returnDate,
    tripType,
    totalTravelers,
    selectedSeats,
    preferredTime,
    returnTime,
    sameClassBothWays,
    returnSeatClass,
    contactName,
    email,
    phone,
    adults,
    children,
    adultDetails,
    childDetails,
    getAvailableReturnTimes,
  } = params;

  // Basic trip info validation
  if (!origin || !destination || !travelDate) {
    alert("Please fill out origin, destination and travel date.");
    return false;
  }

  if (origin === destination) {
    alert("Origin and destination must be different.");
    return false;
  }

  // Travelers validation
  if (totalTravelers === 0) {
    alert("Please add at least one traveller.");
    return false;
  }

  // Seats validation
  if (selectedSeats.length !== totalTravelers) {
    alert(`Please select exactly ${totalTravelers} seat(s).`);
    return false;
  }

  // Time validation
  if (!preferredTime) {
    alert("Please select preferred departure time.");
    return false;
  }

  // Return trip validation
  if (tripType === "return") {
    if (!returnDate) {
      alert("Please select a return date.");
      return false;
    }

    if (!sameClassBothWays && !returnSeatClass) {
      alert("Please pick a class for the return trip.");
      return false;
    }

    if (!returnTime) {
      alert("Please select return time.");
      return false;
    }

    if (
      travelDate === returnDate &&
      getAvailableReturnTimes(preferredTime).length === 0
    ) {
      alert("No valid same-day return times. Choose different times or dates.");
      return false;
    }
  }

  // Contact validation
  if (!contactName || !email || !phone) {
    alert("Please fill contact name, email and phone.");
    return false;
  }

  const phoneDigits = phone.replace(/[\s\-\(\)]+/g, "");
  if (!/^\d{10,15}$/.test(phoneDigits)) {
    alert("Please enter a valid phone number (10–15 digits).");
    return false;
  }

  // Adult details validation
  for (let i = 0; i < adults; i++) {
    const a = adultDetails[i];
    if (!a || !a.name.trim() || !a.id.trim()) {
      alert(`Please fill name and ID for adult ${i + 1}.`);
      return false;
    }
  }

  // Child details validation
  for (let i = 0; i < children; i++) {
    const c = childDetails[i];
    if (!c || !c.guardianName.trim() || !c.guardianId.trim()) {
      alert(`Please fill guardian name and ID for child ${i + 1}.`);
      return false;
    }
  }

  return true;
};