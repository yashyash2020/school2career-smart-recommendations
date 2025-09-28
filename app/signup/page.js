'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    education: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('كلمتا المرور غير متطابقتين')
      return
    }

    setIsLoading(true)
    
    // محاكاة عملية إنشاء الحساب
    setTimeout(() => {
      // حفظ بيانات المستخدم في localStorage
      const userData = {
        name: formData.name,
        email: formData.email,
        token: 'fake-jwt-token',
        age: formData.age,
        gender: formData.gender,
        education: formData.education
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
            <Link href="/login">
              <button className="cta-button">تسجيل الدخول</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
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
          maxWidth: '600px',
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
              إنشاء حساب جديد
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px' }}>
              انضم إلينا واكتشف مسارك المهني المثالي
            </p>
          </div>

          <form onSubmit={handleSignup}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px', 
              marginBottom: '25px' 
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
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
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  العمر
                </label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
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
                >
                  <option value="">اختر عمرك</option>
                  <option value="13-15">13-15 سنة</option>
                  <option value="16-18">16-18 سنة</option>
                  <option value="19-25">19-25 سنة</option>
                  <option value="26-35">26-35 سنة</option>
                  <option value="36+">36+ سنة</option>
                </select>
              </div>
            </div>

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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
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
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px', 
              marginBottom: '25px' 
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  الجنس
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
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
                >
                  <option value="">اختر الجنس</option>
                  <option value="male">ذكر</option>
                  <option value="female">أنثى</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  المستوى التعليمي
                </label>
                <select
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
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
                >
                  <option value="">اختر مستواك التعليمي</option>
                  <option value="middle-school">المرحلة المتوسطة</option>
                  <option value="high-school">المرحلة الثانوية</option>
                  <option value="university">الجامعة</option>
                  <option value="graduate">خريج</option>
                  <option value="postgraduate">دراسات عليا</option>
                </select>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '20px', 
              marginBottom: '30px' 
            }}>
              <div>
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
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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

              <div>
                <label style={{
                  display: 'block',
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                  fontSize: '16px'
                }}>
                  تأكيد كلمة المرور
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
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
                    placeholder="أعد كتابة كلمة المرور"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    {showConfirmPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}>
                <input 
                  type="checkbox" 
                  required
                  style={{ 
                    marginLeft: '10px',
                    accentColor: 'var(--accent-neon)'
                  }} 
                />
                أوافق على{' '}
                <Link href="/terms" style={{ color: 'var(--accent-neon)', marginRight: '5px', marginLeft: '5px' }}>
                  شروط الاستخدام
                </Link>
                {' '}و{' '}
                <Link href="/privacy" style={{ color: 'var(--accent-neon)', marginRight: '5px' }}>
                  سياسة الخصوصية
                </Link>
              </label>
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
                  جاري إنشاء الحساب...
                </div>
              ) : (
                'إنشاء الحساب'
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
              لديك حساب بالفعل؟
            </p>
            <Link href="/login">
              <button style={{
                padding: '15px 30px',
                background: 'transparent',
                color: 'var(--accent-purple)',
                border: '2px solid var(--accent-purple)',
                borderRadius: '15px',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                تسجيل الدخول
              </button>
            </Link>
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