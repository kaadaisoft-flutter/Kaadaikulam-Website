import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/Eswaran_Temple/DJI_20260429101906_0061_D.webp";
import templeFn from "../assets/images/temple fn.webp";


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

/* ─── Masonry card (natural image height) ────────────────────────────── */
const MasonryCard = ({ item, index, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
    transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1], delay: (index % 3) * 0.08 }}
    className="break-inside-avoid mb-5 group relative rounded-2xl overflow-hidden cursor-pointer
               shadow-md hover:shadow-2xl transition-shadow duration-500 bg-white"
    onClick={() => onOpen(item)}
  >
    {/* Image — natural height, no forced ratio */}
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.04]"
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
        <p className="text-white/55 text-xs font-light italic">{item.group}</p>
      </motion.div>
    </div>

    {/* Always-visible bottom tag strip */}
    <div className="absolute bottom-0 inset-x-0 h-10
                    bg-gradient-to-t from-black/50 to-transparent
                    group-hover:opacity-0 transition-opacity duration-300
                    flex items-end px-4 pb-2">
      <span className="text-white/70 text-[10px] font-medium truncate">{item.group}</span>
    </div>
  </motion.div>
);

/* ─── Masonry grid ───────────────────────────────────────────────────── */
const MasonryGrid = ({ items, onOpen }) => (
  <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
    {items.map((item, idx) => (
      <MasonryCard key={item.id} item={item} index={idx} onOpen={onOpen} />
    ))}
  </div>
);

