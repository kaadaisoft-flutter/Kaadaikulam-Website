import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const ContactCTA = () => {
  const { language } = useLanguage();
  const t = translations[language].connect;

  return (
    <section className="py-20 bg-[#fdf5e6]/50 border-t border-[#c49a3c]/10">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          key={`${language}-cta-heading`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl md:text-5xl text-[#5d1712] font-bold mb-6 tracking-tight"
        >
          {t.heading}
        </motion.h2>
        
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-stone-600 space-y-1 mb-10"
        >
          <p className="text-base md:text-lg font-medium opacity-80">{t.sub1}</p>
          <p className="text-base md:text-lg font-medium opacity-80">{t.sub2}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/contact" className="w-fit group relative bg-[#c49a3c]/90 text-[#5d1712] px-10 py-3 rounded-xl font-bold flex items-center gap-3 mx-auto shadow-md transition-all duration-300 hover:bg-[#c49a3c] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
            {t.link}
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
