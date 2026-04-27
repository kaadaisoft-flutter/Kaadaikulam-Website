import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/images/donation_hero.webp";

const Donation = () => {
  const { language } = useLanguage();
  const t = translations[language].donation;
  
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [101, 251, 501, 1001, 2501, 5001, 10001, 25001];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(t.bank.copy);
  };

  return (
    <div className="min-h-screen bg-sacred pt-0">
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

      {/* Donation Options */}
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
                }}
                className="w-full bg-white border-b-2 border-stone-200 px-4 py-4 focus:border-[#5d1712] focus:outline-none transition-colors text-2xl font-serif text-stone-800"
                placeholder={t.selection.placeholder}
              />
            </div>

            <button className="w-full bg-[#5d1712] text-white py-6 rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-[#3d0f0c] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#5d1712]/20">
              {t.selection.submit}
            </button>
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

            {/* Impact Icons */}
            <div className="grid grid-cols-3 gap-8 pt-6">
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-[#5d1712]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">{t.impact.temple}</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-[#c49a3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">{t.impact.poor}</p>
              </div>
              <div className="text-center group">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-[#5d1712]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.44 0.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">{t.impact.edu}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Donation;
