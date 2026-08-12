import React, { useState } from 'react';
import { Logo } from './Logo';
import { Gender } from '../types';
import { Phone, Calendar, Search, Shield, Sparkles, Menu, X, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  gender: Gender;
  onGenderChange: (gender: Gender) => void;
  selectedCount: number;
  totalAmount: number;
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenSuggestions: () => void;
  onSearchFocus: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  gender,
  onGenderChange,
  selectedCount,
  totalAmount,
  onOpenBooking,
  onOpenAdmin,
  onOpenSuggestions,
  onSearchFocus,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-b border-pink-500/20 text-white transition-all shadow-md">
      {/* Top Editorial Banner */}
      <div className="bg-[#060B19] text-slate-300 text-[10px] sm:text-[11px] py-1.5 px-4 text-center font-medium tracking-widest uppercase flex items-center justify-center gap-2 border-b border-pink-500/10">
        <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
        <span>Bespoke Grooming & Beauty Sanctuary • Hyderabad & Secunderabad</span>
        <span className="hidden sm:inline-block">• Direct Concierge: <strong className="text-pink-400">+91 8977774224</strong></span>
        <a
          href="tel:8977774224"
          className="ml-2 bg-pink-600 hover:bg-pink-700 text-white text-[9px] px-2.5 py-0.5 rounded-full font-bold transition-all shadow-xs"
        >
          Call Salon
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="hover:opacity-90 transition">
            <Logo size="md" />
          </a>

          {/* Action Navigation */}
          <div className="hidden lg:flex items-center gap-4 text-[11px] font-semibold uppercase tracking-widest">
            <button
              onClick={onSearchFocus}
              className="flex items-center gap-2 text-slate-200 bg-[#131C31] hover:bg-[#1E293B] px-3.5 py-2 rounded-full border border-pink-500/30 transition"
            >
              <Search className="w-3.5 h-3.5 text-pink-400" />
              <span className="normal-case tracking-normal text-xs text-slate-400">Search menu...</span>
            </button>

            <button
              onClick={onOpenSuggestions}
              className="flex items-center gap-1.5 text-pink-300 bg-pink-950/60 hover:bg-pink-900/80 px-4 py-2 rounded-full border border-pink-500/40 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>AI Package Finder</span>
            </button>

            <a
              href="tel:8977774224"
              className="flex items-center gap-1.5 text-slate-200 hover:text-pink-400 px-2 py-2 transition tracking-wider"
            >
              <Phone className="w-3.5 h-3.5 text-pink-400" />
              <span className="font-bold">8977774224</span>
            </a>

            {/* Appointment Booking Button */}
            <button
              onClick={onOpenBooking}
              className="relative flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-full font-bold text-[11px] uppercase tracking-widest shadow-md shadow-pink-500/20 hover:shadow-lg transition-all active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
              {selectedCount > 0 && (
                <span className="ml-1 bg-white text-pink-700 text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                  {selectedCount} • ₹{totalAmount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenAdmin}
              title="Owner Admin Access"
              className="text-slate-400 hover:text-pink-400 p-2 rounded-full hover:bg-white/10 transition"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Booking Drawer trigger */}
            <button
              onClick={onOpenBooking}
              className="relative bg-pink-600 text-white p-2 rounded-full shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              {selectedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {selectedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-200 hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-pink-500/30 px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200 text-white">
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                onOpenSuggestions();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-pink-950/60 text-pink-300 p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider border border-pink-500/40"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              AI Package Finder
            </button>

            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 bg-pink-600 text-white p-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm"
            >
              <Calendar className="w-4 h-4" />
              Book Slot ({selectedCount})
            </button>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
            <a href="tel:8977774224" className="flex items-center gap-1.5 font-bold text-white">
              <Phone className="w-3.5 h-3.5 text-pink-400" />
              8977774224
            </a>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider"
            >
              <Shield className="w-3.5 h-3.5" />
              Owner Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


