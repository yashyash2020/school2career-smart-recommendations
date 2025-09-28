"use client";

import { useTranslation } from 'next-i18next';

const features = [
  {
    name: 'feature1.name',
    description: 'feature1.description',
    icon: 'Icon1', // Placeholder for icon component or class
  },
  {
    name: 'feature2.name',
    description: 'feature2.description',
    icon: 'Icon2',
  },
  {
    name: 'feature3.name',
    description: 'feature3.description',
    icon: 'Icon3',
  },
  {
    name: 'feature4.name',
    description: 'feature4.description',
    icon: 'Icon4',
  },
];

export default function FeaturesSection() {
  const { t } = useTranslation('common');

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">{t('features.superTitle')}</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t('features.title')}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={t(feature.name)} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    {/* Placeholder for actual icon */}
                    <span className="text-white">{feature.icon}</span>
                  </div>
                  {t(feature.name)}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{t(feature.description)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
