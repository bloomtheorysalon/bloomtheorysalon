import React, { useState } from 'react';
import { Star, ExternalLink, ThumbsUp, CheckCircle2, MessageSquare, Sparkles, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=bloom+theory+salon&sxsrf=APpeQnssAM9J8vcC98FpPqDrFnkNnGG1bA%3A1786379550267#lrd=0x3bcb9b797e20e4f1:0xa0c259f326827392,1,,,,";

interface Review {
  id: string;
  author: string;
  avatarColor: string;
  rating: number;
  timeAgo: string;
  serviceCategory: 'Hair' | 'Facial' | 'Grooming' | 'Spa';
  text: string;
  photos?: string[];
  likesCount: number;
}

const REVIEWS_DATA: Review[] = [
  {
    id: 'r1',
    author: 'Pravalika K.',
    avatarColor: 'bg-pink-500',
    rating: 5,
    timeAgo: '1 week ago',
    serviceCategory: 'Facial',
    text: 'Extremely happy with my O3+ Hydra Facial and hair spa at Bloom Theory! The staff in Secunderabad is so polite and skilled. My skin feels incredibly smooth and hydrated. High hygiene standards and beautiful salon vibe!',
    likesCount: 14,
  },
  {
    id: 'r2',
    author: 'Rohan Verma',
    avatarColor: 'bg-rose-600',
    rating: 5,
    timeAgo: '2 weeks ago',
    serviceCategory: 'Grooming',
    text: 'Best unisex salon near Star Bazar Bapuji Nagar. Got a fade haircut, beard shaping, and hair coloring done. Exceptional precision by the senior hair stylist. Transparent pricing with no hidden charges.',
    likesCount: 9,
  },
  {
    id: 'r3',
    author: 'Sushma Reddy',
    avatarColor: 'bg-fuchsia-600',
    rating: 5,
    timeAgo: '3 weeks ago',
    serviceCategory: 'Hair',
    text: 'Got Keratin hair smoothening and global highlights done here. The transformation was mindblowing! Hair feels super soft and shiny. Truly the best hair artistry salon in Secunderabad.',
    likesCount: 21,
  },
  {
    id: 'r4',
    author: 'Ananya Sharma',
    avatarColor: 'bg-pink-600',
    rating: 5,
    timeAgo: '1 month ago',
    serviceCategory: 'Spa',
    text: 'Loved their manicure, pedicure and waxing services! Very gentle, clean instruments, and hospitable team. Easy WhatsApp appointment booking without waiting time.',
    likesCount: 12,
  },
  {
    id: 'r5',
    author: 'Vikram Raj',
    avatarColor: 'bg-rose-500',
    rating: 5,
    timeAgo: '1 month ago',
    serviceCategory: 'Grooming',
    text: 'Top quality men\'s grooming sanctuary. Very prompt service, great ambiance with relaxing music, and super reasonable packages. Highly recommend Bloom Theory!',
    likesCount: 8,
  },
  {
    id: 'r6',
    author: 'Pooja Hegde',
    avatarColor: 'bg-[#DB2777]',
    rating: 5,
    timeAgo: '2 months ago',
    serviceCategory: 'Facial',
    text: 'Their Gold Glow facial and D-Tan removal is unmatched in Hyderabad. Left the salon with an amazing glow. Will definitely be a regular customer here!',
    likesCount: 18,
  },
];

export const GoogleReviews: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredReviews = REVIEWS_DATA.filter((review) => {
    if (activeFilter === 'All') return true;
    return review.serviceCategory === activeFilter;
  });

  return (
    <section className="py-14 lg:py-20 bg-[#0B132B] text-white overflow-hidden relative border-t border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-pink-950/60 text-pink-300 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] mb-3 border border-pink-500/40 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Google Verified Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif italic text-white tracking-tight">
            Client Impressions & Stories
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 font-light leading-relaxed">
            Read authentic reviews from guests who experienced hair transformation, skin rejuvenation, and bespoke pampering at Bloom Theory Salon.
          </p>
        </motion.div>

        {/* Google Score Banner Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-[#131C31] p-6 sm:p-8 rounded-3xl border border-pink-500/30 shadow-xl max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-5">
            {/* Google G Emblem */}
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0 border border-pink-500/30">
              <span className="text-pink-400">G</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold text-white">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 inline" />
                Based on <strong className="text-white">120+ Google Customer Reviews</strong> in Secunderabad
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full shadow-lg shadow-pink-500/20 transition-all hover:scale-102 active:scale-95"
            >
              <span>Write a Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-pink-950/60 hover:bg-pink-900/80 text-pink-300 border border-pink-500/40 text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-full transition"
            >
              <span>View Google Business</span>
            </a>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {['All', 'Hair', 'Facial', 'Grooming', 'Spa'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeFilter === cat
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-500/20'
                  : 'bg-[#131C31] text-slate-300 hover:bg-pink-950/60 hover:text-pink-200 border border-pink-500/20'
              }`}
            >
              {cat === 'All' ? 'All Reviews (120+)' : `${cat} Care`}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredReviews.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-[#131C31] p-6 rounded-3xl border border-pink-500/20 shadow-md hover:shadow-xl hover:border-pink-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Author Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${rev.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-xs`}>
                        {rev.author[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-white text-sm">{rev.author}</h4>
                          <span className="text-[10px] bg-pink-950/70 text-pink-300 font-bold px-1.5 py-0.2 rounded border border-pink-500/30">
                            Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 font-light">{rev.timeAgo} on Google</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-pink-300 bg-pink-950/70 px-2.5 py-1 rounded-full border border-pink-500/30">
                      {rev.serviceCategory}
                    </span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-light italic">
                    "{rev.text}"
                  </p>
                </div>

                {/* Footer helpful badge */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1 text-slate-300 font-medium">
                    <ThumbsUp className="w-3.5 h-3.5 text-pink-400" />
                    Helpful review ({rev.likesCount})
                  </span>
                  <a
                    href={GOOGLE_REVIEWS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-pink-400 font-bold hover:underline flex items-center gap-1"
                  >
                    Google <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom Callout */}
        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-pink-300 hover:text-white bg-[#131C31] hover:bg-[#1E293B] px-6 py-3 rounded-full border border-pink-500/30 shadow-sm transition"
          >
            <MessageSquare className="w-4 h-4 text-pink-400" />
            <span>Read all 120+ Google Reviews on Google Search</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
