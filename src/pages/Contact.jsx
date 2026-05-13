import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { submitContactMessage } from "../services/contactService";
import heroImg from "../assets/images/contact_hero.webp";

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert(translations[language].donation.bank.copy);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitContactMessage(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "", phone: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sacred pt-0">
      {/* Hero Section */}
      <section className="relative w-full min-h-[400px] lg:min-h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="Contact Us" className="w-full h-full object-cover" />
        </div>

        {/* Cinematic Dark Overlays */}
        <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/45 via-transparent to-black/20 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-4 justify-center">
              <span className="w-8 h-[1.5px] bg-[#c49a3c]"></span>
              <span className="text-[#c49a3c] font-bold tracking-[0.35em] uppercase text-[12px]">
                {t.hero.label}
              </span>
              <span className="w-8 h-[1.5px] bg-[#c49a3c]"></span>
            </div>

            <h1 className="font-serif text-4xl md:text-6xl leading-[1.1] text-white mb-6 drop-shadow-2xl">
              {t.hero.heading}
            </h1>
            
            <p className="max-w-xl text-white/90 text-base md:text-lg leading-relaxed font-light drop-shadow-xl">
              {t.hero.text}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 container mx-auto px-6">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.info.address)}`, '_blank')}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#c49a3c]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#c49a3c] group-hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-2">{t.info.location}</h4>
            <p className="text-stone-800 font-medium text-base leading-relaxed">{t.info.address}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer"
            onClick={() => handleCopy("+91 99526 93122")}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#5d1712]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#5d1712] group-hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-2">{t.info.phone}</h4>
            <p className="text-stone-800 font-medium text-base leading-relaxed">+91 99526 93122<br/>+91 99524 93122</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow text-center group cursor-pointer"
            onClick={() => handleCopy("poonduraikaadaikulam@gmail.com")}
          >
            <div className="w-14 h-14 rounded-2xl bg-[#c49a3c]/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#c49a3c] group-hover:text-white transition-all duration-300">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c] mb-2">{t.info.email}</h4>
            <p className="text-stone-800 font-medium text-base leading-relaxed">poonduraikaadaikulam@gmail.com</p>
          </motion.div>
        </div>

        {/* Centered Form Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#fdfcf7] p-8 md:p-16 rounded-[40px] border border-[#c49a3c]/20 shadow-2xl relative overflow-hidden"
          >
            <div className="text-center mb-12">
              <h3 className="font-serif text-4xl text-[#5d1712] mb-4">{t.form.heading}</h3>
              <div className="w-24 h-1 bg-[#c49a3c]/30 mx-auto rounded-full"></div>
            </div>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-serif font-bold text-[#5d1712] mb-2">Message Sent!</h4>
                  <p className="text-stone-600">We have received your message and will get back to you soon.</p>
                </motion.div>
              ) : (
                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.form.name}</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-stone-200 px-0 py-3 focus:border-[#5d1712] focus:outline-none transition-colors text-stone-800"
                        placeholder={t.form.placeholders.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.form.email}</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-stone-200 px-0 py-3 focus:border-[#5d1712] focus:outline-none transition-colors text-stone-800"
                        placeholder={t.form.placeholders.email}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.form.subject}</label>
                    <input 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-stone-200 px-0 py-3 focus:border-[#5d1712] focus:outline-none transition-colors text-stone-800"
                      placeholder={t.form.placeholders.subject}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-bold tracking-widest text-[#c49a3c]">{t.form.message}</label>
                    <textarea 
                      rows="4"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-stone-200 px-0 py-3 focus:border-[#5d1712] focus:outline-none transition-colors text-stone-800 resize-none"
                      placeholder={t.form.placeholders.message}
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#5d1712] text-white py-5 rounded-2xl font-bold tracking-[0.2em] uppercase hover:bg-[#3d0f0c] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-[#5d1712]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : t.form.submit}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
