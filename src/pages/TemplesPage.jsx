import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import Temples from "../components/Temples";
import TempleVerses from "../components/TempleVerses";
import ContactCTA from "../components/ContactCTA";
import heroImg from "../assets/images/sacred_temple_hero_new.webp";

const TemplesPage = () => {
  const { language } = useLanguage();
  const tGlobal = translations[language];
  const t = tGlobal.temples;

  return (
    <div className="bg-sacred-temples min-h-screen pt-0">
      {/* Static Hero Section */}
      <section className="relative w-full h-[550px] md:h-[600px] lg:h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt={t.heading} 
            className="w-full h-full object-cover object-[center_35%]" 
          />
        </div>
        <div className="absolute inset-0 z-[1] bg-black/35 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start max-w-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[1.5px] bg-[#c49a3c]" />
                <span className="text-[#c49a3c] font-bold tracking-[0.35em] uppercase text-[14px]">
                  {tGlobal.hero.label}
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6 drop-shadow-2xl">
                {t.heading}
              </h1>
              <p className="max-w-xl text-white/95 text-base md:text-xl leading-relaxed italic font-light drop-shadow-xl border-l-2 border-[#c49a3c]/70 pl-4 py-1">
                "{t.quote}"
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <TempleVerses />
      <div className="pt-10">
        <Temples showButton={false} />
      </div>
      <ContactCTA />
    </div>
  );
};

export default TemplesPage;
