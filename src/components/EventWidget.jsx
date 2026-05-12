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

/* ─── Global Event Widget ─── */
const EventWidget = () => {
    const { language } = useLanguage();
    const location = useLocation();
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isDismissed, setIsDismissed] = useState(false);

    const t = translations[language].events.details;

    // Don't show the floating card on the main Events page
    const isEventsPage = location.pathname === '/events';

    useEffect(() => {
        const unsub = subscribeEvents((data) => {
            setEvents(data);
            
            // Check if this specific event was already dismissed
            if (data.length > 0) {
                const nextId = data[0].id;
                const dismissedId = localStorage.getItem('dismissed_event_id');
                if (dismissedId === nextId) {
                    setIsDismissed(true);
                } else {
                    setIsDismissed(false);
                }
            }
        });
        return () => unsub();
    }, []);

    const nextEvent = events[0] || null;

    const handleDismiss = (e) => {
        e.stopPropagation();
        setIsDismissed(true);
        if (nextEvent) {
            localStorage.setItem('dismissed_event_id', nextEvent.id);
        }
    };

    if (!nextEvent || isEventsPage || isDismissed) return <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} t={t} />;

    const { day, month, year } = formatShortDate(nextEvent.eventDate, language);

    return (
        <>
            <motion.div
                className="fixed bottom-8 left-8 z-[150] max-w-[400px] w-full"
                initial={{ opacity: 0, x: -50, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 1.5 }}
            >
                <div className="relative bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-amber-100 flex flex-col group transition-all duration-500 hover:shadow-[0_25px_60px_rgba(93,23,18,0.2)]">
                    {/* Premium Header Strip */}
                    <div className="bg-gradient-to-r from-[#5d1712] to-[#8a241b] px-5 py-2 flex justify-between items-center shadow-sm relative z-20">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-[10px] text-white/95 font-bold uppercase tracking-[0.25em]">
                                {t.new}
                            </span>
                        </div>
                        <button 
                            onClick={handleDismiss} 
                            className="text-white/60 hover:text-white transition-colors p-1 relative z-30"
                        >
                            <X size={14} />
                        </button>
                    </div>

                    {/* Content Row (Equal 50/50 Split) */}
                    <div className="flex h-[150px] relative">
                        {/* Hidden clickable area for the whole card - moved to lower z-index or sibling */}
                        <button 
                            onClick={() => setSelectedEvent(nextEvent)}
                            className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                            aria-label="View event details"
                        />

                        {/* Left: Image Column (50%) */}
                        <div className="w-1/2 shrink-0 relative overflow-hidden bg-[#c2b09a]">
                            {nextEvent.image ? (
                                <img src={nextEvent.image} alt={nextEvent.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-white/40">
                                    <CalendarDays size={40} />
                                </div>
                            )}
                            
                            {/* Stylish Date Badge Overlay */}
                            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex flex-col items-center justify-center text-white">
                                <div className="border border-white/40 rounded-2xl px-4 py-2 flex flex-col items-center bg-black/10">
                                    <span className="text-3xl font-black leading-none drop-shadow-lg">{day}</span>
                                    <span className="text-[11px] uppercase font-black tracking-[0.2em] mt-1 drop-shadow-md text-amber-400">{month}</span>
                                    <span className="text-[9px] font-bold opacity-80 mt-0.5 tracking-widest">{year}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Info Column (50%) */}
                        <div className="w-1/2 p-5 flex flex-col justify-center min-w-0 bg-gradient-to-br from-white to-[#FAF5EE] border-l border-amber-50">
                            <h3 className="text-[16px] font-serif font-extrabold text-[#5d1712] leading-tight line-clamp-2 mb-3 transition-colors group-hover:text-[#8a241b]">
                                {nextEvent.title}
                            </h3>
                            
                            {nextEvent.location && (
                                <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-4">
                                    <MapPin size={12} className="text-amber-600 shrink-0" />
                                    <span className="truncate italic font-medium">{nextEvent.location}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-[11px] font-black text-amber-600 uppercase tracking-[0.15em] group/btn">
                                <span>{t.see}</span>
                                <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center group-hover/btn:bg-amber-100 transition-all group-hover/btn:shadow-sm">
                                    <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
            <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} t={t} />
        </>
    );
};

export default EventWidget;
