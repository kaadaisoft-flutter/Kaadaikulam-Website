import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.webp";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: t.home, path: "/" },
    { name: t.history, path: "/history" },
    { name: t.kulaguru, path: "/kulaguru" },
    { name: t.temples, path: "/temples" },
    { name: t.gallery, path: "/gallery" },
    { name: t.donation, path: "/donation" },
    { name: t.contact, path: "/contact" },
  ];

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Disable body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="w-full bg-[#c2b09a] text-stone-800 px-6 py-4 flex items-center justify-between font-sans sticky top-0 z-[110] shadow-sm">
        {/* Logo & Title */}
        <Link to="/" className="flex items-center gap-3">
          <motion.img
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={logo}
            alt="Poondurai Kaadai"
            className="w-12 h-12 object-contain"
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className={`font-serif text-[#5d1712] font-semibold tracking-wide transition-all duration-300 ${language === 'ta' ? 'text-[17px] md:text-[20px] leading-tight' : 'text-xl md:text-2xl'
              }`}
          >
            {language === 'en' ? 'Poondurai Kaadai' : 'பூந்துறை காடை'}
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden xl:flex items-center gap-5 xl:gap-7 font-medium tracking-wide ${language === 'ta' ? 'text-[11.5px] xl:text-[12.5px]' : 'text-[14px] xl:text-[15px]'
          }`}>
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                to={link.path}
                className={`hover:text-white transition-colors duration-300 ${location.pathname === link.path ? "text-white font-bold" : "text-stone-700"
                  }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          {/* Member Login / Signup */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * navLinks.length, duration: 0.5 }}
          >
            <a
              href="https://member.kaadaikulam.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors duration-300 text-stone-700 font-bold"
            >
              {t.login}
              <svg className="w-3.5 h-3.5 mix-blend-multiply" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </motion.div>
        </nav>

        {/* Right Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 md:gap-6"
        >
          {/* Language Switcher */}
          <div className="flex items-center border border-stone-800/20 rounded-[4px] overflow-hidden text-sm font-medium bg-stone-100/10">
            <button
              onClick={() => toggleLanguage('en')}
              className={`px-3 py-1.5 transition-all duration-300 ${language === 'en' ? "bg-[#d4a363] text-stone-900 shadow-inner" : "bg-transparent text-stone-700 hover:bg-white/20"
                }`}
            >
              EN
            </button>
            <button
              onClick={() => toggleLanguage('ta')}
              className={`px-3 py-1.5 transition-all duration-300 font-hindi ${language === 'ta' ? "bg-[#d4a363] text-stone-900 shadow-inner" : "bg-transparent text-stone-800 hover:bg-white/20"
                }`}
            >
              தமிழ்
            </button>
          </div>

          {/* Location Icon */}
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Sri+Angala+Amman+Temple+Avalpoondurai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300 hidden sm:block"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>

          {/* Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-[5px] justify-center hover:opacity-75 transition-opacity xl:hidden relative z-[120]"
          >
            <motion.span 
              animate={isMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-stone-800 origin-center"
            ></motion.span>
            <motion.span 
              animate={isMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-stone-800 origin-center"
            ></motion.span>
          </button>
        </motion.div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#c2b09a] z-[105] flex flex-col pt-32 px-10 xl:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-serif text-[#5d1712]">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={link.path}
                    className={`hover:text-white transition-colors duration-300 ${location.pathname === link.path ? "text-white font-bold" : "text-stone-800"
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * navLinks.length }}
                className="mt-4 pt-6 border-t border-stone-800/20"
              >
                <a
                  href="https://member.kaadaikulam.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors duration-300 text-stone-900 font-bold"
                >
                  {t.login}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
