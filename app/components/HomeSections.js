// app/components/HomeSections.js

import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import GlassCard from "./ui/GlassCard";
import GradientHeading from "./ui/GradientHeading";

// دالة مساعدة لإنشاء تأثيرات الحركة
const createAnimationProps = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, delay },
});

export function FeaturesSection({ features }) {
  return (
    <section id="features" className="py-20 px-5">
      <GradientHeading>المميزات</GradientHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <GlassCard key={i} hoverable={true}>
            <div className="text-center">
              <div className="text-5xl mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl w-20 h-20 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export function StatsSection({ stats }) {
  const [displayedStats, setDisplayedStats] = useState(stats.map(stat => ({ ...stat, number: 0 })));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedStats(prevStats => {
        const updatedStats = prevStats.map((stat, index) => {
          const finalNumber = stats[index].number;
          if (stat.number < finalNumber) {
            return { ...stat, number: stat.number + Math.ceil(finalNumber / 50) };
          }
          return { ...stat, number: finalNumber };
        });

        if (updatedStats.every(stat => stat.number >= stats.find(s => s.label === stat.label).number)) {
          clearInterval(interval);
        }
        return updatedStats;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [stats]);

  return (
    <section className="py-20 px-5">
      <GradientHeading>إنجازاتنا</GradientHeading>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {displayedStats.map((stat, i) => (
          <GlassCard key={i} hoverable={true}>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <motion.h3 
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2"
              >
                {stat.number.toLocaleString()}+
              </motion.h3>
              <motion.p className="text-lg text-slate-300">
                {stat.label}
              </motion.p>
            </motion.div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export function TargetsSection({ targets, title }) {
  return (
    <section id="targets" className="py-20 px-5">
      <GradientHeading>{title}</GradientHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {targets.map((target, i) => (
          <GlassCard key={i} hoverable={true}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl w-24 h-24 mx-auto flex items-center justify-center shadow-lg shadow-purple-500/30">
                {target.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">{target.title}</h3>
              <p className="text-slate-400 mb-4">{target.description}</p>
            </div>
            <ul className="space-y-3">
              {target.features.map((feature, j) => (
                <li key={j} className="text-slate-400 flex items-center">
                  <span className="ml-2 text-purple-400">✨</span>
                  {feature}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection({ skills, title }) {
  return (
    <section id="skills" className="py-20 px-5 bg-gradient-to-br from-indigo-500/10 to-purple-600/10">
      <GradientHeading>{title}</GradientHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {skills.map((skill, i) => (
          <GlassCard key={i} hoverable={true}>
            <div className="text-center">
              <div className="text-4xl mb-3 filter drop-shadow-lg">{skill.icon}</div>
              <h4 className="text-lg font-semibold text-white mb-1">{skill.name}</h4>
              <p className="text-sm text-slate-400">{skill.category}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

export function PathsSection({ paths, title }) {
  return (
    <section id="paths" className="py-20 px-5">
      <GradientHeading>{title}</GradientHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {paths.map((path, i) => (
          <GlassCard key={i} hoverable={true}>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-5xl bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl w-24 h-24 flex items-center justify-center shadow-lg shadow-pink-500/30">
                {path.icon}
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">{path.title}</h3>
            </div>
            <ul className="space-y-4">
              {path.items.map((item, j) => (
                <li key={j} className="text-slate-400 flex items-center group/item">
                  <span className="ml-3 text-cyan-400 transition-transform duration-300 group-hover/item:translate-x-2">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}