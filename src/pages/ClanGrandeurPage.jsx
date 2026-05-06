import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/images/sacred_temple_hero_new.webp";

const ClanGrandeurPage = () => {
  const { language } = useLanguage();
  const t = translations[language].clanGrandeurDetail;

  if (!t) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#fdfcf7] pt-0">
      {/* Hero Section - Matching Premium Style */}
      <section className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt={t.hero.heading} className="w-full h-full object-cover" />
        </div>

        {/* Cinematic Dark Overlays matching Home & History page */}
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

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-20 max-w-4xl">
        {/* Vinayagar Prayer */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 bg-white p-10 rounded-3xl shadow-sm border border-stone-100 text-center"
        >
          <h2 className="font-serif text-2xl text-[#5d1712] mb-6">{t.prayer.title}</h2>
          <div className="space-y-2 text-stone-700 italic font-light text-lg">
            {t.prayer.verse.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </motion.section>

        {/* Dynamic Sections */}
        {t.sections.map((section, idx) => (
          <motion.section 
            key={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-24"
          >
            <div className="flex items-start gap-6 mb-8">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-[#5d1712]/5 flex items-center justify-center text-[#5d1712] font-serif text-xl border border-[#5d1712]/10">
                {section.id}
              </span>
              <div>
                <h2 className="font-serif text-3xl text-[#5d1712] mb-6 leading-tight">
                  {section.title}
                </h2>
                <p className="text-lg text-stone-700 leading-relaxed font-light mb-8">
                  {section.text}
                </p>

                {/* Subsections for Poondurai Nadu */}
                {section.subsections && section.subsections.map((sub, sidx) => (
                  <div key={sidx} className="mb-10 bg-white/50 p-8 rounded-2xl border border-stone-50">
                    <h3 className="font-bold text-[#c49a3c] mb-4 uppercase tracking-widest text-xs">
                      {sub.title}
                    </h3>
                    
                    {sub.verses && (
                      <div className="space-y-2 text-stone-800 italic mb-6">
                        {sub.verses.map((line, li) => <p key={li}>{line}</p>)}
                      </div>
                    )}

                    {sub.list && (
                      <ul className="space-y-3">
                        {sub.list.map((item, li) => (
                          <li key={li} className="flex gap-3 items-start text-stone-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c49a3c] mt-2.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sub.meaningList && (
                      <div className="mt-6 pt-6 border-t border-stone-100">
                        <h4 className="font-bold text-[#5d1712] text-sm mb-4">{sub.meaningTitle}</h4>
                        <ul className="space-y-3 text-stone-600 text-sm">
                          {sub.meaningList.map((item, li) => (
                            <li key={li} className="flex gap-3 items-start">
                              <span className="text-[#c49a3c] mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {sub.grid && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                        {sub.grid.map((col, ci) => (
                          <div key={ci} className="bg-white p-6 rounded-xl border border-stone-100">
                            <h4 className="font-bold text-[#5d1712] text-sm mb-4">{col.label}</h4>
                            <ul className="space-y-2 text-stone-600 text-sm">
                              {col.items.map((item, ii) => (
                                <li key={ii} className="flex gap-2 items-center">
                                  <span className="w-1 h-1 rounded-full bg-stone-300" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {sub.note && <p className="mt-6 text-sm text-[#c49a3c] italic">{sub.note}</p>}
                    {sub.sites && <p className="mt-4 text-stone-700 font-medium">{sub.sites}</p>}
                    
                    {sub.highlights && (
                      <div className="mt-8 space-y-6">
                        {sub.highlights.map((h, hi) => (
                          <div key={hi}>
                            <span className="text-[#5d1712] font-bold block mb-1">{h.label}:</span>
                            <span className="text-stone-600 leading-relaxed">{h.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Simple List for Kaadai Clan */}
                {section.list && (
                  <div className="grid grid-cols-1 gap-6">
                    {section.list.map((item, li) => (
                      <div key={li} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full bg-[#c49a3c] mt-2 flex-shrink-0" />
                        <div>
                          <span className="font-bold text-[#5d1712]">{item.label}: </span>
                          <span className="text-stone-700">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlights for Varanasi Gounder */}
                {section.highlights && (
                   <div className="space-y-8 mt-4">
                    {section.highlights.map((h, hi) => (
                      <div key={hi} className="border-l-2 border-[#c49a3c]/20 pl-6">
                        <h4 className="font-bold text-[#5d1712] mb-2">{h.label}</h4>
                        <p className="text-stone-600 leading-relaxed">{h.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        ))}

        {/* Conclusion */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#5d1712] p-12 rounded-[40px] text-white text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <h2 className="font-serif text-3xl mb-6 relative z-10">{t.conclusion.title}</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 relative z-10">
            {t.conclusion.text}
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default ClanGrandeurPage;
