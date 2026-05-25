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
        {isLoading && <Preloader theme="maroon" duration={preloaderDuration} onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

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

