import './globals.css';
import AnimatedBackground from './components/ui/AnimatedBackground';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './lib/translation';

export const metadata = {
  title: 'School2Career - منصة التقييم المهني الذكية',
  description: 'منصة تقييم ذكية تساعدك على اكتشاف قدراتك ومهاراتك وتوجهك نحو المسار المهني الأنسب لك',
  keywords: 'تقييم مهني, توجيه مهني, طلاب, تعليم, مصر, School2Career',
  authors: [{ name: 'School2Career Team' }],
  openGraph: {
    title: 'School2Career - اكتشف مستقبلك',
    description: 'منصة التقييم المهني الأولى في الشرق الأوسط',
    url: 'https://school2career.com',
    siteName: 'School2Career',
    locale: 'ar_EG',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Suppress extension errors in development */}
        <script dangerouslySetInnerHTML={{
          __html: `
            if (typeof window !== 'undefined') {
              window.addEventListener('error', function(e) {
                if (e.message && (e.message.includes('Extension') || e.message.includes('chrome-extension') || e.message.includes('listener indicated'))) {
                  e.preventDefault();
                  return false;
                }
              });
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && (e.reason.message.includes('Extension') || e.reason.message.includes('chrome-extension') || e.reason.message.includes('listener indicated'))) {
                  e.preventDefault();
                  return false;
                }
              });
            }
          `
        }} />
        
        {/* Arabic Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200;300;400;500;600;700;800;900&family=Tajawal:wght@200;300;400;500;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <LanguageProvider>
          <AppProvider>
            {/* هذا هو السطر الجديد الذي يضيف الخلفية المتحركة */}
            <AnimatedBackground />
            
            {/* المحتوى الرئيسي للصفحة يظهر فوق الخلفية */}
            {children}
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
