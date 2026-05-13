import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeEvents } from '../services/eventService';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import { X, CalendarDays, MapPin, Tag, ArrowRight } from 'lucide-react';

/* ─── helpers ─────────────────────────────────────────────── */
const formatDate = (ts, lang) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date);
};

const formatTime = (ts, lang) => {
    if (!ts) return '';
    const date = ts.toDate ? ts.toDate() : new Date(ts);
    return new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
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

/* ─── Full-screen Detail Modal ─────────────────────────────── */
const EventDetailModal = ({ event, onClose }) => {
    const { language } = useLanguage();
    const t = translations[language].events.details;
    const { day, month, year } = formatShortDate(event?.eventDate, language);

    useEffect(() => {
        const handler = (e) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <AnimatePresence>
            {event && (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                    {/* Modal Card */}
                    <motion.div
                        className="relative z-10 bg-[#FAF5EE] rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col"
                        initial={{ opacity: 0, scale: 0.92, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 30 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Banner Image */}
                        <div className="relative w-full h-64 shrink-0 overflow-hidden bg-[#c2b09a]">
                            {event.image ? (
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <CalendarDays size={64} className="text-[#5d1712]/20" />
                                </div>
                            )}
                            {/* Date Badge */}
                            <div className="absolute top-4 left-4 bg-[#5d1712] text-white rounded-2xl px-4 py-2 text-center shadow-lg border border-white/20">
                                <div className="text-2xl font-bold leading-none">{day}</div>
                                <div className="text-[11px] uppercase tracking-widest mt-0.5">{month} {year}</div>
                            </div>
                            {/* Category badge */}
                            <div className="absolute top-4 right-14 bg-white/90 backdrop-blur-sm text-[#5d1712] text-[10px] font-black uppercase tracking-widest rounded-full px-3 py-1 shadow">
                                {event.category}
                            </div>
                            {/* Close */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 overflow-y-auto flex-1">
                            <h2 className="font-serif text-3xl font-bold text-[#5d1712] leading-tight mb-4">
                                {event.title}
                            </h2>

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
                                        onClick={(e) => e.stopPropagation()}
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
                                <p className="text-stone-700 text-base leading-relaxed whitespace-pre-line">
                                    {event.description || event.shortDescription}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-stone-100 bg-stone-50/50 flex justify-end">
                            <button onClick={onClose} className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl font-bold transition-colors">
                                {t.close}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

/* ─── Event Card Component ─────────────────────────────────── */
const EventCard = ({ event, i, openEvent, language, t, isCompleted }) => {
    const { day, month } = formatShortDate(event.eventDate, language);
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100 transition-all duration-500 cursor-pointer flex flex-col ${isCompleted ? 'grayscale-[0.5] hover:grayscale-0' : ''}`}
            onClick={() => openEvent(event)}
        >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden bg-[#c2b09a]">
                {event.image ? (
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <CalendarDays size={48} className="text-white/40" />
                    </div>
                )}
                {/* Date stamp */}
                <div className={`absolute top-3 left-3 text-white rounded-xl px-3 py-1.5 text-center shadow-md ${isCompleted ? 'bg-stone-500' : 'bg-[#5d1712]'}`}>
                    <div className="text-lg font-bold leading-none">{day}</div>
                    <div className="text-[9px] uppercase tracking-widest">{month}</div>
                </div>
                {/* Category */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#5d1712] text-[9px] font-black uppercase tracking-widest rounded-full px-2.5 py-1 shadow">
                    {event.category || 'Event'}
                </div>
                {isCompleted && (
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                        <span className="bg-white/90 backdrop-blur-sm text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg border border-stone-200">
                            {t.completedEvents}
                        </span>
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col gap-2">
                <h2 className={`font-serif text-lg font-bold leading-snug line-clamp-2 group-hover:underline underline-offset-2 transition-all ${isCompleted ? 'text-stone-600' : 'text-[#5d1712]'}`}>
                    {event.title}
                </h2>

                {event.location && (
                    <div className="flex items-center gap-1.5 text-stone-500 text-xs">
                        <MapPin size={12} className={`${isCompleted ? 'text-stone-400' : 'text-[#5d1712]'} shrink-0`} />
                        <span className="line-clamp-1">{event.location}</span>
                    </div>
                )}

                <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 mt-1 flex-1">
                    {event.shortDescription || event.description}
                </p>

                <div className={`mt-3 flex items-center gap-1.5 font-bold text-xs group/link ${isCompleted ? 'text-stone-400' : 'text-[#5d1712]'}`}>
                    {t.viewDetails}
                    <ArrowRight size={13} className="transform group-hover/link:translate-x-1 transition-transform" />
                </div>
            </div>
        </motion.article>
    );
};

/* ─── Main Events Page ──────────────────────────────────────── */
const Events = () => {
    const { language } = useLanguage();
    const t_events = translations[language].events;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const unsub = subscribeEvents((data) => {
            setEvents(data);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const openEvent = useCallback((event) => {
        setSelectedEvent(event);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeEvent = useCallback(() => {
        setSelectedEvent(null);
        document.body.style.overflow = '';
    }, []);

    const [activeTab, setActiveTab] = useState('upcoming');

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAF5EE] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#5d1712]/20 border-t-[#5d1712] rounded-full animate-spin" />
            </div>
        );
    }

    const now = new Date().getTime();
    const buffer = 2 * 60 * 60 * 1000;

    const upcomingEvents = events
        .filter(e => {
            const d = e.eventDate?.toDate ? e.eventDate.toDate() : new Date(e.eventDate);
            return d.getTime() + buffer >= now;
        })
        .sort((a, b) => {
            const da = a.eventDate?.toDate ? a.eventDate.toDate() : new Date(a.eventDate);
            const db = b.eventDate?.toDate ? b.eventDate.toDate() : new Date(b.eventDate);
            return da - db;
        });

    const completedEvents = events
        .filter(e => {
            const d = e.eventDate?.toDate ? e.eventDate.toDate() : new Date(e.eventDate);
            return d.getTime() + buffer < now;
        })
        .sort((a, b) => {
            const da = a.eventDate?.toDate ? a.eventDate.toDate() : new Date(a.eventDate);
            const db = b.eventDate?.toDate ? b.eventDate.toDate() : new Date(b.eventDate);
            return db - da;
        });

    const displayedEvents = activeTab === 'upcoming' ? upcomingEvents : completedEvents;

    return (
        <div className="min-h-screen bg-[#FAF5EE]">
            {/* Hero */}
            <section className="relative bg-[#c2b09a] py-20 px-6 text-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 max-w-2xl mx-auto"
                >
                    <span className="inline-block text-[11px] font-black uppercase tracking-[0.25em] text-[#5d1712] bg-white/40 rounded-full px-5 py-1.5 mb-5">
                        {t_events.hero.label}
                    </span>
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#5d1712] leading-tight mb-4">
                        {t_events.hero.heading}
                    </h1>
                    <p className="text-stone-700 text-base leading-relaxed">
                        {t_events.hero.text}
                    </p>
                </motion.div>
                <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-[#5d1712]/5 pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[#5d1712]/5 pointer-events-none" />
            </section>

            {/* Tab Switcher */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 hidden sm:block">
                <div className="flex items-center justify-center gap-1 sm:gap-4 bg-stone-200/50 p-1 sm:p-1.5 rounded-2xl w-full max-w-[500px] sm:w-fit mx-auto shadow-sm border border-stone-200">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 sm:flex-none px-3 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[10px] xs:text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 ${
                            activeTab === 'upcoming' 
                            ? "bg-[#5d1712] text-white shadow-lg sm:scale-105" 
                            : "text-stone-500 hover:text-stone-800 hover:bg-stone-200"
                        }`}
                    >
                        <CalendarDays size={16} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="whitespace-nowrap">{t_events.upcomingEvents}</span>
                        <span className={`ml-0.5 sm:ml-1 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'upcoming' ? 'bg-white/20' : 'bg-stone-300 text-stone-600'}`}>
                            {upcomingEvents.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`flex-1 sm:flex-none px-3 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[10px] xs:text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 ${
                            activeTab === 'completed' 
                            ? "bg-[#5d1712] text-white shadow-lg sm:scale-105" 
                            : "text-stone-500 hover:text-stone-800 hover:bg-stone-200"
                        }`}
                    >
                        <Tag size={16} className="sm:w-[18px] sm:h-[18px]" />
                        <span className="whitespace-nowrap">{t_events.completedEvents}</span>
                        <span className={`ml-0.5 sm:ml-1 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'completed' ? 'bg-white/20' : 'bg-stone-300 text-stone-600'}`}>
                            {completedEvents.length}
                        </span>
                    </button>
                </div>
            </div>

            {/* Event List */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[600px]">
                {displayedEvents.length === 0 ? (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-32 bg-white rounded-3xl border border-stone-100 shadow-sm w-full"
                    >
                        <CalendarDays className="w-16 h-16 text-stone-200 mx-auto mb-5" />
                        <h3 className="text-xl font-bold text-stone-800">
                            {activeTab === 'upcoming' ? t_events.noEvents : t_events.noCompletedEvents}
                        </h3>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="wait">
                            {displayedEvents.map((event, i) => (
                                <EventCard 
                                    key={event.id} 
                                    event={event} 
                                    i={i} 
                                    openEvent={openEvent} 
                                    language={language} 
                                    t={t_events} 
                                    isCompleted={activeTab === 'completed'} 
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </section>

            {/* Detail Modal */}
            <EventDetailModal event={selectedEvent} onClose={closeEvent} />
        </div>
    );
};

export default Events;
