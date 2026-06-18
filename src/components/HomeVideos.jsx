import { useState, useEffect } from "react";
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

const HomeVideos = () => {
  const { language } = useLanguage();
  const t = translations[language].homeVideos;
  
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeGalleryItems((items) => {
      // Filter published gallery items of type YouTube Video or Video Upload
      const filtered = items.filter(
        (item) => item.type === "YouTube Video" || item.type === "Video Upload"
      );
      setVideos(filtered);
      if (filtered.length > 0) {
        setSelectedVideo(filtered[0]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-stone-50/50 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5d1712]" />
      </section>
    );
  }

  if (videos.length === 0) {
    return null; // Don't show the section if there are no videos
  }

  const handleVideoSelect = (vid) => {
    setSelectedVideo(vid);
    setIsPlaying(false);
  };

  const isYoutube = selectedVideo?.type === "YouTube Video";
  const selectedVideoId = isYoutube ? extractYoutubeId(selectedVideo?.fullUrl) : "";
  const coverImage = selectedVideo?.thumbnail || selectedVideo?.imageUrl || (isYoutube ? `https://img.youtube.com/vi/${selectedVideoId}/0.jpg` : "");

  return (
    <section className="py-20 bg-stone-50/40 relative overflow-hidden border-t border-stone-200/50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-sacred opacity-30 pointer-events-none z-0" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="w-12 h-[1.5px] bg-[#c49a3c] inline-block mb-3 rounded-full" />
          <h2 className="font-serif text-3xl md:text-4xl text-[#5d1712] tracking-wide">
            {t.heading}
          </h2>
          <p className="text-stone-600 text-sm max-w-xl mx-auto mt-2 font-light">
            {t.sub}
          </p>
        </div>

        {/* Main Video Player Card */}
        <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-black border-4 border-white relative aspect-video transition-all duration-300">
          {!isPlaying ? (
            // Thumbnail / Cover View
            <div className="absolute inset-0 w-full h-full flex items-center justify-center">
              <img 
                src={coverImage} 
                alt={language === "ta" ? (selectedVideo?.titleTa || selectedVideo?.title) : selectedVideo?.title} 
                className="w-full h-full object-cover brightness-[0.85]" 
                loading="lazy"
              />
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/25 transition-colors group cursor-pointer"
                aria-label="Play video"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#c49a3c] hover:bg-[#a8802a] text-white flex items-center justify-center shadow-lg transition-all duration-300 transform group-hover:scale-110 relative">
                  {/* Pulse Ring */}
                  <div className="absolute inset-0 rounded-full bg-[#c49a3c]/50 animate-ping opacity-75" />
                  <svg className="w-8 h-8 md:w-10 md:h-10 fill-white ml-1.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            </div>
          ) : (
            // Actual Video Embed / Play View
            <div className="w-full h-full">
              {isYoutube ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&rel=0`}
                  title={language === "ta" ? (selectedVideo?.titleTa || selectedVideo?.title) : selectedVideo?.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={selectedVideo?.fullUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain bg-black"
                />
              )}
            </div>
          )}
        </div>

        {/* Active Video Title & Description */}
        {selectedVideo && (
          <div className="mt-6 text-center max-w-2xl mx-auto px-4">
            <h3 className="font-serif text-xl md:text-2xl text-[#5d1712] font-semibold">
              {language === "ta" ? (selectedVideo.titleTa || selectedVideo.title) : selectedVideo.title}
            </h3>
            {selectedVideo.description && (
              <p className="text-stone-600 text-sm mt-2.5 font-light leading-relaxed">
                {selectedVideo.description}
              </p>
            )}
          </div>
        )}

        {/* Thumbnails Row */}
        {videos.length > 1 && (
          <div className="mt-12 w-full">
            <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin scrollbar-thumb-stone-300 scrollbar-track-transparent">
              {videos.map((vid) => {
                const isSelected = selectedVideo && selectedVideo.id === vid.id;
                const isVidYoutube = vid.type === "YouTube Video";
                const vidId = isVidYoutube ? extractYoutubeId(vid.fullUrl) : "";
                const thumbImg = vid.thumbnail || vid.imageUrl || (isVidYoutube ? `https://img.youtube.com/vi/${vidId}/0.jpg` : "");

                return (
                  <button
                    key={vid.id}
                    onClick={() => handleVideoSelect(vid)}
                    className={`flex-shrink-0 w-48 md:w-56 rounded-xl overflow-hidden bg-white shadow-md border-2 transition-all duration-300 text-left group cursor-pointer ${
                      isSelected 
                        ? "border-[#c49a3c] ring-2 ring-[#c49a3c]/30 scale-[1.02] -translate-y-0.5" 
                        : "border-transparent hover:border-stone-300 hover:-translate-y-0.5"
                    }`}
                  >
                    {/* Thumbnail Image Container */}
                    <div className="relative aspect-video bg-black overflow-hidden">
                      <img 
                        src={thumbImg} 
                        alt={language === "ta" ? (vid.titleTa || vid.title) : vid.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {/* Overlay Play Indicator */}
                      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isSelected 
                            ? "bg-[#c49a3c] text-white" 
                            : "bg-white/90 text-[#5d1712] scale-90 group-hover:scale-100 group-hover:bg-[#c49a3c] group-hover:text-white"
                        }`}>
                          <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Meta details */}
                    <div className="p-3">
                      <p className="text-xs font-semibold text-stone-800 line-clamp-1 group-hover:text-[#5d1712] transition-colors">
                        {language === "ta" ? (vid.titleTa || vid.title) : vid.title}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-1 uppercase font-bold tracking-wider flex items-center gap-1.5">
                        <span className="text-[#c49a3c]">{isVidYoutube ? "YouTube" : "Video"}</span>
                        {vid.category && (
                          <>
                            <span className="text-stone-300">•</span>
                            <span>{vid.category}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeVideos;
