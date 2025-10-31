// hooks/usePassengers.ts
"use client";

import { useState, useEffect } from "react";
import { AdultDetail, ChildDetail } from "../types/booking";

const MAX_PASSENGERS = 10;

export const usePassengers = () => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [adultDetails, setAdultDetails] = useState<AdultDetail[]>([
    { name: "", id: "" },
  ]);
  const [childDetails, setChildDetails] = useState<ChildDetail[]>([]);

  const totalTravelers = adults + children;

  // Sync adult details with count
  useEffect(() => {
    setAdultDetails((prev) => {
      if (adults <= 0) return [];
      
      const next = [...prev];
      while (next.length < adults) {
        next.push({ name: "", id: "" });
      }
      if (next.length > adults) {
        next.length = adults;
      }
      return next;
    });
  }, [adults]);

  // Sync child details with count
  useEffect(() => {
    setChildDetails((prev) => {
      if (children <= 0) return [];
      
      const next = [...prev];
      while (next.length < children) {
        next.push({ guardianName: "", guardianId: "" });
      }
      if (next.length > children) {
        next.length = children;
      }
      return next;
    });
  }, [children]);

  const handleAdultCountChange = (count: number) => {
    const total = Math.max(0, Math.floor(count));
    if (total + children > MAX_PASSENGERS) {
      alert(`You can only book up to ${MAX_PASSENGERS} passengers in total.`);
      return;
    }
    setAdults(total);
  };

  const handleChildrenCountChange = (count: number) => {
    const total = Math.max(0, Math.floor(count));
    if (total + adults > MAX_PASSENGERS) {
      alert(`You can only book up to ${MAX_PASSENGERS} passengers in total.`);
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

  return {
    adults,
    children,
    adultDetails,
    childDetails,
    totalTravelers,
    setAdults: handleAdultCountChange,
    setChildren: handleChildrenCountChange,
    updateAdultDetail,
    updateChildDetail,
  };
};