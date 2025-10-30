// components/booking/useBookingLogic.ts
"use client";

import { useEffect, useState } from "react";

export interface AdultDetail {
  name: string;
  id: string;
}
export interface ChildDetail {
  guardianName: string;
  guardianId: string;
}

export const useBookingLogic = () => {
  // Passengers
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [adultDetails, setAdultDetails] = useState<AdultDetail[]>([
    { name: "", id: "" },
  ]);
  const [childDetails, setChildDetails] = useState<ChildDetail[]>([]);

  // Trip
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [tripType, setTripType] = useState<"one-way" | "return">("one-way");
  const [travelDate, setTravelDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [seatClass, setSeatClass] = useState<string>("economy");
  const [sameClassBothWays, setSameClassBothWays] = useState<boolean>(true);
  const [returnSeatClass, setReturnSeatClass] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");

  // Contact
  const [contactName, setContactName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Seats
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const totalSeats = 40;
  const totalTravelers = adults + children;

  // UI / helpers
  const [availableTimes, setAvailableTimes] = useState<string[]>([
    "morning",
    "afternoon",
    "evening",
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const stations = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Malindi",
    "Voi",
  ];

  // Update available times when travelDate changes
  useEffect(() => {
    if (!travelDate) return;

    const now = new Date();
    const selectedDate = new Date(travelDate);
    let times = ["morning", "afternoon", "evening"];

    if (selectedDate.toDateString() === now.toDateString()) {
      const hour = now.getHours();
      times =
        hour < 8
          ? times
          : hour < 12
          ? ["afternoon", "evening"]
          : hour < 18
          ? ["evening"]
          : [];
    }

    setAvailableTimes(times);
    if (!times.includes(preferredTime)) setPreferredTime("");
  }, [travelDate, preferredTime]);

  
  // Keep adultDetails/childDetails in sync when counts change
  useEffect(() => {
    setAdultDetails((prev) => {
      const next = [...prev];
      if (adults <= 0) return [];
      while (next.length < adults) next.push({ name: "", id: "" });
      if (next.length > adults) next.length = adults;
      return next;
    });
  }, [children]);

  useEffect(() => {
    setChildDetails((prev) => {
      const next = [...prev];
      if (children <= 0) return [];
      while (next.length < children)
        next.push({ guardianName: "", guardianId: "" });
      if (next.length > children) next.length = children;
      return next;
    });
  }, [children]);
  

  // Trim selected seats if passenger count decreases
  useEffect(() => {
    if (selectedSeats.length > totalTravelers) {
      // Clear selection and notify user
      alert(
        `Passenger count reduced. Please reselect ${totalTravelers} seat(s).`
      );
      setSelectedSeats([]);
    }
    if (totalTravelers === 0 && selectedSeats.length > 0) {
      setSelectedSeats([]);
    }
  }, [totalTravelers, selectedSeats.length]);

  const handleAdultCountChange = (count: number) => {
  const total = Math.max(0, Math.floor(count));
  if (total + children > 10) {
    alert("You can only book up to 10 passengers in total.");
    return;
  }
  setAdults(total);
};

const handleChildrenCountChange = (count: number) => {
  const total = Math.max(0, Math.floor(count));
  if (total + adults > 10) {
    alert("You can only book up to 10 passengers in total.");
    return;
  }
  setChildren(total);
};


  const updateAdultDetail = (
    index: number,
    field: keyof AdultDetail,
    value: string
  ) => {
    setAdultDetails((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const updateChildDetail = (
    index: number,
    field: keyof ChildDetail,
    value: string
  ) => {
    setChildDetails((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const toggleSeat = (seat: string) => {
    if (totalTravelers === 0) {
      alert("Please add at least one passenger before selecting seats.");
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seat)) return prev.filter((s) => s !== seat);
      if (prev.length < totalTravelers) return [...prev, seat];
      alert(`You can only select up to ${totalTravelers} seat(s).`);
      return prev;
    });
  };

  const getAvailableReturnTimes = (departTime: string) => {
    if (!travelDate || travelDate !== returnDate)
      return ["morning", "afternoon", "evening"];
    if (!departTime) return ["morning", "afternoon", "evening"];
    switch (departTime) {
      case "morning":
        return ["afternoon", "evening"];
      case "afternoon":
        return ["evening"];
      default:
        return [];
    }
  };

  const validateForm = (): boolean => {
    if (!origin || !destination || !travelDate) {
      alert("Please fill out origin, destination and travel date.");
      return false;
    }
    if (origin === destination) {
      alert("Origin and destination must be different.");
      return false;
    }
    if (totalTravelers === 0) {
      alert("Please add at least one traveller.");
      return false;
    }
    if (selectedSeats.length !== totalTravelers) {
      alert(`Please select exactly ${totalTravelers} seat(s).`);
      return false;
    }
    if (!preferredTime) {
      alert("Please select preferred departure time.");
      return false;
    }
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
        alert(
          "No valid same-day return times. Choose different times or dates."
        );
        return false;
      }
    }
    if (!contactName || !email || !phone) {
      alert("Please fill contact name, email and phone.");
      return false;
    }
    const phoneDigits = phone.replace(/[\s\-\(\)]+/g, "");
    if (!/^\d{10,15}$/.test(phoneDigits)) {
      alert("Please enter a valid phone number (10–15 digits).");
      return false;
    }
    // adult details
    for (let i = 0; i < adults; i++) {
      const a = adultDetails[i];
      if (!a || !a.name.trim() || !a.id.trim()) {
        alert(`Please fill name and ID for adult ${i + 1}.`);
        return false;
      }
    }
    for (let i = 0; i < children; i++) {
      const c = childDetails[i];
      if (!c || !c.guardianName.trim() || !c.guardianId.trim()) {
        alert(`Please fill guardian name and ID for child ${i + 1}.`);
        return false;
      }
    }
    return true;
  };

  const submitBooking = async (): Promise<boolean> => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    const payload = {
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
      createdAt: new Date().toISOString(),
    };

    try {
      // simulate API
      await new Promise((res) => setTimeout(res, 1200));
      console.log("Booking payload:", payload);
      // TODO: replace with actual API/Firestore call
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
    // state
    adults,
    children,
    adultDetails,
    childDetails,
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
    contactName,
    email,
    phone,
    selectedSeats,
    totalSeats,
    totalTravelers,
    availableTimes,
    isSubmitting,
    stations,
    // handlers
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
    setContactName,
    setEmail,
    setPhone,
    setSelectedSeats,
    setAdults: handleAdultCountChange,
    setChildren: handleChildrenCountChange,
    updateAdultDetail,
    updateChildDetail,
    toggleSeat,
    getAvailableReturnTimes,
    validateForm,
    submitBooking,
    setIsSubmitting,
  } as const;
};

export type BookingHook = ReturnType<typeof useBookingLogic>;
