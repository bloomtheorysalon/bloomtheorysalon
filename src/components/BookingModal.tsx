import React, { useState } from 'react';
import { ServiceItem, Gender, BookingDetails } from '../types';
import { X, Calendar as CalendarIcon, Clock, Phone, User, CheckCircle2, MessageSquare, Sparkles, Trash2, ArrowRight, Download, Share2 } from 'lucide-react';

interface BookingModalProps {
  gender: Gender;
  onGenderChange: (gender: Gender) => void;
  selectedServices: ServiceItem[];
  onRemoveService: (serviceId: string) => void;
  onClose: () => void;
  onBookingSubmitted?: (booking: BookingDetails) => void;
}

const TIME_SLOTS = [
  '08:30 AM',
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '01:00 PM',
  '01:30 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM',
  '09:00 PM',
  '10:00 PM',
  '10:30 PM',
];

export const BookingModal: React.FC<BookingModalProps> = ({
  gender,
  onGenderChange,
  selectedServices,
  onRemoveService,
  onClose,
  onBookingSubmitted,
}) => {
  // Today's date YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingDate, setBookingDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [notes, setNotes] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState<BookingDetails | null>(null);

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  // Form submission handler
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedServices.length === 0) {
      alert('Please select at least one service before booking!');
      return;
    }

    if (!customerName.trim() || !phoneNumber.trim()) {
      alert('Please provide your name and phone number.');
      return;
    }

    const bookingRecord: BookingDetails = {
      id: 'BT-' + Date.now().toString().slice(-6),
      customerName: customerName.trim(),
      phoneNumber: phoneNumber.trim(),
      gender,
      selectedServices,
      totalPrice,
      bookingDate,
      timeSlot,
      notes: notes.trim(),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    if (onBookingSubmitted) {
      onBookingSubmitted(bookingRecord);
    }

    setSubmittedBooking(bookingRecord);

    // Build formatted WhatsApp message
    const serviceListStr = selectedServices
      .map((s) => `• ${s.name} (₹${s.price})`)
      .join('\n');

    const messageText = `*BLOOM THEORY SALON APPOINTMENT BOOKING*

*Name:* ${bookingRecord.customerName}
*Phone:* ${bookingRecord.phoneNumber}
*Gender:* ${gender === 'men' ? "Gentlemen's Menu" : "Ladies' Menu"}
*Date:* ${bookingRecord.bookingDate}
*Time Slot:* ${bookingRecord.timeSlot}

*Services Requested:*
${serviceListStr}

*Total Amount:* ₹${totalPrice.toLocaleString('en-IN')}
${bookingRecord.notes ? `\n*Notes:* ${bookingRecord.notes}` : ''}

Please confirm my appointment slot. Thank you!`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/918977774224?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  // Helper to generate Google Calendar Link
  const getGoogleCalendarUrl = () => {
    if (!submittedBooking) return '#';
    const title = encodeURIComponent(`Bloom Theory Salon Appointment (${submittedBooking.customerName})`);
    const details = encodeURIComponent(
      `Bloom Theory Salon Appointment\nServices: ${submittedBooking.selectedServices.map(s => s.name).join(', ')}\nTotal: ₹${submittedBooking.totalPrice}\nContact: 8977774224`
    );
    const location = encodeURIComponent('Opposite to Star Bazar, 1st Floor, Mahalaxmi Srinivasam, Bapuji Nagar Road, Hyderabad, Secunderabad, Telangana 500011');

    // Parse YYYY-MM-DD
    const [y, m, d] = submittedBooking.bookingDate.split('-');
    const dateFormatted = `${y}${m}${d}`;
    const startIso = `${dateFormatted}T100000Z`;
    const endIso = `${dateFormatted}T110000Z`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  // Helper to generate and download .ics Calendar File
  const handleDownloadICS = () => {
    if (!submittedBooking) return;

    const [y, m, d] = submittedBooking.bookingDate.split('-');
    const dateFormatted = `${y}${m}${d}`;

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Bloom Theory Salon//NONSGML v1.0//EN
BEGIN:VEVENT
SUMMARY:Bloom Theory Salon Appointment
DESCRIPTION:Appointment for ${submittedBooking.customerName}\\nServices: ${submittedBooking.selectedServices.map(s => s.name).join(', ')}\\nTotal: ₹${submittedBooking.totalPrice}\\nSalon Phone: 8977774224
LOCATION:Opposite to Star Bazar, 1st Floor, Mahalaxmi Srinivasam, Bapuji Nagar Road, Hyderabad, Secunderabad, Telangana 500011
DTSTART:${dateFormatted}T100000Z
DTEND:${dateFormatted}T110000Z
BEGIN:VALARM
TRIGGER:-PT30M
ACTION:DISPLAY
DESCRIPTION:Reminder: Salon Appointment at Bloom Theory in 30 mins!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `BloomTheory_Appointment_${submittedBooking.bookingDate}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#0F172A] text-white rounded-3xl max-w-xl w-full shadow-2xl border border-pink-500/30 overflow-hidden my-auto animate-in zoom-in-95 duration-200">

        {/* Modal Top Header */}
        <div className="bg-[#060B19] text-white p-6 sm:p-7 relative border-b border-pink-500/20">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[10px] font-bold text-pink-400 uppercase tracking-[0.2em] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Salon Concierge Reservation</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif italic text-white font-normal">
            {submittedBooking ? 'Reservation Confirmed' : 'Book Your Session'}
          </h3>
          <p className="text-slate-400 text-xs mt-1 font-light">
            Bloom Theory Sanctuary • Direct WhatsApp dispatch to +91 8977774224
          </p>
        </div>

        {/* Modal Body */}
        {submittedBooking ? (
          /* Confirmation Screen after submission */
          <div className="p-6 sm:p-8 space-y-6 text-center text-white">
            <div className="w-16 h-16 bg-pink-950/80 text-pink-400 rounded-full flex items-center justify-center mx-auto border border-pink-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-300 bg-pink-950/70 px-3.5 py-1 rounded-full border border-pink-500/30">
                Ref ID: {submittedBooking.id}
              </span>
              <h4 className="text-2xl sm:text-3xl font-serif italic text-white mt-3">
                Thank You, {submittedBooking.customerName}
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto font-light leading-relaxed">
                Your appointment request has been dispatched to WhatsApp at <strong>+91 8977774224</strong>. Our concierge will review your slot.
              </p>
            </div>

            {/* Appointment Summary Box */}
            <div className="bg-[#131C31] p-5 rounded-2xl border border-pink-500/20 text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-light">Date & Slot:</span>
                <span className="font-bold text-white">{submittedBooking.bookingDate} at {submittedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-light">Selected Services ({submittedBooking.selectedServices.length}):</span>
                <span className="font-bold text-pink-400">₹{submittedBooking.totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-400 block mb-1.5 font-light">Rituals:</span>
                <div className="flex flex-wrap gap-1.5">
                  {submittedBooking.selectedServices.map(s => (
                    <span key={s.id} className="bg-[#1E293B] border border-pink-500/20 text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar Alert Actions */}
            <div className="bg-[#131C31] p-4 rounded-2xl border border-pink-500/30 space-y-3 text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink-300 flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4 text-pink-400" />
                Calendar Alert & Integration:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1E293B] hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl border border-pink-500/20 shadow-xs transition"
                >
                  <Share2 className="w-3.5 h-3.5 text-pink-400" />
                  Google Calendar
                </a>

                <button
                  onClick={handleDownloadICS}
                  className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-3 rounded-xl transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download .ics
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://wa.me/918977774224"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl shadow-md transition"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Direct
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#131C31] hover:bg-[#1E293B] text-slate-200 text-xs font-bold border border-pink-500/20 rounded-xl transition"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <form onSubmit={handleSubmitBooking} className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">

            {/* Gender Toggle */}
            <div className="flex items-center justify-between bg-[#131C31] p-2 rounded-2xl border border-pink-500/20">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 pl-2">Salon Menu:</span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => onGenderChange('men')}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
                    gender === 'men' ? 'bg-slate-900 text-white border border-pink-500/40 shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Gentlemen
                </button>
                <button
                  type="button"
                  onClick={() => onGenderChange('women')}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
                    gender === 'women' ? 'bg-pink-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Ladies
                </button>
              </div>
            </div>

            {/* Selected Services Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                  Services Selected ({selectedServices.length})
                </label>
                <span className="text-xs font-bold text-pink-400">
                  Total: ₹{totalPrice.toLocaleString('en-IN')}
                </span>
              </div>

              {selectedServices.length === 0 ? (
                <div className="p-4 bg-[#131C31] text-slate-300 text-xs rounded-2xl border border-pink-500/20 text-center font-light">
                  No services selected yet. Please select services from the price menu behind!
                </div>
              ) : (
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {selectedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between bg-[#131C31] p-2.5 rounded-xl border border-pink-500/20 text-xs"
                    >
                      <span className="font-serif italic font-medium text-white">{service.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-pink-400">₹{service.price}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveService(service.id)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Date & Time Slot Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                  <CalendarIcon className="w-3.5 h-3.5 inline mr-1 text-pink-400" />
                  Date of Visit
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full p-3 text-xs bg-[#1E293B] border border-pink-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 font-medium text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-pink-400" />
                  Preferred Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full p-3 text-xs bg-[#1E293B] border border-pink-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 font-medium text-white"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot} className="bg-[#1E293B] text-white">
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                  <User className="w-3.5 h-3.5 inline mr-1 text-pink-400" />
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 text-xs bg-[#1E293B] border border-pink-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 font-medium text-white placeholder-slate-400"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-pink-400" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 8977774224"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 text-xs bg-[#1E293B] border border-pink-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 font-medium text-white placeholder-slate-400"
                  required
                />
              </div>
            </div>

            {/* Optional Notes */}
            <div>
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-1.5">
                Special Requests / Styling Preferences (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Preferred stylist, sensitive skin care, or custom request..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 text-xs bg-[#1E293B] border border-pink-500/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/50 font-medium text-white placeholder-slate-400"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={selectedServices.length === 0}
                className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl shadow-lg shadow-pink-600/20 transition active:scale-98"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Submit & Confirm via WhatsApp (8977774224)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

