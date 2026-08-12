import React, { useState } from 'react';
import { Gender, ServiceItem } from '../types';
import { Sparkles, CheckCircle2, X, Layers } from 'lucide-react';

interface PersonalizedSuggestionsProps {
  gender: Gender;
  services: ServiceItem[];
  onAddMultipleServices: (services: ServiceItem[]) => void;
  onClose?: () => void;
}

export const PersonalizedSuggestions: React.FC<PersonalizedSuggestionsProps> = ({
  gender,
  services,
  onAddMultipleServices,
  onClose,
}) => {
  const [goal, setGoal] = useState<string>('');
  const [concern, setConcern] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  const genderServices = services.filter((s) => s.gender === gender);

  // Recommendations Logic
  const getRecommendedPackage = () => {
    if (!goal) return [];

    let matched: ServiceItem[] = [];

    if (gender === 'men') {
      if (goal === 'glow') {
        // Facial + D-Tan
        matched = genderServices.filter(s =>
          s.name.includes('Gold Facial') ||
          s.name.includes('Advance Face D-Tan') ||
          s.name.includes('Hair Cut')
        );
      } else if (goal === 'hair-repair') {
        // Hair Spa + Dandruff / Keratin
        matched = genderServices.filter(s =>
          s.name.includes('Matrix Hair Spa') ||
          s.name.includes('Dandruff Hair Treatment') ||
          s.name.includes('Hair Wash')
        );
      } else if (goal === 'grooming') {
        // Haircut + Beard Trim + Head Massage
        matched = genderServices.filter(s =>
          s.name.includes('Hair Cut') ||
          s.name.includes('Beard Trim') ||
          s.name.includes('Head Massage (with Hair Wash)')
        );
      } else {
        // Bridal / Party
        matched = genderServices.filter(s =>
          s.name.includes('O₃+ Facial (Bridal / Groom Facial)') ||
          s.name.includes('Party Makeup') ||
          s.name.includes('Advance Face D-Tan')
        );
      }
    } else {
      // Women
      if (goal === 'glow') {
        // O3+ Facial / Hydra + D-Tan
        matched = genderServices.filter(s =>
          s.name.includes('Hydra Facial') ||
          s.name.includes('Advance Face D-Tan') ||
          s.name.includes('Eye-Brows')
        );
      } else if (goal === 'hair-repair') {
        // Hair Spa / Keratin
        matched = genderServices.filter(s =>
          s.name.includes('L\'Oréal Hair Spa') ||
          s.name.includes('Anti-Hair Fall Treatment') ||
          s.name.includes('Advance Cut')
        );
      } else if (goal === 'grooming') {
        // Pedicure + Manicure + Threading
        matched = genderServices.filter(s =>
          s.name.includes('O₃+ Pedicure') ||
          s.name.includes('D-Tan Manicure') ||
          s.name.includes('Eye-Brows')
        );
      } else {
        // Bridal / Party
        matched = genderServices.filter(s =>
          s.name.includes('O₃+ Facial (Bridal Facial)') ||
          s.name.includes('Advance Makeup') ||
          s.name.includes('Balayage Hair Color')
        );
      }
    }

    return matched.slice(0, 3);
  };

  const recommendedServices = getRecommendedPackage();
  const packageTotal = recommendedServices.reduce((sum, s) => sum + s.price, 0);

  const handleApplyPackage = () => {
    onAddMultipleServices(recommendedServices);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="bg-[#0F172A] rounded-3xl p-6 sm:p-8 border border-pink-500/30 shadow-xl relative max-w-2xl mx-auto text-white">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="inline-flex items-center gap-2 text-[10px] font-bold text-pink-300 uppercase tracking-[0.2em] bg-pink-950/60 px-3.5 py-1 rounded-full mb-3 border border-pink-500/40">
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        Salon Concierge AI Consultant
      </div>

      <h3 className="text-2xl sm:text-3xl font-serif italic text-white">
        Personalized Service Recommendations
      </h3>
      <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light leading-relaxed">
        Select your main grooming goal to curate a customized bundle for skin, hair & event styling.
      </p>

      {/* Step 1: Goal */}
      <div className="mt-6 space-y-2">
        <label className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] block">
          1. What is your primary care focus today?
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          {[
            { id: 'glow', label: 'Skin Glow & De-Tan Rituals', desc: 'Hydra facial, whitening & radiance' },
            { id: 'hair-repair', label: 'Hair Repair & Nourishment', desc: 'Hair spa, Keratin & anti-frizz therapy' },
            { id: 'grooming', label: 'Classic Pampering Package', desc: 'Precision cut, spa mani & pedi' },
            { id: 'bridal', label: 'Celebration & Event Styling', desc: 'O3+ facial, HD makeup & styling' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setGoal(item.id)}
              className={`p-3.5 text-left rounded-2xl border text-xs transition-all ${
                goal === item.id
                  ? 'border-pink-500 bg-[#1E293B] text-white font-bold shadow-xs'
                  : 'border-pink-500/20 bg-[#131C31] text-slate-300 hover:border-pink-500/40'
              }`}
            >
              <div className="font-serif italic text-sm text-white">{item.label}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 font-light">{item.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Specific concern */}
      {goal && (
        <div className="mt-5 space-y-2 animate-in fade-in duration-300">
          <label className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] block">
            2. Any specific concern or occasion?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Sun Tan / Dullness', 'Dandruff / Frizz', 'Special Celebration'].map((c) => (
              <button
                key={c}
                onClick={() => setConcern(c)}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center border transition ${
                  concern === c
                    ? 'border-pink-500 bg-pink-600 text-white'
                    : 'border-pink-500/20 bg-[#131C31] text-slate-300 hover:bg-[#1E293B]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result Recommendation Card */}
      {goal && recommendedServices.length > 0 && (
        <div className="mt-6 bg-[#131C31] p-5 rounded-2xl border border-pink-500/30 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-pink-400" />
              Curated Bundle for You:
            </span>
            <span className="text-sm font-bold text-white">
              Total: ₹{packageTotal.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-2 my-3">
            {recommendedServices.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between bg-[#1E293B] p-3 rounded-xl text-xs border border-pink-500/20"
              >
                <div>
                  <span className="font-serif italic text-sm text-white block">{service.name}</span>
                  <span className="text-[10px] text-slate-400 font-light">{service.category}</span>
                </div>
                <span className="font-bold text-pink-400">₹{service.price}</span>
              </div>
            ))}
          </div>

          <button
            onClick={handleApplyPackage}
            disabled={addedSuccess}
            className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl shadow-md transition active:scale-98"
          >
            {addedSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                Curated Bundle Added to Appointment!
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Add Curated Bundle (₹{packageTotal})
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

