import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot, User, Check, RefreshCw, Volume2, VolumeX, Plus, Calendar, MapPin, Phone, SlidersHorizontal, ChevronRight, ShoppingBag, ExternalLink } from 'lucide-react';
import { AIChatMessage, ServiceItem } from '../types';

interface AIChatbotProps {
  gender: string;
  onSelectService?: (service: ServiceItem) => void;
  onOpenBooking?: () => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({ gender, onSelectService, onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I'm Bloom, your AI Beauty & Hair Consultant. I can recommend personalized hair treatments, facials, bridal care, and pricing for Bloom Theory Salon!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedFollowups: [
        'Recommended Facials for Glow',
        'Haircut & Keratin Rates',
        'Gentlemen Grooming Combo',
        'Salon Location & Timing'
      ],
      recommendedServices: [
        { id: 'w-fa-8', name: 'O₃+ Facial (Bridal / Whitening)', price: 4000, category: 'Facial', gender: 'women', popular: true, durationMinutes: 75, description: 'Deep whitening & glowing peel-off mask.' },
        { id: 'w-ht-3', name: 'Keratin Hair Treatment', price: 4000, category: 'Hair Treatment', gender: 'women', popular: true, durationMinutes: 120, description: 'Frizz-free silk smooth tresses lasting up to 4 months.' }
      ]
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [selectedCategoryQuiz, setSelectedCategoryQuiz] = useState<string | null>(null);
  const [addedServiceIds, setAddedServiceIds] = useState<string[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, loading]);

