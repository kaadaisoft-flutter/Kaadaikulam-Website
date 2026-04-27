import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TemplesPage from "./pages/TemplesPage";
import TempleDetail from "./pages/TempleDetail";
import History from "./pages/History";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Donation from "./pages/Donation";
import { LanguageProvider } from "./context/LanguageContext";
import SmoothScroll from "./components/SmoothScroll";
import AnimatedBackground from "./components/animations/AnimatedBackground";

function App() {
  return (
    <LanguageProvider>
      <Router>
        <SmoothScroll>
          <AnimatedBackground />
          <div className="min-h-screen">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/temples" element={<TemplesPage />} />
                <Route path="/temples/:slug" element={<TempleDetail />} />
                <Route path="/history" element={<History />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/donation" element={<Donation />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </Router>
    </LanguageProvider>
  );
}

export default App;
