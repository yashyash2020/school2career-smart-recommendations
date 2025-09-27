'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function GlassCard({ children, className = '', hoverable = true, ...props }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 overflow-hidden ${className}`}
      whileHover={hoverable ? { y: -10, scale: 1.02 } : {}}
      onHoverStart={() => hoverable && setIsHovered(true)}
      onHoverEnd={() => hoverable && setIsHovered(false)}
      {...props}
    >
      {/* تأثير التوهج عند التمرير */}
      {hoverable && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* المحتوى */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
