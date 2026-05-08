import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/images/angalaaman-DFWBKo-A.webp";
import img2 from "../assets/images/eswaran_kovil_1-D1sRlrA6.webp";
import img3 from "../assets/images/karikaliaman_1-BmA6tM5O.webp";
import img4 from "../assets/images/perumal_kovil_1-nbee0m8b.webp";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Heritage = () => {
  const { language } = useLanguage();
  const t = translations[language].heritage;
  const [currentImg, setCurrentImg] = useState(0);
  const images = [img1, img2, img3, img4];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-sacred overflow-hidden relative">
      {/* Spinning Sacred Sun / Chakra - Slightly more visible */}
      <div className="absolute right-[0%] bottom-[5%] pointer-events-none select-none opacity-45 z-0">
        <motion.svg 
          width="320" height="320" viewBox="0 0 200 200"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="100" cy="100" r="40" fill="none" stroke="#c49a3c" strokeWidth="1.2" strokeDasharray="4 4" />
          {[...Array(24)].map((_, i) => (
            <motion.path
              key={i}
              d="M100 40 Q110 30 100 20"
              fill="none" stroke="#c49a3c" strokeWidth="1.2"
              transform={`rotate(${i * 15} 100 100)`}
              animate={{ strokeWidth: [1.2, 2.2, 1.2] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          <circle cx="100" cy="100" r="10" fill="none" stroke="#c49a3c" strokeWidth="0.8" />
        </motion.svg>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#5d1712] leading-tight mb-8 tracking-wide">
              {t.heading}
            </h2>
            
            <div className="space-y-6 text-stone-700 text-base leading-relaxed">
              <p>
                {t.p1}
              </p>
              <p>
                {t.p2}
              </p>
            </div>

            <motion.div
              whileHover={{ x: 5 }}
            >
              <Link
                to="/temples"
                className="mt-8 text-[#5d1712] font-semibold flex items-center gap-2 group transition-colors hover:text-[#c49a3c]"
              >
                <span className="border-b border-current pb-1 uppercase tracking-widest text-xs">
                  {t.link}
                </span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column: Slideshow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-lg lg:ml-auto"
          >
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden shadow-xl border-4 border-white bg-stone-200">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={images[currentImg]}
                  alt="Temple Heritage"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      currentImg === i ? "w-6 bg-white" : "w-1 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Decorative Badge from Image */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#c49a3c] rounded-full flex flex-col items-center justify-center text-white shadow-lg border-2 border-[#f8f5f0] z-20"
            >
              <span className="text-2xl font-bold font-serif leading-none">4</span>
              <span className="text-[8px] uppercase tracking-tighter font-bold text-center mt-0.5 leading-tight">
                {t.templeLabel}
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Heritage;
