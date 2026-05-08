import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/images/contact_hero.webp";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(translations[language].donation.bank.copy);
  };

  return (
    <div className="min-h-screen bg-sacred pt-0">
      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Contact Us" className="w-full h-full object-cover" />
        </div>

        {/* Cinematic Dark Overlays */}
        <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/45 via-black/10 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 py-12 lg:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start max-w-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[1.5px] bg-[#c49a3c]"></span>
                <span className="text-[#c49a3c] font-bold tracking-[0.35em] uppercase text-[14px]">
                  {t.hero.label}
                </span>
              </div>

              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6 drop-shadow-2xl">
                {t.hero.heading}
              </h1>
              
              <p className="max-w-xl text-white/90 text-base md:text-xl leading-relaxed font-light drop-shadow-xl">
                {t.hero.text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="font-serif text-4xl text-[#5d1712] mb-6">{t.info.heading}</h2>
              <p className="text-stone-700 text-lg leading-relaxed">
                {t.info.text}
              </p>
            </div>

            <div className="space-y-8">
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.info.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#c49a3c]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c49a3c] group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-1">{t.info.location}</h4>
                  <p className="text-stone-800 font-medium text-lg max-w-[280px]">{t.info.address}</p>
                </div>
              </a>

              <div className="flex items-start gap-6 group cursor-pointer" onClick={() => handleCopy("+91 99526 93122")}>
                <div className="w-14 h-14 rounded-2xl bg-[#5d1712]/10 flex items-center justify-center shrink-0 group-hover:bg-[#5d1712] group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-1">{t.info.phone}</h4>
                  <p className="text-stone-800 font-medium text-lg">+91 99526 93122</p>
                  <p className="text-stone-800 font-medium text-lg">+91 99524 93122</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group cursor-pointer" onClick={() => handleCopy("info@kaadaikulam.org")}>
                <div className="w-14 h-14 rounded-2xl bg-[#c49a3c]/10 flex items-center justify-center shrink-0 group-hover:bg-[#c49a3c] group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-1">{t.info.email}</h4>
                  <p className="text-stone-800 font-medium text-lg">info@kaadaikulam.org</p>
                  <p className="text-stone-800 font-medium text-lg">support@kaadaikulam.org</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#fdfcf7] p-8 md:p-12 rounded-[40px] border border-[#c49a3c]/20 shadow-2xl"
          >
            <h3 className="font-serif text-3xl text-[#5d1712] mb-10">{t.form.heading}</h3>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.form.name}</label>
                  <input 
                    type="text" 
                    className="w-full bg-white border-b border-stone-200 px-0 py-3 focus:border-[#5d1712] focus:outline-none transition-colors text-stone-800"
                    placeholder={t.form.placeholders.name}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.form.email}</label>
                  <input 
                    type="email" 
                    className="w-full bg-white border-b border-stone-200 px-0 py-3 focus:border-[#5d1712] focus:outline-none transition-colors text-stone-800"
                    placeholder={t.form.placeholders.email}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.form.subject}</label>
                <input 
                  type="text" 
                  className="w-full bg-white border-b border-stone-200 px-0 py-3 focus:border-[#5d1712] focus:outline-none transition-colors text-stone-800"
                  placeholder={t.form.placeholders.subject}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.form.message}</label>
                <textarea 
                  rows="4"
                  className="w-full bg-white border-b border-stone-200 px-0 py-3 focus:border-[#5d1712] focus:outline-none transition-colors text-stone-800 resize-none"
                  placeholder={t.form.placeholders.message}
                ></textarea>
              </div>

              <button className="w-full bg-[#5d1712] text-white py-5 rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-[#3d0f0c] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#5d1712]/20">
                {t.form.submit}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
