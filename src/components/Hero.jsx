import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/images/angalaaman-DFWBKo-A.webp";
import img2 from "../assets/images/eswaran_kovil_1-D1sRlrA6.webp";
import img3 from "../assets/images/karikaliaman_1-BmA6tM5O.webp";
import img4 from "../assets/images/perumal_kovil_1-nbee0m8b.webp";
import logo from "../assets/logo.webp";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();
  const t = translations[language].hero;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const bgImages = [logo, img1, img2, img3, img4];

  const kenBurnsVariants = [
    {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.8 } },
      exit: { opacity: 0, transition: { duration: 0.8 } }
    },
    {
      initial: { opacity: 0, scale: 1 },
      animate: { opacity: 1, scale: 1.12, transition: { opacity: { duration: 1.2 }, scale: { duration: 5.5, ease: "easeInOut" } } },
      exit: { opacity: 0, transition: { duration: 1.2 } }
    },
    {
      initial: { opacity: 0, scale: 1.1, x: 0 },
      animate: { opacity: 1, scale: 1, x: -30, transition: { opacity: { duration: 1.2 }, scale: { duration: 5.5, ease: "easeInOut" }, x: { duration: 5.5, ease: "easeInOut" } } },
      exit: { opacity: 0, transition: { duration: 1.2 } }
    },
    {
      initial: { opacity: 0, scale: 1, x: 0 },
      animate: { opacity: 1, scale: 1.1, x: 20, transition: { opacity: { duration: 1.2 }, scale: { duration: 5.5, ease: "easeInOut" }, x: { duration: 5.5, ease: "easeInOut" } } },
      exit: { opacity: 0, transition: { duration: 1.2 } }
    },
    {
      initial: { opacity: 0, scale: 1.08, y: 0 },
      animate: { opacity: 1, scale: 1, y: -20, transition: { opacity: { duration: 1.2 }, scale: { duration: 5.5, ease: "easeInOut" }, y: { duration: 5.5, ease: "easeInOut" } } },
      exit: { opacity: 0, transition: { duration: 1.2 } }
    }
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full min-h-[550px] lg:min-h-[650px] bg-[#fdfcf7] overflow-hidden flex items-center justify-center font-sans mt-0">

      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            variants={kenBurnsVariants[activeIndex]}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {activeIndex === 0 ? (
              <div className="w-full h-full flex items-center justify-center lg:justify-end p-8 md:p-16 lg:p-24 lg:pr-[12%] bg-sacred-home">
                <img
                  src={bgImages[0]}
                  alt="Clan Logo"
                  className="max-w-[70%] max-h-[70%] lg:max-w-full lg:max-h-full object-contain drop-shadow-xl relative z-10"
                />
              </div>
            ) : (
              <img
                src={bgImages[activeIndex]}
                alt={`Background ${activeIndex}`}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sophisticated Dark Overlay - Reduced Opacity */}
      <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/45 via-black/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                {/* Top Label */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-[1.5px] bg-[#c49a3c]"></span>
                  <span className="text-[#c49a3c] font-bold tracking-[0.35em] uppercase text-[14px]">
                    {t.label}
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6 drop-shadow-lg">
                  {t.items[activeIndex].title}
                </h1>

                {/* Paragraph Body Text */}
                <p className="text-white/90 text-base md:text-xl leading-relaxed mb-10 font-light drop-shadow-md">
                  {t.items[activeIndex].text}
                </p>

                {/* Button */}
                <Link
                  to="/temples"
                  className="group relative px-10 py-3.5 border-2 border-white/80 text-white rounded-full font-bold overflow-hidden transition-all hover:text-stone-900 mb-10 flex items-center justify-center text-sm md:text-base tracking-widest uppercase"
                >
                  <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {t.explore}
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
