import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import img1 from "../assets/Angalamman_Temple/Angalamman_Hero.webp";
import img2 from "../assets/Eswaran_Temple/Eswaran_Temple_Hero.webp";
import img3 from "../assets/images/karikaliaman_1-BmA6tM5O.webp";
import img4 from "../assets/Perumal_Temple/Peruma_Hero.webp";
import logo from "../assets/logo.webp";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import { subscribeGalleryItems } from "../services/galleryService";

// YouTube ID Extractor Helper
const extractYoutubeId = (url) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
};

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { language } = useLanguage();
  const t = translations[language].hero;

  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const bgImages = [logo, img3, img1, img2, img4];

  useEffect(() => {
    // Preload background images to prevent flash/jank during slide transitions
    bgImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 5);
    }, 5000);

    const unsubscribeVideos = subscribeGalleryItems((items) => {
      const videoItems = items.filter(
        (item) => item.type === "YouTube Video" || item.type === "Video Upload"
      );
      if (videoItems.length > 0) {
        // Prioritize featured video, fallback to the latest video
        const featured = videoItems.find((v) => v.featured) || videoItems[0];
        setFeaturedVideo(featured);
      } else {
        setFeaturedVideo(null);
      }
    });

    return () => {
      clearInterval(interval);
      unsubscribeVideos();
    };
  }, []);

  // Prevent scroll when video modal is open
  useEffect(() => {
    if (isVideoOpen) {
      document.body.style.overflow = "hidden";
      if (window.lenis && typeof window.lenis.stop === 'function') window.lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start();
    };
  }, [isVideoOpen]);

  const slideVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1.2 } },
    exit: { opacity: 0, transition: { duration: 1.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative w-full h-[550px] md:h-[600px] lg:h-[650px] bg-[#fdfcf7] overflow-hidden flex items-center justify-center font-sans mt-0">

      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={activeIndex}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            {activeIndex === 0 ? (
              <div 
                className="w-full h-full flex items-center justify-center lg:justify-end p-8 md:p-16 lg:p-24 lg:pr-[12%] bg-sacred-home"
                style={{ backgroundAttachment: "scroll" }}
              >
                <img
                  src={bgImages[0]}
                  alt="Clan Logo"
                  className="max-w-[70%] max-h-[70%] lg:max-w-full lg:max-h-full object-contain drop-shadow-xl relative z-10"
                />
              </div>
            ) : (
              <img
                src={bgImages[activeIndex]}
                alt={`Background ${activeIndex}`}
                className="w-full h-full object-cover object-[center_35%]"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sophisticated Dark Overlay - Reduced Opacity */}
      <div className="absolute inset-0 z-[1] bg-black/25 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/45 via-black/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Column: Text Content */}
          <div className="flex flex-col items-start max-w-xl min-h-[360px] sm:min-h-[340px] lg:min-h-[320px] justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${language}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-start"
              >
                {/* Top Label */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-[1.5px] bg-[#c49a3c]"></span>
                  <span className="text-[#c49a3c] font-bold tracking-[0.35em] uppercase text-[14px]">
                    {t.label}
                  </span>
                </div>

                {/* Heading */}
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-white mb-6 drop-shadow-lg">
                  {t.items[activeIndex].title}
                </h1>

                {/* Paragraph Body Text */}
                <p className="text-white/90 text-base md:text-xl leading-relaxed mb-10 font-light drop-shadow-md">
                  {t.items[activeIndex].text}
                </p>

                {/* Buttons Layout */}
                <div className="flex flex-wrap items-center gap-6 mb-10">
                  <Link
                    to={activeIndex === 0 ? "/clan-grandeur" : "/temples"}
                    className="group relative px-10 py-3.5 border-2 border-white/80 text-white rounded-full font-bold overflow-hidden transition-all hover:text-stone-900 flex items-center justify-center text-sm md:text-base tracking-widest uppercase"
                  >
                    <span className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    <span className="relative z-10 flex items-center gap-2">
                      {activeIndex === 0 ? t.exploreClan : t.explore}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </Link>

                  {featuredVideo && (
                    <button
                      onClick={() => setIsVideoOpen(true)}
                      className="group flex items-center gap-2 text-white hover:text-[#c49a3c] font-bold text-sm md:text-base tracking-widest uppercase transition-colors duration-300 pb-1 cursor-pointer border-b border-transparent hover:border-[#c49a3c]"
                    >
                      <svg className="w-5 h-5 fill-current shrink-0 text-[#c49a3c] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>
                        {language === "ta" 
                          ? `காணொளி: ${featuredVideo.titleTa || featuredVideo.title}` 
                          : `Watch Video: ${featuredVideo.title}`}
                      </span>
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Video Popup Modal */}
      <AnimatePresence>
        {isVideoOpen && featuredVideo && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-stone-900 rounded-3xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-stone-800 bg-stone-950 shrink-0">
                <h3 className="text-white font-serif text-lg md:text-xl font-bold truncate max-w-[80%]">
                  {language === "ta" ? (featuredVideo.titleTa || featuredVideo.title) : featuredVideo.title}
                </h3>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-full transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body / Player */}
              <div className="bg-black relative pb-[56.25%] h-0 w-full">
                {featuredVideo.type === "YouTube Video" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYoutubeId(featuredVideo.fullUrl || featuredVideo.imageUrl)}?autoplay=1&rel=0`}
                    title={language === "ta" ? (featuredVideo.titleTa || featuredVideo.title) : featuredVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                ) : (
                  <video
                    src={featuredVideo.fullUrl}
                    controls
                    autoPlay
                    className="absolute top-0 left-0 w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Modal Footer (Description if available) */}
              {featuredVideo.description && (
                <div className="p-5 border-t border-stone-800 bg-stone-950/80 text-stone-400 text-sm font-light leading-relaxed max-h-24 overflow-y-auto">
                  {featuredVideo.description}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
