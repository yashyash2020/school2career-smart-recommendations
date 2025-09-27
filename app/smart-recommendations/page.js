'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import SmartRecommendations from '../components/recommendations/SmartRecommendations'
import styles from './page.module.css'

export default function SmartRecommendationsPage() {
  const [userProfile, setUserProfile] = useState(null)
  const [riasecResults, setRiasecResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    // محاولة الحصول على النتائج من localStorage أو URL parameters
    async function loadUserData() {
      try {
        setLoading(true)
        
        // التحقق من وجود معرف النتائج في URL
        const resultId = searchParams.get('resultId')
        
        if (resultId) {
          // تحميل النتائج من قاعدة البيانات باستخدام المعرف
          console.log('🔍 تحميل النتائج من قاعدة البيانات...')
          // هنا يمكن إضافة استدعاء API لجلب النتائج
        } else {
          // تحميل النتائج من التخزين المحلي
          const storedResults = localStorage.getItem('riasec_results')
          const storedProfile = localStorage.getItem('user_profile')
          
          if (storedResults) {
            const results = JSON.parse(storedResults)
            setRiasecResults(results)
            console.log('✅ تم تحميل نتائج RIASEC من التخزين المحلي')
          }
          
          if (storedProfile) {
            const profile = JSON.parse(storedProfile)
            setUserProfile(profile)
            console.log('✅ تم تحميل ملف المستخدم من التخزين المحلي')
          } else {
            // إنشاء ملف تجريبي إذا لم يوجد
            const defaultProfile = {
              user_id: 'demo_user',
              name: 'مستخدم تجريبي',
              age: 18,
              education_level: 'ثانوي',
              preferred_language: 'ar'
            }
            setUserProfile(defaultProfile)
          }
        }
        
        // إذا لم توجد نتائج، إنشاء نتائج تجريبية
        if (!riasecResults) {
          const demoResults = {
            holland_code: 'IRA',
            confidence_score: 85,
            ranking: [
              { type: 'I', raw: 85, percentage: 85 },
              { type: 'R', raw: 78, percentage: 78 },
              { type: 'A', raw: 70, percentage: 70 },
              { type: 'S', raw: 45, percentage: 45 },
              { type: 'E', raw: 40, percentage: 40 },
              { type: 'C', raw: 35, percentage: 35 }
            ],
            personality: {
              analytical: 85,
              creative: 70,
              social: 60,
              detail_oriented: 80,
              leadership: 55
            },
            interests: {
              technology: 90,
              problem_solving: 85,
              innovation: 80,
              research: 75,
              helping_others: 50
            },
            skills: {
              programming: 70,
              mathematics: 80,
              communication: 65,
              teamwork: 70,
              critical_thinking: 75
            }
          }
          setRiasecResults(demoResults)
          console.log('📊 تم إنشاء نتائج تجريبية')
        }
        
      } catch (err) {
        console.error('❌ خطأ في تحميل البيانات:', err)
        setError('حدث خطأ في تحميل البيانات')
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [searchParams])

  if (loading) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen error={error} />
  }

  return (
    <div className={`${styles.smartRecommendationsPage} ${styles.gpuAccelerated}`}>
      {/* عناصر متحركة في الخلفية */}
      <div className={styles.floatingElements}>
        <div className={styles.floatingElement} style={{ fontSize: '60px' }}>🧠</div>
        <div className={styles.floatingElement} style={{ fontSize: '50px' }}>💡</div>
        <div className={styles.floatingElement} style={{ fontSize: '55px' }}>🎯</div>
      </div>
      {/* Header */}
      <header className={styles.recommendationCard} style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(15px)',
        padding: '20px 0',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '0',
        marginBottom: '0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h1 style={{
              color: 'white',
              fontSize: '24px',
              margin: 0,
              fontWeight: 'bold'
            }}>
              🧠 التوصيات الذكية
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '5px 0 0 0',
              fontSize: '14px'
            }}>
              مدعومة بالذكاء الاصطناعي • School2Career
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => window.print()}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '25px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              🖨️ طباعة
            </button>
            
            <button
              onClick={() => {
                const url = window.location.href
                navigator.clipboard.writeText(url)
                alert('تم نسخ رابط الصفحة!')
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                padding: '10px 15px',
                borderRadius: '25px',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              🔗 مشاركة
            </button>
          </div>
        </div>
      </header>

      {/* User Info Summary */}
      {userProfile && (
        <div style={{
          maxWidth: '1200px',
          margin: '20px auto',
          padding: '0 20px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '20px',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px'
            }}>
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>👤 {userProfile.name || 'المستخدم'}</h3>
                <p style={{ margin: 0, opacity: 0.8, fontSize: '14px' }}>
                  🎯 كود هولاند: {riasecResults?.holland_code} | 
                  📊 مستوى الثقة: {riasecResults?.confidence_score || 85}%
                </p>
              </div>
              
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  padding: '8px 12px',
                  borderRadius: '15px',
                  fontSize: '12px'
                }}>
                  📅 {new Date().toLocaleDateString('ar-SA')}
                </div>
                <div style={{
                  background: 'rgba(76, 175, 80, 0.3)',
                  padding: '8px 12px',
                  borderRadius: '15px',
                  fontSize: '12px'
                }}>
                  ✅ نشط
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={{
        padding: '20px 0 40px 0'
      }}>
        <SmartRecommendations 
          userProfile={userProfile}
          riasecResults={riasecResults}
        />
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.3)',
        color: 'white',
        padding: '30px 0',
        textAlign: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '20px'
          }}>
            <div>
              <h4 style={{ marginBottom: '15px', color: '#fff' }}>حول التوصيات الذكية</h4>
              <p style={{ fontSize: '14px', opacity: 0.8, lineHeight: '1.6' }}>
                نستخدم خوارزميات الذكاء الاصطناعي المتقدمة لتحليل شخصيتك وميولك 
                وتقديم توصيات مهنية دقيقة ومخصصة خصيصاً لك.
              </p>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '15px', color: '#fff' }}>المصادر العلمية</h4>
              <ul style={{ fontSize: '14px', opacity: 0.8, listStyle: 'none', padding: 0 }}>
                <li style={{ marginBottom: '5px' }}>• نظرية هولاند للميول المهنية</li>
                <li style={{ marginBottom: '5px' }}>• بيانات سوق العمل الحديثة</li>
                <li style={{ marginBottom: '5px' }}>• الدراسات النفسية المعتمدة</li>
                <li style={{ marginBottom: '5px' }}>• تحليل الاتجاهات المستقبلية</li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ marginBottom: '15px', color: '#fff' }}>تواصل معنا</h4>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                <p style={{ marginBottom: '5px' }}>📧 support@school2career.com</p>
                <p style={{ marginBottom: '5px' }}>📱 +966 50 123 4567</p>
                <p style={{ marginBottom: '5px' }}>🌐 www.school2career.com</p>
              </div>
            </div>
          </div>
          
          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '20px',
            fontSize: '14px',
            opacity: 0.7
          }}>
            <p style={{ margin: 0 }}>
              © 2024 School2Career. جميع الحقوق محفوظة. | 
              مدعوم بالذكاء الاصطناعي | 
              نظام التوصيات الذكية v2.0
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// مكون شاشة التحميل
function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Cairo, Arabic, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '20px',
          animation: 'pulse 2s infinite'
        }}>
          🧠
        </div>
        <h2 style={{ marginBottom: '15px' }}>جاري تحليل ملفك الشخصي...</h2>
        <p style={{ opacity: 0.8, marginBottom: '25px' }}>
          الذكاء الاصطناعي يعمل على إنشاء توصيات مخصصة لك
        </p>
        <div style={{
          width: '200px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
            animation: 'loading 2s infinite'
          }}></div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}

// مكون شاشة الخطأ
function ErrorScreen({ error }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Cairo, Arabic, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '40px',
        textAlign: 'center',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '500px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div>
        <h2 style={{ marginBottom: '15px' }}>حدث خطأ</h2>
        <p style={{ opacity: 0.8, marginBottom: '25px' }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            padding: '12px 25px',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
        >
          🔄 إعادة المحاولة
        </button>
      </div>
    </div>
  )
}