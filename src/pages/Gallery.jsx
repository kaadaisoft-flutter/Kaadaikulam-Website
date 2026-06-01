import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/Eswaran_Temple/DJI_20260429101906_0061_D.webp";
import templeFn from "../assets/images/temple fn.webp";
import kari_g1 from "../assets/Kariyakaliyamman_God/WhatsApp Image 2026-05-24 at 12.55.12 PM.webp";
import kari_g2 from "../assets/Kariyakaliyamman_God/WhatsApp Image 2026-06-01 at 11.59.37 AM.webp";



// Services
import { subscribeGalleryItems } from "../services/galleryService";
import { getTemples } from "../services/templeService";

// ── Angalamman Temple ──────────────────────────────────────────────────
import ang_t1 from "../assets/Angalamman_Temple/DJI_20260429100446_0036_D.webp";
import ang_t2 from "../assets/Angalamman_Temple/DJI_20260429100611_0039_D.webp";
import ang_t3 from "../assets/Angalamman_Temple/DJI_20260429100631_0040_D.webp";
import ang_t4 from "../assets/Angalamman_Temple/DJI_20260429100648_0041_D.webp";
import ang_t5 from "../assets/Angalamman_Temple/DJI_20260429100657_0042_D.webp";
import ang_t6 from "../assets/Angalamman_Temple/DJI_20260429101021_0053_D.webp";
import ang_t7 from "../assets/Angalamman_Temple/DJI_20260429101105_0055_D.webp";
import ang_t8 from "../assets/Angalamman_Temple/DJI_20260429101125_0056_D.webp";

// ── Eswaran Temple ────────────────────────────────────────────────────
import esw_t1  from "../assets/Eswaran_Temple/DJI_20260429094001_0001_D.webp";
import esw_t2  from "../assets/Eswaran_Temple/DJI_20260429094155_0005_D.webp";
import esw_t3  from "../assets/Eswaran_Temple/DJI_20260429094325_0008_D.webp";
import esw_t4  from "../assets/Eswaran_Temple/DJI_20260429094349_0009_D.webp";
import esw_t5  from "../assets/Eswaran_Temple/DJI_20260429094433_0011_D (1).webp";
import esw_t6  from "../assets/Eswaran_Temple/DJI_20260429094530_0013_D.webp";
import esw_t7  from "../assets/Eswaran_Temple/DJI_20260429094547_0015_D.webp";
import esw_t8  from "../assets/Eswaran_Temple/DJI_20260429094609_0017_D.webp";
import esw_t9  from "../assets/Eswaran_Temple/DJI_20260429094906_0023_D.webp";
import esw_t10 from "../assets/Eswaran_Temple/DJI_20260429100936_0051_D.webp";
import esw_t11 from "../assets/Eswaran_Temple/DJI_20260429101848_0059_D.webp";
import esw_t12 from "../assets/Eswaran_Temple/DJI_20260429101906_0061_D.webp";
import esw_t13 from "../assets/Eswaran_Temple/P - DJI_20260429094325_0008_D.webp";
import esw_t14 from "../assets/Eswaran_Temple/P - DJI_20260429101906_0061_D.webp";

// ── Perumal Temple ────────────────────────────────────────────────────
import per_t1 from "../assets/Perumal_Temple/DJI_20260429095535_0025_D.webp";
import per_t2 from "../assets/Perumal_Temple/DJI_20260429095651_0028_D.webp";
import per_t3 from "../assets/Perumal_Temple/DJI_20260429095745_0031_D.webp";
import per_t4 from "../assets/Perumal_Temple/DJI_20260429095752_0032_D.webp";
import per_t5 from "../assets/Perumal_Temple/DJI_20260429095817_0034_D0.webp";
import per_t6 from "../assets/Perumal_Temple/DJI_20260429100909_0049_D.webp";
import per_t7 from "../assets/Perumal_Temple/DJI_20260429100936_0051_D.webp";

// ── Angalamman God ────────────────────────────────────────────────────
import ang_g1  from "../assets/Angalamman_God/DSC01350.webp";
import ang_g2  from "../assets/Angalamman_God/DSC01359.webp";
import ang_g3  from "../assets/Angalamman_God/DSC01366.webp";
import ang_g4  from "../assets/Angalamman_God/DSC01381.webp";
import ang_g5  from "../assets/Angalamman_God/DSC01384.webp";
import ang_g6  from "../assets/Angalamman_God/DSC01392.webp";
import ang_g7  from "../assets/Angalamman_God/DSC01401.webp";
import ang_g8  from "../assets/Angalamman_God/DSC01403.webp";
import ang_g9  from "../assets/Angalamman_God/DSC01405.webp";

// ── Eswaran God ───────────────────────────────────────────────────────
import esw_g1  from "../assets/Eswaran_God/DSC01409.webp";
import esw_g2  from "../assets/Eswaran_God/DSC01415.webp";
import esw_g3  from "../assets/Eswaran_God/DSC01417.webp";
import esw_g4  from "../assets/Eswaran_God/DSC01419.webp";
import esw_g5  from "../assets/Eswaran_God/DSC01431.webp";
import esw_g6  from "../assets/Eswaran_God/DSC01435.webp";
import esw_g7  from "../assets/Eswaran_God/DSC01439.webp";
import esw_g8  from "../assets/Eswaran_God/DSC01444.webp";
import esw_g9  from "../assets/Eswaran_God/DSC01451.webp";
import esw_g10 from "../assets/Eswaran_God/DSC01454.webp";
import esw_g11 from "../assets/Eswaran_God/DSC01458.webp";
import esw_g12 from "../assets/Eswaran_God/DSC01464.webp";

