// types/booking.ts

export interface AdultDetail {
  name: string;
  id: string;
}

export interface ChildDetail {
  guardianName: string;
  guardianId: string;
}

export type TripType = "one-way" | "return";

export type TimeSlot = "morning" | "afternoon" | "evening";

export interface BookingPayload {
  contactName: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  tripType: TripType;
  travelDate: string;
  returnDate: string | null;
  preferredTime: string;
  seatClass: string;
  sameClassBothWays: boolean;
  returnSeatClass: string;
  returnTime: string | null;
  adults: number;
  children: number;
  adultDetails: AdultDetail[];
  childDetails: ChildDetail[];
  selectedSeats: string[];
  createdAt: string;
}