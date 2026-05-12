import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import logo from "../assets/logo.webp";

const ClanGrandeur = () => {
  const { language } = useLanguage();
  const t = translations[language].clanGrandeur;
  const m = translations[language].membership;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 bg-[#fdfaf3] overflow-hidden relative border-t border-[#c49a3c]/10">
      {/* Background Decorative Pattern - Left */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-[0.04] pointer-events-none -translate-x-1/4 -translate-y-1/4">
        <svg viewBox="0 0 100 100" fill="#8b1d1d" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0 C55 20 75 40 100 45 C75 50 55 70 50 100 C45 70 25 50 0 45 C25 40 45 20 50 0" />
        </svg>
      </div>

      {/* Decorative Sun Mandala - Right Background */}
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-[0.03] pointer-events-none translate-x-1/4 translate-y-1/4">
        <motion.svg 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="#c49a3c" 
          strokeWidth="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="50" cy="50" r="45" strokeDasharray="2 2" />
          {[...Array(12)].map((_, i) => (
            <line key={i} x1="50" y1="5" x2="50" y2="15" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <div className="w-12 h-0.5 bg-[#c49a3c] mb-6" />
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-5xl text-[#5d1712] font-bold mb-8 leading-tight tracking-tight flex flex-wrap items-center gap-4"
            >
              <span>{t.heading}</span>
              <motion.button 
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-[#8b1d1d] text-white px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg shadow-[#8b1d1d]/20"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                {language === 'ta' ? 'உறுப்பினர்' : 'MEMBER'}
              </motion.button>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-stone-700 text-lg md:text-xl leading-relaxed mb-10 font-light"
            >
              {t.p1}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/clan-grandeur" className="group flex items-center gap-2 text-[#5d1712] font-semibold transition-colors hover:text-[#c49a3c]">
                <span className="border-b border-current pb-1 uppercase tracking-widest text-xs">
                  {t.link}
                </span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image: Styled Logo Emblem */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 flex justify-center items-center relative"
          >
            <div className="relative group">
              {/* Spinning Decorative Outer Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-10 border border-dashed border-[#c49a3c]/30 rounded-full"
              />
              
              {/* Outer Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#c49a3c]/20 to-[#8b1d1d]/10 blur-3xl rounded-full animate-pulse" />
              
              {/* Main Circular Frame for Logo - Hybrid Animation (Spinning outer, Static inner) */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/80 backdrop-blur-sm shadow-2xl p-4 md:p-6 flex items-center justify-center border-4 border-[#c49a3c]/30 group-hover:border-[#c49a3c] transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_50px_-12px_rgba(196,154,60,0.5)] z-10 overflow-hidden">
                {/* Spinning Outer Part (Deepam & Text) */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  <img 
                    src={logo} 
                    alt="Clan Emblem Spinning Part" 
                    className="w-[90%] h-[90%] object-contain"
                  />
                </motion.div>
                
                {/* Static Inner Part (Temple) - Clipped and layered on top */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <img 
                    src={logo} 
                    alt="Clan Emblem Static Core" 
                    className="w-[90%] h-[90%] object-contain"
                    style={{ clipPath: 'circle(35% at 50% 50%)' }}
                  />
                </div>
              </div>

              {/* Decorative Particles / Icons - Now with Blinking and Click functionality */}
              <motion.button 
                onClick={() => setIsModalOpen(true)}
                animate={{ 
                  y: [0, -15, 0], 
                  x: [0, 10, 0],
                  opacity: [1, 0.4, 1] // Blinking effect
                }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } // Blink timing
                }}
                whileHover={{ scale: 1.1, opacity: 1 }}
                className="absolute top-0 -right-8 w-24 h-16 bg-[#c49a3c] text-white backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/40 z-20 px-3 cursor-pointer overflow-hidden group/badge"
              >
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-white text-[13px] font-bold tracking-tighter leading-none">{t.badgeKaadai}</span>
                  <span className="text-white text-[13px] font-bold tracking-tighter leading-none mt-1">{t.badgeKulam}</span>
                </div>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-700" />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Membership Popup Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-[#c49a3c]/20"
            >
              {/* Modal Header */}
              <div className="bg-[#5d1712] p-6 text-center relative">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 p-2 shadow-inner">
                  <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-xl font-serif text-white">{t.heading}</h3>
              </div>

              {/* Modal Body */}
              <div className="p-8 text-center bg-[#fdfaf3]">
                <div className="mb-8 p-4 bg-white rounded-xl border-2 border-dashed border-[#c49a3c]/30">
                  <p className="text-stone-500 text-xs uppercase tracking-widest mb-1">{m.idLabel}</p>
                  <p className="text-2xl font-bold text-[#5d1712] tracking-wider">{m.idValue}</p>
                </div>

                <p className="text-stone-600 mb-8 leading-relaxed">
                  {language === 'ta' 
                    ? "பூந்துறை காடை குலத்தின் அதிகாரப்பூர்வ உறுப்பினராக இணைந்து நமது பாரம்பரியத்தைப் பாதுகாப்போம்." 
                    : "Join as an official member of the Poondurai Kaadai clan and help preserve our rich heritage."}
                </p>

                <a 
                  href="https://member.kaadaikulam.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#c49a3c] hover:bg-[#b38a2c] text-white font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 text-center uppercase tracking-widest text-sm"
                >
                  {m.becomeButton}
                </a>
                
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 text-stone-400 hover:text-stone-600 text-xs font-medium transition-colors"
                >
                  {m.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ClanGrandeur;
