import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img1 from "../assets/images/angalaaman-DFWBKo-A.webp";
import img2 from "../assets/images/eswaran_kovil_1-D1sRlrA6.webp";
import img3 from "../assets/images/karikaliaman_1-BmA6tM5O.webp";
import img4 from "../assets/images/perumal_kovil_1-nbee0m8b.webp";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { StaggerContainer, StaggerItem } from "./animations/Reveal";

const Temples = ({ showButton = true }) => {
  const { language } = useLanguage();
  const t = translations[language].temples;

  const templeData = [
    {
      id: 1,
      name: t.items[0].name,
      desc: t.items[0].desc,
      image: img1,
      slug: "sri-angalamman-temple",
      tags: language === 'en' ? ["Daily Pooja", "Annual Festival", "Special Abhishekam"] : ["தினசரி பூஜை", "ஆண்டு விழா", "சிறப்பு அபிஷேகம்"]
    },
    {
      id: 2,
      name: t.items[1].name,
      desc: t.items[1].desc,
      image: img2,
      slug: "sri-pushpavaneswara-swamy-temple",
      tags: language === 'en' ? ["Shivaratri", "Daily Abhishekam", "Rudra Abhishekam"] : ["சிவராத்திரி", "தினசரி அபிஷேகம்", "ருத்ர அபிஷேகம்"]
    },
    {
      id: 3,
      name: t.items[2].name,
      desc: t.items[2].desc,
      image: img3,
      slug: "sri-kariyakali-amman-temple",
      tags: language === 'en' ? ["Aadi Perukku", "Special Arthi", "Navaratri"] : ["ஆடி பெருக்கு", "சிறப்பு ஆரத்தி", "நவராத்திரி"]
    },
    {
      id: 4,
      name: t.items[4]?.name || t.items[3].name,
      desc: t.items[4]?.desc || t.items[3].desc,
      image: img4,
      slug: "sri-damodara-perumal-temple",
      tags: language === 'en' ? ["Vaikuntha Ekadashi", "Margazhi Pooja", "Garuda Seva"] : ["வைகுண்ட ஏகாதசி", "மார்கழி பூஜை", "கருட சேவை"]
    }
  ];

  return (
    <section id="temples-section" className="relative py-24 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2 
            key={`${language}-heading`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-[#5d1712] mb-6 tracking-tight"
          >
            {t.heading}
          </motion.h2>
          <motion.p 
            key={`${language}-sub`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-stone-700 text-lg md:text-xl leading-relaxed font-light px-4"
          >
            {language === 'en' ? (
              <>
                Four temples, each with unique significance, form the spiritual core of <span className="text-[#5d1712] font-medium">Kongu Vellalar Poondurai Kaadai Koottam</span>
              </>
            ) : (
              <>
                நான்கு கோவில்கள், ஒவ்வொன்றும் தனித்துவமான முக்கியத்துவத்துடன், <span className="text-[#5d1712] font-medium">கொங்கு வெள்ளாளர் பூந்துறை காடை கூட்டத்தின்</span> ஆன்மீக மையத்தை உருவாக்குகின்றன
              </>
            )}
          </motion.p>
        </div>

        {/* Temple Cards Grid with Stagger */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {templeData.map((temple) => (
            <StaggerItem key={`${temple.id}-${language}`}>
              <div className="group bg-white p-2 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col border border-[#c49a3c]/20 h-full">
                {/* Image Container */}
                <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                  <motion.img 
                    src={temple.image} 
                    alt={temple.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content Container */}
                <div className="p-4 md:p-5 flex flex-col items-start flex-grow">
                  <h3 className="font-serif text-lg md:text-xl text-[#5d1712] mb-3 leading-tight tracking-wide">
                    {temple.name}
                  </h3>
                  <p className="text-stone-700 text-sm leading-relaxed font-light mb-6">
                    {temple.desc}
                  </p>

                  {/* Learn More Link */}
                  <Link 
                    to={`/temples/${temple.slug}`}
                    className="group/link inline-flex items-center gap-1.5 text-[#5d1712] font-bold hover:opacity-80 transition-opacity mt-auto"
                  >
                    <span className="border-b border-current pb-0.5 uppercase tracking-widest text-xs">
                      {t.learnMore}
                    </span>
                    <span className="text-lg transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Button - Conditional */}
        {showButton && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link to="/temples" className="inline-flex items-center gap-2 bg-[#5d1712] text-white px-8 py-3.5 rounded-lg hover:bg-[#3d0f0c] transition-all duration-300 shadow-lg hover:shadow-xl group">
              <span className="font-serif text-lg font-medium">
                {t.viewAll}
              </span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Temples;
