// utils/timeUtils.ts

import { TimeSlot } from "../types/booking";

export const getAvailableTimesForDate = (date: string): TimeSlot[] => {
  if (!date) return ["morning", "afternoon", "evening"];

  const now = new Date();
  const selectedDate = new Date(date);
  const times: TimeSlot[] = ["morning", "afternoon", "evening"];

  // If not today, all times available
  if (selectedDate.toDateString() !== now.toDateString()) {
    return times;
  }

  // Filter based on current hour
  const hour = now.getHours();
  if (hour < 8) return times;
  if (hour < 12) return ["afternoon", "evening"];
  if (hour < 18) return ["evening"];
  return [];
};

export const getAvailableReturnTimes = (
  travelDate: string,
  returnDate: string,
  departTime: string
): TimeSlot[] => {
  const allTimes: TimeSlot[] = ["morning", "afternoon", "evening"];

  // Different dates or no depart time - all times available
  if (!travelDate || travelDate !== returnDate || !departTime) {
    return allTimes;
  }

  // Same day return - must be later than departure
  switch (departTime) {
    case "morning":
      return ["afternoon", "evening"];
    case "afternoon":
      return ["evening"];
    default:
      return [];
  }
};