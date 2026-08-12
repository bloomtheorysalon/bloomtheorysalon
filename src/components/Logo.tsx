import React from 'react';
import logoImg from '../assets/images/bloom_theory_logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { box: 'w-10 h-10', text: 'text-lg' },
    md: { box: 'w-12 h-12', text: 'text-2xl' },
    lg: { box: 'w-16 h-16', text: 'text-3xl' },
    xl: { box: 'w-24 h-24', text: 'text-4xl' },
  };

  const dim = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Exact Logo Emblem from attached image: Black square background with hot pink TBO monogram & white S-scissors */}
      <div className={`${dim.box} shrink-0 bg-black rounded-2xl overflow-hidden shadow-md flex items-center justify-center relative border border-pink-500/40 group hover:border-pink-500/70 transition-all`}>
        <img
          src={logoImg}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/logo.png';
          }}
          alt="Bloom Theory Logo"
          className="w-full h-full object-cover select-none"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`font-serif italic font-bold tracking-tight text-pink-400 ${dim.text}`}>
            Bloom Theory
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-pink-200/80 mt-1">
            Unisex Salon & Beauty Sanctuary
          </span>
        </div>
      )}
    </div>
  );
};



