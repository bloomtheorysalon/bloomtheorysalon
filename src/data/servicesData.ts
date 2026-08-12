import { ServiceItem, SalonInfo } from '../types';

export const DEFAULT_SALON_INFO: SalonInfo = {
  name: "Bloom Theory Salon",
  phone: "8977774224",
  email: "bloomtheorysalon@gmail.com",
  address: "Opposite to Star Bazar, 1st Floor, Mahalaxmi Srinivasam, Bapuji Nagar Road, Hyderabad, Secunderabad, Telangana 500011",
  googleMapsUrl: "https://www.google.com/maps/place/Bloom+theory+salon/@17.4688756,78.4809198,18.48z/data=!4m6!3m5!1s0x3bcb9b797e20e4f1:0xa0c259f326827392!8m2!3d17.4688717!4d78.4817184!16s%2Fg%2F11z76wy93y?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D",
  openingHours: "8:30 AM - 11:00 PM (Mon - Sun)",
  announcement: "Special Celebration Offer: Book via website & get free consultation & skin analysis!"
};

export const INITIAL_MEN_SERVICES: ServiceItem[] = [
  // Hair Basic
  { id: 'm-hb-1', name: 'Hair Cut', price: 300, category: 'Hair Basic', gender: 'men', popular: true, durationMinutes: 30 },
  { id: 'm-hb-2', name: 'Kids Cut', price: 300, category: 'Hair Basic', gender: 'men', durationMinutes: 25 },
  { id: 'm-hb-3', name: 'Shave', price: 150, category: 'Hair Basic', gender: 'men', durationMinutes: 20 },
  { id: 'm-hb-4', name: 'Beard Trim', price: 150, category: 'Hair Basic', gender: 'men', popular: true, durationMinutes: 20 },
  { id: 'm-hb-5', name: 'Head Shave', price: 250, category: 'Hair Basic', gender: 'men', durationMinutes: 30 },
  { id: 'm-hb-6', name: 'Hair Wash', price: 100, category: 'Hair Basic', gender: 'men', durationMinutes: 15 },
  { id: 'm-hb-7', name: 'Hair Setting', price: 100, category: 'Hair Basic', gender: 'men', durationMinutes: 15 },
  { id: 'm-hb-8', name: 'Regular Hair Spa', price: 700, category: 'Hair Basic', gender: 'men', durationMinutes: 45 },
  { id: 'm-hb-9', name: 'Matrix Hair Spa', price: 1000, category: 'Hair Basic', gender: 'men', popular: true, durationMinutes: 45 },
  { id: 'm-hb-10', name: 'L’Oréal Hair Spa', price: 1299, category: 'Hair Basic', gender: 'men', durationMinutes: 50 },
  { id: 'm-hb-11', name: 'Dandruff Hair Treatment', price: 1500, category: 'Hair Basic', gender: 'men', durationMinutes: 60 },
  { id: 'm-hb-12', name: 'Anti-Hair Fall Treatment', price: 1500, category: 'Hair Basic', gender: 'men', durationMinutes: 60 },
  { id: 'm-hb-13', name: 'Head Massage (without Hair Wash)', price: 400, category: 'Hair Basic', gender: 'men', durationMinutes: 30 },
  { id: 'm-hb-14', name: 'Head Massage (with Hair Wash)', price: 500, category: 'Hair Basic', gender: 'men', durationMinutes: 40 },

  // Hair Colour & Hair Treatments
  { id: 'm-hc-1', name: 'Regular Colour', price: 700, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 45 },
  { id: 'm-hc-2', name: 'Matrix Colour', price: 900, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 45 },
  { id: 'm-hc-3', name: 'L’Oréal Colour', price: 1200, category: 'Hair Colour & Treatments', gender: 'men', popular: true, durationMinutes: 50 },
  { id: 'm-hc-4', name: 'L’Oréal INOA Colour', price: 1500, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 50 },
  { id: 'm-hc-5', name: 'Fashion Colour', price: 1500, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 60 },
  { id: 'm-hc-6', name: 'Beard Colour', price: 500, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 20 },
  { id: 'm-hc-7', name: 'Face Wash', price: 100, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 10 },
  { id: 'm-hc-8', name: 'Hair Hi-Lites – Per Streak', price: 300, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 20 },
  { id: 'm-hc-9', name: 'Hair Global Hi-Lites', price: 1500, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 75 },
  { id: 'm-hc-10', name: 'Hair Straightening', price: 2500, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 90 },
  { id: 'm-hc-11', name: 'Hair Smoothening', price: 2500, category: 'Hair Colour & Treatments', gender: 'men', durationMinutes: 90 },
  { id: 'm-hc-12', name: 'Hair Keratin Treatment', price: 3000, category: 'Hair Colour & Treatments', gender: 'men', popular: true, durationMinutes: 120 },

  // Facial
  { id: 'm-fa-1', name: 'Fruit Facial', price: 1000, category: 'Facial', gender: 'men', durationMinutes: 45 },
  { id: 'm-fa-2', name: 'Pearl Facial', price: 1500, category: 'Facial', gender: 'men', durationMinutes: 50 },
  { id: 'm-fa-3', name: 'Gold Facial', price: 1500, category: 'Facial', gender: 'men', popular: true, durationMinutes: 60 },
  { id: 'm-fa-4', name: 'Glo-Vita Facial', price: 1300, category: 'Facial', gender: 'men', durationMinutes: 50 },
  { id: 'm-fa-5', name: 'D-Tan Facial', price: 1200, category: 'Facial', gender: 'men', durationMinutes: 45 },
  { id: 'm-fa-6', name: 'Raaga Professional', price: 2000, category: 'Facial', gender: 'men', durationMinutes: 60 },
  { id: 'm-fa-7', name: 'Oxy-Life (Pro-Whitening)', price: 2500, category: 'Facial', gender: 'men', durationMinutes: 60 },
  { id: 'm-fa-8', name: 'O₃+ Facial (Regular)', price: 3000, category: 'Facial', gender: 'men', durationMinutes: 65 },
  { id: 'm-fa-9', name: 'O₃+ Facial (Bridal / Groom Facial)', price: 4000, category: 'Facial', gender: 'men', popular: true, durationMinutes: 75 },

  // Peel Off Mask
  { id: 'm-pm-1', name: 'Peel Mask', price: 700, category: 'Peel Off Mask', gender: 'men', durationMinutes: 20 },

  // Makeup
  { id: 'm-mk-1', name: 'Party Makeup', price: 1500, category: 'Makeup', gender: 'men', durationMinutes: 45 },
  { id: 'm-mk-2', name: 'Advance Makeup', price: 3000, category: 'Makeup', gender: 'men', durationMinutes: 60 },

  // Threading
  { id: 'm-th-1', name: 'Eye-Brows', price: 50, category: 'Threading', gender: 'men', durationMinutes: 10 },
  { id: 'm-th-2', name: 'Upper-Lip', price: 30, category: 'Threading', gender: 'men', durationMinutes: 10 },
  { id: 'm-th-3', name: 'Forehead', price: 30, category: 'Threading', gender: 'men', durationMinutes: 10 },
  { id: 'm-th-4', name: 'Chin', price: 30, category: 'Threading', gender: 'men', durationMinutes: 10 },
  { id: 'm-th-5', name: 'Upper-Lip Wax', price: 50, category: 'Threading', gender: 'men', durationMinutes: 10 },
  { id: 'm-th-6', name: 'Forehead Wax', price: 50, category: 'Threading', gender: 'men', durationMinutes: 10 },
  { id: 'm-th-7', name: 'Chin Wax', price: 50, category: 'Threading', gender: 'men', durationMinutes: 10 },

  // Pedicure
  { id: 'm-pe-1', name: 'Normal Pedicure', price: 800, category: 'Pedicure', gender: 'men', durationMinutes: 40 },
  { id: 'm-pe-2', name: 'D-Tan Pedicure', price: 1200, category: 'Pedicure', gender: 'men', durationMinutes: 45 },
  { id: 'm-pe-3', name: 'Spa Pedicure', price: 1500, category: 'Pedicure', gender: 'men', popular: true, durationMinutes: 50 },
  { id: 'm-pe-4', name: 'O₃+ Pedicure', price: 1800, category: 'Pedicure', gender: 'men', durationMinutes: 60 },

  // Manicure
  { id: 'm-ma-1', name: 'Manicure', price: 500, category: 'Manicure', gender: 'men', durationMinutes: 30 },
  { id: 'm-ma-2', name: 'Regular Manicure', price: 800, category: 'Manicure', gender: 'men', durationMinutes: 35 },
  { id: 'm-ma-3', name: 'D-Tan Manicure', price: 1200, category: 'Manicure', gender: 'men', durationMinutes: 40 },
  { id: 'm-ma-4', name: 'Spa Manicure', price: 1500, category: 'Manicure', gender: 'men', durationMinutes: 45 },
  { id: 'm-ma-5', name: 'O₃+ Manicure', price: 1800, category: 'Manicure', gender: 'men', durationMinutes: 50 },

  // Hand Mehndi
  { id: 'm-hm-1', name: 'Hand Mehndi (On Request)', price: 300, category: 'Hand Mehndi', gender: 'men', description: 'Price depends on design selection/functions', durationMinutes: 45 },

  // Waxing
  { id: 'm-wx-1', name: 'Sleek-Wax Full Hands', price: 400, category: 'Waxing', gender: 'men', durationMinutes: 30 },
  { id: 'm-wx-2', name: 'Sleek-Wax Half Hands', price: 250, category: 'Waxing', gender: 'men', durationMinutes: 20 },
  { id: 'm-wx-3', name: 'Rica-Wax Full Hands', price: 500, category: 'Waxing', gender: 'men', durationMinutes: 30 },
  { id: 'm-wx-4', name: 'Rica-Wax Half Hands', price: 300, category: 'Waxing', gender: 'men', durationMinutes: 20 },
  { id: 'm-wx-5', name: 'Bio-Soft Full Hands', price: 800, category: 'Waxing', gender: 'men', durationMinutes: 30 },
  { id: 'm-wx-6', name: 'Bio-Soft Half Hands', price: 400, category: 'Waxing', gender: 'men', durationMinutes: 20 },
  { id: 'm-wx-7', name: 'Sleek-Wax Full Legs', price: 800, category: 'Waxing', gender: 'men', durationMinutes: 40 },
  { id: 'm-wx-8', name: 'Sleek-Wax Half Legs', price: 400, category: 'Waxing', gender: 'men', durationMinutes: 25 },
  { id: 'm-wx-9', name: 'Rica-Wax Full Legs', price: 1000, category: 'Waxing', gender: 'men', durationMinutes: 40 },
  { id: 'm-wx-10', name: 'Rica-Wax Half Legs', price: 600, category: 'Waxing', gender: 'men', durationMinutes: 25 },
  { id: 'm-wx-11', name: 'Bio-Soft Full Legs', price: 1500, category: 'Waxing', gender: 'men', durationMinutes: 45 },
  { id: 'm-wx-12', name: 'Bio-Soft Half Legs', price: 700, category: 'Waxing', gender: 'men', durationMinutes: 25 },
  { id: 'm-wx-13', name: 'Sleek-Wax Underarms', price: 100, category: 'Waxing', gender: 'men', durationMinutes: 15 },
  { id: 'm-wx-14', name: 'Rica-Wax Underarms', price: 200, category: 'Waxing', gender: 'men', durationMinutes: 15 },
  { id: 'm-wx-15', name: 'Brazilian Wax', price: 200, category: 'Waxing', gender: 'men', durationMinutes: 30 },
  { id: 'm-wx-16', name: 'Sleek-Wax Face Wax', price: 500, category: 'Waxing', gender: 'men', durationMinutes: 20 },
  { id: 'm-wx-17', name: 'Rica-Wax Full Body Wax', price: 3000, category: 'Waxing', gender: 'men', durationMinutes: 90 },
  { id: 'm-wx-18', name: 'Bio-Soft Body Wax (Painless with Tan-Remove)', price: 4000, category: 'Waxing', gender: 'men', popular: true, durationMinutes: 90 },

  // D-Tan / Bleach
  { id: 'm-dt-1', name: 'Basic Face D-Tan', price: 500, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 25 },
  { id: 'm-dt-2', name: 'Advance Face D-Tan', price: 700, category: 'D-Tan / Bleach', gender: 'men', popular: true, durationMinutes: 30 },
  { id: 'm-dt-3', name: 'Basic D-Tan Neck', price: 300, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 15 },
  { id: 'm-dt-4', name: 'Basic D-Tan Half Hands', price: 300, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 20 },
  { id: 'm-dt-5', name: 'Basic D-Tan Full Hands', price: 600, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 30 },
  { id: 'm-dt-6', name: 'Advance D-Tan Half Hands', price: 400, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 20 },
  { id: 'm-dt-7', name: 'Advance D-Tan Full Hands', price: 800, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 30 },
  { id: 'm-dt-8', name: 'Advance D-Tan Half Legs', price: 500, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 25 },
  { id: 'm-dt-9', name: 'Advance D-Tan Full Legs', price: 1000, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 35 },
  { id: 'm-dt-10', name: 'Advance D-Tan Full Body', price: 3000, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 75 },
  { id: 'm-dt-11', name: 'Bleach Face & Neck', price: 600, category: 'D-Tan / Bleach', gender: 'men', durationMinutes: 25 },

  // Clean Up
  { id: 'm-cu-1', name: 'Basic Clean Up', price: 800, category: 'Clean Up', gender: 'men', durationMinutes: 35 },
  { id: 'm-cu-2', name: 'O₃+ D-Tan Face Clean Up', price: 1000, category: 'Clean Up', gender: 'men', popular: true, durationMinutes: 40 }
];

