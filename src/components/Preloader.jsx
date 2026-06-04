import { useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.webp";
import preloaderWebm from "../assets/Preloader/bd2507452ac54f0e8cc439035aac5e35.webm";

/**
 * Preloader
 * - Solid colour background, no decorations
 * - Timing is controlled by `duration` prop (ms), NOT by video end
 * - Video plays as a visual only (muted, no onEnded)
 */
const Preloader = ({ theme = "maroon", duration = 1500, onComplete }) => {
  const isGold = theme === "gold" || theme === "yellow";

  /* Fixed timer — page never waits for video to finish */
  useEffect(() => {
    const t = setTimeout(() => onComplete?.(), duration);
    return () => clearTimeout(t);
  }, [duration, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: isGold
          ? "linear-gradient(135deg, #2a1a00, #4a2e00, #1a1000)"
          : "linear-gradient(135deg, #2a0603, #4a0a05, #1a0302)",
      }}
    >
      {/* Smaller icon — video plays purely for visual, never blocks timing */}
      <div
        style={{
          width: "clamp(120px, 16vw, 180px)",
          height: "clamp(120px, 16vw, 180px)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <video
          poster={logo}
          autoPlay
          muted
          playsInline
          loop
          style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "screen" }}
          ref={(el) => {
            if (el) {
              el.setAttribute("muted", "");
              el.muted = true;
              el.play().catch((err) => {
                console.log("Autoplay was prevented:", err);
              });
            }
          }}
        >
          <source src={preloaderWebm} type="video/webm" />
        </video>
      </div>
    </motion.div>
  );
};

export default Preloader;