// ── Perumal God ───────────────────────────────────────────────────────
import per_g1  from "../assets/Perumal_God/DSC01216.webp";
import per_g2  from "../assets/Perumal_God/DSC01229.webp";
import per_g3  from "../assets/Perumal_God/DSC01240.webp";
import per_g4  from "../assets/Perumal_God/DSC01245.webp";
import per_g5  from "../assets/Perumal_God/DSC01250.webp";
import per_g6  from "../assets/Perumal_God/DSC01254.webp";
import per_g7  from "../assets/Perumal_God/DSC01264.webp";
import per_g8  from "../assets/Perumal_God/DSC01288.webp";
import per_g9  from "../assets/Perumal_God/DSC01292.webp";
import per_g10 from "../assets/Perumal_God/DSC01293.webp";
import per_g11 from "../assets/Perumal_God/DSC01298.webp";
import per_g12 from "../assets/Perumal_God/DSC01311.webp";
import per_g13 from "../assets/Perumal_God/DSC01325.webp";
import per_g14 from "../assets/Perumal_God/DSC01334.webp";
import per_g15 from "../assets/Perumal_God/DSC01338.webp";
import per_g16 from "../assets/Perumal_God/DSC01341.webp";
import per_g17 from "../assets/Perumal_God/DSC01343.webp";
import per_g18 from "../assets/Perumal_God/DSC01345.webp";

// YouTube ID Extractor Helper
const extractYoutubeId = (url) => {
  if (!url) return "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : "";
};

