'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RIASECAssessments() {
  const router = useRouter()

  const globalVersions = [
    { 
      icon: '⚡', 
      title: 'RIASEC السريع (30 سؤال)', 
      desc: 'نسخة سريعة للتقييم الأولي للميول المهنية', 
      time: '10-15 دقيقة', 
      path: '/assessments/riasec/enhanced?version=30',
      badge: 'سريع',
      questions: 30,
      accuracy: 'متوسطة'
    },
    { 
      icon: '🎯', 
      title: 'RIASEC المتوسط (60 سؤال)', 
      desc: 'توازن مثالي بين الدقة والوقت المطلوب', 
      time: '20-25 دقيقة', 
      path: '/assessments/riasec/enhanced?version=60',
      badge: 'موصى به',
      recommended: true,
      questions: 60,
      accuracy: 'عالية'
    },
    { 
      icon: '📊', 
      title: 'RIASEC الشامل (180 سؤال)', 
      desc: 'التحليل الأكثر دقة وتفصيلاً للميول المهنية', 
      time: '45-60 دقيقة', 
      path: '/assessments/riasec/enhanced?version=180',
      badge: 'شامل',
      questions: 180,
      accuracy: 'عالية جداً'
    }
  ]

  const developedVersions = [
    { 
      icon: '⚡', 
      title: 'School2Career السريع (30 سؤال)', 
      desc: 'نسختنا المطورة السريعة مع تركيز على المستقبل', 
      time: '10-15 دقيقة', 
      path: '/assessments/riasec/enhanced?version=school2career-30',
      badge: 'مطور',
      questions: 30,
      accuracy: 'متوسطة',
      featured: true
    },
    { 
      icon: '🎯', 
      title: 'School2Career المتوسط (60 سؤال)', 
      desc: 'النسخة المطورة المتوازنة مع رؤية مستقبلية', 
      time: '20-25 دقيقة', 
      path: '/assessments/riasec/enhanced?version=school2career-60',
      badge: 'مطور',
      questions: 60,
      accuracy: 'عالية',
      featured: true
    },
    { 
      icon: '🚀', 
      title: 'School2Career الكامل (120 سؤال)', 
      desc: 'نسختنا الشاملة المطورة لتحقيق أحلامك المهنية', 
      time: '30-35 دقيقة', 
      path: '/assessments/riasec/enhanced?version=school2career',
      badge: 'مطور شامل',
      questions: 120,
      accuracy: 'عالية جداً',
      featured: true
    }
  ]

  return (
    <>
      {/* Animated Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)',
        zIndex: -1
      }}></div>

      {/* Navigation */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '70px',
        background: 'rgba(15, 15, 30, 0.98)',
        backdropFilter: 'blur(20px)',
        borderBottom: '2px solid rgba(102, 126, 234, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        zIndex: 1000,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <Link href="/assessments" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '50px',
          color: 'white',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'all 0.3s ease',
          boxShadow: '0 5px 15px rgba(118, 75, 162, 0.4)'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          العودة للتقييمات
        </Link>
        <div style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold' }}>
          تقييم RIASEC للميول المهنية
        </div>
        <div></div>
      </div>

      {/* Main Content */}
      <main style={{ 
        paddingTop: '120px', 
        paddingLeft: '160px',
        paddingRight: '160px',
        paddingBottom: '60px',
        minHeight: '100vh',
        maxWidth: '1000px',
        margin: '0 auto',
        direction: 'rtl' // Ensure RTL for the entire main content
      }}>
        
        {/* Header Section Group */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08))',
          padding: '40px 35px',
          borderRadius: '25px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          marginBottom: '50px',
          textAlign: 'center',
          color: 'white',
          direction: 'rtl'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '20px',
            direction: 'rtl'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              padding: '12px 16px',
              borderRadius: '15px',
              fontSize: '24px'
            }}>🎯</span>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              margin: 0,
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              تقييم RIASEC للميول المهنية
            </h1>
          </div>
          <p style={{
            fontSize: '18px',
            color: '#a8a8b8',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            التقييم العلمي الأكثر دقة في العالم لاكتشاف ميولك المهنية الحقيقية
          </p>
        </div>

        {/* Scientific Excellence Group */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.08))',
          padding: '35px',
          borderRadius: '25px',
          border: '1px solid rgba(16, 185, 129, 0.2)',
          marginBottom: '40px',
          direction: 'rtl'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '25px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              direction: 'rtl'
            }}>
              التميز العلمي والتقني
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                padding: '8px 12px',
                borderRadius: '12px',
                fontSize: '18px'
              }}>🔬</span>
            </h2>
            <p style={{
              color: '#a8a8b8',
              fontSize: '14px',
              margin: 0
            }}>
              مبني على أحدث الأبحاث العلمية والمعايير الدولية
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(102, 126, 234, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏆</div>
              <h3 style={{ fontSize: '14px', color: 'white', marginBottom: '6px' }}>خوارزميات متطورة</h3>
              <p style={{ fontSize: '11px', color: '#a8a8b8' }}>أحدث الخوارزميات والتقنيات</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📊</div>
              <h3 style={{ fontSize: '14px', color: 'white', marginBottom: '6px' }}>معايير علمية دولية</h3>
              <p style={{ fontSize: '11px', color: '#a8a8b8' }}>مبني على أحدث الابحاث</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(240, 147, 251, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>⚡</div>
              <h3 style={{ fontSize: '14px', color: 'white', marginBottom: '6px' }}>نتائج فورية</h3>
              <p style={{ fontSize: '11px', color: '#a8a8b8' }}>احصل على نتائجك في ثوان</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(251, 191, 36, 0.2)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>📈</div>
              <h3 style={{ fontSize: '14px', color: 'white', marginBottom: '6px' }}>تقارير تفاعلية</h3>
              <p style={{ fontSize: '11px', color: '#a8a8b8' }}>تقارير مصورة وتفاعلية</p>
            </div>
          </div>
        </div>

        {/* Smart Features Group */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(245, 158, 11, 0.08))',
          padding: '30px',
          borderRadius: '25px',
          border: '1px solid rgba(251, 191, 36, 0.2)',
          marginBottom: '50px',
          textAlign: 'center',
          direction: 'rtl'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '20px',
            direction: 'rtl'
          }}>
            لماذا تختار خوارزمياتنا المتطورة؟
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              padding: '8px 12px',
              borderRadius: '12px',
              fontSize: '18px'
            }}>⚡</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '15px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🔄</div>
              <h4 style={{ color: '#f59e0b', fontSize: '13px', marginBottom: '3px' }}>تحليل ذكي</h4>
              <p style={{ fontSize: '10px', color: '#a8a8b8' }}>خوارزميات ذكية</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '15px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🎯</div>
              <h4 style={{ color: '#f59e0b', fontSize: '13px', marginBottom: '3px' }}>توصيات مخصصة</h4>
              <p style={{ fontSize: '10px', color: '#a8a8b8' }}>مبنية على شخصيتك</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '15px',
              borderRadius: '12px'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '5px' }}>🚀</div>
              <h4 style={{ color: '#f59e0b', fontSize: '13px', marginBottom: '3px' }}>رؤى مستقبلية</h4>
              <p style={{ fontSize: '10px', color: '#a8a8b8' }}>تحليل اتجاهات المستقبل</p>
            </div>
          </div>
        </div>

        {/* Global Versions Section */}
        <div style={{ 
          marginBottom: '50px',
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
          padding: '30px',
          borderRadius: '25px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          direction: 'rtl'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '25px'
          }}>
            <h2 style={{
              fontSize: '26px',
              fontWeight: 'bold',
              marginBottom: '8px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              direction: 'rtl'
            }}>
              النسخ العالمية المعتمدة
              <span style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                padding: '8px 12px',
                borderRadius: '12px',
                fontSize: '18px'
              }}>🌍</span>
            </h2>
            <p style={{
              color: '#a8a8b8',
              fontSize: '14px',
              margin: 0
            }}>
              مبنية على نظرية هولاند العلمية والمعايير الدولية
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', // Increased from 320px to make cards bigger
            gap: '25px',
            maxWidth: '750px',  // Reduced from 900px for more constrained grid
            margin: '0 auto'    // Center the grid
          }}>
            {globalVersions.map((version, index) => (
              <div key={index} style={{
                background: version.recommended ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '18px',
                padding: '25px', // Increased from 20px
                border: version.recommended ? '2px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                direction: 'rtl',
                textAlign: 'right'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
                
                {/* Badge */}
                {version.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '15px',
                    background: version.recommended ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
                  }}>
                    {version.badge} {version.recommended && ' ⭐'}
                  </div>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '18px', direction: 'rtl' }}> {/* Increased gap and margin */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '18px',  // Increased from 16px
                      marginBottom: '8px', 
                      color: 'white', 
                      textAlign: 'right',
                      fontWeight: 'bold'
                    }}>
                      {version.title}
                    </h3>
                    <p style={{
                      color: '#a8a8b8', 
                      fontSize: '12px',  // Increased from 11px
                      textAlign: 'right',
                      lineHeight: '1.4'
                    }}>
                      {version.desc}
                    </p>
                  </div>
                  <div style={{
                    width: '55px',     // Increased from 50px
                    height: '55px',    // Increased from 50px
                    background: version.recommended ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '14px', // Increased from 12px
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',  // Increased from 24px
                    flexShrink: 0
                  }}>
                    {version.icon}
                  </div>
                </div>

                {/* Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',      // Increased from 10px
                  marginBottom: '18px' // Increased from 15px
                }}>
                  <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}> {/* Increased padding and border radius */}
                    <div style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold' }}>عدد الأسئلة</div>
                    <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{version.questions}</div> {/* Increased from 14px */}
                  </div>
                  <div style={{ textAlign: 'center', padding: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px' }}> {/* Increased padding and border radius */}
                    <div style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold' }}>الوقت المطلوب</div>
                    <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{version.time}</div> {/* Increased from 14px */}
                  </div>
                </div>

                <button 
                  onClick={() => router.push(version.path)}
                  style={{
                    width: '100%',
                    padding: '14px',  // Increased from 12px
                    background: version.recommended ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '12px', // Increased from 10px
                    color: 'white',
                    fontSize: '15px',  // Increased from 14px
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)'
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = 'none'
                  }}>
                  ابدأ التقييم الآن 🚀
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* School2Career Developed Versions Section */}
        <div style={{ 
          marginBottom: '50px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.08))',
          padding: '35px',
          borderRadius: '25px',
          border: '2px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.1)',
          direction: 'rtl'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '15px',
              direction: 'rtl'
            }}>
              <h2 style={{
                fontSize: '28px',
                fontWeight: 'bold',
                margin: 0,
                color: 'white'
              }}>
                School2Career النسخة المطورة
              </h2>
              <span style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                padding: '10px 14px',
                borderRadius: '15px',
                fontSize: '20px'
              }}>🚀</span>
              <div style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}>
                جديد 🌟
              </div>
            </div>
            <p style={{
              color: '#a8a8b8',
              fontSize: '16px',
              margin: 0,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              نسختنا المطورة مع تركيز خاص على المستقبل واحتياجات سوق العمل
            </p>
          </div>
          
          {/* Features highlight */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '15px',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>🌟</div>
              <h4 style={{ color: '#10b981', fontSize: '12px', marginBottom: '3px', fontWeight: 'bold' }}>مطور حديثاً</h4>
              <p style={{ fontSize: '9px', color: '#a8a8b8' }}>بأحدث الخوارزميات</p>
            </div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '15px',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>📈</div>
              <h4 style={{ color: '#10b981', fontSize: '12px', marginBottom: '3px', fontWeight: 'bold' }}>توقعات مستقبلية</h4>
              <p style={{ fontSize: '9px', color: '#a8a8b8' }}>تحليل اتجاهات المهن</p>
            </div>
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              padding: '15px',
              borderRadius: '12px',
              textAlign: 'center',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>🎯</div>
              <h4 style={{ color: '#10b981', fontSize: '12px', marginBottom: '3px', fontWeight: 'bold' }}>توصيات ذكية</h4>
              <p style={{ fontSize: '9px', color: '#a8a8b8' }}>مخصصة لشخصيتك</p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '25px',
            maxWidth: '750px',
            margin: '0 auto'
          }}>
            {developedVersions.map((version, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))',
                borderRadius: '20px',
                padding: '28px',
                border: '2px solid rgba(16, 185, 129, 0.4)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                direction: 'rtl',
                textAlign: 'right',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.15)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.15)'
              }}>
                
                {/* Enhanced Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '15px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  padding: '6px 14px',
                  borderRadius: '15px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  {version.badge} 🚀
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', direction: 'rtl' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '18px',
                      marginBottom: '8px', 
                      color: 'white', 
                      textAlign: 'right',
                      fontWeight: 'bold'
                    }}>
                      {version.title}
                    </h3>
                    <p style={{
                      color: '#a8a8b8', 
                      fontSize: '12px', 
                      textAlign: 'right',
                      lineHeight: '1.4'
                    }}>
                      {version.desc}
                    </p>
                  </div>
                  <div style={{
                    width: '55px',
                    height: '55px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '26px',
                    flexShrink: 0,
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}>
                    {version.icon}
                  </div>
                </div>

                {/* Enhanced Info Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '12px', 
                    background: 'rgba(16, 185, 129, 0.2)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold' }}>عدد الأسئلة</div>
                    <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{version.questions}</div>
                  </div>
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '12px', 
                    background: 'rgba(16, 185, 129, 0.2)', 
                    borderRadius: '12px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <div style={{ color: '#10b981', fontSize: '11px', fontWeight: 'bold' }}>الوقت المطلوب</div>
                    <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>{version.time}</div>
                  </div>
                </div>

                <button 
                  onClick={() => router.push(version.path)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '15px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 4px 15px rgba(16, 185, 129, 0.3)'
                  }}>
                  ابدأ التقييم المطور 🌟
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>
    </>
  )
}