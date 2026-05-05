import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/images/donation_hero.webp";
import { addDonation } from "../services/donationService";
import toast, { Toaster } from 'react-hot-toast';

const Donation = () => {
  const { language } = useLanguage();
  const t = translations[language].donation;
  
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirmation Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    transactionId: "",
    purpose: "general"
  });

  const amounts = [101, 251, 501, 1001, 2501, 5001, 10001, 25001];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success(t.bank.copy);
  };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.amount || !formData.transactionId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await addDonation({
        ...formData,
        amount: Number(formData.amount),
        date: new Date().toISOString()
      });
      toast.success(t.confirmation.success);
      setFormData({
        name: "",
        email: "",
        amount: "",
        transactionId: "",
        purpose: "general"
      });
    } catch (err) {
      toast.error(t.confirmation.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sacred pt-0 pb-20">
      <Toaster position="bottom-center" />
      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt={t.hero.label} className="w-full h-full object-cover" />
        </div>

        {/* Cinematic Dark Overlays */}
        <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/45 via-black/10 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start max-w-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[1.5px] bg-[#c49a3c]"></span>
                <span className="text-[#c49a3c] font-bold tracking-[0.35em] uppercase text-[14px]">
                  {t.hero.label}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6 drop-shadow-2xl">
                {t.hero.heading}
              </h1>
              
              <p className="max-w-xl text-white/90 text-base md:text-xl leading-relaxed font-light drop-shadow-xl">
                {t.hero.text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Donation Selection & Bank Details */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Donation Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-serif text-4xl text-[#5d1712] mb-6">{t.selection.heading}</h2>
              <p className="text-stone-700 text-lg leading-relaxed">
                {t.selection.text}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount("");
                    setFormData(prev => ({ ...prev, amount: amt.toString() }));
                  }}
                  className={`py-6 rounded-2xl font-serif text-xl transition-all duration-300 border-2 ${
                    selectedAmount === amt
                      ? "bg-[#5d1712] text-white border-[#5d1712] shadow-xl scale-105"
                      : "bg-white text-stone-700 border-stone-100 hover:border-[#c49a3c] hover:text-[#c49a3c]"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <label className="text-xs uppercase font-bold tracking-widest text-[#c49a3c]">{t.selection.custom}</label>
              <input 
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                  setFormData(prev => ({ ...prev, amount: e.target.value }));
                }}
                className="w-full bg-white border-b-2 border-stone-200 px-4 py-4 focus:border-[#5d1712] focus:outline-none transition-colors text-2xl font-serif text-stone-800"
                placeholder={t.selection.placeholder}
              />
            </div>

            <a 
              href="#record-donation"
              className="block w-full text-center bg-[#5d1712] text-white py-6 rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-[#3d0f0c] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#5d1712]/20"
            >
              {t.selection.submit}
            </a>
          </motion.div>

          {/* Right: Bank Details & Impact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            {/* Bank Card */}
            <div className="bg-[#fdfcf7] p-8 md:p-12 rounded-[40px] border border-[#c49a3c]/20 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="#c49a3c">
                  <path d="M11.5,1L2,6v2h19V6L11.5,1z M11.5,3.1L18.4,6.7H4.6L11.5,3.1z M3,10v10h1v2h16v-2h1V10H3z M5,12h2v6H5V12z M9,12h2v6H9V12z M13,12h2v6h-2V12z M17,12h2v6h-2V12z M5,20h14v1H5V20z" />
                </svg>
              </div>

              <h3 className="font-serif text-3xl text-[#5d1712] mb-10">{t.bank.heading}</h3>
              
              <div className="space-y-8">
                <div className="group cursor-pointer" onClick={() => handleCopy("Poondurai Kadaikula Makkal Narpani")}>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-1">{t.bank.accName}</p>
                  <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-stone-100 group-hover:border-[#c49a3c] transition-colors">
                    <span className="text-stone-800 font-medium text-sm md:text-base">Poondurai Kadaikula Makkal Narpani</span>
                    <svg className="w-5 h-5 text-stone-300 group-hover:text-[#c49a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <div className="group cursor-pointer" onClick={() => handleCopy("12345678901235")}>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-1">{t.bank.accNum}</p>
                  <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-stone-100 group-hover:border-[#c49a3c] transition-colors">
                    <span className="text-xl font-serif text-stone-800 tracking-wider">12345678901235</span>
                    <svg className="w-5 h-5 text-stone-300 group-hover:text-[#c49a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="group cursor-pointer" onClick={() => handleCopy("SBIN0001234")}>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-1">{t.bank.ifsc}</p>
                    <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-stone-100 group-hover:border-[#c49a3c] transition-colors">
                      <span className="font-bold text-stone-800">SBIN0001234</span>
                    </div>
                  </div>
                  <div className="group cursor-pointer" onClick={() => handleCopy("Avalpoondurai")}>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-1">{t.bank.branch}</p>
                    <div className="flex justify-between items-center bg-white/50 p-4 rounded-xl border border-stone-100 group-hover:border-[#c49a3c] transition-colors">
                      <span className="font-bold text-stone-800">Avalpoondurai</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Record Donation Form */}
      <section id="record-donation" className="py-24 bg-stone-50 border-y border-stone-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-stone-100"
          >
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-[#5d1712] mb-4">{t.confirmation.heading}</h2>
              <p className="text-stone-600 max-w-2xl mx-auto">{t.confirmation.sub}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.confirmation.name} *</label>
                  <input 
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleFormChange}
                    className="w-full bg-stone-50 border-b-2 border-stone-200 px-4 py-4 focus:border-[#5d1712] focus:outline-none transition-colors font-medium text-stone-800"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.confirmation.email}</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="w-full bg-stone-50 border-b-2 border-stone-200 px-4 py-4 focus:border-[#5d1712] focus:outline-none transition-colors font-medium text-stone-800"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.confirmation.amount} *</label>
                  <input 
                    type="number"
                    name="amount"
                    required
                    value={formData.amount}
                    onChange={handleFormChange}
                    className="w-full bg-stone-50 border-b-2 border-stone-200 px-4 py-4 focus:border-[#5d1712] focus:outline-none transition-colors font-bold text-[#5d1712] text-xl"
                    placeholder="₹ 0.00"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.confirmation.transactionId} *</label>
                  <input 
                    type="text"
                    name="transactionId"
                    required
                    value={formData.transactionId}
                    onChange={handleFormChange}
                    className="w-full bg-stone-50 border-b-2 border-stone-200 px-4 py-4 focus:border-[#5d1712] focus:outline-none transition-colors font-mono font-medium text-stone-800"
                    placeholder="Reference Number / UPI ID"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.confirmation.purpose}</label>
                <select 
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleFormChange}
                  className="w-full bg-stone-50 border-b-2 border-stone-200 px-4 py-4 focus:border-[#5d1712] focus:outline-none transition-colors font-medium text-stone-800 appearance-none"
                >
                  <option value="general">General Temple Fund</option>
                  <option value="maintenance">Maintenance & Renovation</option>
                  <option value="annadanam">Annadanam (Food Distribution)</option>
                  <option value="festival">Festival & Special Poojas</option>
                </select>
              </div>

              <div className="pt-8">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#5d1712] text-white py-6 rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-[#3d0f0c] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#5d1712]/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : t.confirmation.submit}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donation;
