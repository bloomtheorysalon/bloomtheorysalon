import React from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ExternalLink, MessageCircle } from 'lucide-react';
import { DEFAULT_SALON_INFO } from '../data/servicesData';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact-section" className="py-16 bg-[#0B132B] text-white border-t border-pink-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-pink-950/60 text-pink-300 text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-[0.2em] mb-2 border border-pink-500/40">
            <MapPin className="w-3.5 h-3.5 text-pink-400" />
            <span>Visit Our Sanctuary</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif italic text-white">
            Location & Concierge Direct Contact
          </h2>
          <p className="text-slate-300 text-sm mt-2 font-light">
            Conveniently situated opposite Star Bazar on Bapuji Nagar Road, Secunderabad. Walk-ins & reservations welcome.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Cards: Address, Phone, Email, Hours */}
          <div className="lg:col-span-5 space-y-4">

            {/* Address Card */}
            <div className="bg-[#131C31] p-6 rounded-3xl border border-pink-500/20 hover:border-pink-500/50 transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif italic text-white font-bold text-lg">Salon Address</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1 font-medium">
                    Opposite to Star Bazar, 1st Floor, Mahalaxmi Srinivasam, Bapuji Nagar Road, Secunderabad, Telangana 500011
                  </p>
                  <a
                    href={DEFAULT_SALON_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-pink-400 hover:text-pink-300 mt-3 group"
                  >
                    <span>Open Directions in Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-[#131C31] p-6 rounded-3xl border border-pink-500/20 hover:border-pink-500/50 transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm border border-pink-500/20">
                  <Phone className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-serif italic text-white font-bold text-lg">Phone & WhatsApp Direct</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-light">Call or chat for instant slot reservation</p>
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <a
                      href="tel:8977774224"
                      className="text-base font-bold text-white hover:text-pink-400"
                    >
                      +91 8977774224
                    </a>
                    <a
                      href="https://wa.me/918977774224"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#25D366] hover:bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-xs transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      WhatsApp Chat
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-[#131C31] p-6 rounded-3xl border border-pink-500/20 hover:border-pink-500/50 transition">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif italic text-white font-bold text-lg">Email Inquiries</h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-light">For corporate, bridal packages & feedback</p>
                  <a
                    href="mailto:bloomtheorysalon@gmail.com"
                    className="text-sm font-bold text-white hover:text-pink-400 block mt-2"
                  >
                    bloomtheorysalon@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-[#131C31] p-6 rounded-3xl border border-pink-500/20">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm border border-pink-500/20">
                  <Clock className="w-5 h-5 text-pink-400" />
                </div>
                <div>
                  <h3 className="font-serif italic text-white font-bold text-lg">Operating Hours</h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    Monday – Sunday: <strong className="text-white">8:30 AM – 11:00 PM</strong>
                  </p>
                  <span className="inline-block mt-2 text-[9px] uppercase font-bold tracking-widest text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                    Open All 7 Days
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Integration */}
          <div className="lg:col-span-7 bg-[#131C31] rounded-3xl p-3 border border-pink-500/20 shadow-lg relative min-h-[420px] flex flex-col justify-between overflow-hidden">
            <iframe
              title="Bloom Theory Salon Google Map"
              src="https://maps.google.com/maps?q=17.4688717,78.4817184&z=17&output=embed"
              className="w-full h-80 sm:h-96 rounded-2xl border-0 shadow-inner"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            <div className="bg-[#0F172A] p-4 rounded-2xl mt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border border-pink-500/20">
              <div>
                <h4 className="font-serif italic font-bold text-white text-base">
                  Bloom Theory Salon
                </h4>
                <p className="text-xs text-slate-300">
                  Opposite to Star Bazar, 1st Floor, Mahalaxmi Srinivasam, Secunderabad
                </p>
              </div>

              <a
                href={DEFAULT_SALON_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-widest px-5 py-3 rounded-xl shadow-md transition"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};


