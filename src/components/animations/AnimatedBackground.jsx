import { motion } from "framer-motion";

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `radial-gradient(#5d1712 0.5px, transparent 0.5px)`, 
          backgroundSize: '24px 24px' 
        }} 
      />
      
      {/* Floating Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-[#c49a3c]/5 blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[35%] aspect-square rounded-full bg-[#5d1712]/5 blur-[80px]"
      />

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[30%] right-[10%] w-[20%] aspect-square rounded-full bg-[#c49a3c]/5 blur-[120px]"
      />
    </div>
  );
};

export default AnimatedBackground;
