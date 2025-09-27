'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '24px'
    }}>
      🔄 جاري تحميل اختبار RIASEC المتطور...
    </div>
  );
}

function RIASECContent() {
  const searchParams = useSearchParams();
  const version = searchParams.get('version') || '60';
  
  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1>🎯 اختبار RIASEC الدولي المتطور</h1>
      <p>نسخة: {version} سؤال</p>
      <p>هذه الصفحة تحت التطوير - سيتم إضافة الاختبار كاملاً قريباً</p>
      <div style={{ marginTop: '40px' }}>
        <a href="/assessments/riasec" style={{
          background: 'rgba(255,255,255,0.2)',
          padding: '15px 30px',
          borderRadius: '10px',
          color: 'white',
          textDecoration: 'none',
          border: '1px solid rgba(255,255,255,0.3)'
        }}>
          ← العودة لاختبار RIASEC الأساسي
        </a>
      </div>
    </div>
  );
}

export default function RIASECEnhancedPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RIASECContent />
    </Suspense>
  );
}