import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/images/inscriptions_hero.webp";
import premiumBg from "../assets/images/inscriptions_premium_bg.webp";
import suvadi1 from "../assets/images/suvadi1.webp";
import suvadi2 from "../assets/images/suvadi2.webp";
import suvadi3 from "../assets/images/suvadi3.webp";
import suvadi4 from "../assets/images/suvadi4.webp";

const History = () => {
  const { language } = useLanguage();
  const t = translations[language].history;
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSuvadiIndex, setSelectedSuvadiIndex] = useState(null);

  const inscriptions = t.items;
  const suvadiImages = [suvadi1, suvadi2, suvadi3, suvadi4];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + inscriptions.length) % inscriptions.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % inscriptions.length);
  };

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
      <section className="relative py-24 flex flex-col items-center min-h-[700px] justify-start overflow-hidden bg-transparent">
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
                <h3 className="font-serif text-xl md:text-2xl text-[#5d1712] leading-tight px-2 break-words">
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
            onClick={handlePrev}
            className="absolute left-2 md:left-4 xl:left-[-70px] top-[260px] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg text-[#5d1712] hover:bg-white hover:scale-110 transition-all duration-300 z-20 border border-[#c49a3c]/10 opacity-100 scale-100 pointer-events-auto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-2 md:right-4 xl:right-[-70px] top-[260px] -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/90 shadow-lg text-[#5d1712] hover:bg-white hover:scale-110 transition-all duration-300 z-20 border border-[#c49a3c]/10 opacity-100 scale-100 pointer-events-auto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 5l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Suvadi (Palm-leaf Manuscripts) Section */}
      {t.suvadi && (
        <section className="relative py-24 bg-white border-t border-[#c49a3c]/15">
          <div className="container mx-auto px-6">
            {/* Header with Scroll Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="w-8 h-[1.5px] bg-[#c49a3c]"></span>
                <span className="text-[#c49a3c] font-bold tracking-[0.3em] uppercase text-[12px]">
                  {language === "ta" ? "ஓலைச்சுவடிகள்" : "Manuscripts"}
                </span>
                <span className="w-8 h-[1.5px] bg-[#c49a3c]"></span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#5d1712] mb-6 break-words">
                {t.suvadi.heading}
              </h2>
              <p className="text-stone-600 text-sm md:text-base leading-relaxed font-light">
                {t.suvadi.text}
              </p>
            </motion.div>

            {/* Grid with Staggered Scroll Animation */}
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15
                  }
                }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {suvadiImages.map((img, index) => (
                // Outer: handles scroll-in entrance (variants from parent)
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    show: {
                      opacity: 1,
                      scale: 1,
                      transition: { type: "spring", stiffness: 70, damping: 15 }
                    }
                  }}
                >
                  {/* Inner: handles continuous auto-float animation */}
                  <motion.div
                    animate={{ y: [0, -14, 0] }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: index * 0.6,
                    }}
                    whileHover={{ y: -18, scale: 1.04 }}
                    onClick={() => setSelectedSuvadiIndex(index)}
                    className="group bg-white rounded-[32px] overflow-hidden border border-[#c49a3c]/10 shadow-md hover:shadow-2xl transition-shadow cursor-pointer aspect-[4/3] relative"
                  >
                    <img
                      src={img}
                      alt={`Suvadi ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Hover Overlay Zoom Icon */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          <line x1="11" y1="8" x2="11" y2="14"></line>
                          <line x1="8" y1="11" x2="14" y2="11"></line>
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Lightbox Modal for Fullscreen View */}
      <AnimatePresence>
        {selectedSuvadiIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          >
            {/* Close trigger background */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedSuvadiIndex(null)} />

            {/* Close Button — top right corner */}
            <button
              onClick={() => setSelectedSuvadiIndex(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Prev Arrow — left side of screen */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedSuvadiIndex((prev) => (prev - 1 + suvadiImages.length) % suvadiImages.length); }}
              className="absolute left-4 md:left-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/20 active:scale-95"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Main Image — centred, full height */}
            <div className="relative z-10 flex items-center justify-center w-full h-full px-20">
              <motion.img
                key={selectedSuvadiIndex}
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.93, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={suvadiImages[selectedSuvadiIndex]}
                alt={`Suvadi ${selectedSuvadiIndex + 1}`}
                className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Next Arrow — right side of screen */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedSuvadiIndex((prev) => (prev + 1) % suvadiImages.length); }}
              className="absolute right-4 md:right-8 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all border border-white/20 active:scale-95"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 5l6 6-6 6" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default History;
