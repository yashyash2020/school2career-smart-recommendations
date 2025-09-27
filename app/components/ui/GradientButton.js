'use client';

import { motion } from 'framer-motion';

export default function GradientButton({ children, className = '', ...props }) {
  return (
    <motion.button
      className={`relative px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl overflow-hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {/* تأثير الموجة عند الضغط */}
      <span className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'width 0.6s, height 0.6s' }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
