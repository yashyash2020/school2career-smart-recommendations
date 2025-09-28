'use client';

import { motion } from 'framer-motion';

export default function GradientHeading({ children, as: Component = 'h2', className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Component
        className={`text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${className}`}
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  );
}
