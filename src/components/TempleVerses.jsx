import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const TempleVerses = () => {
  const { language } = useLanguage();
  const t = translations[language].spiritualOfferings;
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const verses = t.verses;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % verses.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [verses.length]);

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            key={`${language}-spiritual-heading`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl text-[#5d1712] mb-4"
          >
            {t.heading}
          </motion.h2>
          <div className="w-24 h-[1px] bg-[#c49a3c]/30 mx-auto" />
        </div>

        {/* Slideshow Container */}
        <div className="relative w-full max-w-2xl min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentIndex}-${language}`}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -20 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full"
            >
              <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#c49a3c]/15 relative overflow-hidden text-center flex flex-col items-center">
                
                {/* Ritualistic Icon */}
                <div className="mb-6 text-[#c49a3c]/40">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.41,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.59,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                  </svg>
                </div>

                <div className="mb-8">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-[#c49a3c] font-bold block mb-2">
                    {verses[currentIndex].subtitle}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#5d1712] leading-tight">
                    {verses[currentIndex].title}
                  </h3>
                </div>

                {/* Mantra Text - Centered & Large */}
                <div className="flex-grow mb-10">
                  <div className="space-y-4 italic text-[#5c2d0e] text-lg md:text-xl font-medium leading-relaxed tracking-wide">
                    {verses[currentIndex].verse.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>

                {/* Meaning Section */}
                <div className="pt-8 border-t border-stone-100 max-w-lg">
                  <div className="text-stone-500 text-xs md:text-sm leading-relaxed font-light italic">
                    <span className="text-[#5d1712] font-bold uppercase text-[9px] tracking-widest block mb-2 not-italic">{t.essence}</span>
                    "{verses[currentIndex].meaning}"
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-3">
            {verses.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  currentIndex === i ? "bg-[#5d1712] w-8" : "bg-stone-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TempleVerses;