/* ─── Grouped section (Temples / Gods tabs) ──────────────────────────── */
const GroupedSection = ({ groups, groupLabel, countLabel, onOpen }) => (
  <div className="space-y-20">
    {groups.map(({ name, items }, groupIdx) => (
      <motion.div
        key={name}
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
        <MasonryGrid items={items} onOpen={onOpen} />
      </motion.div>
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
  const ANG_GOD = isEn ? "Sri Arulmigu Angalamman"                : "ஸ்ரீ அருள்மிகு அங்காளம்மன்";
  const ESW_GOD = isEn ? "Sri Pushpavaneswara Swamy"              : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி";
  const PER_GOD = isEn ? "Sri Damodara Perumal"                   : "ஸ்ரீ தாமோதர பெருமாள்";

  const categories = [
    { id: "All",       label: t.categories.all },
    { id: "Festivals", label: t.categories.festivals },
    { id: "Temples",   label: t.categories.temples },
    { id: "Gods",      label: t.categories.gods },
  ];

  const galleryItems = [
    // Festivals
    { id: 1,  title: isEn ? "48th Day Mandala Pooja"          : "48-வது நாள் மண்டல பூஜை",            category: "Festivals", image: templeFn,     group: ANG },

    // Temples – Angalamman
    { id: 2,  title: isEn ? "Sri Angalamman Temple – View 1"  : "அங்காளம்மன் கோவில் – காட்சி 1",  category: "Temples", image: ang_t1, group: ANG },
    { id: 3,  title: isEn ? "Sri Angalamman Temple – View 2"  : "அங்காளம்மன் கோவில் – காட்சி 2",  category: "Temples", image: ang_t2, group: ANG },
    { id: 4,  title: isEn ? "Sri Angalamman Temple – View 3"  : "அங்காளம்மன் கோவில் – காட்சி 3",  category: "Temples", image: ang_t3, group: ANG },
    { id: 5,  title: isEn ? "Sri Angalamman Temple – View 4"  : "அங்காளம்மன் கோவில் – காட்சி 4",  category: "Temples", image: ang_t4, group: ANG },
    { id: 6,  title: isEn ? "Sri Angalamman Temple – View 5"  : "அங்காளம்மன் கோவில் – காட்சி 5",  category: "Temples", image: ang_t5, group: ANG },
    { id: 7,  title: isEn ? "Sri Angalamman Temple – View 6"  : "அங்காளம்மன் கோவில் – காட்சி 6",  category: "Temples", image: ang_t6, group: ANG },
    { id: 8,  title: isEn ? "Sri Angalamman Temple – View 7"  : "அங்காளம்மன் கோவில் – காட்சி 7",  category: "Temples", image: ang_t7, group: ANG },
    { id: 9,  title: isEn ? "Sri Angalamman Temple – View 8"  : "அங்காளம்மன் கோவில் – காட்சி 8",  category: "Temples", image: ang_t8, group: ANG },

    // Temples – Eswaran
    { id: 10, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 1"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 1",  category: "Temples", image: esw_t1,  group: ESW },
    { id: 11, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 2"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 2",  category: "Temples", image: esw_t2,  group: ESW },
    { id: 12, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 3"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 3",  category: "Temples", image: esw_t3,  group: ESW },
    { id: 13, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 4"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 4",  category: "Temples", image: esw_t4,  group: ESW },
    { id: 14, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 5"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 5",  category: "Temples", image: esw_t5,  group: ESW },
    { id: 15, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 6"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 6",  category: "Temples", image: esw_t6,  group: ESW },
    { id: 16, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 7"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 7",  category: "Temples", image: esw_t7,  group: ESW },
    { id: 17, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 8"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 8",  category: "Temples", image: esw_t8,  group: ESW },
    { id: 18, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 9"  : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 9",  category: "Temples", image: esw_t9,  group: ESW },
    { id: 19, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 10" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 10", category: "Temples", image: esw_t10, group: ESW },
    { id: 20, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 11" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 11", category: "Temples", image: esw_t11, group: ESW },
    { id: 21, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 12" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 12", category: "Temples", image: esw_t12, group: ESW },
    { id: 22, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 13" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 13", category: "Temples", image: esw_t13, group: ESW },
    { id: 23, title: isEn ? "Sri Pushpavaneswara Swamy Temple – View 14" : "புஷ்பவனேசுவர சுவாமி கோவில் – காட்சி 14", category: "Temples", image: esw_t14, group: ESW },

    // Temples – Perumal
    { id: 24, title: isEn ? "Sri Damodara Perumal Temple – View 1" : "தாமோதர பெருமாள் கோவில் – காட்சி 1", category: "Temples", image: per_t1, group: PER },
    { id: 25, title: isEn ? "Sri Damodara Perumal Temple – View 2" : "தாமோதர பெருமாள் கோவில் – காட்சி 2", category: "Temples", image: per_t2, group: PER },
    { id: 26, title: isEn ? "Sri Damodara Perumal Temple – View 3" : "தாமோதர பெருமாள் கோவில் – காட்சி 3", category: "Temples", image: per_t3, group: PER },
    { id: 27, title: isEn ? "Sri Damodara Perumal Temple – View 4" : "தாமோதர பெருமாள் கோவில் – காட்சி 4", category: "Temples", image: per_t4, group: PER },
    { id: 28, title: isEn ? "Sri Damodara Perumal Temple – View 5" : "தாமோதர பெருமாள் கோவில் – காட்சி 5", category: "Temples", image: per_t5, group: PER },
    { id: 29, title: isEn ? "Sri Damodara Perumal Temple – View 6" : "தாமோதர பெருமாள் கோவில் – காட்சி 6", category: "Temples", image: per_t6, group: PER },
    { id: 30, title: isEn ? "Sri Damodara Perumal Temple – View 7" : "தாமோதர பெருமாள் கோவில் – காட்சி 7", category: "Temples", image: per_t7, group: PER },

    // Gods – Angalamman
    { id: 31, title: isEn ? "Sri Angalamman – Photo 1"  : "ஸ்ரீ அங்காளம்மன் – படம் 1",  category: "Gods", image: ang_g1,  group: ANG_GOD },
    { id: 32, title: isEn ? "Sri Angalamman – Photo 2"  : "ஸ்ரீ அங்காளம்மன் – படம் 2",  category: "Gods", image: ang_g2,  group: ANG_GOD },
    { id: 33, title: isEn ? "Sri Angalamman – Photo 3"  : "ஸ்ரீ அங்காளம்மன் – படம் 3",  category: "Gods", image: ang_g3,  group: ANG_GOD },
    { id: 34, title: isEn ? "Sri Angalamman – Photo 4"  : "ஸ்ரீ அங்காளம்மன் – படம் 4",  category: "Gods", image: ang_g4,  group: ANG_GOD },
    { id: 35, title: isEn ? "Sri Angalamman – Photo 5"  : "ஸ்ரீ அங்காளம்மன் – படம் 5",  category: "Gods", image: ang_g5,  group: ANG_GOD },
    { id: 36, title: isEn ? "Sri Angalamman – Photo 6"  : "ஸ்ரீ அங்காளம்மன் – படம் 6",  category: "Gods", image: ang_g6,  group: ANG_GOD },
    { id: 37, title: isEn ? "Sri Angalamman – Photo 7"  : "ஸ்ரீ அங்காளம்மன் – படம் 7",  category: "Gods", image: ang_g7,  group: ANG_GOD },
    { id: 38, title: isEn ? "Sri Angalamman – Photo 8"  : "ஸ்ரீ அங்காளம்மன் – படம் 8",  category: "Gods", image: ang_g8,  group: ANG_GOD },
    { id: 39, title: isEn ? "Sri Angalamman – Photo 9"  : "ஸ்ரீ அங்காளம்மன் – படம் 9",  category: "Gods", image: ang_g9,  group: ANG_GOD },

    // Gods – Eswaran
    { id: 40, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 1"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 1",  category: "Gods", image: esw_g1,  group: ESW_GOD },
    { id: 41, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 2"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 2",  category: "Gods", image: esw_g2,  group: ESW_GOD },
    { id: 42, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 3"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 3",  category: "Gods", image: esw_g3,  group: ESW_GOD },
    { id: 43, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 4"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 4",  category: "Gods", image: esw_g4,  group: ESW_GOD },
    { id: 44, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 5"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 5",  category: "Gods", image: esw_g5,  group: ESW_GOD },
    { id: 45, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 6"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 6",  category: "Gods", image: esw_g6,  group: ESW_GOD },
    { id: 46, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 7"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 7",  category: "Gods", image: esw_g7,  group: ESW_GOD },
    { id: 47, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 8"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 8",  category: "Gods", image: esw_g8,  group: ESW_GOD },
    { id: 48, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 9"  : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 9",  category: "Gods", image: esw_g9,  group: ESW_GOD },
    { id: 49, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 10" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 10", category: "Gods", image: esw_g10, group: ESW_GOD },
    { id: 50, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 11" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 11", category: "Gods", image: esw_g11, group: ESW_GOD },
    { id: 51, title: isEn ? "Sri Pushpavaneswara Swamy – Photo 12" : "ஸ்ரீ புஷ்பவனேசுவர சுவாமி – படம் 12", category: "Gods", image: esw_g12, group: ESW_GOD },

    // Gods – Perumal
    { id: 52, title: isEn ? "Sri Damodara Perumal – Photo 1"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 1",  category: "Gods", image: per_g1,  group: PER_GOD },
    { id: 53, title: isEn ? "Sri Damodara Perumal – Photo 2"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 2",  category: "Gods", image: per_g2,  group: PER_GOD },
    { id: 54, title: isEn ? "Sri Damodara Perumal – Photo 3"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 3",  category: "Gods", image: per_g3,  group: PER_GOD },
    { id: 55, title: isEn ? "Sri Damodara Perumal – Photo 4"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 4",  category: "Gods", image: per_g4,  group: PER_GOD },
    { id: 56, title: isEn ? "Sri Damodara Perumal – Photo 5"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 5",  category: "Gods", image: per_g5,  group: PER_GOD },
    { id: 57, title: isEn ? "Sri Damodara Perumal – Photo 6"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 6",  category: "Gods", image: per_g6,  group: PER_GOD },
    { id: 58, title: isEn ? "Sri Damodara Perumal – Photo 7"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 7",  category: "Gods", image: per_g7,  group: PER_GOD },
    { id: 59, title: isEn ? "Sri Damodara Perumal – Photo 8"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 8",  category: "Gods", image: per_g8,  group: PER_GOD },
    { id: 60, title: isEn ? "Sri Damodara Perumal – Photo 9"  : "ஸ்ரீ தாமோதர பெருமாள் – படம் 9",  category: "Gods", image: per_g9,  group: PER_GOD },
    { id: 61, title: isEn ? "Sri Damodara Perumal – Photo 10" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 10", category: "Gods", image: per_g10, group: PER_GOD },
    { id: 62, title: isEn ? "Sri Damodara Perumal – Photo 11" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 11", category: "Gods", image: per_g11, group: PER_GOD },
    { id: 63, title: isEn ? "Sri Damodara Perumal – Photo 12" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 12", category: "Gods", image: per_g12, group: PER_GOD },
    { id: 64, title: isEn ? "Sri Damodara Perumal – Photo 13" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 13", category: "Gods", image: per_g13, group: PER_GOD },
    { id: 65, title: isEn ? "Sri Damodara Perumal – Photo 14" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 14", category: "Gods", image: per_g14, group: PER_GOD },
    { id: 66, title: isEn ? "Sri Damodara Perumal – Photo 15" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 15", category: "Gods", image: per_g15, group: PER_GOD },
    { id: 67, title: isEn ? "Sri Damodara Perumal – Photo 16" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 16", category: "Gods", image: per_g16, group: PER_GOD },
    { id: 68, title: isEn ? "Sri Damodara Perumal – Photo 17" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 17", category: "Gods", image: per_g17, group: PER_GOD },
    { id: 69, title: isEn ? "Sri Damodara Perumal – Photo 18" : "ஸ்ரீ தாமோதர பெருமாள் – படம் 18", category: "Gods", image: per_g18, group: PER_GOD },
  ];

  const filteredItems =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const TEMPLE_ORDER = [ANG, ESW, PER];
  const templeGroups = TEMPLE_ORDER.map((name) => ({
    name,
    items: galleryItems.filter((i) => i.category === "Temples" && i.group === name),
  })).filter((g) => g.items.length > 0);

  const GOD_ORDER = [ANG_GOD, ESW_GOD, PER_GOD];
  const godGroups = GOD_ORDER.map((name) => ({
    name,
    items: galleryItems.filter((i) => i.category === "Gods" && i.group === name),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-sacred pt-0">

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[360px] md:h-[420px] lg:h-[480px] flex items-center overflow-hidden">
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

      {/* ── Gallery ─────────────────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6">

        {/* Filter pills */}
        <div className="relative w-full mb-16 flex items-center">
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
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-6 py-2.5 md:px-8 md:py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 select-none ${
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

        {/* Temples – grouped masonry */}
        {activeCategory === "Temples" && (
          <GroupedSection
            groups={templeGroups}
            groupLabel={isEn ? "Temple" : "கோவில்"}
            countLabel={isEn ? "Photos" : "படங்கள்"}
            onOpen={setLightbox}
          />
        )}

        {/* Gods – grouped masonry */}
        {activeCategory === "Gods" && (
          <GroupedSection
            groups={godGroups}
            groupLabel={isEn ? "Deity" : "தெய்வம்"}
            countLabel={isEn ? "Photos" : "படங்கள்"}
            onOpen={setLightbox}
          />
        )}

        {/* All / Festivals – flat masonry */}
        {activeCategory !== "Temples" && activeCategory !== "Gods" && (
          <MasonryGrid items={filteredItems} onOpen={setLightbox} />
        )}
      </section>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
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
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-5 text-center px-4">
                <h3 className="text-white font-serif text-xl md:text-2xl">{lightbox.title}</h3>
                <p className="text-white/55 text-sm mt-1 italic">{lightbox.group}</p>
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
