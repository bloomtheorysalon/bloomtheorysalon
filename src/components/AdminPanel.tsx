import React, { useState } from 'react';
import { ServiceItem, BookingDetails, SalonInfo } from '../types';
import { Shield, Plus, Edit2, Check, X, Download, Search, KeyRound } from 'lucide-react';

interface AdminPanelProps {
  services: ServiceItem[];
  onUpdateServices: (services: ServiceItem[]) => void;
  appointments: BookingDetails[];
  onUpdateAppointments: (appointments: BookingDetails[]) => void;
  salonInfo: SalonInfo;
  onUpdateSalonInfo: (info: SalonInfo) => void;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  services,
  onUpdateServices,
  appointments,
  onUpdateAppointments,
  salonInfo,
  onUpdateSalonInfo,
  onClose,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'appointments' | 'services' | 'info'>('appointments');
  const [searchTerm, setSearchTerm] = useState('');

  // New Service Form State
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState('Hair Basic');
  const [newServiceGender, setNewServiceGender] = useState<'men' | 'women'>('women');

  // Edit Service State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editPriceInput, setEditPriceInput] = useState('');

  // Password verification
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'akashsalon123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect Admin Password! Please try again.');
    }
  };

  // Toggle Service Availability
  const handleToggleAvailability = (serviceId: string) => {
    const updated = services.map((s) => {
      if (s.id === serviceId) {
        return { ...s, available: s.available === false ? true : false };
      }
      return s;
    });
    onUpdateServices(updated);
  };

  // Quick Price Save
  const handleSavePrice = (serviceId: string) => {
    const priceNum = parseFloat(editPriceInput);
    if (isNaN(priceNum) || priceNum < 0) return;

    const updated = services.map((s) => {
      if (s.id === serviceId) {
        return { ...s, price: priceNum };
      }
      return s;
    });
    onUpdateServices(updated);
    setEditingServiceId(null);
  };

  // Add New Service
  const handleAddNewService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName.trim() || !newServicePrice) return;

    const price = parseFloat(newServicePrice);
    const newService: ServiceItem = {
      id: `${newServiceGender[0]}-custom-${Date.now()}`,
      name: newServiceName.trim(),
      price: isNaN(price) ? 500 : price,
      category: newServiceCategory,
      gender: newServiceGender,
      available: true,
      durationMinutes: 30,
    };

    onUpdateServices([newService, ...services]);
    setNewServiceName('');
    setNewServicePrice('');
    alert(`Service "${newService.name}" added successfully!`);
  };

  // Change Appointment Status
  const handleUpdateStatus = (bookingId: string, status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled') => {
    const updated = appointments.map((a) => {
      if (a.id === bookingId) {
        return { ...a, status };
      }
      return a;
    });
    onUpdateAppointments(updated);
  };

  // Export Bookings to CSV
  const handleExportCSV = () => {
    if (appointments.length === 0) {
      alert('No appointments to export!');
      return;
    }

    const headers = ['Booking ID', 'Customer Name', 'Phone', 'Gender', 'Date', 'Time Slot', 'Services', 'Total Price (INR)', 'Status'];
    const rows = appointments.map((a) => [
      a.id,
      `"${a.customerName}"`,
      a.phoneNumber,
      a.gender,
      a.bookingDate,
      a.timeSlot,
      `"${a.selectedServices.map((s) => s.name).join(', ')}"`,
      a.totalPrice,
      a.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BloomTheory_Appointments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F172A] text-white rounded-3xl max-w-4xl w-full shadow-2xl border border-pink-500/30 overflow-hidden my-auto max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">

        {/* Admin Header */}
        <div className="bg-[#060B19] text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b border-pink-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif italic font-normal text-xl text-white">Bloom Theory • Owner Portal</h3>
              <span className="text-[10px] text-pink-300 uppercase tracking-[0.2em]">Sanctuary Concierge & Price Control</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Login Password Screen */}
        {!isAuthenticated ? (
          <form onSubmit={handleLogin} className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-16 h-16 bg-pink-950/80 text-pink-400 rounded-full flex items-center justify-center mx-auto border border-pink-500/30">
              <KeyRound className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-2xl font-serif italic text-white">Enter Admin Password</h4>
              <p className="text-xs text-slate-300 mt-1 font-light">
                Restricted section for salon management & rate adjustments.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-rose-950/80 text-rose-300 text-xs font-semibold rounded-xl border border-rose-500/40">
                {authError}
              </div>
            )}

            <input
              type="password"
              placeholder="Enter password..."
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full p-3.5 bg-[#1E293B] border border-pink-500/20 text-white rounded-2xl text-center font-mono text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              autoFocus
            />

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-2xl shadow-md transition"
            >
              Unlock Dashboard
            </button>
          </form>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-white">

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === 'appointments'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'bg-[#131C31] text-slate-300 border border-pink-500/20 hover:bg-[#1E293B]'
                  }`}
                >
                  Appointments ({appointments.length})
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === 'services'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'bg-[#131C31] text-slate-300 border border-pink-500/20 hover:bg-[#1E293B]'
                  }`}
                >
                  Services & Rates ({services.length})
                </button>
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === 'info'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'bg-[#131C31] text-slate-300 border border-pink-500/20 hover:bg-[#1E293B]'
                  }`}
                >
                  Salon Info
                </button>
              </div>

              {activeTab === 'appointments' && (
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              )}
            </div>

            {/* Tab 1: Appointments List */}
            {activeTab === 'appointments' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif italic text-white font-bold text-lg">
                    Recent Customer Appointments
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Total Logged: {appointments.length}
                  </span>
                </div>

                {appointments.length === 0 ? (
                  <div className="text-center py-12 bg-[#131C31] rounded-2xl border border-pink-500/20 p-6">
                    <p className="text-xs text-slate-300 font-light">No appointments recorded yet. Online submissions will show here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {appointments.map((a) => (
                      <div
                        key={a.id}
                        className="bg-[#131C31] p-4.5 rounded-2xl border border-pink-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-serif italic font-bold text-white text-base">{a.customerName}</span>
                            <span className="bg-pink-950/70 text-pink-300 font-bold px-2 py-0.5 rounded-md text-[10px] border border-pink-500/30">
                              {a.id}
                            </span>
                            <span className="text-slate-400 capitalize text-[10px] uppercase font-bold">• {a.gender}</span>
                          </div>
                          <div className="text-slate-300 space-x-2 font-light">
                            <span>Phone: <strong className="font-bold text-white">{a.phoneNumber}</strong></span>
                            <span>• Date: <strong className="font-bold text-white">{a.bookingDate} at {a.timeSlot}</strong></span>
                          </div>
                          <div className="text-slate-400 mt-1 font-light">
                            Rituals: <span className="font-medium text-pink-300">{a.selectedServices.map((s) => s.name).join(', ')}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className="text-base font-bold text-pink-400">₹{a.totalPrice}</span>
                          <select
                            value={a.status}
                            onChange={(e) => handleUpdateStatus(a.id!, e.target.value as any)}
                            className="bg-[#1E293B] border border-pink-500/20 rounded-lg p-1.5 text-xs font-bold text-white focus:outline-none"
                          >
                            <option value="Pending" className="bg-[#1E293B] text-white">Pending</option>
                            <option value="Confirmed" className="bg-[#1E293B] text-white">Confirmed</option>
                            <option value="Completed" className="bg-[#1E293B] text-white">Completed</option>
                            <option value="Cancelled" className="bg-[#1E293B] text-white">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Edit Prices & Services */}
            {activeTab === 'services' && (
              <div className="space-y-6">

                {/* Add New Service Form */}
                <form onSubmit={handleAddNewService} className="bg-[#131C31] p-5 rounded-2xl border border-pink-500/30 space-y-3">
                  <h4 className="font-serif italic text-white font-bold text-base flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-pink-400" />
                    Add New Custom Service to Price Menu
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <input
                      type="text"
                      placeholder="Service Name"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      className="bg-[#1E293B] border border-pink-500/20 rounded-xl p-2.5 text-xs text-white placeholder-slate-400"
                      required
                    />

                    <input
                      type="number"
                      placeholder="Price in ₹"
                      value={newServicePrice}
                      onChange={(e) => setNewServicePrice(e.target.value)}
                      className="bg-[#1E293B] border border-pink-500/20 rounded-xl p-2.5 text-xs text-white placeholder-slate-400"
                      required
                    />

                    <select
                      value={newServiceGender}
                      onChange={(e) => setNewServiceGender(e.target.value as any)}
                      className="bg-[#1E293B] border border-pink-500/20 rounded-xl p-2.5 text-xs text-white"
                    >
                      <option value="women" className="bg-[#1E293B] text-white">Ladies' Menu</option>
                      <option value="men" className="bg-[#1E293B] text-white">Gentlemen's Menu</option>
                    </select>

                    <button
                      type="submit"
                      className="bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-xs transition"
                    >
                      + Add Ritual
                    </button>
                  </div>
                </form>

                {/* Filter Services Search */}
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search service to edit price..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#131C31] border border-pink-500/20 rounded-2xl text-xs text-white placeholder-slate-400"
                  />
                </div>

                {/* Services Price Table */}
                <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                  {services
                    .filter((s) => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((s) => (
                      <div
                        key={s.id}
                        className={`flex items-center justify-between p-3.5 rounded-xl border text-xs ${
                          s.available === false ? 'bg-[#0B132B] opacity-60' : 'bg-[#131C31] border-pink-500/20'
                        }`}
                      >
                        <div>
                          <span className="font-serif italic font-medium text-white">{s.name}</span>
                          <span className="text-[10px] text-slate-400 ml-2">
                            ({s.gender === 'men' ? 'Men' : 'Women'} • {s.category})
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          {editingServiceId === s.id ? (
                            <div className="flex items-center gap-1">
                              <span className="text-slate-400 font-bold">₹</span>
                              <input
                                type="number"
                                value={editPriceInput}
                                onChange={(e) => setEditPriceInput(e.target.value)}
                                className="w-20 p-1 border border-pink-500 bg-[#1E293B] rounded-md font-bold text-white"
                              />
                              <button
                                onClick={() => handleSavePrice(s.id)}
                                className="bg-emerald-600 text-white p-1 rounded-md"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setEditingServiceId(s.id);
                                setEditPriceInput(s.price.toString());
                              }}
                              className="font-bold text-pink-400 hover:text-pink-300 underline flex items-center gap-1"
                            >
                              ₹{s.price}
                              <Edit2 className="w-3 h-3 text-slate-400" />
                            </button>
                          )}

                          <button
                            onClick={() => handleToggleAvailability(s.id)}
                            className={`px-3 py-1 rounded-md font-bold text-[10px] uppercase tracking-wider ${
                              s.available === false
                                ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            }`}
                          >
                            {s.available === false ? 'Unavailable' : 'Active'}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Tab 3: Salon Info */}
            {activeTab === 'info' && (
              <div className="space-y-4">
                <h4 className="font-serif italic font-bold text-white text-base">Update Contact Details & Top Banner</h4>
                <div className="space-y-3 bg-[#131C31] p-5 rounded-2xl border border-pink-500/20 text-xs">
                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[10px]">Phone Number</label>
                    <input
                      type="text"
                      value={salonInfo.phone}
                      onChange={(e) => onUpdateSalonInfo({ ...salonInfo, phone: e.target.value })}
                      className="w-full p-2.5 bg-[#1E293B] border border-pink-500/20 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[10px]">Email ID</label>
                    <input
                      type="email"
                      value={salonInfo.email}
                      onChange={(e) => onUpdateSalonInfo({ ...salonInfo, email: e.target.value })}
                      className="w-full p-2.5 bg-[#1E293B] border border-pink-500/20 rounded-xl text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-300 mb-1 uppercase tracking-wider text-[10px]">Top Announcement Banner</label>
                    <input
                      type="text"
                      value={salonInfo.announcement || ''}
                      onChange={(e) => onUpdateSalonInfo({ ...salonInfo, announcement: e.target.value })}
                      className="w-full p-2.5 bg-[#1E293B] border border-pink-500/20 rounded-xl text-white"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
