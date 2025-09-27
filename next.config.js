/** @type {import('next').NextConfig} */
const nextConfig = {
  // تفعيل الميزات التجريبية
  experimental: {
    serverActions: true,
    appDir: true
  },
  
  // تحسينات الأداء
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  // دعم الصور
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  
  // تحسينات الـ bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  
  // إعدادات الـ output
  output: 'standalone',
  
  // دعم ES modules
  transpilePackages: [],
  
  // إعدادات الأمان
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  
  // إعادة التوجيه
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*'
      }
    ];
  }
};

export default nextConfig;