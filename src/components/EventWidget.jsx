import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { subscribeEvents } from '../services/eventService';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { X, CalendarDays, MapPin, ArrowRight } from 'lucide-react';

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
    const { day, month, year } = formatShortDate(event?.eventDate, language);
    if (!event) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <motion.div
                    className="relative z-10 bg-[#FAF5EE] rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
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
                    <div className="p-8 overflow-y-auto flex-1">
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
                    <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex justify-end">
                        <button onClick={onClose} className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl font-bold transition-colors">
                            {t.close}
                        </button>
                    </div>
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

    const t = translations[language].events.details;

    // Don't show the ticker on the main Events page
    const isEventsPage = location.pathname === '/events';

    useEffect(() => {
        const unsub = subscribeEvents((data) => {
            setEvents(data);
        });
        return () => unsub();
    }, []);

    if (events.length === 0 || isEventsPage) return <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} t={t} />;

    // Ensure we have enough items to fill the screen and loop smoothly
    let baseEvents = [...events];
    while (baseEvents.length > 0 && baseEvents.length < 6) {
        baseEvents = [...baseEvents, ...events];
    }
    const tickerEvents = [...baseEvents, ...baseEvents];
    
    // Adjust animation speed: more items = slower duration to keep speed consistent
    // Increased multiplier to 15s per item for better readability
    const scrollDuration = Math.max(30, baseEvents.length * 15);

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
                        {tickerEvents.map((event, idx) => (
                            <div 
                                key={`${event.id}-${idx}`}
                                onClick={() => setSelectedEvent(event)}
                                className="flex items-center gap-6 px-8 border-r border-white/10 cursor-pointer hover:bg-white/10 transition-colors group shrink-0"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
                                        {event.category || t.new}
                                    </span>
                                </div>
                                <span className="text-sm font-serif font-bold tracking-wide group-hover:text-amber-200 transition-colors">
                                    {event.title}
                                </span>
                                <div className="flex items-center gap-1.5 text-[11px] text-white/70">
                                    <CalendarDays size={12} className="text-amber-400" />
                                    <span>{formatDate(event.eventDate, language)}</span>
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
                        ))}
                    </div>
                </motion.div>
            </motion.div>
            <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} t={t} />
        </>
    );
};

export default EventWidget;
