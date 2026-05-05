import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import TemplesPage from "./pages/TemplesPage";
import TempleDetail from "./pages/TempleDetail";
import History from "./pages/History";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Donation from "./pages/Donation";
import Kulaguru from "./pages/Kulaguru";
import { LanguageProvider } from "./context/LanguageContext";
import SmoothScroll from "./components/SmoothScroll";
import AnimatedBackground from "./components/animations/AnimatedBackground";

// Lazy load Admin
const AdminContent = lazy(() => import("@admin/App").then(module => ({ default: module.AdminContent })));

function App() {
  return (
    <LanguageProvider>
      <Router>
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
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogDetail />} />
                      <Route path="/temples" element={<TemplesPage />} />
                      <Route path="/temples/:slug" element={<TempleDetail />} />
                      <Route path="/history" element={<History />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/donation" element={<Donation />} />
                      <Route path="/kulaguru" element={<Kulaguru />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </SmoothScroll>
      </Router>
    </LanguageProvider>
  );
}

export default App;
