'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [assessments, setAssessments] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const router = useRouter()

  useEffect(() => {
    // محاكاة تحميل بيانات المستخدم
    const userData = {
      name: "أحمد محمد",
      email: "ahmed@example.com",
      joinDate: "2024-01-15",
      completedAssessments: 3,
      totalScore: 85
    }
    setUser(userData)

    // محاكاة تحميل التقييمات المكتملة
    const userAssessments = [
      {
        id: 1,
        title: "تقييم الميول المهنية",
        completedDate: "2024-03-10",
        score: 88,
        status: "مكتمل"
      },
      {
        id: 2,
        title: "تقييم المهارات التقنية",
        completedDate: "2024-03-05",
        score: 92,
        status: "مكتمل"
      },
      {
        id: 3,
        title: "تقييم المهارات الفنية",
        completedDate: "2024-02-28",
        score: 76,
        status: "مكتمل"
      }
    ]
    setAssessments(userAssessments)

    // محاكاة التوصيات
    const userRecommendations = [
      {
        id: 1,
        title: "مطور برمجيات",
        match: 95,
        icon: "💻",
        description: "بناءً على نتائجك، أنت تتمتع بمهارات تقنية ممتازة"
      },
      {
        id: 2,
        title: "مهندس نظم",
        match: 88,
        icon: "⚙️",
        description: "قدراتك في التحليل والتفكير المنطقي عالية"
      },
      {
        id: 3,
        title: "مصمم واجهات",
        match: 82,
        icon: "🎨",
        description: "لديك حس فني جيد ومهارات في التصميم"
      }
    ]
    setRecommendations(userRecommendations)
  }, [])

  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--dark-bg)'
      }}>
        <div style={{ color: 'var(--text-primary)' }}>جاري تحميل البيانات...</div>
      </div>
    )
  }

  return (
    <>
      {/* Animated Background */}
      <div className="bg-animation"></div>
      <div className="floating-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>

      {/* Navigation */}
      <nav>
        <div className="nav-container">
          <div className="logo">School2Career</div>
          <div className="nav-links">
            <Link href="/" className="nav-link">الرئيسية</Link>
            <Link href="/assessments" className="nav-link">التقييمات</Link>
            <Link href="/careers" className="nav-link">المهن</Link>
            <Link href="/dashboard" className="nav-link">لوحة التحكم</Link>
            <div className="user-menu-container">
              <button className="user-menu-button">
                {user.name}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 50px' }}>
          
          {/* Welcome Header */}
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ 
              fontSize: '48px',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              مرحباً، {user.name}
            </h1>
            <p style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>
              إليك ملخص عن نشاطك ونتائجك
            </p>
          </div>

          {/* Stats Overview */}
          <div className="stats-container" style={{ marginBottom: '60px' }}>
            <div className="stat-item">
              <div className="stat-number">{user.completedAssessments}</div>
              <div className="stat-label">تقييم مكتمل</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{user.totalScore}%</div>
              <div className="stat-label">متوسط النتائج</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{recommendations.length}</div>
              <div className="stat-label">توصية مهنية</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">12</div>
              <div className="stat-label">يوم نشط</div>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '30px' 
          }}>
            
            {/* Recent Assessments */}
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '24px',
                marginBottom: '20px',
                color: 'var(--text-primary)'
              }}>
                التقييمات المكتملة
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {assessments.map((assessment) => (
                  <div key={assessment.id} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h3 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>
                        {assessment.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                        {assessment.completedDate}
                      </p>
                    </div>
                    <div style={{
                      background: assessment.score >= 90 ? 'var(--accent-neon)' : 
                                 assessment.score >= 80 ? 'var(--accent-purple)' : 
                                 'var(--accent-pink)',
                      color: 'var(--dark-bg)',
                      padding: '8px 15px',
                      borderRadius: '20px',
                      fontWeight: 'bold'
                    }}>
                      {assessment.score}%
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/assessments">
                <button style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '15px',
                  background: 'var(--primary-gradient)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  ابدأ تقييم جديد
                </button>
              </Link>
            </div>

            {/* Career Recommendations */}
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <h2 style={{ 
                fontSize: '24px',
                marginBottom: '20px',
                color: 'var(--text-primary)'
              }}>
                التوصيات المهنية
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {recommendations.map((rec) => (
                  <div key={rec.id} style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    padding: '20px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '24px', marginLeft: '10px' }}>{rec.icon}</span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>
                          {rec.title}
                        </h3>
                        <div style={{
                          background: 'var(--accent-neon)',
                          color: 'var(--dark-bg)',
                          padding: '2px 8px',
                          borderRadius: '10px',
                          fontSize: '12px',
                          display: 'inline-block'
                        }}>
                          {rec.match}% تطابق
                        </div>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                      {rec.description}
                    </p>
                  </div>
                ))}
              </div>
              <Link href="/careers">
                <button style={{
                  width: '100%',
                  marginTop: '20px',
                  padding: '15px',
                  background: 'transparent',
                  color: 'var(--text-primary)',
                  border: '2px solid var(--accent-purple)',
                  borderRadius: '15px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  استكشف المزيد من المهن
                </button>
              </Link>
            </div>

          </div>

          {/* Quick Actions */}
          <div style={{ 
            marginTop: '60px',
            background: 'var(--card-bg)',
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h2 style={{ 
              fontSize: '32px',
              marginBottom: '30px',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}>
              إجراءات سريعة
            </h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              <button 
                className="path-card"
                onClick={() => router.push('/assessments')}
                style={{ cursor: 'pointer' }}
              >
                <div className="path-icon">🎯</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>تقييم جديد</h3>
                <p style={{ fontSize: '14px' }}>ابدأ تقييم جديد لاكتشاف المزيد</p>
              </button>
              
              <button 
                className="path-card"
                onClick={() => router.push('/results')}
                style={{ cursor: 'pointer' }}
              >
                <div className="path-icon">📊</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>عرض النتائج</h3>
                <p style={{ fontSize: '14px' }}>راجع جميع نتائجك السابقة</p>
              </button>
              
              <button 
                className="path-card"
                onClick={() => router.push('/careers')}
                style={{ cursor: 'pointer' }}
              >
                <div className="path-icon">💼</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>استكشف المهن</h3>
                <p style={{ fontSize: '14px' }}>تصفح المهن المناسبة لك</p>
              </button>
              
              <button 
                className="path-card"
                onClick={() => router.push('/profile')}
                style={{ cursor: 'pointer' }}
              >
                <div className="path-icon">👤</div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>الملف الشخصي</h3>
                <p style={{ fontSize: '14px' }}>حدث بياناتك الشخصية</p>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-logo">School2Career</div>
          <div className="social-links">
            <a href="#" className="social-link">📘</a>
            <a href="#" className="social-link">🐦</a>
            <a href="#" className="social-link">📷</a>
            <a href="#" className="social-link">💼</a>
          </div>
          <div className="copyright">
            © 2025 School2Career - جميع الحقوق محفوظة
            <br />
            تطوير د. محمد يشار
          </div>
        </div>
      </footer>
    </>
  )
}