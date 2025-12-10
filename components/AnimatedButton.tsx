'use client';

import { motion } from 'framer-motion';

export default function AnimatedButton({ 
  text, 
  onClick 
}: { 
  text: string; 
  onClick?: () => void 
}) {
  return (
    <motion.button
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" 
      }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 bg-primary text-white rounded-lg font-semibold transition-all duration-300"
      onClick={onClick}
    >
      {text}
    </motion.button>
  );
}