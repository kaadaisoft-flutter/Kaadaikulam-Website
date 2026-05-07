import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="bg-[#3d2b27] text-white/80 py-10 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* Logo & About Column */}
          <div className="flex flex-col items-start gap-5">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-white/10 p-0.5 flex items-center justify-center border border-white/20 relative shadow-inner">
                 <img src={logo} alt="Poondurai Kaadai Logo" className="w-[85%] h-[85%] object-contain" />
                 <div className="absolute inset-0 rounded-full border border-white/10 scale-110"></div>
               </div>
               <h3 className="text-xl font-bold text-white tracking-wide font-serif drop-shadow-sm">{t.title}</h3>
             </div>
             <p className="text-sm leading-relaxed max-w-xs opacity-70">
               {t.description}
             </p>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="text-[#c49a3c] font-bold mb-6 text-[11px] uppercase tracking-[0.3em]">
              {t.explore.title}
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/temples" className="hover:text-[#c49a3c] transition-colors duration-300">{t.explore.temples}</Link></li>
              <li><Link to="/gallery" className="hover:text-[#c49a3c] transition-colors duration-300">{t.explore.gallery}</Link></li>
              <li><Link to="/kulaguru" className="hover:text-[#c49a3c] transition-colors duration-300">{t.explore.kulaguru}</Link></li>
            </ul>
          </div>

          {/* Online Services Column */}
          <div>
            <h4 className="text-[#c49a3c] font-bold mb-6 text-[11px] uppercase tracking-[0.3em]">
              {t.services.title}
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/donation" className="hover:text-[#c49a3c] transition-colors duration-300">{t.services.donation}</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-[#c49a3c] font-bold mb-6 text-[11px] uppercase tracking-[0.3em]">
              {t.connect.title}
            </h4>
            <ul className="space-y-3 text-sm font-medium">
              <li><Link to="/contact" className="hover:text-[#c49a3c] transition-colors duration-300">{t.connect.contact}</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] opacity-60 tracking-wider">
            © {new Date().getFullYear()} POONDURAI KAADAI. {t.rights}
          </p>
          <div className="flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase">
             <Link to="/privacy" className="hover:text-[#c49a3c] transition-colors duration-300">{t.privacy}</Link>
             <Link to="/terms" className="hover:text-[#c49a3c] transition-colors duration-300">{t.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
