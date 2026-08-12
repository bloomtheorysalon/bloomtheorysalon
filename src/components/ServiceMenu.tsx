import React, { useState, useMemo } from 'react';
import { ServiceItem, Gender } from '../types';
import { Search, Plus, Check, Sparkles, Clock, Tag, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceMenuProps {
  gender: Gender;
  onGenderChange: (gender: Gender) => void;
  services: ServiceItem[];
  selectedServiceIds: string[];
  onToggleService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
  onClearAllServices?: () => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export const ServiceMenu: React.FC<ServiceMenuProps> = ({
  gender,
  onGenderChange,
  services,
  selectedServiceIds,
  onToggleService,
  onOpenBooking,
  onClearAllServices,
  searchInputRef,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter services by gender first
  const genderServices = useMemo(() => {
    return services.filter((s) => s.gender === gender && s.available !== false);
  }, [services, gender]);

  // Extract unique categories for current gender
  const categories = useMemo(() => {
    const cats = Array.from(new Set(genderServices.map((s) => s.category)));
    return ['All', ...cats];
  }, [genderServices]);

  // Filter services by search term and category
  const filteredServices = useMemo(() => {
    return genderServices.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [genderServices, searchTerm, selectedCategory]);

  // Selected total price and count
  const selectedServicesList = useMemo(() => {
    return services.filter((s) => selectedServiceIds.includes(s.id));
  }, [services, selectedServiceIds]);

  const totalAmount = useMemo(() => {
    return selectedServicesList.reduce((sum, s) => sum + s.price, 0);
  }, [selectedServicesList]);

  return (
    <section id="services-menu" className="py-14 lg:py-20 bg-[#0B132B] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-pink-950/60 text-pink-300 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.25em] mb-3 border border-pink-500/40">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Editorial Price Menu & Rituals</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            Services & Transparent Pricing
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Select treatments below to curate your personalized sanctuary session. Confirm online for direct WhatsApp reservation.
          </p>
        </motion.div>

        {/* Gender Selection Bar */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#131C31] p-1.5 rounded-full border border-pink-500/30 shadow-xs flex items-center gap-2 max-w-md w-full">
            <button
              onClick={() => {
                onGenderChange('men');
                setSelectedCategory('All');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                gender === 'men'
                  ? 'bg-slate-900 text-white shadow-md border border-pink-500/40'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Gentlemen's Menu</span>
            </button>
            <button
              onClick={() => {
                onGenderChange('women');
                setSelectedCategory('All');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                gender === 'women'
                  ? 'bg-pink-600 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Ladies' Menu</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Quick Category Filter */}
        <div className="bg-[#131C31] p-5 rounded-3xl border border-pink-500/30 shadow-sm mb-10 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${gender === 'men' ? "Gentlemen's" : "Ladies'"} services (e.g. Haircut, O3+ Facial, Keratin, Waxing, D-Tan)...`}
              className="w-full pl-11 pr-10 py-3.5 bg-[#1E293B] border border-pink-500/20 rounded-2xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 transition font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none pt-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'bg-[#1E293B] text-slate-300 hover:bg-pink-950/60 hover:text-pink-200 border border-pink-500/20'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Services List Grid */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-[#131C31] rounded-3xl border border-pink-500/30 p-8">
            <Tag className="w-10 h-10 text-pink-400 mx-auto mb-3" />
            <h3 className="text-xl font-serif italic text-white">No Matching Rituals Found</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
              We couldn't find any services matching "{searchTerm}". Try clearing your search or exploring other categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="mt-5 bg-pink-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${gender}-${selectedCategory}-${searchTerm}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            >
              {filteredServices.map((service, idx) => {
                const isSelected = selectedServiceIds.includes(service.id);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className={`relative flex flex-col justify-between p-6 rounded-3xl border transition-all duration-200 bg-[#131C31] ${
                      isSelected
                        ? 'border-pink-500 ring-2 ring-pink-500/30 shadow-lg shadow-pink-500/10'
                        : 'border-pink-500/20 hover:border-pink-500/50 hover:shadow-md'
                    }`}
                  >
                    <div>
                      {/* Category & Popular Tag */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-pink-300 bg-pink-950/70 px-3 py-0.5 rounded-full border border-pink-500/30">
                          {service.category}
                        </span>
                        {service.popular && (
                          <span className="text-[9px] uppercase tracking-widest font-bold text-pink-300 bg-pink-950/70 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-pink-500/30">
                            <Sparkles className="w-3 h-3 text-pink-400" />
                            Signature Ritual
                          </span>
                        )}
                      </div>

                      {/* Service Name with Editorial Serif */}
                      <h3 className="text-lg font-serif italic font-medium text-white leading-snug">
                        {service.name}
                      </h3>

                      {/* Description if available */}
                      {service.description && (
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed font-light">
                          {service.description}
                        </p>
                      )}

                      {/* Duration badge */}
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-3 font-medium">
                        <Clock className="w-3.5 h-3.5 text-pink-400" />
                        <span>Duration: approx. {service.durationMinutes || 30} mins</span>
                      </div>
                    </div>

                    {/* Price & Selection Button with Dotted Leader */}
                    <div className="pt-4 mt-5 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Price</span>
                          <span className="text-xl font-bold text-pink-400">
                            ₹{service.price.toLocaleString('en-IN')}
                          </span>
                        </div>

                        <button
                          onClick={() => onToggleService(service)}
                          className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all active:scale-95 ${
                            isSelected
                              ? 'bg-pink-600 text-white shadow-sm'
                              : 'bg-pink-950/80 text-pink-300 hover:bg-pink-600 hover:text-white border border-pink-500/40'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              Added
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              Add Ritual
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

      </div>

      {/* Floating Bottom Sticky Bar when services are selected */}
      {selectedServiceIds.length > 0 && (
        <div className="fixed bottom-16 sm:bottom-6 left-4 right-4 max-w-xl mx-auto z-30 animate-in slide-in-from-bottom duration-300">
          <div className="bg-slate-900 text-white p-4 rounded-3xl shadow-2xl border border-pink-500/40 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                {selectedServiceIds.length}
              </div>
              <div>
                <span className="text-[10px] text-slate-300 block uppercase tracking-widest font-bold">
                  Appointment Total
                </span>
                <span className="text-xl font-bold text-white">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onClearAllServices && (
                <button
                  onClick={onClearAllServices}
                  className="px-3 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-bold transition"
                  title="Clear all selected services"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95"
              >
                <span>Confirm & Book</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

