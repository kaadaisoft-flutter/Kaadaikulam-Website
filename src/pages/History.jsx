import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/images/inscriptions_hero.webp";
import premiumBg from "../assets/images/inscriptions_premium_bg.webp";

const History = () => {
  const { language } = useLanguage();
  const t = translations[language].history;
  const [activeIndex, setActiveIndex] = useState(0);

  const inscriptions = t.items;

  return (
    <div className="min-h-screen bg-sacred-history pt-0">
      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt={t.hero.heading} className="w-full h-full object-cover" />
        </div>

        {/* Cinematic Dark Overlays to match Home page */}
        <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/45 via-black/10 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start max-w-xl"
            >
              {/* Top Label matching Home Page */}
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[1.5px] bg-[#c49a3c]"></span>
                <span className="text-[#c49a3c] font-bold tracking-[0.35em] uppercase text-[14px]">
                  {t.hero.label}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6 drop-shadow-2xl">
                {t.hero.heading}
              </h1>
              
              <p className="max-w-2xl text-white/90 text-base md:text-xl leading-relaxed font-light drop-shadow-xl">
                {t.hero.text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inscriptions Slideshow Section */}
      <section className="relative py-24 flex flex-col items-center min-h-[700px] justify-center overflow-hidden bg-transparent">
        {/* Premium Cinematic Background Image - Reduced opacity to blend with specialized art */}
        <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none">
          <img src={premiumBg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-transparent opacity-0" />
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_100%)] from-[#c49a3c]/5" />

        <div className="w-full max-w-xl relative z-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-white p-6 md:p-12 rounded-[40px] shadow-2xl border border-[#c49a3c]/10 relative overflow-hidden text-center flex flex-col items-center min-h-[500px]"
            >
              {/* Sacred Icon */}
              <div className="mb-6 text-[#c49a3c]/30">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.41,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.59,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg>
              </div>

              {/* Title Section */}
              <div className="mb-6">
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-[#c49a3c] block mb-2">
                  {t.recordLabel}{inscriptions[activeIndex].id}
                </span>
                <h3 className="font-serif text-xl md:text-2xl text-[#5d1712] leading-tight px-2">
                  {inscriptions[activeIndex].title}
                </h3>
              </div>

              {/* Description Verse */}
              <p className="text-stone-700 text-sm md:text-base font-light italic mb-8 px-4 leading-relaxed border-b border-stone-50 pb-6">
                "{inscriptions[activeIndex].subtitle}"
              </p>
              
              {/* Message Block */}
              <div className="w-full mb-8">
                <span className="text-[#5d1712] font-bold uppercase text-[8px] tracking-[0.4em] block mb-3 opacity-60">{t.sacredMessage}</span>
                <div className="bg-[#5d1712]/5 py-3.5 px-5 rounded-2xl">
                  <p className="text-stone-800 text-base md:text-lg leading-relaxed italic">
                    {/* Highlight key terms in bold */}
                    {inscriptions[activeIndex].message.split("'").map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-[#5d1712] font-bold">'{part}'</strong> : part
                    )}
                  </p>
                </div>
              </div>

              {/* Significance Block */}
              {inscriptions[activeIndex].significance && (
                <div className="w-full">
                  <span className="text-[#c49a3c] font-bold uppercase text-[8px] tracking-[0.4em] block mb-3 opacity-60">{t.significance}</span>
                  <p className="text-stone-700 text-[13px] md:text-[14px] leading-relaxed font-light italic px-2">
                    {inscriptions[activeIndex].significance}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {inscriptions.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all duration-500 rounded-full ${
                  activeIndex === index 
                    ? "w-6 h-1 bg-[#5d1712]" 
                    : "w-1 h-1 bg-stone-300 hover:bg-[#c49a3c]"
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={() => setActiveIndex((prev) => (prev - 1 + inscriptions.length) % inscriptions.length)}
            className="absolute left-[-70px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow-lg text-[#5d1712] hover:bg-white hover:scale-110 transition-all hidden xl:flex border border-[#c49a3c]/10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button 
            onClick={() => setActiveIndex((prev) => (prev + 1) % inscriptions.length)}
            className="absolute right-[-70px] top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 shadow-lg text-[#5d1712] hover:bg-white hover:scale-110 transition-all hidden xl:flex border border-[#c49a3c]/10"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default History;
