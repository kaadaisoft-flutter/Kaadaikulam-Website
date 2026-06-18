import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { subscribeEvents } from '../services/eventService';
import { subscribeGalleryItems } from '../services/galleryService';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { X, CalendarDays, MapPin, ArrowRight, Clock } from 'lucide-react';

/* ─── helpers ─────────────────────────────── */
const formatDate = (ts, lang) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    }).format(date);
};

const formatTime = (ts, lang) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' }).format(date);
};

const formatShortDate = (ts, lang) => {
    if (!ts) return { day: '—', month: '—', year: '—' };
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return {
        day: new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric' }).format(date),
        month: new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', { month: 'short' }).format(date),
        year: new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', { year: 'numeric' }).format(date),
    };
};

/* ─── Event Detail Modal ─── */
const EventDetailModal = ({ event, onClose, t }) => {
    const { language } = useLanguage();

    useEffect(() => {
        if (event) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            if (window.lenis && typeof window.lenis.stop === 'function') window.lenis.stop();
        }
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start();
        };
    }, [event]);

    if (!event) return null;
    const { day, month, year } = formatShortDate(event?.eventDate, language);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center p-2 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                data-lenis-prevent
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div
                    className="relative z-10 bg-[#FAF5EE] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="relative w-full h-64 shrink-0 overflow-hidden bg-[#c2b09a]">
                        {event.image ? (
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <CalendarDays size={64} className="text-[#5d1712]/20" />
                            </div>
                        )}
                        <div className="absolute top-4 left-4 bg-[#5d1712] text-white rounded-2xl px-4 py-2 text-center shadow-lg border border-white/20">
                            <div className="text-2xl font-bold leading-none">{day}</div>
                            <div className="text-[11px] uppercase tracking-widest mt-0.5">{month} {year}</div>
                        </div>
                        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors backdrop-blur-md">
                            <X size={20} />
                        </button>
                    </div>
                    <div 
                        className="p-5 sm:p-8 overflow-y-auto flex-1 overscroll-contain"
                        data-lenis-prevent
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider rounded">
                                {event.category || 'Event'}
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl font-bold text-[#5d1712] leading-tight mb-4">{event.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-3 text-stone-600 bg-stone-100/50 p-3 rounded-xl">
                                <CalendarDays size={18} className="text-[#5d1712] shrink-0" />
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">{t.date}</span>
                                    <span className="text-sm font-medium">{formatDate(event.eventDate, language)}</span>
                                    <span className="text-xs text-stone-500">{formatTime(event.eventDate, language)}</span>
                                </div>
                            </div>
                            {event.location && (
                                <a
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-stone-600 bg-stone-100/50 p-3 rounded-xl hover:bg-amber-50 transition-colors group/loc"
                                >
                                    <MapPin size={18} className="text-[#5d1712] shrink-0" />
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">{t.location}</span>
                                        <span className="text-sm font-medium border-b border-dashed border-stone-300 group-hover/loc:border-[#5d1712]">{event.location}</span>
                                    </div>
                                </a>
                            )}
                        </div>
                        <div className="h-px bg-stone-200 mb-6" />
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">{t.description}</span>
                            <p className="text-stone-700 text-base leading-relaxed whitespace-pre-line">{event.description || event.shortDescription}</p>
                        </div>
                    </div>
                    <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex justify-end shrink-0">
                        <button onClick={onClose} className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl font-bold transition-colors">
                            {t.close}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─── Video Player Modal ─── */
const VideoPlayerModal = ({ video, isOpen, onClose }) => {
    const { language } = useLanguage();

    useEffect(() => {
        if (isOpen) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';
            if (window.lenis && typeof window.lenis.stop === 'function') window.lenis.stop();
        }
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
            if (window.lenis && typeof window.lenis.start === 'function') window.lenis.start();
        };
    }, [isOpen]);

    if (!isOpen || !video) return null;

    const extractYoutubeId = (url) => {
        if (!url) return '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : '';
    };

    const isYoutube = video.type === 'YouTube Video';
    const title = language === 'ta' ? (video.titleTa || video.title) : video.title;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                data-lenis-prevent
            >
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
                <motion.div
                    className="relative z-10 bg-[#FAF5EE] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl max-w-3xl w-full flex flex-col"
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-stone-100 shrink-0">
                        <h3 className="text-lg font-serif font-bold text-gray-900 truncate max-w-[80%]">{title}</h3>
                        <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Modal Body / Video Player */}
                    <div className="bg-black relative pb-[56.25%] h-0 w-full">
                        {isYoutube ? (
                            <iframe
                                src={`https://www.youtube.com/embed/${extractYoutubeId(video.fullUrl || video.imageUrl)}?autoplay=1&rel=0`}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                            />
                        ) : (
                            <video
                                src={video.fullUrl}
                                controls
                                autoPlay
                                className="absolute top-0 left-0 w-full h-full object-contain"
                            />
                        )}
                    </div>

                    {/* Modal Footer */}
                    {video.description && (
                        <div className="p-4 border-t border-stone-100 bg-stone-50/50 text-stone-600 text-sm font-light leading-relaxed max-h-24 overflow-y-auto" data-lenis-prevent>
                            {video.description}
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

/* ─── Global Event Widget (Scrolling Ticker) ─── */
const EventWidget = () => {
    const { language } = useLanguage();
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [featuredVideo, setFeaturedVideo] = useState(null);
    const [selectedVideoVideo, setSelectedVideoVideo] = useState(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const t = translations[language].events.details;

    // Don't show the ticker on the main Events page
    const isEventsPage = location.pathname === '/events';

    useEffect(() => {
        const unsubEvents = subscribeEvents((data) => {
            const now = new Date();
            const upcoming = data.filter(event => {
                const eventDate = event.eventDate?.toDate ? event.eventDate.toDate() : new Date(event.eventDate);
                // Buffer of 2 hours for ongoing events
                return eventDate.getTime() + (2 * 60 * 60 * 1000) >= now.getTime();
            });
            setEvents(upcoming);
        });

        const unsubVideos = subscribeGalleryItems((items) => {
            const videoItems = items.filter(
                (item) => item.type === "YouTube Video" || item.type === "Video Upload"
            );
            if (videoItems.length > 0) {
                const featured = videoItems.find((v) => v.featured) || videoItems[0];
                setFeaturedVideo(featured);
            } else {
                setFeaturedVideo(null);
            }
        });

        return () => {
            unsubEvents();
            unsubVideos();
        };
    }, []);

    // Create mixed ticker items
    const tickerItems = [];

    if (featuredVideo) {
        tickerItems.push({
            id: 'featured-video',
            isVid: true,
            video: featuredVideo
        });
    }

    events.forEach(event => {
        tickerItems.push({
            id: event.id,
            isVid: false,
            title: event.title,
            event: event
        });
    });

    if (tickerItems.length === 0 || isEventsPage) {
        return (
            <>
                <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} t={t} />
                <VideoPlayerModal video={selectedVideoVideo} isOpen={isVideoOpen} onClose={() => { setIsVideoOpen(false); setSelectedVideoVideo(null); }} />
            </>
        );
    }

    // Ensure we have enough items to fill the screen and loop smoothly
    let baseItems = [...tickerItems];
    while (baseItems.length > 0 && baseItems.length < 6) {
        baseItems = [...baseItems, ...tickerItems];
    }
    const finalTickerItems = [...baseItems, ...baseItems];
    
    // Adjust animation speed: more items = slower duration to keep speed consistent
    const scrollDuration = Math.max(30, baseItems.length * 15);

    return (
        <>
            <motion.div 
                className="w-full bg-[#5d1712] text-white py-2.5 relative z-[100] border-y border-amber-500/20 shadow-lg overflow-hidden sticky top-[80px]"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className="flex items-center w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: scrollDuration,
                          ease: "linear",
                        },
                    }}
                >
                    <div className="flex items-center gap-4">
                        {finalTickerItems.map((item, idx) => {
                            if (item.isVid) {
                                return (
                                    <div 
                                        key={`${item.id}-${idx}`}
                                        onClick={() => {
                                            setSelectedVideoVideo(item.video);
                                            setIsVideoOpen(true);
                                        }}
                                        className="flex items-center gap-6 px-8 border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors group shrink-0"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-300">
                                                {language === 'ta' ? 'காணொளி' : 'VIDEO'}
                                            </span>
                                        </div>
                                        <span className="text-sm font-serif font-bold tracking-wide group-hover:text-amber-200 transition-colors flex items-center gap-2">
                                            <svg className="w-4 h-4 text-red-400 fill-current shrink-0" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                            {language === 'ta'
                                                ? (item.video?.titleTa || item.video?.title || item.title)
                                                : (item.video?.title || item.title)
                                            }
                                        </span>
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 uppercase tracking-widest ml-2 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                            <span>{language === 'ta' ? 'காண்க' : 'PLAY'}</span>
                                            <ArrowRight size={10} />
                                        </div>
                                    </div>
                                );
                            } else {
                                const event = item.event;
                                return (
                                    <div 
                                        key={`${item.id}-${idx}`}
                                        onClick={() => setSelectedEvent(event)}
                                        className="flex items-center gap-6 px-8 border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors group shrink-0"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
                                                UPCOMING
                                            </span>
                                        </div>
                                        <span className="text-sm font-serif font-bold tracking-wide group-hover:text-amber-200 transition-colors">
                                            {event.title}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                                            <CalendarDays size={12} className="text-amber-400" />
                                            <span>{formatDate(event.eventDate, language)}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                                            <Clock size={12} className="text-amber-400" />
                                            <span>{formatTime(event.eventDate, language)}</span>
                                        </div>
                                        {event.location && (
                                            <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                                                <MapPin size={12} className="text-amber-400" />
                                                <span className="italic">{event.location}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 uppercase tracking-widest ml-2 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                            <span>{t.see}</span>
                                            <ArrowRight size={10} />
                                        </div>
                                    </div>
                                );
                            }
                        })}
                    </div>
                </motion.div>
            </motion.div>
            <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} t={t} />
            <VideoPlayerModal video={selectedVideoVideo} isOpen={isVideoOpen} onClose={() => { setIsVideoOpen(false); setSelectedVideoVideo(null); }} />
        </>
    );
};

export default EventWidget;