/* ─── Masonry card (natural image height) ────────────────────────────── */
const MasonryCard = ({ item, index, onOpen }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: (index % 3) * 0.08 }}
      className="break-inside-avoid mb-5 group relative rounded-2xl overflow-hidden cursor-pointer
                 shadow-md hover:shadow-2xl transition-shadow duration-500 bg-stone-100"
      onClick={() => onOpen(item)}
    >
      {/* Video indicator badge */}
      {(item.type === "YouTube Video" || item.type === "Video Upload") && (
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#c49a3c] p-2.5 rounded-full z-10 border border-[#c49a3c]/30 shadow-md">
          <svg className="w-4 h-4 fill-[#c49a3c]" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}

      {/* Shimmer/Skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-200/50 animate-pulse flex items-center justify-center min-h-[200px]">
          <div className="w-6 h-6 border-2 border-[#5d1712]/30 border-t-[#5d1712] rounded-full animate-spin" />
        </div>
      )}

      {/* Image — natural height, no forced ratio */}
      <img
        src={item.image}
        alt={item.title}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto block transition-all duration-700 group-hover:scale-[1.04] ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        loading="lazy"
      />

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-400
                      flex flex-col justify-end p-5">
        <motion.div
          initial={false}
          className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-400"
        >
          <span className="text-[#c49a3c] text-[9px] uppercase font-bold tracking-[0.2em] mb-1 block">
            {item.category}
          </span>
          <h3 className="text-white font-serif text-base leading-snug mb-0.5">{item.title}</h3>
          {item.group && <p className="text-white/55 text-xs font-light italic">{item.group}</p>}
        </motion.div>
      </div>

      {/* Always-visible bottom tag strip */}
      {item.group && (
        <div className="absolute bottom-0 inset-x-0 h-10
                        bg-gradient-to-t from-black/50 to-transparent
                        group-hover:opacity-0 transition-opacity duration-300
                        flex items-end px-4 pb-2">
          <span className="text-white/70 text-[10px] font-medium truncate">{item.group}</span>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Masonry grid ───────────────────────────────────────────────────── */
const MasonryGrid = ({ items, onOpen }) => (
  <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
    {items.map((item, idx) => (
      <MasonryCard key={item.id} item={item} index={idx} onOpen={onOpen} />
    ))}
  </div>
);

/* ─── Grouped block component for lazy-rendering group items ─────────── */
const GroupedBlock = ({ name, items, groupLabel, countLabel, groupIdx, onOpen }) => {
  const [showAll, setShowAll] = useState(false);
  const initialLimit = 6;
  const displayedItems = showAll ? items : items.slice(0, initialLimit);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-5 mb-10">
        <span className="hidden sm:block w-10 h-[2px] bg-[#c49a3c] shrink-0 rounded-full" />
        <div className="flex-1 min-w-0">
          <p className="text-[#c49a3c] text-[10px] font-bold tracking-[0.35em] uppercase mb-1">
            {groupLabel}
          </p>
          <h2 className="font-serif text-2xl md:text-3xl text-[#5d1712] leading-tight">
            {name}
          </h2>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 bg-[#5d1712]/5
                         border border-[#c49a3c]/30 text-[#5d1712] text-xs font-bold
                         tracking-widest uppercase px-4 py-2 rounded-full">
          <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {items.length}&nbsp;{countLabel}
        </span>
        <span className="hidden md:block flex-1 h-px bg-gradient-to-r from-[#c49a3c]/40 to-transparent" />
      </div>

      {/* Masonry grid for this group */}
      <MasonryGrid items={displayedItems} onOpen={onOpen} />

      {/* Show More / Show Less Button for Group */}
      {items.length > initialLimit && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-2.5 bg-white hover:bg-[#5d1712] text-[#5d1712] hover:text-white border border-[#5d1712] hover:border-transparent font-bold tracking-wider uppercase rounded-full shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer text-[10px] md:text-xs"
          >
            {showAll ? "Show Less" : `Show More (+${items.length - initialLimit} photos)`}
          </button>
        </div>
      )}
    </motion.div>
  );
};

/* ─── Grouped section (Temples / Gods tabs) ──────────────────────────── */
const GroupedSection = ({ groups, groupLabel, countLabel, onOpen }) => (
  <div className="space-y-20">
    {groups.map(({ name, items }, groupIdx) => (
      <GroupedBlock
        key={name}
        name={name}
        items={items}
        groupLabel={groupLabel}
        countLabel={countLabel}
        groupIdx={groupIdx}
        onOpen={onOpen}
      />
    ))}
  </div>
);

/* ─── Main Gallery component ─────────────────────────────────────────── */
const Gallery = () => {
  const { language } = useLanguage();
  const t = translations[language].gallery;
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  // Dynamic States
  const [dynamicItems, setDynamicItems] = useState([]);
  const [temples, setTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemple, setSelectedTemple] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  // Fetch published gallery items
  useEffect(() => {
    const unsubscribe = subscribeGalleryItems((items) => {
      setDynamicItems(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch temples for filtering
  useEffect(() => {
    const fetchTemples = async () => {
      try {
        const data = await getTemples();
        setTemples(data);
      } catch (err) {
        console.error("Failed to load temples:", err);
      }
    };
    fetchTemples();
  }, []);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [language, activeCategory]);

  const scrollTabs = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 140;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  const isEn = language === "en";

  const ANG     = isEn ? "Sri Angalamman Temple, Erode"           : "ஸ்ரீ அருள்மிகு அங்காளம்மன் கோவில்";
  const ESW     = isEn ? "Sri Pushpavaneswara Swamy Temple, Erode" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி திருக்கோயில்";
  const PER     = isEn ? "Sri Damodara Perumal Temple, Erode"     : "ஸ்ரீ தாமோதர பெருமாள் திருக்கோயில்";
  const KARI    = isEn ? "Sri Karikaliamman Temple, Poondurai"   : "ஸ்ரீ கரியகாளியம்மன் திருக்கோவில்";
  
  const ANG_GOD = isEn ? "Sri Arulmigu Angalamman"                : "ஸ்ரீ அருள்மிகு அங்காளம்மன்";
  const ESW_GOD = isEn ? "Sri Pushpavaneswara Swamy"              : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி";
  const PER_GOD = isEn ? "Sri Damodara Perumal"                   : "ஸ்ரீ தாமோதர பெருமாள்";
  const KARI_GOD = isEn ? "Sri Karikaliamman"                    : "ஸ்ரீ கரியகாளியம்மன்";

  // Translate/Map Temple ID to local display name
  const mapTempleToGroup = (templeId, isEn) => {
    if (templeId === "sri-angalamman-temple") return ANG;
    if (templeId === "sri-pushpavaneswara-swamy-temple") return ESW;
    if (templeId === "sri-kariyakali-amman-temple") return KARI;
    if (templeId === "sri-damodara-perumal-temple") return PER;
    return "";
  };

  const mapTempleToGodGroup = (templeId, isEn) => {
    if (templeId === "sri-angalamman-temple") return ANG_GOD;
    if (templeId === "sri-pushpavaneswara-swamy-temple") return ESW_GOD;
    if (templeId === "sri-kariyakali-amman-temple") return KARI_GOD;
    if (templeId === "sri-damodara-perumal-temple") return PER_GOD;
    return "";
  };

  // Simplified gallery tabs/categories based on user request
  const categories = [
    { id: "All",                            label: t.categories.all },
    { id: "Festivals",                      label: t.categories.festivals },
    { id: "sri-kariyakali-amman-temple",    label: isEn ? "Sri Karikaliamman" : "ஸ்ரீ கரியகாளியம்மன்" },
    { id: "sri-angalamman-temple",          label: isEn ? "Sri Angalamman" : "ஸ்ரீ அங்காளம்மன்" },
    { id: "sri-pushpavaneswara-swamy-temple", label: isEn ? "Sri Pushpavaneswara Swamy" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி" },
    { id: "sri-damodara-perumal-temple",    label: isEn ? "Sri Damodara Perumal" : "ஸ்ரீ தாமோதர பெருமாள்" },
  ];

  // Static Local gallery items
  const staticGalleryItems = [
    // Festivals
    { id: "static-1",  title: isEn ? "48th Day Mandala Pooja"          : "48-வது நாள் மண்டல பூஜை",            category: "Festivals", image: templeFn,     group: ANG },

    // Temples – Angalamman
    { id: "static-2",  title: isEn ? "Sri Angalamman Temple – View 1"  : "அங்காளம்மன் கோவில் – காட்சி 1",  category: "Temples", image: ang_t1, group: ANG },
    { id: "static-3",  title: isEn ? "Sri Angalamman Temple – View 2"  : "அங்காளம்மன் கோவில் – காட்சி 2",  category: "Temples", image: ang_t2, group: ANG },
    { id: "static-4",  title: isEn ? "Sri Angalamman Temple – View 3"  : "அங்காளம்மன் கோவில் – காட்சி 3",  category: "Temples", image: ang_t3, group: ANG },
    { id: "static-5",  title: isEn ? "Sri Angalamman Temple – View 4"  : "அங்காளம்மன் கோவில் – காட்சி 4",  category: "Temples", image: ang_t4, group: ANG },
    { id: "static-6",  title: isEn ? "Sri Angalamman Temple – View 5"  : "அங்காளம்மன் கோவில் – காட்சி 5",  category: "Temples", image: ang_t5, group: ANG },
    { id: "static-7",  title: isEn ? "Sri Angalamman Temple – View 6"  : "அங்காளம்மன் கோவில் – காட்சி 6",  category: "Temples", image: ang_t6, group: ANG },
    { id: "static-8",  title: isEn ? "Sri Angalamman Temple – View 7"  : "அங்காளம்மன் கோவில் – காட்சி 7",  category: "Temples", image: ang_t7, group: ANG },
    { id: "static-9",  title: isEn ? "Sri Angalamman Temple – View 8"  : "அங்காளம்மன் கோவில் – காட்சி 8",  category: "Temples", image: ang_t8, group: ANG },

    // Temples – Eswaran
    { id: "static-10", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 1"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 1",  category: "Temples", image: esw_t1,  group: ESW },
    { id: "static-11", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 2"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 2",  category: "Temples", image: esw_t2,  group: ESW },
    { id: "static-12", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 3"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 3",  category: "Temples", image: esw_t3,  group: ESW },
    { id: "static-13", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 4"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 4",  category: "Temples", image: esw_t4,  group: ESW },
    { id: "static-14", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 5"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 5",  category: "Temples", image: esw_t5,  group: ESW },
    { id: "static-15", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 6"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 6",  category: "Temples", image: esw_t6,  group: ESW },
    { id: "static-16", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 7"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 7",  category: "Temples", image: esw_t7,  group: ESW },
    { id: "static-17", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 8"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 8",  category: "Temples", image: esw_t8,  group: ESW },
    { id: "static-18", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 9"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 9",  category: "Temples", image: esw_t9,  group: ESW },
    { id: "static-19", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 10" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 10", category: "Temples", image: esw_t10, group: ESW },
    { id: "static-20", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 11" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 11", category: "Temples", image: esw_t11, group: ESW },
    { id: "static-21", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 12" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 12", category: "Temples", image: esw_t12, group: ESW },
    { id: "static-22", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 13" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 13", category: "Temples", image: esw_t13, group: ESW },
    { id: "static-23", title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 14" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 14", category: "Temples", image: esw_t14, group: ESW },

    // Temples – Perumal
    { id: "static-24", title: isEn ? "Sri Damodara Perumal Temple – View 1" : "தாமோதர பெருமாள் கோவில் – காட்சி 1", category: "Temples", image: per_t1, group: PER },
    { id: "static-25", title: isEn ? "Sri Damodara Perumal Temple – View 2" : "தாமோதர பெருமாள் கோவில் – காட்சி 2", category: "Temples", image: per_t2, group: PER },
    { id: "static-26", title: isEn ? "Sri Damodara Perumal Temple – View 3" : "தாமோதர பெருமாள் கோவில் – காட்சி 3", category: "Temples", image: per_t3, group: PER },
    { id: "static-27", title: isEn ? "Sri Damodara Perumal Temple – View 4" : "தாமோதர பெருமாள் கோவில் – காட்சி 4", category: "Temples", image: per_t4, group: PER },
    { id: "static-28", title: isEn ? "Sri Damodara Perumal Temple – View 5" : "தாமோதர பெருமாள் கோவில் – காட்சி 5", category: "Temples", image: per_t5, group: PER },
    { id: "static-29", title: isEn ? "Sri Damodara Perumal Temple – View 6" : "தாமோதர பெருமாள் கோவில் – காட்சி 6", category: "Temples", image: per_t6, group: PER },
    { id: "static-30", title: isEn ? "Sri Damodara Perumal Temple – View 7" : "தாமோதர பெருமாள் கோவில் – காட்சி 7", category: "Temples", image: per_t7, group: PER },

    // Gods – Angalamman
    { id: "static-31", title: isEn ? "Sri Angalamman – Photo 1"  : "ஸ்ரீ அங்காளம்மன் – படம் 1",  category: "Gods", image: ang_g1,  group: ANG_GOD },
    { id: "static-32", title: isEn ? "Sri Angalamman – Photo 2"  : "ஸ்ரீ அங்காளம்மன் – படம் 2",  category: "Gods", image: ang_g2,  group: ANG_GOD },
    { id: "static-33", title: isEn ? "Sri Angalamman – Photo 3"  : "ஸ்ரீ அங்காளம்மன் – படம் 3",  category: "Gods", image: ang_g3,  group: ANG_GOD },
    { id: "static-34", title: isEn ? "Sri Angalamman – Photo 4"  : "ஸ்ரீ அங்காளம்மன் – படம் 4",  category: "Gods", image: ang_g4,  group: ANG_GOD },
    { id: "static-35", title: isEn ? "Sri Angalamman – Photo 5"  : "ஸ்ரீ அங்காளம்மன் – படம் 5",  category: "Gods", image: ang_g5,  group: ANG_GOD },
    { id: "static-36", title: isEn ? "Sri Angalamman – Photo 6"  : "ஸ்ரீ அங்காளம்மன் – படம் 6",  category: "Gods", image: ang_g6,  group: ANG_GOD },
    { id: "static-37", title: isEn ? "Sri Angalamman – Photo 7"  : "ஸ்ரீ அங்காளம்மன் – படம் 7",  category: "Gods", image: ang_g7,  group: ANG_GOD },
    { id: "static-38", title: isEn ? "Sri Angalamman – Photo 8"  : "ஸ்ரீ அங்காளம்மன் – படம் 8",  category: "Gods", image: ang_g8,  group: ANG_GOD },
    { id: "static-39", title: isEn ? "Sri Angalamman – Photo 9"  : "ஸ்ரீ அங்காளம்மன் – படம் 9",  category: "Gods", image: ang_g9,  group: ANG_GOD },

    // Gods – Eswaran
    { id: "static-40", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 1"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 1",  category: "Gods", image: esw_g1,  group: ESW_GOD },
    { id: "static-41", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 2"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 2",  category: "Gods", image: esw_g2,  group: ESW_GOD },
    { id: "static-42", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 3"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 3",  category: "Gods", image: esw_g3,  group: ESW_GOD },
    { id: "static-43", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 4"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 4",  category: "Gods", image: esw_g4,  group: ESW_GOD },
    { id: "static-44", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 5"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 5",  category: "Gods", image: esw_g5,  group: ESW_GOD },
    { id: "static-45", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 6"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 6",  category: "Gods", image: esw_g6,  group: ESW_GOD },
    { id: "static-46", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 7"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 7",  category: "Gods", image: esw_g7,  group: ESW_GOD },
    { id: "static-47", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 8"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 8",  category: "Gods", image: esw_g8,  group: ESW_GOD },
    { id: "static-48", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 9"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 9",  category: "Gods", image: esw_g9,  group: ESW_GOD },
    { id: "static-49", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 10" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 10", category: "Gods", image: esw_g10, group: ESW_GOD },
    { id: "static-50", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 11" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 11", category: "Gods", image: esw_g11, group: ESW_GOD },
    { id: "static-51", title: isEn ? "Sri Pushpavaneswara Swamy – Photo 12" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 12", category: "Gods", image: esw_g12, group: ESW_GOD },

    // Gods – Perumal
    { id: "static-52", title: isEn ? "Sri Damodara Perumal – Photo 1"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 1",  category: "Gods", image: per_g1,  group: PER_GOD },
    { id: "static-53", title: isEn ? "Sri Damodara Perumal – Photo 2"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 2",  category: "Gods", image: per_g2,  group: PER_GOD },
    { id: "static-54", title: isEn ? "Sri Damodara Perumal – Photo 3"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 3",  category: "Gods", image: per_g3,  group: PER_GOD },
    { id: "static-55", title: isEn ? "Sri Damodara Perumal – Photo 4"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 4",  category: "Gods", image: per_g4,  group: PER_GOD },
    { id: "static-56", title: isEn ? "Sri Damodara Perumal – Photo 5"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 5",  category: "Gods", image: per_g5,  group: PER_GOD },
    { id: "static-57", title: isEn ? "Sri Damodara Perumal – Photo 6"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 6",  category: "Gods", image: per_g6,  group: PER_GOD },
    { id: "static-58", title: isEn ? "Sri Damodara Perumal – Photo 7"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 7",  category: "Gods", image: per_g7,  group: PER_GOD },
    { id: "static-59", title: isEn ? "Sri Damodara Perumal – Photo 8"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 8",  category: "Gods", image: per_g8,  group: PER_GOD },
    { id: "static-60", title: isEn ? "Sri Damodara Perumal – Photo 9"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 9",  category: "Gods", image: per_g9,  group: PER_GOD },
    { id: "static-61", title: isEn ? "Sri Damodara Perumal – Photo 10" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 10", category: "Gods", image: per_g10, group: PER_GOD },
    { id: "static-62", title: isEn ? "Sri Damodara Perumal – Photo 11" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 11", category: "Gods", image: per_g11, group: PER_GOD },
    { id: "static-63", title: isEn ? "Sri Damodara Perumal – Photo 12" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 12", category: "Gods", image: per_g12, group: PER_GOD },
    { id: "static-64", title: isEn ? "Sri Damodara Perumal – Photo 13" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 13", category: "Gods", image: per_g13, group: PER_GOD },
    { id: "static-65", title: isEn ? "Sri Damodara Perumal – Photo 14" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 14", category: "Gods", image: per_g14, group: PER_GOD },
    { id: "static-66", title: isEn ? "Sri Damodara Perumal – Photo 15" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 15", category: "Gods", image: per_g15, group: PER_GOD },
    { id: "static-67", title: isEn ? "Sri Damodara Perumal – Photo 16" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 16", category: "Gods", image: per_g16, group: PER_GOD },
    { id: "static-68", title: isEn ? "Sri Damodara Perumal – Photo 17" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 17", category: "Gods", image: per_g17, group: PER_GOD },
    { id: "static-69", title: isEn ? "Sri Damodara Perumal – Photo 18" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 18", category: "Gods", image: per_g18, group: PER_GOD },
    { id: "static-70", title: isEn ? "Sri Kariyakali Amman – Photo 1" : "ஸ்ரீ கரியகாளியம்மன் – படம் 1", category: "Gods", image: kari_g1, group: KARI_GOD },
    { id: "static-71", title: isEn ? "Sri Kariyakali Amman – Photo 2" : "ஸ்ரீ கரியகாளியம்மன் – படம் 2", category: "Gods", image: kari_g2, group: KARI_GOD },
  ];

  // Map dynamic items from Firestore
  const mappedDynamicItems = dynamicItems.map(item => {
    // Map temple ID to group string
    const groupName = item.templeName ? (
      item.category === "Gods" 
        ? mapTempleToGodGroup(item.templeName, isEn)
        : mapTempleToGroup(item.templeName, isEn)
    ) : "";

    return {
      id: item.id,
      title: item.title,
      description: item.description || "",
      category: item.category,
      image: item.imageUrl || item.thumbnail || item.fullUrl,
      group: groupName,
      templeId: item.templeName || "",
      type: item.type || "Image",
      isDynamic: true,
      createdAt: item.createdAt,
    };
  });

  // Map static items to align categories and filter attributes
  const mappedStaticItems = staticGalleryItems.map(item => {
    let unifiedCategory = item.category;
    if (item.category === "Festivals") unifiedCategory = "Festival";
    if (item.category === "Temples") unifiedCategory = "Temple";

    let templeId = "";
    if (item.group === KARI || item.group === KARI_GOD) templeId = "sri-kariyakali-amman-temple";
    if (item.group === ANG || item.group === ANG_GOD) templeId = "sri-angalamman-temple";
    if (item.group === ESW || item.group === ESW_GOD) templeId = "sri-pushpavaneswara-swamy-temple";
    if (item.group === PER || item.group === PER_GOD) templeId = "sri-damodara-perumal-temple";

    return {
      ...item,
      category: unifiedCategory,
      templeId,
      isDynamic: false,
    };
  });

  // Combine dynamic uploads at the top, followed by static images
  const combinedItems = [...mappedDynamicItems, ...mappedStaticItems];

  // Apply filters mapping extra categories to Festivals and Temples
  const filteredItems = combinedItems.filter((item) => {
    // 1. Filter by category
    let matchesCategory = true;
    if (activeCategory !== "All") {
      if (activeCategory === "Festivals") {
        matchesCategory = 
          item.category === "Festival" || 
          item.category === "Festivals" ||
          item.category === "Events" ||
          item.category === "Pooja" ||
          item.category === "Annadhanam" ||
          item.category === "Special Days" ||
          item.category === "Others";
      } else if (
        activeCategory === "sri-kariyakali-amman-temple" ||
        activeCategory === "sri-angalamman-temple" ||
        activeCategory === "sri-pushpavaneswara-swamy-temple" ||
        activeCategory === "sri-damodara-perumal-temple"
      ) {
        matchesCategory = item.templeId === activeCategory;
      } else {
        matchesCategory = item.category === activeCategory;
      }
    }

    // 2. Filter by temple
    let matchesTemple = true;
    if (selectedTemple) {
      matchesTemple = item.templeId === selectedTemple;
    }

    // 3. Search by title
    let matchesSearch = true;
    if (searchQuery) {
      matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return matchesCategory && matchesTemple && matchesSearch;
  });

  // Paginated/Infinite Scroll Slice for Grid UI
  const paginatedItems = filteredItems.slice(0, visibleCount);

  const isGodTabActive = 
    activeCategory === "sri-kariyakali-amman-temple" ||
    activeCategory === "sri-angalamman-temple" ||
    activeCategory === "sri-pushpavaneswara-swamy-temple" ||
    activeCategory === "sri-damodara-perumal-temple";

  const godDeityItems = isGodTabActive
    ? filteredItems.filter((item) => item.category === "Gods" || item.category === "God")
    : [];

  const godTempleItems = isGodTabActive
    ? filteredItems.filter((item) => item.category === "Temple" || item.category === "Temples" || item.category === "Videos")
    : [];

  // Grouped Temples Grid Data
  const TEMPLE_ORDER = [KARI, ANG, ESW, PER];
  
  // Returns ALL god images for a given temple group name
  const getGodItems = (name) => {
    const godImageSets = {
      [ANG]: [
        { id: "god-ang-1",  image: ang_g1,  title: isEn ? "Sri Angalamman – Photo 1"  : "ஸ்ரீ அங்காளம்மன் – படம் 1",  templeId: "sri-angalamman-temple", group: ANG },
        { id: "god-ang-2",  image: ang_g2,  title: isEn ? "Sri Angalamman – Photo 2"  : "ஸ்ரீ அங்காளம்மன் – படம் 2",  templeId: "sri-angalamman-temple", group: ANG },
        { id: "god-ang-3",  image: ang_g3,  title: isEn ? "Sri Angalamman – Photo 3"  : "ஸ்ரீ அங்காளம்மன் – படம் 3",  templeId: "sri-angalamman-temple", group: ANG },
        { id: "god-ang-4",  image: ang_g4,  title: isEn ? "Sri Angalamman – Photo 4"  : "ஸ்ரீ அங்காளம்மன் – படம் 4",  templeId: "sri-angalamman-temple", group: ANG },
        { id: "god-ang-5",  image: ang_g5,  title: isEn ? "Sri Angalamman – Photo 5"  : "ஸ்ரீ அங்காளம்மன் – படம் 5",  templeId: "sri-angalamman-temple", group: ANG },
        { id: "god-ang-6",  image: ang_g6,  title: isEn ? "Sri Angalamman – Photo 6"  : "ஸ்ரீ அங்காளம்மன் – படம் 6",  templeId: "sri-angalamman-temple", group: ANG },
        { id: "god-ang-7",  image: ang_g7,  title: isEn ? "Sri Angalamman – Photo 7"  : "ஸ்ரீ அங்காளம்மன் – படம் 7",  templeId: "sri-angalamman-temple", group: ANG },
        { id: "god-ang-8",  image: ang_g8,  title: isEn ? "Sri Angalamman – Photo 8"  : "ஸ்ரீ அங்காளம்மன் – படம் 8",  templeId: "sri-angalamman-temple", group: ANG },
        { id: "god-ang-9",  image: ang_g9,  title: isEn ? "Sri Angalamman – Photo 9"  : "ஸ்ரீ அங்காளம்மன் – படம் 9",  templeId: "sri-angalamman-temple", group: ANG },
      ],
      [ESW]: [
        { id: "god-esw-1",  image: esw_g1,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 1"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 1",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-2",  image: esw_g2,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 2"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 2",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-3",  image: esw_g3,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 3"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 3",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-4",  image: esw_g4,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 4"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 4",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-5",  image: esw_g5,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 5"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 5",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-6",  image: esw_g6,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 6"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 6",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-7",  image: esw_g7,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 7"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 7",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-8",  image: esw_g8,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 8"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 8",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-9",  image: esw_g9,  title: isEn ? "Sri Pushpavaneswara Swamy – Photo 9"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 9",  templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-10", image: esw_g10, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 10" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 10", templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-11", image: esw_g11, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 11" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 11", templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
        { id: "god-esw-12", image: esw_g12, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 12" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 12", templeId: "sri-pushpavaneswara-swamy-temple", group: ESW },
      ],
      [KARI]: [
        { id: "god-kari-1", image: kari_g1, title: isEn ? "Sri Kariyakali Amman – Photo 1" : "ஸ்ரீ கரியகாளியம்மன் – படம் 1", templeId: "sri-kariyakali-amman-temple", group: KARI },
        { id: "god-kari-2", image: kari_g2, title: isEn ? "Sri Kariyakali Amman – Photo 2" : "ஸ்ரீ கரியகாளியம்மன் – படம் 2", templeId: "sri-kariyakali-amman-temple", group: KARI },
      ],
      [PER]: [
        { id: "god-per-1",  image: per_g1,  title: isEn ? "Sri Damodara Perumal – Photo 1"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 1",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-2",  image: per_g2,  title: isEn ? "Sri Damodara Perumal – Photo 2"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 2",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-3",  image: per_g3,  title: isEn ? "Sri Damodara Perumal – Photo 3"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 3",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-4",  image: per_g4,  title: isEn ? "Sri Damodara Perumal – Photo 4"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 4",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-5",  image: per_g5,  title: isEn ? "Sri Damodara Perumal – Photo 5"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 5",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-6",  image: per_g6,  title: isEn ? "Sri Damodara Perumal – Photo 6"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 6",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-7",  image: per_g7,  title: isEn ? "Sri Damodara Perumal – Photo 7"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 7",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-8",  image: per_g8,  title: isEn ? "Sri Damodara Perumal – Photo 8"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 8",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-9",  image: per_g9,  title: isEn ? "Sri Damodara Perumal – Photo 9"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 9",  templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-10", image: per_g10, title: isEn ? "Sri Damodara Perumal – Photo 10" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 10", templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-11", image: per_g11, title: isEn ? "Sri Damodara Perumal – Photo 11" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 11", templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-12", image: per_g12, title: isEn ? "Sri Damodara Perumal – Photo 12" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 12", templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-13", image: per_g13, title: isEn ? "Sri Damodara Perumal – Photo 13" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 13", templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-14", image: per_g14, title: isEn ? "Sri Damodara Perumal – Photo 14" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 14", templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-15", image: per_g15, title: isEn ? "Sri Damodara Perumal – Photo 15" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 15", templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-16", image: per_g16, title: isEn ? "Sri Damodara Perumal – Photo 16" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 16", templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-17", image: per_g17, title: isEn ? "Sri Damodara Perumal – Photo 17" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 17", templeId: "sri-damodara-perumal-temple", group: PER },
        { id: "god-per-18", image: per_g18, title: isEn ? "Sri Damodara Perumal – Photo 18" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 18", templeId: "sri-damodara-perumal-temple", group: PER },
      ],
    };
    return (godImageSets[name] || []).map(g => ({ ...g, category: "Temple" }));
  };

  const templeGroups = TEMPLE_ORDER.map((name) => {
    // Temple drone/exterior shots
    const templeShots = filteredItems.filter(
      (item) => (item.category === "Temple" || item.category === "Temples" || item.category === "Videos") && item.group === name
    );

    // All god images for this temple
    const godImages = getGodItems(name).filter((g) => {
      const matchesSearch = !searchQuery || g.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTemple = !selectedTemple || g.templeId === selectedTemple;
      return matchesSearch && matchesTemple;
    });

    // De-duplicate by image src (avoid duplicates if already in static list)
    const existingImages = new Set(templeShots.map(i => i.image));
    const newGodImages = godImages.filter(g => !existingImages.has(g.image));

    // Only one main god image first, then temple exterior shots
    const groupItems = [...newGodImages.slice(0, 1), ...templeShots];

    return { name, items: groupItems };
  }).filter((g) => g.items.length > 0);


  // Grouped Gods Grid Data
  const GOD_ORDER = [KARI_GOD, ANG_GOD, ESW_GOD, PER_GOD];
  const godGroups = GOD_ORDER.map((name) => {
    const groupItems = filteredItems.filter(
      (item) => item.category === "Gods" && item.group === name
    );
    return { name, items: groupItems };
  }).filter((g) => g.items.length > 0);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setSelectedTemple(""); // Reset dropdown filter when switching tabs
    setVisibleCount(12);
  };

  return (
    <div className="min-h-screen bg-sacred pt-0">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[550px] md:h-[600px] lg:h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt={t.hero.label} className="w-full h-full object-cover object-[center_30%]" />
        </div>
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
                <span className="w-12 h-[1.5px] bg-[#c49a3c]" />
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

      {/* ── Gallery Section ─────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6">

        {/* Category Filter Scroll Container */}
        <div className="relative w-full mb-8 flex items-center">
          {/* Left Arrow Indicator Button */}
          <AnimatePresence>
            {showLeftArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => scrollTabs("left")}
                className="absolute left-1 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-stone-100/80 flex items-center justify-center text-[#5d1712] md:hidden cursor-pointer"
                aria-label="Scroll Left"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-row justify-start md:justify-center overflow-x-auto scrollbar-none w-full -mx-6 px-6 pb-2 gap-3 whitespace-nowrap md:flex-wrap md:overflow-visible md:-mx-0 md:px-0"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`relative px-6 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 select-none cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "bg-white text-stone-500 hover:text-[#c49a3c] border border-stone-100/80 shadow-sm"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeCategoryBg"
                      className="absolute inset-0 bg-[#5d1712] rounded-full shadow-md z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Arrow Indicator Button */}
          <AnimatePresence>
            {showRightArrow && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => scrollTabs("right")}
                className="absolute right-1 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-stone-100/80 flex items-center justify-center text-[#5d1712] md:hidden cursor-pointer"
                aria-label="Scroll Right"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Search & Temple Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 w-full bg-stone-50/50 border border-stone-200/50 p-5 rounded-2xl shadow-sm">
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder={isEn ? "Search by title..." : "தலைப்பு மூலம் தேடுக..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(12);
              }}
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#5d1712]/20 focus:border-[#5d1712] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Temple select */}
          {activeCategory !== "sri-kariyakali-amman-temple" &&
           activeCategory !== "sri-angalamman-temple" &&
           activeCategory !== "sri-pushpavaneswara-swamy-temple" &&
           activeCategory !== "sri-damodara-perumal-temple" && (
            <div className="relative w-full md:w-72">
              <select
                value={selectedTemple}
                onChange={(e) => {
                  setSelectedTemple(e.target.value);
                  setVisibleCount(12);
                }}
                className="w-full pl-4 pr-10 py-2.5 bg-white border border-stone-200 rounded-xl text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#5d1712]/20 focus:border-[#5d1712] transition-all text-stone-700 font-medium cursor-pointer"
              >
                <option value="">{isEn ? "All Temples" : "அனைத்து கோவில்கள்"}</option>
                {temples.map((temple) => (
                  <option key={temple.id} value={temple.id}>
                    {isEn ? temple.name : temple.nameTa}
                  </option>
                ))}
              </select>
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-stone-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-9 w-9 border-t-2 border-b-2 border-[#5d1712]" />
            <p className="text-stone-500 text-sm mt-3 font-medium">
              {isEn ? "Loading gallery..." : "படக்காட்சி ஏற்றப்படுகிறது..."}
            </p>
          </div>
        )}

        {/* No items found */}
        {!loading && filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-stone-500 text-base">
              {isEn ? "No items found matching your filters." : "உங்களின் வடிப்பான்களுக்குப் பொருந்தும் படங்கள் எதுவும் இல்லை."}
            </p>
          </div>
        )}

        {/* God Deity & Temple separated sections */}
        {!loading && isGodTabActive && (
          <div className="space-y-24">
            {godDeityItems.length > 0 && (
              <GroupedBlock
                name={activeCategory === "sri-kariyakali-amman-temple" ? KARI_GOD :
                      activeCategory === "sri-angalamman-temple" ? ANG_GOD :
                      activeCategory === "sri-pushpavaneswara-swamy-temple" ? ESW_GOD :
                      activeCategory === "sri-damodara-perumal-temple" ? PER_GOD : ""}
                items={godDeityItems}
                groupLabel={isEn ? "Deity" : "தெய்வம்"}
                countLabel={isEn ? "Photos" : "படங்கள்"}
                groupIdx={0}
                onOpen={setLightbox}
              />
            )}

            {godTempleItems.length > 0 && (
              <GroupedBlock
                name={activeCategory === "sri-kariyakali-amman-temple" ? KARI :
                      activeCategory === "sri-angalamman-temple" ? ANG :
                      activeCategory === "sri-pushpavaneswara-swamy-temple" ? ESW :
                      activeCategory === "sri-damodara-perumal-temple" ? PER : ""}
                items={godTempleItems}
                groupLabel={isEn ? "Temple" : "கோவில்"}
                countLabel={isEn ? "Photos" : "படங்கள்"}
                groupIdx={1}
                onOpen={setLightbox}
              />
            )}
          </div>
        )}

        {/* Gallery Grid UI (All / Festivals) */}
        {!loading && !isGodTabActive && (
          <>
            <MasonryGrid items={paginatedItems} onOpen={setLightbox} />
            
            {/* Load More Button */}
            {visibleCount < filteredItems.length && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-8 py-3 bg-[#5d1712] hover:bg-[#800000] text-white font-bold tracking-widest uppercase rounded-full shadow-md transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-xs md:text-sm"
                >
                  {isEn ? "Load More" : "மேலும் காட்டுக"}
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[150] bg-black/92 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === "YouTube Video" ? (
                <div className="relative pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYoutubeId(lightbox.image)}`}
                    title={lightbox.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  />
                </div>
              ) : lightbox.type === "Video Upload" ? (
                <video
                  src={lightbox.image}
                  controls
                  autoPlay
                  className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl bg-black"
                />
              ) : (
                <img
                  src={lightbox.image}
                  alt={lightbox.title}
                  className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
                />
              )}

              <div className="mt-5 text-center px-4">
                <h3 className="text-white font-serif text-xl md:text-2xl">{lightbox.title}</h3>
                {lightbox.description && (
                  <p className="text-white/70 text-sm mt-2 max-w-xl mx-auto font-light leading-relaxed">
                    {lightbox.description}
                  </p>
                )}
                {lightbox.group && (
                  <p className="text-[#c49a3c] text-xs mt-2 uppercase font-bold tracking-widest">{lightbox.group}</p>
                )}
              </div>
              
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white/20 hover:bg-white/40
                           backdrop-blur-md rounded-full flex items-center justify-center
                           text-white text-lg font-light transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
