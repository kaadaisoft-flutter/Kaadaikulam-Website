import { motion } from "framer-motion";

/**
 * FadeUp component for smooth entry from bottom
 */
export const FadeUp = ({ children, delay = 0, duration = 0.8, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollReveal component for general entrance animations
 */
export const ScrollReveal = ({ children, variant = "fade", delay = 0, className = "" }) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 }
    },
    slideLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 }
    },
    slideRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      initial={variants[variant].initial}
      whileInView={variants[variant].animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerContainer for lists and card grids
 */
export const StaggerContainer = ({ children, staggerDelay = 0.1, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem to be used inside StaggerContainer
 */
export const StaggerItem = ({ children, variant = "fadeUp" }) => {
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      show: { opacity: 1, scale: 1 }
    }
  };

  return (
    <motion.div
      variants={variants[variant]}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