  const handleSpeech = (msgId: string, text: string) => {
    if ('speechSynthesis' in window) {
      if (speakingMsgId === msgId) {
        window.speechSynthesis.cancel();
        setSpeakingMsgId(null);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.onend = () => setSpeakingMsgId(null);
        utterance.onerror = () => setSpeakingMsgId(null);
        setSpeakingMsgId(msgId);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleAddServiceToCart = (service: ServiceItem) => {
    if (onSelectService) {
      onSelectService(service);
      setAddedServiceIds(prev => [...prev, service.id]);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || loading) return;

    const userMsg: AIChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages,
          gender,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch reply');
      }

      const data = await response.json();
      const assistantMsg: AIChatMessage = {
        id: 'msg-ans-' + Date.now(),
        sender: 'assistant',
        text: data.reply || 'I am ready to assist you with Bloom Theory Salon services and bookings!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: data.provider,
        recommendedServices: data.recommendedServices || [],
        suggestedFollowups: data.suggestedFollowups || [
          'Book an appointment',
          'Ask about hair treatments',
          'Explore facial rates',
          'Contact Salon'
        ]
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-err-' + Date.now(),
          sender: 'assistant',
          text: 'Bloom Theory Salon offers premium haircuts, hair spas, O3+ facials, waxing, and nail care. Call or WhatsApp us at +91 8977774224 for instant concierge assistance!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedFollowups: ['Book appointment now', 'View Men\'s menu', 'View Women\'s menu', 'Call 8977774224']
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Trigger Launcher */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 sm:bottom-6 right-4 z-40 bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 text-white p-3.5 sm:p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 border-2 border-white/80 group"
          title="Ask Bloom - AI Beauty Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <div className="hidden sm:flex flex-col text-left leading-tight pr-1">
            <span className="font-bold text-xs">Ask Bloom</span>
            <span className="text-[9px] text-pink-200">Beauty & Price Advisor</span>
          </div>
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-50 w-[94vw] sm:w-[410px] bg-[#0F172A] text-white rounded-3xl shadow-2xl border border-pink-500/30 overflow-hidden flex flex-col h-[560px] max-h-[85vh] animate-in slide-in-from-bottom duration-300">

          {/* Chat Header */}
          <div className="bg-gradient-to-r from-pink-700 via-rose-600 to-pink-700 text-white p-3.5 sm:p-4 flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 border border-white/30 flex items-center justify-center font-bold relative">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-pink-700" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-serif font-bold text-sm leading-tight">Ask Bloom</h4>
                  <span className="text-[9px] bg-pink-950/80 text-pink-200 px-1.5 py-0.5 rounded font-mono border border-pink-400/30">
                    AI Advisor
                  </span>
                </div>
                <span className="text-[10px] text-pink-100 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />
                  Bloom Intelligence Engine
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/20 text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Consultation Interactive Quiz Bar */}
          <div className="bg-[#131C31]/90 px-3 py-2 border-b border-pink-500/20 flex items-center justify-between shrink-0 gap-1 overflow-x-auto scrollbar-none text-[10px]">
            <span className="font-bold text-pink-400 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Quick Quiz:
            </span>

            {[
              { label: '✨ Glow Facial', prompt: 'Which facial is best for instant glow and bridal skin?' },
              { label: '💇‍♀️ Haircut & Spa', prompt: 'Suggest best haircut and hair spa for my hair type' },
              { label: '🌿 Keratin vs Smooth', prompt: 'What is the difference between Keratin treatment and Hair Smoothening?' },
              { label: '💈 Men Grooming', prompt: 'Show me popular gentlemen haircut, beard, and facial combo' },
              { label: '📍 Salon Address', prompt: 'Where is Bloom Theory Salon located in Secunderabad?' }
            ].map((q) => (
              <button
                key={q.label}
                onClick={() => handleSendMessage(q.prompt)}
                className="whitespace-nowrap px-2.5 py-1 bg-[#1E293B] hover:bg-pink-900/50 text-slate-200 hover:text-white rounded-lg border border-pink-500/20 transition font-medium shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0B132B] text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex gap-2 max-w-[92%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  {msg.sender === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-pink-950 border border-pink-500/40 text-pink-300 flex items-center justify-center shrink-0 font-bold mt-0.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <div
                      className={`p-3.5 rounded-2xl shadow-xs text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-tr-xs'
                          : 'bg-[#131C31] text-slate-200 border border-pink-500/20 rounded-tl-xs'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>

                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/10 text-[9px] text-slate-400">
                        {msg.provider ? (
                          <span className="font-mono text-pink-300/80 uppercase tracking-wider">{msg.provider}</span>
                        ) : (
                          <span />
                        )}

                        <div className="flex items-center gap-2">
                          {msg.sender === 'assistant' && (
                            <button
                              onClick={() => handleSpeech(msg.id, msg.text)}
                              title="Listen to response"
                              className="text-pink-400 hover:text-pink-300 transition"
                            >
                              {speakingMsgId === msg.id ? (
                                <VolumeX className="w-3.5 h-3.5 animate-pulse text-rose-400" />
                              ) : (
                                <Volume2 className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>

                    {/* Render Interactive Recommended Service Cards if present */}
                    {msg.recommendedServices && msg.recommendedServices.length > 0 && (
                      <div className="space-y-2 mt-2">
                        <span className="text-[10px] font-bold text-pink-300 uppercase tracking-wider block">
                          Suggested Services for You:
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {msg.recommendedServices.map((svc) => {
                            const isAdded = addedServiceIds.includes(svc.id);
                            return (
                              <div
                                key={svc.id}
                                className="bg-[#18233C] border border-pink-500/30 rounded-2xl p-3 flex flex-col gap-2 text-xs shadow-md"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <h5 className="font-serif font-bold text-white text-xs">{svc.name}</h5>
                                    <span className="text-[10px] text-pink-300 font-medium">{svc.category} • {svc.durationMinutes || 45} mins</span>
                                  </div>
                                  <span className="text-sm font-bold text-pink-400 font-mono">₹{svc.price}</span>
                                </div>

                                {svc.description && (
                                  <p className="text-[11px] text-slate-300 line-clamp-2 font-light">
                                    {svc.description}
                                  </p>
                                )}

                                <div className="flex items-center gap-2 pt-1 border-t border-slate-700/60">
                                  <button
                                    onClick={() => handleAddServiceToCart(svc)}
                                    className={`flex-1 py-1.5 px-3 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-1 transition ${
                                      isAdded
                                        ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/40'
                                        : 'bg-pink-600 hover:bg-pink-700 text-white shadow-xs'
                                    }`}
                                  >
                                    {isAdded ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-300" /> Added to Booking
                                      </>
                                    ) : (
                                      <>
                                        <Plus className="w-3 h-3" /> Select Service
                                      </>
                                    )}
                                  </button>

                                  {onOpenBooking && (
                                    <button
                                      onClick={() => {
                                        handleAddServiceToCart(svc);
                                        onOpenBooking();
                                      }}
                                      className="py-1.5 px-2.5 bg-[#1E293B] hover:bg-[#2A3952] text-slate-200 border border-pink-500/20 rounded-xl font-bold text-[10px] uppercase tracking-wider flex items-center gap-1"
                                    >
                                      <Calendar className="w-3 h-3 text-pink-400" /> Book
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Render Interactive Followup Chips */}
                    {msg.suggestedFollowups && msg.suggestedFollowups.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedFollowups.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(chip)}
                            className="text-[10px] text-pink-300 bg-pink-950/60 hover:bg-pink-900/80 border border-pink-500/30 px-2.5 py-1 rounded-full transition flex items-center gap-1 font-medium"
                          >
                            <span>{chip}</span>
                            <ChevronRight className="w-2.5 h-2.5 text-pink-400" />
                          </button>
                        ))}
                      </div>
                    )}

                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-[10px] border border-pink-500/30 mt-0.5">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs italic py-2">
                <div className="w-7 h-7 rounded-full bg-pink-950 flex items-center justify-center text-pink-400 border border-pink-500/30">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-300 font-medium">Ask Bloom is thinking...</span>
                  <span className="text-[10px] text-pink-400/80">Analysing Bloom Theory price menu & treatments</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Direct Concierge Contact Links inside Chat Footer */}
          <div className="px-3 py-1.5 bg-[#131C31] border-t border-slate-800/80 flex items-center justify-between text-[10px]">
            <a
              href="tel:8977774224"
              className="text-slate-300 hover:text-white flex items-center gap-1 transition"
            >
              <Phone className="w-3 h-3 text-pink-400" /> Call: 8977774224
            </a>

            <a
              href="https://wa.me/918977774224?text=Hi%20Bloom%20Theory%20Salon,%20I%20would%20like%20to%20book%20an%20appointment."
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold transition"
            >
              <MessageSquare className="w-3 h-3 text-emerald-400" /> WhatsApp Direct
            </a>

            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1"
              >
                <Calendar className="w-3 h-3" /> Booking Drawer
              </button>
            )}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#0F172A] border-t border-slate-800 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              placeholder="Ask Bloom about haircuts, facials, rates..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-3.5 py-2.5 text-xs bg-[#1E293B] border border-pink-500/20 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 text-white placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || loading}
              className="bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white p-2.5 rounded-full transition shadow-xs flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
