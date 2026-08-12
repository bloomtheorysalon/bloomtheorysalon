export type Gender = 'men' | 'women';

export interface ServiceItem {
  id: string;
  name: string;
  price: number; // in INR ₹
  category: string;
  gender: Gender;
  description?: string;
  popular?: boolean;
  durationMinutes?: number;
  available?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  gender: Gender;
  iconName?: string;
}

export interface BookingDetails {
  id?: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  gender: Gender;
  selectedServices: ServiceItem[];
  totalPrice: number;
  bookingDate: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "11:00 AM"
  notes?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  provider?: string;
  recommendedServices?: ServiceItem[];
  suggestedFollowups?: string[];
}

export interface SalonInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
  googleMapsUrl: string;
  openingHours: string;
  announcement?: string;
}

export interface SuggestionAnswer {
  gender: Gender;
  hairConcern?: string;
  skinType?: string;
  occasion?: string;
  budgetRange?: string;
}
