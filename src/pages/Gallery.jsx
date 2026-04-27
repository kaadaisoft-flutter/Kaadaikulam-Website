import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/images/gallery_hero.webp";
import img1 from "../assets/images/gallery_temple_1.webp";
import img2 from "../assets/images/gallery_temple_2.webp";
import img3 from "../assets/images/gallery_temple_3.webp";
import img4 from "../assets/images/gallery_temple_4.webp";

const Gallery = () => {
  const { language } = useLanguage();
  const t = translations[language].gallery;
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "All", label: t.categories.all },
    { id: "Festivals", label: t.categories.festivals },
    { id: "Architecture", label: t.categories.architecture },
    { id: "Heritage", label: t.categories.heritage }
  ];

  const galleryItems = [
    {
      id: 1,
      title: "Kumbhabhishekam Yagasalai",
      category: "Festivals",
      image: img1,
      temple: "Sri Arulmigu Angalamman Temple"
    },
    {
      id: 2,
      title: "Ancient Architecture",
      category: "Architecture",
      image: img2,
      temple: "Sri Pushpavaneswara Swamy Temple"
    },
    {
      id: 3,
      title: "Heritage Structure",
      category: "Heritage",
      image: img3,
      temple: "Sri Karikaliamman Temple"
    },
    {
      id: 4,
      title: "Sacred Shrine",
      category: "Architecture",
      image: img4,
      temple: "Sri Damodara Perumal Temple"
    }
  ];

  // Helper function to translate temple names and item titles if needed
  // For now we'll use translations for categories and common labels
  
  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-sacred pt-0">
      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] lg:min-h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt={t.hero.label} className="w-full h-full object-cover" />
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

      {/* Gallery Section */}
      <section className="py-24 container mx-auto px-6">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-[#5d1712] text-white shadow-lg scale-105"
                  : "bg-white text-stone-500 hover:text-[#c49a3c] border border-stone-100"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-[32px] overflow-hidden aspect-square bg-stone-100"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-[#c49a3c] text-[10px] uppercase font-bold tracking-widest mb-2 block">
                      {item.category}
                    </span>
                    <h3 className="text-white font-serif text-2xl mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm font-light italic">{item.temple}</p>
                  </div>
                </div>

                {/* Video Icon for first item (matching design) */}
                {item.id === 1 && (
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
