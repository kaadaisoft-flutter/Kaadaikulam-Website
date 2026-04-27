import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { getTempleInfo } from "../utils/templeData";

const TempleDetail = () => {
  const { slug } = useParams();
  const { language } = useLanguage();
  const tGlobal = translations[language];
  const t = tGlobal.temples;
  const tDetail = tGlobal.templeDetail;

  const templeInfo = getTempleInfo(language, t);
  const temple = templeInfo[slug];

  if (!temple) {
    return (
      <div className="py-40 text-center">
        <h2 className="font-serif text-3xl text-[#5d1712]">{tDetail.notFound}</h2>
        <Link to="/temples" className="text-stone-700 underline mt-4 inline-block">{tDetail.back}</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-sacred min-h-screen">
      <div className="container mx-auto px-6">
        {/* Floating Back Button */}
        <Link to="/temples" className="mb-10 inline-flex items-center gap-2 text-[#5d1712] font-medium hover:translate-x-[-4px] transition-transform">
          ← {tDetail.back}
        </Link>

        {/* Top Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Main Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 rounded-[32px] overflow-hidden shadow-2xl border border-[#c49a3c]/10"
          >
            <img src={temple.image} alt={temple.name} className="w-full aspect-[4/3] object-cover" />
          </motion.div>

          {/* Info Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-5 bg-white/50 backdrop-blur-sm p-8 md:p-10 rounded-[32px] border border-[#c49a3c]/20 flex flex-col h-full"
          >
            <h2 className="font-serif text-3xl text-[#5d1712] mb-8">{tDetail.infoHeading}</h2>
            
            <div className="space-y-8 flex-grow">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] block mb-2">{tDetail.hours}</span>
                <p className="text-stone-700 font-medium">{temple.visitingHours}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] block mb-2">{tDetail.address}</span>
                <p className="text-stone-700 font-medium">{temple.address}</p>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] block mb-4">{tDetail.features}</span>
                <ul className="space-y-3">
                  {temple.features.map(feature => (
                    <li key={feature} className="flex items-start gap-3 text-stone-600">
                      <div className="w-5 h-5 rounded-full bg-[#5d1712]/10 flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-[#5d1712]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl"
        >
          <h1 className="font-serif text-4xl md:text-5xl text-[#5d1712] mb-8">{temple.name}</h1>
          <div className="prose prose-stone max-w-none">
            <h3 className="font-serif text-2xl text-stone-800 mb-4 italic">{tDetail.about}</h3>
            <div className="text-stone-600 text-lg leading-relaxed mb-10 whitespace-pre-line">
              {temple.about}
            </div>

            {/* Prayer Box */}
            <div className="bg-[#5d1712]/5 border-l-4 border-[#5d1712] p-6 rounded-r-2xl mb-12">
              <h4 className="font-serif text-[#5d1712] text-xl mb-3">{temple.thuthi.title}</h4>
              <p className="text-stone-700 italic text-lg leading-relaxed mb-2">
                "{temple.thuthi.verse}"
              </p>
              {temple.thuthi.sub && (
                <p className="text-stone-500 text-sm">{temple.thuthi.sub}</p>
              )}
            </div>

            {/* Pathigam Section */}
            {temple.pathigam && (
              <div className="mb-12">
                <h3 className="font-serif text-2xl text-stone-800 mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#c49a3c]"></span>
                  {temple.pathigam.title}
                </h3>
                <div className="bg-white/40 p-8 rounded-3xl border border-[#c49a3c]/10">
                  <p className="text-stone-700 italic text-lg leading-relaxed whitespace-pre-line mb-6">
                    {temple.pathigam.verse}
                  </p>
                  <div className="pt-6 border-t border-[#c49a3c]/10">
                    <span className="text-[#5d1712] font-bold uppercase text-[9px] tracking-widest block mb-1">{tDetail.explanatory}</span>
                    <p className="text-stone-600 italic text-sm">{temple.pathigam.meaning}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Construction Notice Section */}
            {temple.construction && (
              <div className="mb-12 bg-amber-50/50 border-l-4 border-amber-400 p-6 rounded-r-2xl flex items-center gap-4">
                <svg className="w-6 h-6 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="text-amber-800 font-medium italic">
                  {temple.construction}
                </p>
              </div>
            )}

            {/* Maha Kumbhabhishekam Section */}
            {temple.kumbhabhishekam && (
              <div className="mb-12">
                <h3 className="font-serif text-2xl text-stone-800 mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#c49a3c]"></span>
                  Maha Kumbhabhishekam ({temple.kumbhabhishekam.date})
                </h3>
                <div className="bg-white/40 p-8 rounded-3xl border border-[#c49a3c]/10 text-stone-600 leading-relaxed">
                  {temple.kumbhabhishekam.details}
                </div>
              </div>
            )}

            {/* Clan Poem Section */}
            {temple.poem && (
              <div className="mt-16 bg-[#c49a3c]/5 p-8 md:p-12 rounded-[40px] border border-[#c49a3c]/20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c49a3c]/30 to-transparent"></div>
                <h3 className="font-serif text-2xl text-[#5d1712] mb-8 tracking-widest uppercase text-sm">{tDetail.poemTitle}</h3>
                
                <div className="mb-10">
                  <p className="font-serif text-xl md:text-2xl text-[#5c2d0e] italic leading-loose whitespace-pre-line">
                    {temple.poem.verse}
                  </p>
                </div>

                <div className="pt-8 border-t border-[#c49a3c]/20 max-w-2xl mx-auto">
                  <span className="text-[#5d1712] font-bold uppercase text-[10px] tracking-widest block mb-4">{tDetail.historical}</span>
                  <p className="text-stone-600 font-light leading-relaxed italic">
                    "{temple.poem.meaning}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TempleDetail;
