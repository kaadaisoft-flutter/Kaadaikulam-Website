import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import pkknmLogo from "../assets/images/PKKMN_Logo.webp";
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
               <div className="w-32 h-28 rounded-full bg-[#3d2b27] p-1 flex items-center justify-center relative shadow-inner overflow-hidden">
                 <img src={pkknmLogo} alt="Poondurai Kaadaikula Narpani Mandram Logo" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 rounded-full border border-white/10 scale-110"></div>
               </div>
               <h3 className="text-base font-bold text-white tracking-wide font-serif drop-shadow-sm leading-snug max-w-[160px]">{t.title}</h3>
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
              <li><Link to="/kulaguru" className="hover:text-[#c49a3c] transition-colors duration-300">{t.explore.kulaguru}</Link></li>
              <li><Link to="/temples" className="hover:text-[#c49a3c] transition-colors duration-300">{t.explore.temples}</Link></li>
              <li><Link to="/gallery" className="hover:text-[#c49a3c] transition-colors duration-300">{t.explore.gallery}</Link></li>
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
            <div className="flex items-start gap-2 mt-4">
              <svg className="w-4 h-4 text-[#c49a3c] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs leading-relaxed opacity-70">{t.address}</p>
            </div>
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