export const INITIAL_WOMEN_SERVICES: ServiceItem[] = [
  // D-Tan / Bleach
  { id: 'w-dt-1', name: 'Basic Face D-Tan', price: 500, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 25 },
  { id: 'w-dt-2', name: 'Advance Face D-Tan', price: 700, category: 'D-Tan / Bleach', gender: 'women', popular: true, durationMinutes: 30 },
  { id: 'w-dt-3', name: 'Basic D-Tan Neck', price: 300, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 15 },
  { id: 'w-dt-4', name: 'Basic D-Tan Half Hands', price: 300, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 20 },
  { id: 'w-dt-5', name: 'Basic D-Tan Full Hands', price: 600, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 30 },
  { id: 'w-dt-6', name: 'Advance D-Tan Half Hands', price: 400, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 20 },
  { id: 'w-dt-7', name: 'Advance D-Tan Full Hands', price: 800, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 30 },
  { id: 'w-dt-8', name: 'Advance D-Tan Half Legs', price: 500, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 25 },
  { id: 'w-dt-9', name: 'Advance D-Tan Full Legs', price: 1000, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 35 },
  { id: 'w-dt-10', name: 'Advance D-Tan Full Body', price: 3000, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 75 },
  { id: 'w-dt-11', name: 'Bleach Face & Neck', price: 600, category: 'D-Tan / Bleach', gender: 'women', durationMinutes: 25 },

  // Clean Up
  { id: 'w-cu-1', name: 'Basic Clean Up', price: 700, category: 'Clean Up', gender: 'women', durationMinutes: 35 },

  // Hair Basic
  { id: 'w-hb-1', name: 'Basic Cut', price: 800, category: 'Hair Basic', gender: 'women', durationMinutes: 40 },
  { id: 'w-hb-2', name: 'Advance Cut', price: 1500, category: 'Hair Basic', gender: 'women', popular: true, durationMinutes: 50 },
  { id: 'w-hb-3', name: 'Kids (Below 5 Years)', price: 400, category: 'Hair Basic', gender: 'women', durationMinutes: 30 },
  { id: 'w-hb-4', name: 'Hair Wash', price: 400, category: 'Hair Basic', gender: 'women', durationMinutes: 20 },
  { id: 'w-hb-5', name: 'Hair Styling', price: 800, category: 'Hair Basic', gender: 'women', durationMinutes: 30 },
  { id: 'w-hb-6', name: 'Ironing & Tongs', price: 1000, category: 'Hair Basic', gender: 'women', durationMinutes: 40 },
  { id: 'w-hb-7', name: 'Head Massage (Without Hair Wash)', price: 500, category: 'Hair Basic', gender: 'women', durationMinutes: 30 },
  { id: 'w-hb-8', name: 'Head Massage (With Hair Wash)', price: 1000, category: 'Hair Basic', gender: 'women', durationMinutes: 45 },
  { id: 'w-hb-9', name: 'Head Massage', price: 750, category: 'Hair Basic', gender: 'women', durationMinutes: 35 },

  // Hair Colour
  { id: 'w-hc-1', name: 'Regular Root Touch-Up', price: 1000, category: 'Hair Colour', gender: 'women', durationMinutes: 45 },
  { id: 'w-hc-2', name: 'Matrix Root Touch-Up', price: 1200, category: 'Hair Colour', gender: 'women', durationMinutes: 45 },
  { id: 'w-hc-3', name: 'L\'Oréal Root Touch-Up', price: 1500, category: 'Hair Colour', gender: 'women', popular: true, durationMinutes: 50 },
  { id: 'w-hc-4', name: 'L\'Oréal INOA Root Touch-Up', price: 2000, category: 'Hair Colour', gender: 'women', durationMinutes: 50 },
  { id: 'w-hc-5', name: 'Regular Global Colour', price: 3000, category: 'Hair Colour', gender: 'women', durationMinutes: 90 },
  { id: 'w-hc-6', name: 'Matrix Global Colour', price: 4000, category: 'Hair Colour', gender: 'women', durationMinutes: 90 },
  { id: 'w-hc-7', name: 'L\'Oréal Global Colour', price: 5000, category: 'Hair Colour', gender: 'women', popular: true, durationMinutes: 100 },
  { id: 'w-hc-8', name: 'Fashion Matrix Global Colour', price: 4500, category: 'Hair Colour', gender: 'women', durationMinutes: 100 },
  { id: 'w-hc-9', name: 'Fashion L\'Oréal Global Colour', price: 6000, category: 'Hair Colour', gender: 'women', durationMinutes: 120 },
  { id: 'w-hc-10', name: 'Hair Highlights (Per Streak)', price: 500, category: 'Hair Colour', gender: 'women', durationMinutes: 20 },
  { id: 'w-hc-11', name: 'Balayage Hair Color', price: 10000, category: 'Hair Colour', gender: 'women', popular: true, durationMinutes: 180, description: 'Premium dimensional color treatment' },

  // Hair Smoothening & Keratin
  { id: 'w-sk-1', name: 'Hair Smoothening (Length Dependent)', price: 5000, category: 'Hair Smoothening & Keratin', gender: 'women', popular: true, durationMinutes: 180, description: 'Price depends on hair length' },
  { id: 'w-sk-2', name: 'Hair Keratin (Length Dependent)', price: 6000, category: 'Hair Smoothening & Keratin', gender: 'women', popular: true, durationMinutes: 180, description: 'Price depends on hair length' },
  { id: 'w-sk-3', name: 'Hairdo Normal', price: 1000, category: 'Hair Smoothening & Keratin', gender: 'women', durationMinutes: 45 },
  { id: 'w-sk-4', name: 'Hairdo Advance', price: 1500, category: 'Hair Smoothening & Keratin', gender: 'women', durationMinutes: 60 },

  // Hair Spa
  { id: 'w-hs-1', name: 'Regular Hair Spa', price: 1500, category: 'Hair Spa', gender: 'women', durationMinutes: 50 },
  { id: 'w-hs-2', name: 'Matrix Hair Spa', price: 1800, category: 'Hair Spa', gender: 'women', durationMinutes: 50 },
  { id: 'w-hs-3', name: 'L\'Oréal Hair Spa', price: 2000, category: 'Hair Spa', gender: 'women', popular: true, durationMinutes: 60 },
  { id: 'w-hs-4', name: 'Moisturizing Hair Spa (Medium / Long)', price: 1500, category: 'Hair Spa', gender: 'women', description: 'Medium ₹1500 | Long ₹1800', durationMinutes: 60 },
  { id: 'w-hs-5', name: 'Color Save (Medium / Long)', price: 1800, category: 'Hair Spa', gender: 'women', description: 'Medium ₹1800 | Long ₹2000', durationMinutes: 60 },
  { id: 'w-hs-6', name: 'Frizz Ease (Medium / Long)', price: 1800, category: 'Hair Spa', gender: 'women', description: 'Medium ₹1800 | Long ₹2000', durationMinutes: 60 },
  { id: 'w-hs-7', name: 'Repair & Rejuvenate (Medium / Long)', price: 1800, category: 'Hair Spa', gender: 'women', description: 'Medium ₹1800 | Long ₹2000', durationMinutes: 60 },
  { id: 'w-hs-8', name: 'Hair Strengthening (Medium / Long)', price: 2300, category: 'Hair Spa', gender: 'women', description: 'Medium ₹2300 | Long ₹2500', durationMinutes: 60 },

  // Hair Treatments
  { id: 'w-ht-1', name: 'Dandruff Hair Treatment', price: 1800, category: 'Hair Treatments', gender: 'women', durationMinutes: 60, description: 'Includes shampoo and conditioning' },
  { id: 'w-ht-2', name: 'Anti-Hair Fall Treatment', price: 1800, category: 'Hair Treatments', gender: 'women', durationMinutes: 60, description: 'Includes shampoo and conditioning' },
  { id: 'w-ht-3', name: 'Dandruff Control Package (5+1 Sitting)', price: 10000, category: 'Hair Treatments', gender: 'women', durationMinutes: 60 },
  { id: 'w-ht-4', name: 'Hairfall Control Package (5+1 Sitting)', price: 10000, category: 'Hair Treatments', gender: 'women', durationMinutes: 60 },

  // Threading
  { id: 'w-th-1', name: 'Eye-Brows', price: 50, category: 'Threading', gender: 'women', popular: true, durationMinutes: 10 },
  { id: 'w-th-2', name: 'Upper-Lip', price: 30, category: 'Threading', gender: 'women', durationMinutes: 10 },
  { id: 'w-th-3', name: 'Forehead', price: 30, category: 'Threading', gender: 'women', durationMinutes: 10 },
  { id: 'w-th-4', name: 'Chin', price: 30, category: 'Threading', gender: 'women', durationMinutes: 10 },

  // Waxing
  { id: 'w-wx-1', name: 'Upper-Lip Wax', price: 50, category: 'Waxing', gender: 'women', durationMinutes: 10 },
  { id: 'w-wx-2', name: 'Forehead Wax', price: 50, category: 'Waxing', gender: 'women', durationMinutes: 10 },
  { id: 'w-wx-3', name: 'Chin Wax', price: 50, category: 'Waxing', gender: 'women', durationMinutes: 10 },
  { id: 'w-wx-4', name: 'Sleek-Wax Face Wax', price: 500, category: 'Waxing', gender: 'women', durationMinutes: 20 },
  { id: 'w-wx-5', name: 'Sleek-Wax Full Hands', price: 400, category: 'Waxing', gender: 'women', durationMinutes: 30 },
  { id: 'w-wx-6', name: 'Sleek-Wax Half Hands', price: 250, category: 'Waxing', gender: 'women', durationMinutes: 20 },
  { id: 'w-wx-7', name: 'Rica-Wax Full Hands', price: 500, category: 'Waxing', gender: 'women', durationMinutes: 30 },
  { id: 'w-wx-8', name: 'Rica-Wax Half Hands', price: 300, category: 'Waxing', gender: 'women', durationMinutes: 20 },
  { id: 'w-wx-9', name: 'Bio-Soft Full Hands', price: 800, category: 'Waxing', gender: 'women', durationMinutes: 30 },
  { id: 'w-wx-10', name: 'Bio-Soft Half Hands', price: 400, category: 'Waxing', gender: 'women', durationMinutes: 20 },
  { id: 'w-wx-11', name: 'Sleek-Wax Full Legs', price: 800, category: 'Waxing', gender: 'women', durationMinutes: 40 },
  { id: 'w-wx-12', name: 'Sleek-Wax Half Legs', price: 400, category: 'Waxing', gender: 'women', durationMinutes: 25 },
  { id: 'w-wx-13', name: 'Rica-Wax Full Legs', price: 600, category: 'Waxing', gender: 'women', durationMinutes: 40 },
  { id: 'w-wx-14', name: 'Rica-Wax Half Legs', price: 600, category: 'Waxing', gender: 'women', durationMinutes: 25 },
  { id: 'w-wx-15', name: 'Bio-Soft Full Legs', price: 1500, category: 'Waxing', gender: 'women', durationMinutes: 45 },
  { id: 'w-wx-16', name: 'Bio-Soft Half Legs', price: 700, category: 'Waxing', gender: 'women', durationMinutes: 25 },
  { id: 'w-wx-17', name: 'Sleek-Wax Underarms', price: 100, category: 'Waxing', gender: 'women', durationMinutes: 15 },
  { id: 'w-wx-18', name: 'Rica-Wax Underarms', price: 800, category: 'Waxing', gender: 'women', durationMinutes: 15 },
  { id: 'w-wx-19', name: 'Brazilian Wax', price: 250, category: 'Waxing', gender: 'women', durationMinutes: 30 },
  { id: 'w-wx-20', name: 'Rica-Wax Full Body Wax', price: 4000, category: 'Waxing', gender: 'women', popular: true, durationMinutes: 90 },
  { id: 'w-wx-21', name: 'Bio-Soft Body Wax (Painless With Tan-Removal)', price: 6000, category: 'Waxing', gender: 'women', popular: true, durationMinutes: 90 },

  // Pedicure
  { id: 'w-pe-1', name: 'Normal Pedicure', price: 700, category: 'Pedicure', gender: 'women', durationMinutes: 40 },
  { id: 'w-pe-2', name: 'D-Tan Pedicure', price: 1200, category: 'Pedicure', gender: 'women', durationMinutes: 45 },
  { id: 'w-pe-3', name: 'Spa Pedicure', price: 1500, category: 'Pedicure', gender: 'women', durationMinutes: 50 },
  { id: 'w-pe-4', name: 'O₃+ Pedicure', price: 1800, category: 'Pedicure', gender: 'women', popular: true, durationMinutes: 60 },
  { id: 'w-pe-5', name: 'Ice Cream Mani & Pedi (Combo)', price: 2500, category: 'Pedicure', gender: 'women', popular: true, durationMinutes: 75, description: 'Decadent pampering combo for hands & feet' },

  // Manicure
  { id: 'w-ma-1', name: 'Regular Manicure', price: 500, category: 'Manicure', gender: 'women', durationMinutes: 35 },
  { id: 'w-ma-2', name: 'D-Tan Manicure', price: 800, category: 'Manicure', gender: 'women', durationMinutes: 40 },
  { id: 'w-ma-3', name: 'Spa Manicure', price: 1200, category: 'Manicure', gender: 'women', durationMinutes: 45 },
  { id: 'w-ma-4', name: 'O₃+ Manicure', price: 1400, category: 'Manicure', gender: 'women', durationMinutes: 50 },

  // Foot Treatment
  { id: 'w-ft-1', name: 'Heel Peel Treatment', price: 2500, category: 'Foot Treatment', gender: 'women', popular: true, durationMinutes: 60, description: 'Softens cracked heels and removes dead skin' },

  // Nail Care
  { id: 'w-nc-1', name: 'Change of Nail Color', price: 100, category: 'Nail Care', gender: 'women', durationMinutes: 15 },
  { id: 'w-nc-2', name: 'Cut, File & Polish', price: 250, category: 'Nail Care', gender: 'women', durationMinutes: 20 },
  { id: 'w-nc-3', name: 'Gel Polish', price: 700, category: 'Nail Care', gender: 'women', popular: true, durationMinutes: 40, description: 'Long-lasting, chip-resistant glossy finish' },
  { id: 'w-nc-4', name: 'Gel Polish Removal', price: 300, category: 'Nail Care', gender: 'women', durationMinutes: 20 },

  // Facials
  { id: 'w-fa-1', name: 'Fruit Facial', price: 1000, category: 'Facials', gender: 'women', durationMinutes: 45 },
  { id: 'w-fa-2', name: 'Pearl Facial', price: 1500, category: 'Facials', gender: 'women', durationMinutes: 50 },
  { id: 'w-fa-3', name: 'Gold Facial', price: 2000, category: 'Facials', gender: 'women', popular: true, durationMinutes: 60 },
  { id: 'w-fa-4', name: 'Glo-Vita Facial', price: 2000, category: 'Facials', gender: 'women', durationMinutes: 60 },
  { id: 'w-fa-5', name: 'D-Tan Facial', price: 1500, category: 'Facials', gender: 'women', durationMinutes: 50 },
  { id: 'w-fa-6', name: 'Raaga Professional Facial', price: 2000, category: 'Facials', gender: 'women', durationMinutes: 60 },
  { id: 'w-fa-7', name: 'Oxy-Life (Pro-Whitening)', price: 2500, category: 'Facials', gender: 'women', durationMinutes: 60 },
  { id: 'w-fa-8', name: 'O₃+ Facial (Regular)', price: 4000, category: 'Facials', gender: 'women', durationMinutes: 65 },
  { id: 'w-fa-9', name: 'O₃+ Facial (Bridal Facial)', price: 5000, category: 'Facials', gender: 'women', popular: true, durationMinutes: 80 },
  { id: 'w-fa-10', name: 'Express Facial', price: 1000, category: 'Facials', gender: 'women', durationMinutes: 30 },
  { id: 'w-fa-11', name: 'Fruit Glow', price: 1100, category: 'Facials', gender: 'women', durationMinutes: 45 },
  { id: 'w-fa-12', name: 'Pure Choco Radiance', price: 1500, category: 'Facials', gender: 'women', durationMinutes: 50 },
  { id: 'w-fa-13', name: 'Acne Control Therapy', price: 1700, category: 'Facials', gender: 'women', durationMinutes: 55 },
  { id: 'w-fa-14', name: 'No-Tan Facial', price: 1800, category: 'Facials', gender: 'women', durationMinutes: 55 },
  { id: 'w-fa-15', name: 'Sensi Bright Facial', price: 2000, category: 'Facials', gender: 'women', durationMinutes: 60 },
  { id: 'w-fa-16', name: 'Golden Bliss Facial', price: 2000, category: 'Facials', gender: 'women', durationMinutes: 60 },
  { id: 'w-fa-17', name: 'Dead Sea Radiance', price: 2500, category: 'Facials', gender: 'women', durationMinutes: 65 },
  { id: 'w-fa-18', name: 'Brightening Bliss Facial', price: 3500, category: 'Facials', gender: 'women', durationMinutes: 70 },
  { id: 'w-fa-19', name: 'Mineral Brightening Facial', price: 4000, category: 'Facials', gender: 'women', durationMinutes: 75 },
  { id: 'w-fa-20', name: 'Forever Youthful Facial', price: 4000, category: 'Facials', gender: 'women', durationMinutes: 75 },
  { id: 'w-fa-21', name: 'Aqua Boost / Derma Bright', price: 4000, category: 'Facials', gender: 'women', durationMinutes: 75 },
  { id: 'w-fa-22', name: 'Hydra Facial - Hydration / Derma Bright', price: 5000, category: 'Facials', gender: 'women', popular: true, durationMinutes: 80, description: 'Deep vacuum pore cleansing & serum infusion' },
  { id: 'w-fa-23', name: 'Hydra Facial - Hydration / Derma Bright (With Home Care)', price: 9000, category: 'Facials', gender: 'women', popular: true, durationMinutes: 90, description: 'Includes complete take-home skincare kit' },
  { id: 'w-fa-24', name: 'Radiance Bliss Facial', price: 5500, category: 'Facials', gender: 'women', durationMinutes: 85 },
  { id: 'w-fa-25', name: 'Collagen Peptide Facial', price: 4500, category: 'Facials', gender: 'women', durationMinutes: 75 },

  // Peel Off Mask
  { id: 'w-pm-1', name: 'Peel Mask', price: 800, category: 'Peel Off Mask', gender: 'women', durationMinutes: 20 },
  { id: 'w-pm-2', name: 'Jelly Peel Off (Green Tea | Rose Petal)', price: 800, category: 'Peel Off Mask', gender: 'women', popular: true, durationMinutes: 25 },
  { id: 'w-pm-3', name: 'Gold Peel Off', price: 1200, category: 'Peel Off Mask', gender: 'women', durationMinutes: 25 },

  // Add-on Masks
  { id: 'w-am-1', name: 'Add-on Jelly Peel Off (Green Tea | Rose Petal)', price: 800, category: 'Add-on Masks', gender: 'women', durationMinutes: 20 },
  { id: 'w-am-2', name: 'Add-on Gold Peel Off', price: 1200, category: 'Add-on Masks', gender: 'women', durationMinutes: 20 },

  // Add-on Bright Care
  { id: 'w-ab-1', name: 'Underarm | Neck | Elbow Brightening', price: 1000, category: 'Add-on Bright Care', gender: 'women', durationMinutes: 30 },
  { id: 'w-ab-2', name: 'Under Eye Brightening', price: 1000, category: 'Add-on Bright Care', gender: 'women', durationMinutes: 25 },

  // Special Hair / Skin Services
  { id: 'w-ss-1', name: 'Balayage Hair Color Special', price: 10000, category: 'Special Hair / Skin Services', gender: 'women', popular: true, durationMinutes: 180 },
  { id: 'w-ss-2', name: 'Collagen Peptide Facial Special', price: 4500, category: 'Special Hair / Skin Services', gender: 'women', durationMinutes: 75 },
  { id: 'w-ss-3', name: 'Ice Cream Mani & Pedi Special Combo', price: 2500, category: 'Special Hair / Skin Services', gender: 'women', popular: true, durationMinutes: 75 },

  // Makeup
  { id: 'w-mk-1', name: 'Party Makeup', price: 3000, category: 'Makeup', gender: 'women', durationMinutes: 60 },
  { id: 'w-mk-2', name: 'Advance Makeup', price: 5000, category: 'Makeup', gender: 'women', popular: true, durationMinutes: 90 },

  // Hand Mehndi
  { id: 'w-hm-1', name: 'Hand Mehndi', price: 300, category: 'Hand Mehndi', gender: 'women', description: 'Price depends on design selection/functions', durationMinutes: 45 }
];
