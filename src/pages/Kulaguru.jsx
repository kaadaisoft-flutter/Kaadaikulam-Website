import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import img1 from "../assets/images/pasur_periya_madam-CCPWZxUo.webp";
import img2 from "../assets/images/pasur_chinna_madam-BOzzffoW.webp";
import heroImg from "../assets/images/kulaguru_hero_bg.webp";
import { FadeUp } from "../components/animations/Reveal";

const Kulaguru = () => {
  const { language } = useLanguage();
  const t = translations[language].kulaguruDetail;

  return (
    <div className="min-h-screen bg-[#fdfcf7]">
      {/* Hero Section - Matching History.jsx style */}
      <section className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt={t.hero.heading} className="w-full h-full object-cover" />
        </div>

        {/* Cinematic Overlays matching History.jsx */}
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

      {/* Introduction & Definition */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <FadeUp>
            <div className="text-center relative">
              <h2 className="font-serif text-3xl md:text-4xl text-[#5d1712] mb-10">
                {t.definition.title}
              </h2>
              <p className="text-stone-700 text-lg md:text-xl leading-relaxed mb-12 font-light italic max-w-4xl mx-auto">
                "{t.definition.text1}"
              </p>
              <div className="bg-[#5d1712]/5 py-10 px-6 md:px-12 rounded-3xl mb-12 border-x border-[#5d1712]/10 max-w-3xl mx-auto">
                <p className="font-serif text-xl md:text-2xl text-[#5d1712] italic leading-relaxed">
                  {t.definition.quote}
                </p>
              </div>
              <p className="text-stone-600 text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-light">
                {t.definition.text2}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* History & Divisions */}
      <section className="py-24 bg-[#fdfcf7] relative">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c49a3c]/20 to-transparent" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl text-[#5d1712] mb-6">
                {t.history.title}
              </h2>
              <div className="w-24 h-1 bg-[#c49a3c] mx-auto mb-8" />
              <p className="text-stone-700 text-lg max-w-3xl mx-auto leading-relaxed font-light">
                {t.history.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
              {t.history.divisions.map((div, idx) => (
                <FadeUp key={idx} delay={idx * 0.2}>
                  <div className="bg-white p-10 rounded-3xl shadow-lg border border-[#c49a3c]/10 h-full hover:shadow-xl transition-all duration-500 group">
                    <h3 className="font-serif text-2xl text-[#b23a2b] mb-4 group-hover:text-[#5d1712] transition-colors">{div.name}</h3>
                    <p className="text-stone-600 leading-relaxed font-light">{div.regions}</p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <div className="mt-24">
              <h2 className="font-serif text-3xl md:text-4xl text-[#5d1712] text-center mb-16">
                {t.administration.title}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {t.administration.madams.map((madam, idx) => (
                  <FadeUp key={idx} delay={idx * 0.2}>
                    <div className="flex flex-col h-full">
                      <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white bg-white mb-8 group">
                        <img 
                          src={idx === 0 ? img1 : img2} 
                          alt={madam.name} 
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-1000" 
                        />
                      </div>
                      <div className="text-center px-4">
                        <h4 className="font-serif text-2xl text-[#5d1712] mb-4">{madam.name}</h4>
                        <p className="text-stone-600 leading-relaxed font-light">
                          {madam.desc}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <div className="mt-12 text-center p-8 bg-[#5d1712]/5 rounded-3xl border border-[#5d1712]/10 max-w-4xl mx-auto">
                <p className="text-[#5d1712] font-light italic text-lg">
                  {t.administration.tradition}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Wonders */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="font-serif text-3xl md:text-4xl text-[#5d1712] text-center mb-16">
            {t.wonders.title}
          </h2>
          
          <div className="space-y-8">
            {t.wonders.items.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="group bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all hover:border-[#c49a3c]/30">
                  <div className="flex gap-6 items-start">
                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#5d1712]/5 text-[#5d1712] flex items-center justify-center font-serif text-xl border border-[#5d1712]/10">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-serif text-xl text-[#5d1712] mb-3 group-hover:text-[#b23a2b] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-stone-600 leading-relaxed font-light">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-20 text-center border-t border-stone-100 pt-16">
            <FadeUp>
              <p className="text-[#c49a3c] font-serif text-xl md:text-2xl italic">
                "{t.wonders.footer}"
              </p>
            </FadeUp>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kulaguru;
