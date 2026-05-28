import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../utils/translations";
import heroImg from "../assets/images/sacred_temple_hero_new.webp";

/* ── Reusable fade-up animation variant ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ── Decorative divider ── */
const GoldDivider = () => (
  <div className="flex items-center gap-3 my-8">
    <span className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c49a3c]/40" />
    <span className="w-2 h-2 rounded-full bg-[#c49a3c]" />
    <span className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c49a3c]/40" />
  </div>
);

const ClanGrandeurPage = () => {
  const { language } = useLanguage();
  const t = translations[language].clanGrandeurDetail;

  if (!t)
    return (
      <div className="min-h-screen flex items-center justify-center text-[#5d1712]">
        Loading…
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fdfcf7] pt-0 font-sans">

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section className="relative w-full min-h-[580px] lg:min-h-[680px] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt={t.hero.heading} className="w-full h-full object-cover scale-105" />
        </div>

        {/* Layered cinematic overlays */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/80 via-black/30 to-black/10 pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/50 via-black/10 to-transparent pointer-events-none" />

        {/* Hero content — anchored to bottom */}
        <div className="relative z-10 w-full container mx-auto px-6 lg:px-16 pb-16 pt-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl"
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-[1.5px] bg-[#c49a3c]" />
              <span className="text-[#c49a3c] font-semibold tracking-[0.3em] uppercase text-xs">
                {t.hero.label}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.08] text-white mb-6 drop-shadow-2xl">
              {t.hero.heading}
            </h1>

            <p className="text-white/85 text-base md:text-lg leading-relaxed font-light max-w-xl">
              {t.hero.text}
            </p>
          </motion.div>
        </div>

        {/* Bottom gold accent bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c49a3c] via-[#e5bc54] to-[#c49a3c] z-10" />
      </section>

      {/* ═══════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════ */}
      <div className="container mx-auto px-6 lg:px-12 py-20 max-w-5xl">

        {/* ── Vinayagar Prayer ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-20 relative overflow-hidden"
        >
          {/* Card with ornate border */}
          <div className="relative bg-gradient-to-br from-[#5d1712] to-[#3a0a07] rounded-3xl p-10 md:p-14 text-center shadow-2xl">
            {/* Top corner ornaments */}
            <span className="absolute top-4 left-5 text-[#c49a3c]/30 text-5xl select-none font-serif leading-none">❧</span>
            <span className="absolute top-4 right-5 text-[#c49a3c]/30 text-5xl select-none font-serif leading-none scale-x-[-1]">❧</span>

            {/* Gold ring accent */}
            <div className="flex items-center justify-center mb-6">
              <span className="w-10 h-[1.5px] bg-[#c49a3c]/60" />
              <span className="mx-3 w-3 h-3 rounded-full border-2 border-[#c49a3c] bg-transparent" />
              <span className="w-10 h-[1.5px] bg-[#c49a3c]/60" />
            </div>

            <h2 className="font-serif text-2xl md:text-3xl text-[#e5bc54] mb-8 tracking-wide">
              {t.prayer.title}
            </h2>
            <div className="space-y-3 text-white/90 italic font-light text-lg leading-relaxed">
              {t.prayer.verse.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>

            {/* Bottom ornaments */}
            <div className="flex items-center justify-center mt-8">
              <span className="w-10 h-[1.5px] bg-[#c49a3c]/60" />
              <span className="mx-3 w-3 h-3 rounded-full border-2 border-[#c49a3c] bg-transparent" />
              <span className="w-10 h-[1.5px] bg-[#c49a3c]/60" />
            </div>
          </div>
        </motion.section>

        {/* ── Prologue ── */}
        {t.prologue && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20"
          >
            <div className="relative bg-white rounded-3xl shadow-lg border border-[#c49a3c]/15 p-10 md:p-14 overflow-hidden">
              {/* Left accent bar */}
              <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-gradient-to-b from-[#c49a3c] via-[#e5bc54] to-[#c49a3c]" />

              <h2 className="font-serif text-2xl md:text-3xl text-[#5d1712] mb-6 text-center">
                {language === "ta" ? "பூந்துறையின் மணிமகுடம்" : "The Crown Jewel of Poondurai"}
              </h2>

              <GoldDivider />

              <p className="text-stone-700 text-base md:text-lg leading-relaxed font-light whitespace-pre-line text-justify">
                {t.prologue}
              </p>
            </div>
          </motion.section>
        )}

        {/* ── Dynamic Sections ── */}
        {t.sections.map((section, idx) => (
          <motion.section
            key={section.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.05}
            variants={fadeUp}
            className="mb-24"
          >
            {/* Section header */}
            <div className="flex items-center gap-5 mb-8">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#5d1712] flex items-center justify-center shadow-lg">
                <span className="font-serif text-[#e5bc54] text-2xl font-bold">{section.id}</span>
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#5d1712] leading-tight">
                  {section.title}
                </h2>
              </div>
            </div>

            {/* Section body card */}
            <div className="bg-white rounded-3xl shadow-md border border-stone-100 overflow-hidden">
              {/* Top gold stripe */}
              <div className="h-1 bg-gradient-to-r from-[#c49a3c] via-[#e5bc54] to-transparent" />

              <div className="p-8 md:p-10">
                <p className="text-stone-700 text-base md:text-lg leading-relaxed font-light mb-8">
                  {section.text}
                </p>

                {/* ── Subsections ── */}
                {section.subsections && section.subsections.map((sub, sidx) => (
                  <div
                    key={sidx}
                    className="mb-8 last:mb-0 bg-[#fdfcf7] rounded-2xl border border-[#c49a3c]/10 p-7"
                  >
                    {sub.title && (
                      <h3 className="inline-flex items-center gap-2 font-bold text-[#5d1712] mb-5 uppercase tracking-widest text-xs">
                        <span className="w-4 h-[1.5px] bg-[#c49a3c]" />
                        {sub.title}
                      </h3>
                    )}

                    {sub.verses && (
                      <div className="space-y-2 text-stone-800 italic mb-6 pl-4 border-l-2 border-[#c49a3c]/30">
                        {sub.verses.map((line, li) => <p key={li}>{line}</p>)}
                      </div>
                    )}

                    {sub.list && (
                      <ul className="space-y-3">
                        {sub.list.map((item, li) => (
                          <li key={li} className="flex gap-3 items-start text-stone-700">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#c49a3c] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {sub.meaningList && (
                      <div className="mt-6 pt-5 border-t border-stone-100">
                        <h4 className="font-bold text-[#5d1712] text-sm mb-4 uppercase tracking-wide">
                          {sub.meaningTitle}
                        </h4>
                        <ul className="space-y-3 text-stone-600 text-sm">
                          {sub.meaningList.map((item, li) => (
                            <li key={li} className="flex gap-3 items-start">
                              <span className="text-[#c49a3c] mt-0.5 text-base leading-none">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {sub.grid && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                        {sub.grid.map((col, ci) => (
                          <div key={ci} className="bg-white rounded-xl border border-[#c49a3c]/15 p-5 shadow-sm">
                            <h4 className="font-bold text-[#5d1712] text-xs uppercase tracking-widest mb-4 pb-2 border-b border-[#c49a3c]/20">
                              {col.label}
                            </h4>
                            <ul className="space-y-2 text-stone-600 text-sm">
                              {col.items.map((item, ii) => (
                                <li key={ii} className="flex gap-2 items-center">
                                  <span className="w-1 h-1 rounded-full bg-[#c49a3c] flex-shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {sub.note && (
                      <p className="mt-5 text-sm text-[#c49a3c] italic flex items-start gap-2">
                        <span className="mt-0.5">✦</span>
                        {sub.note}
                      </p>
                    )}
                    {sub.sites && (
                      <p className="mt-4 text-stone-700 font-medium">{sub.sites}</p>
                    )}
                    {sub.meaning && (
                      <p className="mt-4 text-stone-700 font-light leading-relaxed">{sub.meaning}</p>
                    )}
                    {sub.explanation && (
                      <p className="mt-4 text-stone-700 font-light leading-relaxed">{sub.explanation}</p>
                    )}
                    {sub.conclusion && (
                      <p className="mt-4 text-stone-700 font-light leading-relaxed">{sub.conclusion}</p>
                    )}

                    {sub.highlights && (
                      <div className="mt-6 space-y-5">
                        {sub.highlights.map((h, hi) => (
                          <div key={hi} className="bg-white rounded-xl p-5 border-l-4 border-[#c49a3c] shadow-sm">
                            <span className="text-[#5d1712] font-bold block mb-1">{h.label}:</span>
                            <span className="text-stone-600 leading-relaxed">{h.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* ── Simple list (Kaadai Clan) ── */}
                {section.list && (
                  <div className="space-y-4">
                    {section.list.map((item, li) => (
                      <div key={li} className="flex gap-4 items-start bg-[#fdfcf7] rounded-xl p-4 border border-stone-100">
                        <div className="mt-1 w-2.5 h-2.5 rounded-full bg-[#c49a3c] flex-shrink-0" />
                        <div>
                          <span className="font-bold text-[#5d1712]">{item.label}: </span>
                          <span className="text-stone-700">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Highlights (Varanasi Gounder) ── */}
                {section.highlights && (
                  <div className="space-y-5 mt-4">
                    {section.highlights.map((h, hi) => (
                      <div key={hi} className="bg-[#fdfcf7] rounded-xl p-5 border-l-4 border-[#c49a3c]">
                        <h4 className="font-bold text-[#5d1712] mb-2">{h.label}</h4>
                        <p className="text-stone-600 leading-relaxed">{h.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        ))}

        {/* ── Conclusion ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-[40px] shadow-2xl"
        >
          {/* Deep maroon background with layered gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3a0a07] via-[#5d1712] to-[#2a0603]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(196,154,60,0.12),transparent)]" />

          {/* Soft glow orbs */}
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#c49a3c]/10 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white/5 blur-3xl" />

          <div className="relative z-10 p-12 md:p-16 text-center">
            {/* Top ornament */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-12 h-[1px] bg-[#c49a3c]/50" />
              <span className="text-[#c49a3c] text-xl">✦</span>
              <span className="w-12 h-[1px] bg-[#c49a3c]/50" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              {t.conclusion.title}
            </h2>
            <p className="whitespace-pre-line text-lg md:text-xl font-light leading-relaxed text-white/85 max-w-2xl mx-auto">
              {t.conclusion.text}
            </p>

            {/* Bottom ornament */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className="w-12 h-[1px] bg-[#c49a3c]/50" />
              <span className="text-[#c49a3c] text-xl">✦</span>
              <span className="w-12 h-[1px] bg-[#c49a3c]/50" />
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default ClanGrandeurPage;
