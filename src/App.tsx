import React, { useState, useEffect, useRef } from 'react';
import { Gender, ServiceItem, BookingDetails, SalonInfo } from './types';
import {
  INITIAL_MEN_SERVICES,
  INITIAL_WOMEN_SERVICES,
  DEFAULT_SALON_INFO,
} from './data/servicesData';
import { Header } from './components/Header';
import { HeroCarousel } from './components/HeroCarousel';
import { ServiceMenu } from './components/ServiceMenu';
import { GoogleReviews } from './components/GoogleReviews';
import { PersonalizedSuggestions } from './components/PersonalizedSuggestions';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { AdminPanel } from './components/AdminPanel';
import { AIChatbot } from './components/AIChatbot';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Logo } from './components/Logo';
import { Phone, Mail, MapPin, ExternalLink, Shield, Sparkles, Heart } from 'lucide-react';

export default function App() {
  // Gender state: defaulted to 'women' with easy toggle
  const [gender, setGender] = useState<Gender>('women');

  // Services list stored with local persistence
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('bt_salon_services');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved services:', e);
      }
    }
    return [...INITIAL_WOMEN_SERVICES, ...INITIAL_MEN_SERVICES];
  });

  // Selected Service IDs for booking cart
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // Ensure selected services starts empty on load
  useEffect(() => {
    localStorage.removeItem('bt_salon_selected_ids');
  }, []);

  // Clear all selected items
  const handleClearAllServices = () => {
    setSelectedServiceIds([]);
  };

  // Appointments log
  const [appointments, setAppointments] = useState<BookingDetails[]>(() => {
    const saved = localStorage.getItem('bt_salon_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved appointments:', e);
      }
    }
    return [];
  });

  // Salon Info
  const [salonInfo, setSalonInfo] = useState<SalonInfo>(DEFAULT_SALON_INFO);

  // Modals visibility
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sync services with central server so owner price edits reflect for all users
  const fetchServerData = async () => {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        if (data.services && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        } else {
          // If server has no store yet, seed the server store with initial default catalog
          const initialCatalog = [...INITIAL_WOMEN_SERVICES, ...INITIAL_MEN_SERVICES];
          fetch('/api/services', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ services: initialCatalog }),
          }).catch(console.error);
        }

        if (data.salonInfo) {
          setSalonInfo(data.salonInfo);
        }
      }
    } catch (e) {
      console.warn('Central server sync unreachable, using local store:', e);
    }
  };

  useEffect(() => {
    fetchServerData();
    // Poll central server every 4 seconds so all clients get real-time price updates
    const interval = setInterval(fetchServerData, 4000);
    return () => clearInterval(interval);
  }, []);

  // Sync services to localStorage & central server when updated by owner
  const handleUpdateServices = (updatedServices: ServiceItem[]) => {
    setServices(updatedServices);
    localStorage.setItem('bt_salon_services', JSON.stringify(updatedServices));

    // Broadcast to central backend
    fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ services: updatedServices }),
    }).catch(console.error);
  };

  // Update Salon Info centrally
  const handleUpdateSalonInfo = (updatedInfo: SalonInfo) => {
    setSalonInfo(updatedInfo);
    fetch('/api/salon-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ salonInfo: updatedInfo }),
    }).catch(console.error);
  };

  // Sync appointments to localStorage
  useEffect(() => {
    localStorage.setItem('bt_salon_appointments', JSON.stringify(appointments));
  }, [appointments]);

  // Toggle single service in cart
  const handleToggleService = (service: ServiceItem) => {
    setSelectedServiceIds((prev) => {
      if (prev.includes(service.id)) {
        return prev.filter((id) => id !== service.id);
      } else {
        return [...prev, service.id];
      }
    });
  };

  // Add bundle of services from AI recommendations
  const handleAddMultipleServices = (bundleServices: ServiceItem[]) => {
    const bundleIds = bundleServices.map((s) => s.id);
    setSelectedServiceIds((prev) => Array.from(new Set([...prev, ...bundleIds])));
  };

  // Remove single service
  const handleRemoveService = (serviceId: string) => {
    setSelectedServiceIds((prev) => prev.filter((id) => id !== serviceId));
  };

  // Selected Services List
  const selectedServicesList = services.filter((s) => selectedServiceIds.includes(s.id));
  const totalAmount = selectedServicesList.reduce((sum, s) => sum + s.price, 0);

  // New Booking Submitted
  const handleBookingSubmitted = (newBooking: BookingDetails) => {
    setAppointments((prev) => [newBooking, ...prev]);
    setSelectedServiceIds([]);
  };

  return (
    <div className="min-h-screen bg-[#0B132B] font-sans text-slate-100 antialiased selection:bg-pink-500 selection:text-white pb-16 md:pb-0">

      {/* Header */}
      <Header
        gender={gender}
        onGenderChange={setGender}
        selectedCount={selectedServiceIds.length}
        totalAmount={totalAmount}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSuggestions={() => setIsSuggestionsOpen(true)}
        onSearchFocus={() => {
          const el = document.getElementById('services-menu');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
              searchInputRef.current?.focus();
            }, 400);
          }
        }}
      />

      {/* Hero Motion Carousel with Gender Choice */}
      <HeroCarousel
        gender={gender}
        onGenderChange={setGender}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenSuggestions={() => setIsSuggestionsOpen(true)}
      />

      {/* Main Services Price Menu Section */}
      <ServiceMenu
        gender={gender}
        onGenderChange={setGender}
        services={services}
        selectedServiceIds={selectedServiceIds}
        onToggleService={handleToggleService}
        onOpenBooking={() => setIsBookingOpen(true)}
        onClearAllServices={handleClearAllServices}
        searchInputRef={searchInputRef}
      />

      {/* Google Reviews & Verified Rating Section */}
      <GoogleReviews />

      {/* AI Package Finder Banner / Quiz Section */}
      <section className="py-12 bg-gradient-to-r from-pink-950/40 via-[#131C31] to-pink-950/40 border-y border-pink-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PersonalizedSuggestions
            gender={gender}
            services={services}
            onAddMultipleServices={handleAddMultipleServices}
          />
        </div>
      </section>

      {/* Contact & Map Directions Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-[#060B19] text-slate-300 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800">

            {/* Left Brand Col */}
            <div className="md:col-span-5 space-y-3">
              <Logo size="lg" className="text-white" />
              <p className="text-slate-400 leading-relaxed max-w-sm mt-2">
                Bloom Theory Salon provides luxury hair styling, L'Oréal/Matrix colours, Keratin, O3+ Hydra Facials, waxing, and nail spas in Secunderabad, Telangana.
              </p>
            </div>

            {/* Middle Contact Col */}
            <div className="md:col-span-4 space-y-2">
              <h4 className="font-serif font-bold text-white text-sm mb-2">Salon Location & Inquiries</h4>
              <p className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <span>Opposite to Star Bazar, 1st Floor, Mahalaxmi Srinivasam, Bapuji Nagar Road, Hyderabad, Secunderabad 500011</span>
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4 text-pink-500 shrink-0" />
                <a href="tel:8977774224" className="hover:text-white font-semibold">+91 8977774224</a>
              </p>
              <p className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 text-pink-500 shrink-0" />
                <a href="mailto:bloomtheorysalon@gmail.com" className="hover:text-white font-semibold">bloomtheorysalon@gmail.com</a>
              </p>
            </div>

            {/* Right Quick Links Col */}
            <div className="md:col-span-3 space-y-2">
              <h4 className="font-serif font-bold text-white text-sm mb-2">Quick Navigation</h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <a href="#" onClick={() => setIsBookingOpen(true)} className="hover:text-pink-400 transition">
                    Book Online Appointment
                  </a>
                </li>
                <li>
                  <a href={salonInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="hover:text-pink-400 transition flex items-center gap-1">
                    Google Maps Directions <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <button onClick={() => setIsAdminOpen(true)} className="hover:text-pink-400 transition flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Salon Admin Portal
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2 text-[11px]">
            <p>© {new Date().getFullYear()} Bloom Theory Salon. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for Bloom Theory Salon
            </p>
          </div>
        </div>
      </footer>

      {/* Booking Modal / Drawer */}
      {isBookingOpen && (
        <BookingModal
          gender={gender}
          onGenderChange={setGender}
          selectedServices={selectedServicesList}
          onRemoveService={handleRemoveService}
          onClose={() => setIsBookingOpen(false)}
          onBookingSubmitted={handleBookingSubmitted}
        />
      )}

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <AdminPanel
          services={services}
          onUpdateServices={handleUpdateServices}
          appointments={appointments}
          onUpdateAppointments={setAppointments}
          salonInfo={salonInfo}
          onUpdateSalonInfo={handleUpdateSalonInfo}
          onClose={() => setIsAdminOpen(false)}
        />
      )}

      {/* Personalized Suggestions Popup Modal */}
      {isSuggestionsOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <PersonalizedSuggestions
            gender={gender}
            services={services}
            onAddMultipleServices={handleAddMultipleServices}
            onClose={() => setIsSuggestionsOpen(false)}
          />
        </div>
      )}

      {/* AI Chatbot Floating Widget */}
      <AIChatbot
        gender={gender}
        onSelectService={handleToggleService}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        gender={gender}
        onGenderChange={setGender}
        selectedCount={selectedServiceIds.length}
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenSuggestions={() => setIsSuggestionsOpen(true)}
      />

    </div>
  );
}
