'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, Star, Zap, CheckCircle, Lightbulb, SkipForward, Download, Share2, PlayCircle, Trophy, TrendingUp, Award, BookOpen, Brain, Target, Activity, Briefcase, GraduationCap, Building, FileText, Sparkles, Rocket, Compass } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RIASECAssessment = () => {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [riasecScores, setRiasecScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [timeLeft, setTimeLeft] = useState(1800);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [powerUps, setPowerUps] = useState({ skip: 3, hint: 5, boost: 2 });
  const [showHint, setShowHint] = useState(false);
  const [animation, setAnimation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [consistencyCheck, setConsistencyCheck] = useState([]);

  // Animation Styles
  const animationStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    
    @keyframes rotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @keyframes particle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;

  // Insert styles into document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = animationStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // ألوان المشروع الأساسية
  const colors = {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    dark: '#0f0f1e',
    card: 'rgba(255, 255, 255, 0.05)',
    text: '#ffffff',
    textSecondary: '#a8a8b8'
  };

  // RIASEC Types Configuration with enhanced data
  const riasecTypes = {
    R: { 
      name: 'الواقعي', 
      color: 'from-green-500 to-emerald-600', 
      icon: '🔧', 
      description: 'العمل بالأيدي والأدوات',
      traits: ['عملي', 'مستقل', 'محب للطبيعة', 'يفضل الأعمال الملموسة'],
      skills: ['المهارات اليدوية', 'القوة البدنية', 'التنسيق الحركي', 'العمل مع الآلات']
    },
    I: { 
      name: 'الاستقصائي', 
      color: 'from-blue-500 to-cyan-600', 
      icon: '🔬', 
      description: 'البحث والتحليل',
      traits: ['فضولي', 'تحليلي', 'منطقي', 'محب للتعلم'],
      skills: ['التفكير النقدي', 'حل المشكلات', 'البحث العلمي', 'التحليل']
    },
    A: { 
      name: 'الفني', 
      color: 'from-purple-500 to-pink-600', 
      icon: '🎨', 
      description: 'الإبداع والتعبير',
      traits: ['مبدع', 'حساس', 'خيالي', 'معبر'],
      skills: ['الإبداع', 'التصميم', 'التعبير الفني', 'التفكير خارج الصندوق']
    },
    S: { 
      name: 'الاجتماعي', 
      color: 'from-orange-500 to-red-600', 
      icon: '🤝', 
      description: 'مساعدة الآخرين',
      traits: ['متعاون', 'متعاطف', 'صبور', 'ودود'],
      skills: ['التواصل', 'الاستماع', 'التعليم', 'الإرشاد']
    },
    E: { 
      name: 'المغامر', 
      color: 'from-yellow-500 to-amber-600', 
      icon: '💼', 
      description: 'القيادة والإقناع',
      traits: ['قيادي', 'طموح', 'مقنع', 'واثق'],
      skills: ['القيادة', 'الإقناع', 'التفاوض', 'اتخاذ القرارات']
    },
    C: { 
      name: 'التقليدي', 
      color: 'from-indigo-500 to-blue-600', 
      icon: '📊', 
      description: 'التنظيم والدقة',
      traits: ['منظم', 'دقيق', 'منهجي', 'موثوق'],
      skills: ['التنظيم', 'إدارة البيانات', 'الانتباه للتفاصيل', 'المتابعة']
    }
  };

  // صفحة البداية
  if (currentStage === 'intro') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a2e 50%, #16213e 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(240, 147, 251, 0.06) 0%, transparent 50%)
          `,
          zIndex: 1
        }} />
        
        {/* Floating Shapes */}
        <div style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1}}>
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '100px',
            background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(139, 92, 246, 0.1))',
            borderRadius: '50%',
            top: '20%',
            left: '10%',
            animation: 'float 6s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            background: 'linear-gradient(45deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))',
            borderRadius: '50%',
            top: '60%',
            right: '10%',
            animation: 'float 8s ease-in-out infinite reverse'
          }} />
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.08), rgba(16, 185, 129, 0.08))',
            borderRadius: '20px',
            top: '30%',
            right: '20%',
            animation: 'rotate 10s linear infinite'
          }} />
        </div>
        
        {/* Particles */}
        <div style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1}}>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background: 'rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                top: `${(i * 7) % 100}%`,
                left: `${(i * 11) % 100}%`,
                animation: `particle ${5 + (i % 6)}s linear infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        <div style={{
          maxWidth: '700px',
          width: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          borderRadius: '30px',
          padding: '50px',
          border: '1px solid rgba(102, 126, 234, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 30px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px'
            }}>
              🎯
            </div>
            
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: colors.text, marginBottom: '15px' }}>
              اكتشف ميولك المهنية
            </h1>
            <p style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '5px' }}>
              نموذج Holland RIASEC العلمي
            </p>
            <p style={{ fontSize: '16px', color: colors.textSecondary }}>
              60 سؤال لتحديد شخصيتك المهنية بدقة 98%
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            marginBottom: '30px'
          }}>
            {Object.entries(riasecTypes).map(([key, type]) => (
              <div key={key} style={{
                background: colors.card,
                borderRadius: '15px',
                padding: '20px',
                textAlign: 'center',
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>{type.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '5px' }}>
                  {type.name}
                </h3>
                <p style={{ fontSize: '13px', color: colors.textSecondary }}>{type.description}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: colors.card,
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '30px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '15px' }}>
              ✨ كيف يعمل التقييم؟
            </h3>
            <div style={{ color: colors.textSecondary }}>
              <div style={{ marginBottom: '10px' }}>✓ 60 سؤال متنوع ومخلوط لضمان دقة النتائج</div>
              <div style={{ marginBottom: '10px' }}>✓ خوارزمية محسنة لحساب التوافق المهني</div>
              <div style={{ marginBottom: '10px' }}>✓ تحليل شامل مع مؤشر الاتساق والثقة</div>
              <div>✓ توصيات مهنية ذكية مع بدائل متعددة</div>
            </div>
          </div>

          <button
            onClick={() => setCurrentStage('assessment')}
            style={{
              width: '100%',
              padding: '18px',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              color: 'white',
              border: 'none',
              borderRadius: '15px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.4)';
            }}
          >
            🚀 ابدأ التقييم الآن
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      color: 'white',
      background: colors.dark
    }}>
      <p>This is a minimal working version with modern styling!</p>
    </div>
  );
};

export default RIASECAssessment;