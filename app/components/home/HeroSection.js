// app/components/home/FeaturesSection.js
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';

export default function FeaturesSection() {
  const { t } = useTranslation('common');

  // جلب بيانات المميزات من ملف الترجمة
  // هذا يجعل من السهل إضافة أو تعديل المميزات لاحقًا
  const features = [
    {
      icon: '🧠',
      title: t('features.scientific'),
      description: t('features.scientific_desc'),
    },
    {
      icon: '📊',
      title: t('features.reports'),
      description: t('features.reports_desc'),
    },
    {
      icon: '🌍',
      title: t('features.multilingual'),
      description: t('features.multilingual_desc'),
    },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            {t('features.title')}
          </h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }} // يبدأ الحركة عندما يصبح العنصر مرئيًا بنسبة 30%
              transition={{ duration: 0.5, delay: index * 0.1 }} // تأخير ظهور كل عنصر
              className="glass-effect p-8 rounded-2xl text-center"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
