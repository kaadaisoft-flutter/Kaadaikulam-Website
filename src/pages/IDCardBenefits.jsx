import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import logo from "../assets/logo.webp";
import {
  ShieldAlert,
  Fingerprint,
  QrCode,
  Tag,
  Layers,
  Flame,
  Megaphone,
  Sprout,
  GraduationCap,
  Briefcase,
  HeartPulse,
  Waves,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  User,
  Phone,
  Droplet,
  Globe
} from "lucide-react";

const IDCardBenefits = () => {
  const { language } = useLanguage();
  const t = translations[language].idCardBenefits;
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeCardDetail, setActiveCardDetail] = useState(null);

  const icons = [
    ShieldAlert,     // 1. Emergency response support
    Fingerprint,     // 2. One unified ID card system
    QrCode,          // 3. QR code to include family details
    Tag,             // 4. Business offers & discounts
    Layers,          // 5. PVC ID card
    Flame,           // 6. Temple pooja initiatives
    Megaphone,       // 7. Business promotions
    Sprout,          // 8. Agricultural support
    GraduationCap,   // 9. Education support & career guidance
    Briefcase,       // 10. Employment support
    HeartPulse,      // 11. Group insurance policy
    Waves            // 12. Pond renovation & water welfare
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="bg-sacred-home min-h-screen py-16 px-4 md:px-8 relative overflow-hidden font-sans">
      {/* Floating Background Mandalas */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.03] pointer-events-none translate-x-1/4 -translate-y-1/4">
        <svg viewBox="0 0 100 100" fill="none" stroke="#c49a3c" strokeWidth="0.3">
          <circle cx="50" cy="50" r="45" />
          {[...Array(24)].map((_, i) => (
            <line key={i} x1="50" y1="5" x2="50" y2="95" transform={`rotate(${i * 7.5} 50 50)`} />
          ))}
        </svg>
      </div>

      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] opacity-[0.03] pointer-events-none -translate-x-1/4">
        <svg viewBox="0 0 100 100" fill="none" stroke="#8b1d1d" strokeWidth="0.3">
          <circle cx="50" cy="50" r="40" strokeDasharray="1 2" />
          <polygon points="50,10 90,50 50,90 10,50" />
          <polygon points="50,20 80,50 50,80 20,50" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-stone-700 hover:text-[#8b1d1d] transition-colors font-bold uppercase tracking-widest text-xs py-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            {language === "ta" ? "முகப்பிற்குச் செல்ல" : "Back to Home"}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Hero Left: Page Titles & Intro */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-[1.5px] bg-[#c49a3c]"></span>
              <span className="text-[#c49a3c] font-bold tracking-[0.25em] uppercase text-xs">
                {t.hero.label}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#5d1712] leading-tight mb-6 drop-shadow-sm">
              {t.hero.title}
            </h1>

            <p className="text-stone-700 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-xl">
              {t.hero.desc}
            </p>

            <a
              href="https://member.kaadaikulam.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-[#8b1d1d] hover:bg-[#5d1712] text-white rounded-full font-bold shadow-lg shadow-[#8b1d1d]/20 overflow-hidden transition-all duration-300 flex items-center justify-center text-sm tracking-widest uppercase"
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.hero.applyBtn}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Hero Right: 3D Interactive ID Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            <div 
              className="relative w-full max-w-[400px] h-[250px] cursor-pointer group"
              style={{ perspective: "1500px" }}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Card Container with CSS 3D flips */}
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 12, mass: 1 }}
              >
                
                {/* --- OFFICIAL FRONT OF CARD --- */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl border border-white/20 select-none bg-gradient-to-r from-[#4d050f] via-[#5a0914] to-[#1f0206]"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  {/* Glowing background line textures */}
                  <div className="absolute inset-0 bg-card-glow opacity-[0.04] pointer-events-none mix-blend-overlay"></div>
                  
                  {/* Card Content Area */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    
                    {/* Top Row: Emblem and Organization Header */}
                    <div className="flex items-center gap-3">
                      {/* Circular Emblem with Gold boundary */}
                      <div className="w-14 h-14 rounded-full border-2 border-[#c49a3c] p-0.5 bg-[#4d050f] shadow-lg flex items-center justify-center shrink-0 relative">
                        <img src={logo} alt="Kaadaikula Emblem" className="w-[90%] h-[90%] object-contain" />
                        <div className="absolute inset-0.5 rounded-full border border-[#c49a3c]/30"></div>
                      </div>
                      
                      {/* Header Text Block */}
                      <div className="flex-1 flex flex-col items-center text-center">
                        <h2 className="text-[#ffdf8c] text-xl font-bold font-serif tracking-normal leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                          {t.card.front.orgName}
                        </h2>
                        
                        {/* Elegant Decorative separator */}
                        <div className="flex items-center justify-center w-full my-0.5">
                          <div className="h-[0.5px] bg-gradient-to-r from-transparent via-[#c49a3c]/80 to-transparent flex-1"></div>
                          <div className="w-1 h-1 bg-[#c49a3c] rotate-45 mx-1.5 shrink-0"></div>
                          <div className="h-[0.5px] bg-gradient-to-r from-transparent via-[#c49a3c]/80 to-transparent flex-1"></div>
                        </div>

                        <p className="text-white text-xs font-semibold tracking-wider font-serif opacity-90 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.5)]">
                          {t.card.front.orgSub}
                        </p>
                      </div>
                    </div>

                    {/* Middle Row: Photo Frame & Profile Details */}
                    <div className="flex items-center gap-5 mt-2.5">
                      
                      {/* Photo Column */}
                      <div className="flex flex-col items-center">
                        {/* Rounded Photo frame with bold Gold border */}
                        <div className="w-24 h-28 rounded-xl border-2 border-[#c49a3c] p-0.5 bg-stone-950 overflow-hidden relative flex items-center justify-center shadow-lg group-hover:border-yellow-400 transition-colors">
                          
                          {/* Profile Photo - Mocking a blurred/masked photo exactly as requested */}
                          <div className="w-full h-full bg-[#3d2b27] flex items-center justify-center relative">
                            {/* Masked placeholder user avatar shape */}
                            <svg className="w-16 h-16 text-stone-500/70" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            
                            {/* Glassmorphic Mask badge overlay */}
                            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[2.5px] flex flex-col items-center justify-center gap-1">
                              <div className="w-6 h-6 rounded-full border border-[#c49a3c]/40 bg-stone-900/75 flex items-center justify-center text-[#c49a3c]">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>
                              </div>
                              <span className="text-[8px] text-[#ffdf8c] font-bold tracking-widest uppercase bg-stone-900/80 px-1 py-0.5 rounded border border-[#c49a3c]/20 leading-none">
                                SECURE
                              </span>
                            </div>
                          </div>

                        </div>
                        
                        {/* Member ID Badge below photo */}
                        <div className="mt-1.5 bg-[#380208] border border-[#c49a3c]/30 rounded-md py-0.5 px-3 shadow-inner">
                          <span className="text-white font-mono text-[10px] font-bold tracking-wider leading-none">
                            {t.card.front.idValue}
                          </span>
                        </div>
                      </div>

                      {/* Detail Fields Column */}
                      <div className="flex-1 flex flex-col gap-2">
                        
                        {/* Row 1: Name */}
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full border border-[#c49a3c] flex items-center justify-center text-[#c49a3c] bg-stone-900/40 shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7.5px] text-white/50 uppercase tracking-widest leading-none mb-0.5">{t.card.front.nameLabel}</span>
                            <span className="text-white text-sm font-bold tracking-wide drop-shadow-sm leading-tight">
                              {t.card.front.maskedName}
                            </span>
                          </div>
                        </div>

                        {/* Row 2: Phone */}
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full border border-[#c49a3c] flex items-center justify-center text-[#c49a3c] bg-stone-900/40 shrink-0">
                            <Phone className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7.5px] text-white/50 uppercase tracking-widest leading-none mb-0.5">{t.card.front.phoneLabel}</span>
                            <span className="text-white text-sm font-bold tracking-wide drop-shadow-sm leading-tight">
                              {t.card.front.maskedPhone}
                            </span>
                          </div>
                        </div>

                        {/* Row 3: Blood Group */}
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full border border-[#c49a3c] flex items-center justify-center text-[#c49a3c] bg-stone-900/40 shrink-0">
                            <Droplet className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[7.5px] text-white/50 uppercase tracking-widest leading-none mb-0.5">{t.card.front.bloodLabel}</span>
                            <span className="text-white text-sm font-bold tracking-wide drop-shadow-sm leading-tight">
                              {t.card.front.bloodValue}
                            </span>
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Deep Green bottom emergency contact footer */}
                  <div className="bg-[#01331a] border-t-2 border-[#c49a3c] py-2 px-4 flex items-center justify-center gap-2">
                    <div className="w-5 h-5 rounded-full border border-[#ffdf8c]/50 flex items-center justify-center text-[#ffdf8c]">
                      <Phone className="w-3 h-3 fill-[#ffdf8c]" />
                    </div>
                    <p className="text-white text-[11px] font-bold tracking-wide">
                      {t.card.front.emergencyLabel} : 99526 93122 / 99524 93122
                    </p>
                  </div>
                  
                  {/* Gold outer border ring */}
                  <div className="absolute inset-0 rounded-2xl border border-[#c49a3c]/20 pointer-events-none"></div>
                </div>

                {/* --- OFFICIAL BACK OF CARD --- */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl border border-white/20 select-none bg-gradient-to-r from-[#4d050f] via-[#5a0914] to-[#1a2d21]"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  
                  {/* Elegant Golden Gopuram Outlines in Back Background */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.07] flex justify-between px-6 items-center">
                    {/* Left Gopuram Vector */}
                    <svg className="w-16 h-28 text-[#c49a3c]" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M50 10 L40 30 L60 30 Z M30 30 H70 V60 H30 Z M20 60 H80 V100 H20 Z M10 100 H90 V150 H10 Z M5 150 H95 V200 H5 Z" />
                      <line x1="50" y1="30" x2="50" y2="200" />
                    </svg>
                    {/* Right Gopuram Vector */}
                    <svg className="w-16 h-28 text-[#c49a3c]" viewBox="0 0 100 200" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M50 10 L40 30 L60 30 Z M30 30 H70 V60 H30 Z M20 60 H80 V100 H20 Z M10 100 H90 V150 H10 Z M5 150 H95 V200 H5 Z" />
                      <line x1="50" y1="30" x2="50" y2="200" />
                    </svg>
                  </div>

                  <div className="p-4 flex-1 flex flex-col items-center justify-between relative z-10">
                    
                    {/* Centered Large QR Code */}
                    <div className="w-[96px] h-[96px] bg-white p-1 rounded-xl flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.3)] relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      
                      {/* Customized Golden QR Code graphic with circular emblem in the center */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <svg className="w-full h-full text-[#c49a3c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                          <path d="M2 2h6v6H2V2zM2 16h6v6H2v-6zM16 2h6v6h-6V2z" />
                          <path d="M16 16h3v3h-3v-3zM19 19h3v3h-3v-3zM16 19h3v3h-3v-3z" />
                          <rect x="4" y="4" width="2" height="2" fill="currentColor" stroke="none" />
                          <rect x="4" y="18" width="2" height="2" fill="currentColor" stroke="none" />
                          <rect x="18" y="4" width="2" height="2" fill="currentColor" stroke="none" />
                          <path d="M11 2v4m0-4h2M2 11v2m0-2h2m14-2v2" />
                          <path d="M11 11h2v2h-2v-2z" />
                          <circle cx="12" cy="12" r="2.5" fill="white" stroke="white" strokeWidth="1" />
                        </svg>
                        {/* Miniature Circular Logo in the absolute center of the QR code */}
                        <div className="absolute inset-0 m-auto w-5 h-5 rounded-full border-[0.5px] border-[#c49a3c] bg-white p-0.5 flex items-center justify-center">
                          <img src={logo} alt="Emblem center" className="w-full h-full object-contain" />
                        </div>
                      </div>

                    </div>

                    {/* Scan caption in elegant Gold */}
                    <h4 className="text-[#ffdf8c] text-[11px] font-bold tracking-widest font-serif uppercase mt-2 text-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      {t.card.back.scanText}
                    </h4>

                    {/* Centered address in white */}
                    <p className="text-white text-[9px] font-medium leading-relaxed max-w-xs text-center font-serif opacity-90 mt-1 pb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      {t.card.back.address}
                    </p>

                  </div>

                  {/* Deep Green Bottom Website Footer */}
                  <div className="bg-[#01331a] border-t-2 border-[#c49a3c] py-2 px-4 flex items-center justify-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#ffdf8c]" />
                    <a 
                      href="https://kaadaikulam.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffdf8c] text-[11px] font-bold tracking-[0.2em] uppercase hover:underline"
                    >
                      {t.card.back.website}
                    </a>
                  </div>

                  {/* Gold outer border ring */}
                  <div className="absolute inset-0 rounded-2xl border border-[#c49a3c]/20 pointer-events-none"></div>
                </div>

              </motion.div>
            </div>

            {/* Hint Indicator */}
            <motion.p
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-stone-500 text-[11px] font-bold uppercase tracking-widest mt-4 flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5 rotate-45" />
              {t.card.flipHint}
            </motion.p>
          </div>

        </div>

        {/* 12 Advantages Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        >
          {t.advantages.map((advantage, index) => {
            const IconComponent = icons[index];

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => setActiveCardDetail(index)}
                className="bg-white/80 backdrop-blur-sm border border-[#c49a3c]/15 hover:border-[#c49a3c]/60 rounded-2xl p-8 flex flex-col items-start relative overflow-hidden group shadow-md hover:shadow-[0_15px_30px_rgba(196,154,60,0.12)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
              >
                {/* Subtle bottom gradient background inside the card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#c49a3c]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Number Badge */}
                <span className="absolute top-4 right-6 font-serif text-3xl font-extrabold text-stone-200 group-hover:text-[#c49a3c]/20 transition-colors pointer-events-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Animated Icon Container */}
                <div className="bg-gradient-to-br from-[#8b1d1d] to-[#5d1712] text-white p-3.5 rounded-xl shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <IconComponent className="w-6 h-6" />
                  {/* Subtle inner pulse glowing ring */}
                  <span className="absolute -inset-1 rounded-xl border border-white/20 animate-pulse pointer-events-none"></span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-[#5d1712] mb-3 relative z-10 leading-snug group-hover:text-[#8b1d1d] transition-colors">
                  {advantage.title}
                </h3>

                {/* Description */}
                <p className="text-stone-600 text-sm leading-relaxed relative z-10 font-normal opacity-90">
                  {advantage.desc}
                </p>

                {/* Decorative border highlight indicator */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#c49a3c] group-hover:h-[60%] transition-all duration-500 rounded-r" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA Box Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border-2 border-dashed border-[#c49a3c]/35 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl"
        >
          {/* Decorative Emblem Graphic in CTA Background */}
          <div className="absolute top-0 right-0 w-44 h-44 opacity-[0.03] pointer-events-none translate-x-6 -translate-y-6">
            <img src={logo} alt="Mandala" className="w-full h-full object-contain" />
          </div>

          <div className="flex flex-col items-start max-w-xl relative z-10">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#5d1712] mb-3 leading-tight">
              {language === "ta"
                ? "இன்றே உங்கள் அடையாள அட்டையைப் பெறுங்கள்"
                : "Obtain Your Official ID Card Today"}
            </h3>
            <p className="text-stone-600 text-base leading-relaxed">
              {language === "ta"
                ? "நமது குலத்தின் அதிகாரப்பூர்வ உறுப்பினராக இணைந்து, 12 பிரத்யேக நன்மைகளுடன் உங்கள் பாதுகாப்பான இயற்பியல் PVC அட்டை மற்றும் டிஜிட்டல் QR இணைப்பைப் பெற்றிடுங்கள்."
                : "Register in our secure portal, verify your family tree, and acquire your digital QR-enabled PVC card with full access to our community welfare benefits."}
            </p>
          </div>

          <a
            href="https://member.kaadaikulam.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-8 py-4 bg-[#c49a3c] hover:bg-[#b38a2c] text-white font-bold rounded-xl shadow-lg transition-all duration-300 text-center uppercase tracking-widest text-sm relative z-10 whitespace-nowrap active:scale-95 hover:-translate-y-0.5"
          >
            {language === "ta" ? "உறுப்பினர் பதிவு செய்ய" : "Become a Member"}
          </a>
        </motion.div>

      </div>

      {/* Detail Overlay Modal popup */}
      <AnimatePresence>
        {activeCardDetail !== null && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCardDetail(null)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-[#c49a3c]/30 text-center"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setActiveCardDetail(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Icon */}
              <div className="bg-gradient-to-br from-[#8b1d1d] to-[#5d1712] text-white p-5 rounded-full shadow-xl w-16 h-16 flex items-center justify-center mx-auto mb-6">
                {React.createElement(icons[activeCardDetail], { className: "w-8 h-8" })}
              </div>

              {/* Modal Content */}
              <span className="text-[10px] text-[#c49a3c] font-bold tracking-[0.3em] uppercase block mb-2">
                ADVANTAGE FEATURE #{activeCardDetail + 1}
              </span>

              <h3 className="font-serif text-2xl font-bold text-[#5d1712] mb-4">
                {t.advantages[activeCardDetail].title}
              </h3>

              <p className="text-stone-600 leading-relaxed mb-6">
                {t.advantages[activeCardDetail].desc}
              </p>

              {/* Action Button */}
              <a
                href="https://member.kaadaikulam.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3.5 bg-[#8b1d1d] hover:bg-[#5d1712] text-white font-bold rounded-xl shadow-lg transition-colors text-center uppercase tracking-widest text-xs"
              >
                {t.hero.applyBtn}
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IDCardBenefits;
