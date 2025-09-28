/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove i18n config since we're using App Router with custom translation system
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  }
};

export default nextConfig;
