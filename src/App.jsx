import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React, { Suspense, lazy, useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TemplesPage from "./pages/TemplesPage";
import TempleDetail from "./pages/TempleDetail";
import History from "./pages/History";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Donation from "./pages/Donation";
import Kulaguru from "./pages/Kulaguru";
import ClanGrandeurPage from "./pages/ClanGrandeurPage";
import Events from "./pages/Events";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import EventWidget from "./components/EventWidget";
import IDCardBenefits from "./pages/IDCardBenefits";
import { LanguageProvider } from "./context/LanguageContext";
import SmoothScroll from "./components/SmoothScroll";
import AnimatedBackground from "./components/animations/AnimatedBackground";
import Preloader from "./components/Preloader";

// Lazy load Admin
const AdminContent = lazy(() => import("@admin/App").then(module => ({ default: module.AdminContent })));

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [preloaderDuration, setPreloaderDuration] = useState(1200); // 1.2 s on initial load
  const [preloaderTheme, setPreloaderTheme] = useState(() => localStorage.getItem("preloaderTheme") || "maroon");
  const location = useLocation();
  const isFirstRender = useRef(true);

  // Navigation preloader — short (0.5 s), not waiting for video
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPreloaderDuration(500);
    setIsLoading(true);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader theme={preloaderTheme} duration={preloaderDuration} onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Floating Design Approval Switcher on the Home page */}
      {!isLoading && location.pathname === "/" && (
        <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10 shadow-2xl">
          <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest mr-1">
            Preloader
          </span>

          {/* Maroon tab */}
          <button
            type="button"
            onClick={() => {
              setPreloaderTheme("maroon");
              localStorage.setItem("preloaderTheme", "maroon");
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-semibold cursor-pointer transition-all duration-200 ${
              preloaderTheme === "maroon"
                ? "bg-[#5d1712] text-white shadow-md scale-105"
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#c0392b] inline-block" />
            Maroon
          </button>

          {/* Gold tab */}
          <button
            type="button"
            onClick={() => {
              setPreloaderTheme("gold");
              localStorage.setItem("preloaderTheme", "gold");
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-semibold cursor-pointer transition-all duration-200 ${
              preloaderTheme === "gold"
                ? "bg-[#7a5c0a] text-[#f0d080] shadow-md scale-105"
                : "text-white/50 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#e5bc54] inline-block" />
            Gold
          </button>

          {/* Divider */}
          <div className="w-px h-5 bg-white/15 mx-1" />

          {/* Preview button */}
          <button
            type="button"
            onClick={() => { setPreloaderDuration(1000); setIsLoading(true); }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-semibold cursor-pointer text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
            title="Preview preloader again"
          >
            ▶ Preview
          </button>
        </div>
      )}

      <SmoothScroll>
        <AnimatedBackground />
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Admin Route - No Header/Footer */}
            <Route path="/admin/*" element={
              <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading Admin...</div>}>
                <AdminContent />
              </Suspense>
            } />

            {/* Public Routes */}
            <Route path="*" element={
              <>
                <Header />
                <EventWidget />

                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/temples" element={<TemplesPage />} />
                    <Route path="/temples/:slug" element={<TempleDetail />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/donation" element={<Donation />} />
                    <Route path="/kulaguru" element={<Kulaguru />} />
                    <Route path="/clan-grandeur" element={<ClanGrandeurPage />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogDetail />} />
                    <Route path="/id-card-benefits" element={<IDCardBenefits />} />
                  </Routes>
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </div>
      </SmoothScroll>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;

