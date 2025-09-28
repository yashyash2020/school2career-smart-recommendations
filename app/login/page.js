'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      // حفظ بيانات المستخدم في localStorage
      const userData = {
        name: 'أحمد محمد',
        email: email,
        token: 'fake-jwt-token'
      }
      localStorage.setItem('userData', JSON.stringify(userData))
      localStorage.setItem('userToken', userData.token)
      
      setIsLoading(false)
      router.push('/dashboard')
    }, 2000)
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
          <Link href="/" className="logo">School2Career</Link>
          <div className="nav-links">
            <Link href="/" className="nav-link">الرئيسية</Link>
            <Link href="/assessments" className="nav-link">التقييمات</Link>
            <Link href="/careers" className="nav-link">المهن</Link>
            <Link href="/about" className="nav-link">عن المنصة</Link>
            <Link href="/signup">
              <button className="cta-button">إنشاء حساب</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <main style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '120px 20px 40px'
      }}>
        <div style={{
          background: 'var(--card-bg)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '25px',
          padding: '50px',
          width: '100%',
          maxWidth: '500px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          
          {/* Card Background Effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at 50% 0%, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
            zIndex: -1
          }}></div>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '36px',
              background: 'var(--primary-gradient)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '10px'
            }}>
              تسجيل الدخول
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
              أهلاً بك مرة أخرى! سجل دخولك للمتابعة
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                color: 'var(--text-primary)',
                marginBottom: '8px',
                fontSize: '16px'
              }}>
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '15px 20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '15px',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-neon)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 255, 0.1)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.target.style.boxShadow = 'none'
                }}
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                color: 'var(--text-primary)',
                marginBottom: '8px',
                fontSize: '16px'
              }}>
                كلمة المرور
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '15px 50px 15px 20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '15px',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    outline: 'none'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent-neon)'
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 255, 255, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    e.target.style.boxShadow = 'none'
                  }}
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    left: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '18px'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}>
                <input 
                  type="checkbox" 
                  style={{ 
                    marginLeft: '8px',
                    accentColor: 'var(--accent-neon)'
                  }} 
                />
                تذكرني
              </label>
              <Link 
                href="/forgot-password" 
                style={{ 
                  color: 'var(--accent-neon)', 
                  textDecoration: 'none',
                  transition: 'color 0.3s ease'
                }}
              >
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '18px',
                background: isLoading ? 'var(--text-secondary)' : 'var(--primary-gradient)',
                color: 'white',
                border: 'none',
                borderRadius: '15px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginLeft: '10px'
                  }}></div>
                  جاري تسجيل الدخول...
                </div>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '30px',
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
              ليس لديك حساب؟
            </p>
            <Link href="/signup">
              <button style={{
                padding: '15px 30px',
                background: 'transparent',
                color: 'var(--accent-purple)',
                border: '2px solid var(--accent-purple)',
                borderRadius: '15px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'var(--accent-purple)'
                e.target.style.color = 'white'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent'
                e.target.style.color = 'var(--accent-purple)'
                e.target.style.transform = 'translateY(0)'
              }}>
                إنشاء حساب جديد
              </button>
            </Link>
          </div>

          {/* Social Login (اختياري) */}
          <div style={{ 
            marginTop: '30px',
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ 
              textAlign: 'center', 
              color: 'var(--text-secondary)', 
              marginBottom: '20px' 
            }}>
              أو سجل دخولك باستخدام
            </p>
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              justifyContent: 'center' 
            }}>
              <button style={{
                width: '50px',
                height: '50px',
                background: 'var(--card-bg)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '20px'
              }}>
                📘
              </button>
              <button style={{
                width: '50px',
                height: '50px',
                background: 'var(--card-bg)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '20px'
              }}>
                🔍
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}