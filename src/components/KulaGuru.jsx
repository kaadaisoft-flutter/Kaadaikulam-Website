import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/images/pasur_periya_madam-CCPWZxUo.webp";
import img2 from "../assets/images/pasur_chinna_madam-BOzzffoW.webp";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const KulaGuru = () => {
  const { language } = useLanguage();
  const t = translations[language].kulaGuru;
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#fdfcf7] overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Image Frame with Slider */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative p-1.5 md:p-2 bg-white rounded-[24px] border border-[#c49a3c]/20 shadow-2xl max-w-md w-full">
              <div className="relative aspect-[1/1.2] rounded-[20px] overflow-hidden bg-stone-50 mb-6">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentIndex}
                    src={images[currentIndex]} 
                    alt="Clan Guru Madam" 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>

              {/* Pagination Dots - Moved below image */}
              <div className="flex justify-center gap-3">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === i ? "bg-[#b23a2b] scale-125" : "bg-stone-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 text-left"
          >
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-[#5d1712] mb-8 leading-tight tracking-tight">
              {t.heading}
            </h2>
            
            <p className="text-stone-700 text-lg lg:text-xl leading-relaxed mb-10 font-light">
              {t.p1}
            </p>

            <button className="group flex items-center gap-3 text-[#5d1712] font-semibold transition-all hover:gap-5">
              <span className="border-b border-current pb-1 uppercase tracking-widest text-xs">{t.link}</span>
              <span className="text-lg transition-transform duration-300">→</span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default KulaGuru;
