import React, { useState, useEffect } from 'react';
import { Gender } from '../types';
import { Calendar, Sparkles, MapPin, ArrowRight, ShieldCheck, Clock, Scissors, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Imported generated luxury salon assets
import heroSalonImg from '../assets/images/bloom_hero_salon_1786385812325.jpg';
import hairStylingImg from '../assets/images/hair_styling_motion_1786385828546.jpg';
import facialSpaImg from '../assets/images/luxury_facial_treatment_1786385845111.jpg';

interface HeroCarouselProps {
  gender: Gender;
  onGenderChange: (gender: Gender) => void;
  onOpenBooking: () => void;
  onOpenSuggestions: () => void;
}

const HERO_SLIDES = [
  {
    image: heroSalonImg,
    title: "Where Bespoke Beauty Meets Perfection",
    subtitle: "Experience luxury hair styling, glowing facials, rejuvenating spa treatments & bridal makeup at Bloom Theory Sanctuary.",
    tag: "Editorial Salon & Spa"
  },
  {
    image: hairStylingImg,
    title: "Master Hair Artistry & Couture Colour",
    subtitle: "Precision haircuts, Matrix & L'Oréal global colors, Balayage, Keratin, and anti-frizz smoothening.",
    tag: "Hair Perfection"
  },
  {
    image: facialSpaImg,
    title: "Radiant Skin & Hydrating Rituals",
    subtitle: "Botanical elixir facials, Gold & Pearl treatments, O3+ Hydra facial therapy & instant glow clean-ups.",
    tag: "Aesthetic Skincare"
  }
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  gender,
  onGenderChange,
  onOpenBooking,
  onOpenSuggestions,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-slate-950 text-white overflow-hidden min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* Background Motion Image Slideshow with Ken-Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 0.42, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${HERO_SLIDES[currentSlide].image})` }}
        />
      </AnimatePresence>

      {/* Subtle Dark Gradient Vignette Overlays with Pink Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-pink-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Slide Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-pink-500/20 backdrop-blur-md border border-pink-500/40 text-pink-300 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.25em]"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>{HERO_SLIDES[currentSlide].tag}</span>
            </motion.div>

            {/* Main Animated Serif Title */}
            <motion.h1 
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white leading-[1.15] tracking-tight"
            >
              {HERO_SLIDES[currentSlide].title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              key={`sub-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              {HERO_SLIDES[currentSlide].subtitle}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-xl shadow-pink-600/30 transition-all hover:scale-102 active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenSuggestions}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-widest px-7 py-4 rounded-full transition"
              >
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>AI Service Finder</span>
              </button>
            </motion.div>

            {/* Location & Hours Pill */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 pt-4 border-t border-white/10"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                <span>Opp. Star Bazar, Bapuji Nagar Rd, Secunderabad</span>
              </span>
              <span className="hidden sm:inline text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pink-400" />
                <span>Open Daily 8:30 AM - 11:00 PM</span>
              </span>
            </motion.div>
          </div>

          {/* Right Column: Gender Selection Card with Framer Motion Entrance */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-[#0F172A]/95 backdrop-blur-md rounded-3xl p-6 sm:p-7 text-white shadow-2xl border border-pink-500/30 relative">
              <div className="text-center pb-4 border-b border-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-pink-300 bg-pink-950/60 px-3.5 py-1 rounded-full border border-pink-500/40">
                  Step 1: Choose Menu
                </span>
                <h3 className="text-2xl font-serif italic text-white mt-2.5">
                  Select Menu Category
                </h3>
                <p className="text-xs text-slate-300 mt-1 font-light">
                  View tailored salon services, treatment prices & instant online slots
                </p>
              </div>

              {/* Gender Choice Grid */}
              <div className="grid grid-cols-2 gap-4 my-6">
                {/* Men Card */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onGenderChange('men')}
                  className={`relative flex flex-col items-center p-5 rounded-2xl border-2 transition-all text-center group ${
                    gender === 'men'
                      ? 'border-pink-500 bg-slate-900 text-white shadow-lg shadow-pink-500/10'
                      : 'border-slate-800 bg-[#131C31] hover:border-slate-600 text-white'
                  }`}
                >
                  <div className="p-2.5 rounded-full bg-slate-800 text-pink-400 mb-2 group-hover:scale-110 transition-transform">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-lg">Gentlemen</span>
                  <span className={`text-[11px] mt-1 font-light ${gender === 'men' ? 'text-slate-300' : 'text-slate-400'}`}>
                    Haircuts, Beards, Spas & Facials
                  </span>
                  {gender === 'men' && (
                    <span className="mt-3 text-[9px] uppercase font-bold tracking-widest bg-pink-600 text-white px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </motion.button>

                {/* Women Card */}
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onGenderChange('women')}
                  className={`relative flex flex-col items-center p-5 rounded-2xl border-2 transition-all text-center group ${
                    gender === 'women'
                      ? 'border-pink-500 bg-pink-600 text-white shadow-lg shadow-pink-500/20'
                      : 'border-slate-800 bg-[#131C31] hover:border-pink-500/50 text-white'
                  }`}
                >
                  <div className="p-2.5 rounded-full bg-pink-500 text-white mb-2 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="font-serif italic text-lg">Ladies</span>
                  <span className={`text-[11px] mt-1 font-light ${gender === 'women' ? 'text-pink-100' : 'text-slate-400'}`}>
                    Hair Spas, O3+ Facials, Waxing & Nails
                  </span>
                  {gender === 'women' && (
                    <span className="mt-3 text-[9px] uppercase font-bold tracking-widest bg-slate-900 text-white px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Guarantees */}
              <div className="bg-[#131C31] p-3.5 rounded-2xl flex items-center justify-between text-xs text-slate-200 border border-pink-500/20">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-pink-400" />
                  WhatsApp Direct Booking
                </span>
                <span className="font-bold text-pink-400">+91 8977774224</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-pink-500' : 'w-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};


