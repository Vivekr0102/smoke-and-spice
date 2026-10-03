import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, MessageCircle, Send, AlertCircle, MapPin, Phone } from 'lucide-react';

const TIME_SLOTS = [
  // Lunch Slots (12:00 PM - 3:30 PM)
  { value: '12:00 PM', label: '12:00 PM (Lunch)' },
  { value: '12:30 PM', label: '12:30 PM (Lunch)' },
  { value: '1:00 PM', label: '1:00 PM (Lunch)' },
  { value: '1:30 PM', label: '1:30 PM (Lunch)' },
  { value: '2:00 PM', label: '2:00 PM (Lunch)' },
  { value: '2:30 PM', label: '2:30 PM (Lunch)' },
  { value: '3:00 PM', label: '3:00 PM (Lunch)' },

  // Dinner Slots (6:30 PM - 12:00 AM)
  { value: '6:30 PM', label: '6:30 PM (Dinner)' },
  { value: '7:00 PM', label: '7:00 PM (Dinner)' },
  { value: '7:30 PM', label: '7:30 PM (Dinner)' },
  { value: '8:00 PM', label: '8:00 PM (Dinner)' },
  { value: '8:30 PM', label: '8:30 PM (Dinner)' },
  { value: '9:00 PM', label: '9:00 PM (Dinner)' },
  { value: '9:30 PM', label: '9:30 PM (Dinner)' },
  { value: '10:00 PM', label: '10:00 PM (Dinner)' },
  { value: '10:30 PM', label: '10:30 PM (Dinner)' },
  { value: '11:00 PM', label: '11:00 PM (Dinner)' },
];

export default function ReservationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: todayStr,
    time: '7:00 PM',
    guests: '2',
    seating: 'Main Dining',
    notes: '',
  });

  if (!isOpen) return null;

  const handleValidationAndSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const { name, phone, date, time, guests } = formData;

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setErrorMsg('Please enter a valid customer phone number.');
      return;
    }
    if (!date) {
      setErrorMsg('Please select a reservation date.');
      return;
    }
    if (date < todayStr) {
      setErrorMsg('Reservation date cannot be in the past.');
      return;
    }
    if (!time) {
      setErrorMsg('Please select a valid time slot.');
      return;
    }

    // Build formatted WhatsApp message
    const message = `🍽️ *TABLE RESERVATION REQUEST - SMOKE & SPICE* 🍽️
----------------------------------
👤 *Customer Details:*
• Name: ${name.trim()}
• Mobile Number: ${phone.trim()}

📅 *Reservation Slot:*
• Date: ${date}
• Time: ${time}
• Number of Guests: ${guests} Person(s)
• Seating Preference: ${formData.seating}
• Special Requests: ${formData.notes.trim() ? formData.notes.trim() : 'None'}

----------------------------------
📍 *Smoke & Spice, Sector 20, Nerul, Navi Mumbai*
📞 *Contact: +91 7021248122*`;

    const waURL = `https://wa.me/917021248122?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrorMsg('');
    setFormData({
      name: '',
      phone: '',
      date: todayStr,
      time: '7:00 PM',
      guests: '2',
      seating: 'Main Dining',
      notes: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-white rounded-full bg-stone-950/60 border border-stone-800"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-heading text-4xl text-white uppercase tracking-wide">
              Reservation Request Submitted
            </h3>
            <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 text-stone-300 text-xs sm:text-sm space-y-2 max-w-md mx-auto">
              <p className="text-amber-400 font-bold flex items-center justify-center gap-1.5">
                <Send className="w-4 h-4" />
                Please press "SEND" inside WhatsApp
              </p>
              <p className="text-stone-400 text-xs leading-relaxed">
                Your reservation details for <strong className="text-white">{formData.guests} guests</strong> on <strong className="text-white">{formData.date} at {formData.time}</strong> have been opened in WhatsApp to send to <strong className="text-green-400">+91 7021248122</strong>.
              </p>
            </div>

            <div className="p-4 bg-stone-950/60 rounded-xl border border-stone-800/80 text-left text-xs text-stone-400 space-y-1.5 max-w-md mx-auto">
              <p className="flex items-center gap-2 text-stone-300 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                Shop 3, Shree Ganesh Krupa CHS, Sector 20, Nerul, Navi Mumbai
              </p>
              <p className="flex items-center gap-2 text-orange-400">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                Smoke &amp; Spice Line: +91 7021248122
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 px-8 py-3 bg-orange-600 hover:bg-orange-500 text-stone-950 font-bold rounded-xl text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-orange-400 mb-1">
                <Calendar className="w-4 h-4" />
                Smoke &amp; Spice • Nerul, Navi Mumbai
              </div>
              <h3 className="font-heading text-4xl text-white uppercase">Table Reservation</h3>
              <p className="text-stone-400 text-xs sm:text-sm">
                Open for Lunch (12:00 PM – 3:30 PM) &amp; Dinner (6:30 PM – 12:00 AM). Closed 3:30 PM – 6:30 PM.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleValidationAndSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Your Mobile Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Enter your 10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3.5 py-2.5 text-stone-200 text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Date *
                  </label>
                  <input
                    required
                    type="date"
                    min={todayStr}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-2.5 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Time Slot *
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-2.5 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                    Guests *
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-2.5 text-stone-200 text-xs sm:text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8 Guests</option>
                    <option value="10+">10+ Guests</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Seating Area
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Main Dining', 'Family Section', 'AC Section'].map((pref) => (
                    <button
                      type="button"
                      key={pref}
                      onClick={() => setFormData({ ...formData, seating: pref })}
                      className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all ${
                        formData.seating === pref
                          ? 'bg-orange-600 text-stone-950 border-orange-500 font-bold'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 uppercase tracking-wider mb-1.5">
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  rows="2"
                  placeholder="E.g. Extra spicy preference, Jain food requirement, birthday table..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-200 text-xs focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-green-600 hover:bg-green-500 text-stone-950 font-extrabold rounded-xl text-base flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.99] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-stone-950" />
                <span>Reserve via WhatsApp</span>
                <Send className="w-4 h-4 ml-1 stroke-[2.5]" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
