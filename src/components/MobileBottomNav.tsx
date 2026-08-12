import React from 'react';
import { Gender } from '../types';
import { Phone, Calendar, Sparkles, Menu, User } from 'lucide-react';

interface MobileBottomNavProps {
  gender: Gender;
  onGenderChange: (gender: Gender) => void;
  selectedCount: number;
  onOpenBooking: () => void;
  onOpenSuggestions: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  gender,
  onGenderChange,
  selectedCount,
  onOpenBooking,
  onOpenSuggestions,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-t border-pink-500/20 py-2.5 px-4 flex items-center justify-around md:hidden shadow-lg">
      <button
        onClick={() => {
          const el = document.getElementById('services-menu');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-white text-[9px] font-bold uppercase tracking-wider"
      >
        <Menu className="w-5 h-5 text-pink-400" />
        <span>Menu</span>
      </button>

      <button
        onClick={onOpenSuggestions}
        className="flex flex-col items-center gap-0.5 text-pink-400 text-[9px] font-bold uppercase tracking-wider"
      >
        <Sparkles className="w-5 h-5 text-pink-400" />
        <span>Packages</span>
      </button>

      {/* Main Booking Action */}
      <button
        onClick={onOpenBooking}
        className="relative bg-pink-600 text-white p-3.5 rounded-full shadow-lg shadow-pink-500/30 -mt-5 border-2 border-[#0B132B] flex items-center justify-center hover:bg-pink-700 transition"
      >
        <Calendar className="w-5 h-5" />
        {selectedCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-pink-950 text-pink-200 text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs border border-pink-500/40">
            {selectedCount}
          </span>
        )}
      </button>

      <a
        href="tel:8977774224"
        className="flex flex-col items-center gap-0.5 text-slate-300 hover:text-white text-[9px] font-bold uppercase tracking-wider"
      >
        <Phone className="w-5 h-5 text-slate-300" />
        <span>Call</span>
      </a>

      {/* Quick Gender Switcher Pill */}
      <button
        onClick={() => onGenderChange(gender === 'men' ? 'women' : 'men')}
        className="flex flex-col items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider bg-pink-950/80 px-2.5 py-1 rounded-xl border border-pink-500/30 shadow-2xs"
      >
        <User className="w-4 h-4 text-pink-400" />
        <span className="capitalize text-[8px] font-bold text-pink-300">{gender}</span>
      </button>
    </div>
  );
};


