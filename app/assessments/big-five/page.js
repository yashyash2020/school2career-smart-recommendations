'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BigFiveAssessment = () => {
  const router = useRouter();
  const [currentStage, setCurrentStage] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [bigFiveScores, setBigFiveScores] = useState({ O: 0, C: 0, E: 0, A: 0, N: 0 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isProcessing, setIsProcessing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [sessionId, setSessionId] = useState('');
  const [startTime, setStartTime] = useState(null);

  const colors = {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#f093fb',
    dark: '#0f0f1e',
    card: 'rgba(255, 255, 255, 0.05)',
    text: '#ffffff',
    textSecondary: '#a8a8b8'
  };

  // Big Five Types for intro display (simplified)
  const bigFiveTypes = {
    O: { name: 'الانفتاح على الخبرة', icon: '🌟', description: 'الإبداع والفضول والانفتاح على التجارب الجديدة' },
    C: { name: 'يقظة الضمير', icon: '⚙️', description: 'التنظيم والانضباط والمسؤولية والالتزام' },
    E: { name: 'الانبساطية', icon: '🤝', description: 'الطاقة الاجتماعية والحماس والتفاعل مع الآخرين' },
    A: { name: 'المقبولية', icon: '❤️', description: 'التعاطف والثقة والتعاون ومساعدة الآخرين' },
    N: { name: 'العصابية', icon: '🧠', description: 'الاستقرار العاطفي والتعامل مع التوتر والضغوط' }
  };

  // Big Five Scoring Algorithm (من الملف المرجعي)
  const calculateBigFiveResults = (responses) => {
    const dimensions = {
      'O': {
        name: 'Openness',
        nameAr: 'الانفتاح على الخبرة',
        positive: [1,2,3,4,5,6,7,8,9,10,11,12],
        negative: [13,14,15,16,17,18,19,20,21,22,23,24]
      },
      'C': {
        name: 'Conscientiousness', 
        nameAr: 'يقظة الضمير',
        positive: [25,26,27,28,29,30,31,32,33,34,35,36],
        negative: [37,38,39,40,41,42,43,44,45,46,47,48]
      },
      'E': {
        name: 'Extraversion',
        nameAr: 'الانبساطية', 
        positive: [49,50,51,52,53,54,55,56,57,58,59,60],
        negative: [61,62,63,64,65,66,67,68,69,70,71,72]
      },
      'A': {
        name: 'Agreeableness',
        nameAr: 'المقبولية',
        positive: [73,74,75,76,77,78,79,80,81,82,83,84],
        negative: [85,86,87,88,89,90,91,92,93,94,95,96]
      },
      'N': {
        name: 'Neuroticism',
        nameAr: 'العصابية',
        positive: [97,98,99,100,101,102,103,104,105,106,107,108],
        negative: [109,110,111,112,113,114,115,116,117,118,119,120]
      }
    };

    const results = { dimensions: {}, profile: '', interpretation: {} };
    
    // Calculate scores for each dimension
    for (let dim in dimensions) {
      const dimension = dimensions[dim];
      let totalScore = 0;
      
      // Positive questions
      dimension.positive.forEach(qNum => {
        totalScore += responses[qNum] || 3;
      });
      
      // Negative questions (reversed)
      dimension.negative.forEach(qNum => {
        totalScore += (6 - (responses[qNum] || 3));
      });
      
      const percentageScore = (totalScore / (24 * 5)) * 100;
      
      results.dimensions[dim] = {
        name: dimension.name,
        nameAr: dimension.nameAr,
        raw: totalScore,
        percentage: Math.round(percentageScore),
        interpretation: interpretScore(percentageScore, dim),
        level: getLevel(percentageScore)
      };
    }
    
    return results;
  };

  const interpretScore = (score, dimension) => {
    const interpretations = {
      'O': {
        low: 'عملي وواقعي، يفضل المألوف والمجرب',
        average: 'توازن بين الانفتاح والتحفظ',
        high: 'منفتح ومبدع، يبحث عن التجارب الجديدة'
      },
      'C': {
        low: 'مرن وعفوي، قد يواجه تحديات في التنظيم',
        average: 'منظم بشكل معتدل',
        high: 'منضبط ومنظم، موثوق والتزام عالي'
      },
      'E': {
        low: 'هادئ ومتحفظ، يفضل العمل المستقل',
        average: 'متوازن اجتماعياً',
        high: 'اجتماعي ونشيط، يستمتع بصحبة الآخرين'
      },
      'A': {
        low: 'مستقل وحازم، يركز على الإنجاز',
        average: 'متوازن بين التعاون والاستقلالية',
        high: 'متعاون ومتعاطف، يهتم بالآخرين'
      },
      'N': {
        low: 'مستقر عاطفياً، يتعامل مع الضغوط بفعالية',
        average: 'استقرار عاطفي معتدل',
        high: 'حساس عاطفياً، قد يحتاج دعم في إدارة التوتر'
      }
    };
    
    let level;
    if (score < 40) level = 'low';
    else if (score < 60) level = 'average'; 
    else level = 'high';
    
    return interpretations[dimension][level];
  };

  const getLevel = (score) => {
    if (score < 20) return 'منخفض جداً';
    if (score < 40) return 'منخفض';
    if (score < 60) return 'متوسط';
    if (score < 80) return 'مرتفع';
    return 'مرتفع جداً';
  };

  // Big Five Dimensions with comprehensive data for results
  const bigFiveDimensions = {
    O: { 
      name: 'الانفتاح على الخبرة (Openness)', 
      icon: '🌟', 
      description: 'الإبداع والفضول والانفتاح على التجارب الجديدة',
      traits: ['إبداعي', 'فضولي', 'متخيل', 'مرن', 'مستكشف', 'منفتح الذهن'],
      skills: ['الإبداع', 'حل المشكلات', 'التكيف', 'التفكير النقدي', 'الخيال', 'الابتكار'],
      careers: ['فنان', 'كاتب', 'مصمم', 'باحث', 'مطور', 'مهندس معماري', 'مخرج', 'مبرمج', 'عالم', 'مستشار إبداعي']
    },
    C: { 
      name: 'يقظة الضمير (Conscientiousness)', 
      icon: '⚙️', 
      description: 'التنظيم والانضباط والمسؤولية والالتزام',
      traits: ['منظم', 'منضبط', 'مسؤول', 'دقيق', 'ملتزم', 'مثابر'],
      skills: ['التنظيم', 'إدارة الوقت', 'التخطيط', 'الانضباط الذاتي', 'المثابرة', 'الدقة'],
      careers: ['محاسب', 'مدير مشروع', 'مهندس', 'طبيب', 'محامي', 'مدقق', 'مخطط مالي', 'مدير تنفيذي', 'قاضي', 'صيدلي']
    },
    E: { 
      name: 'الانبساطية (Extraversion)', 
      icon: '🤝', 
      description: 'الطاقة الاجتماعية والحماس والتفاعل مع الآخرين',
      traits: ['اجتماعي', 'نشيط', 'متحمس', 'ودود', 'ثرثار', 'قيادي'],
      skills: ['التواصل', 'العمل الجماعي', 'القيادة', 'التحفيز', 'بناء العلاقات', 'العرض والتقديم'],
      careers: ['مندوب مبيعات', 'مدير', 'معلم', 'مذيع', 'مستشار', 'مدرب', 'سياسي', 'مسوق', 'مرشد سياحي', 'منسق فعاليات']
    },
    A: { 
      name: 'المقبولية (Agreeableness)', 
      icon: '❤️', 
      description: 'التعاطف والثقة والتعاون ومساعدة الآخرين',
      traits: ['متعاطف', 'متعاون', 'مساعد', 'ثقة', 'متسامح', 'لطيف'],
      skills: ['التعاطف', 'العمل الجماعي', 'حل النزاعات', 'الاستماع', 'المساعدة', 'التفاوض'],
      careers: ['مرشد نفسي', 'ممرض', 'أخصائي اجتماعي', 'معالج', 'متطوع', 'مدرس', 'طبيب أطفال', 'مستشار أسري', 'عامل إنساني', 'وسيط']
    },
    N: { 
      name: 'العصابية (Neuroticism)', 
      icon: '🧠', 
      description: 'الاستقرار العاطفي والتعامل مع التوتر والضغوط',
      traits: ['حساس', 'قلق', 'متوتر', 'عاطفي', 'متقلب المزاج', 'مندفع'],
      skills: ['إدارة التوتر', 'الوعي العاطفي', 'التأمل', 'الاسترخاء', 'المرونة النفسية', 'التحكم بالانفعالات'], 
      careers: ['فنان', 'كاتب', 'مستشار', 'معالج نفسي', 'صحفي', 'ناقد', 'مؤلف', 'شاعر', 'ممثل', 'موسيقي']
    }
  };

  // Sample questions from the comprehensive database (120 total)
  const allQuestions = [
    // Openness (O) - First 12 questions (12 more would be added)
    { id: 1, text: "لدي خيال واسع ونشط", type: "O", reverse: false },
    { id: 2, text: "أستمتع بسماع أفكار جديدة", type: "O", reverse: false },
    { id: 3, text: "أحب التفكير في الأمور المجردة", type: "O", reverse: false },
    { id: 4, text: "أحب زيارة أماكن جديدة", type: "O", reverse: false },
    { id: 5, text: "أستمتع بالفن والموسيقى", type: "O", reverse: false },
    { id: 6, text: "أبحث عن تجارب جديدة", type: "O", reverse: false },
    { id: 13, text: "أفضل الروتين المألوف", type: "O", reverse: true },
    { id: 14, text: "لا أهتم بالفن", type: "O", reverse: true },
    { id: 15, text: "أتجنب الأفكار المعقدة", type: "O", reverse: true },
    { id: 16, text: "نادراً ما أحلم أحلام يقظة", type: "O", reverse: true },
    { id: 17, text: "لا أحب التغيير", type: "O", reverse: true },
    { id: 18, text: "أفضل الأشياء البسيطة", type: "O", reverse: true },
    
    // Conscientiousness (C) - First 12 questions
    { id: 25, text: "أكمل المهام فوراً", type: "C", reverse: false },
    { id: 26, text: "أحب النظام والترتيب", type: "C", reverse: false },
    { id: 27, text: "أنتبه للتفاصيل", type: "C", reverse: false },
    { id: 28, text: "أحترم المواعيد دائماً", type: "C", reverse: false },
    { id: 29, text: "أخطط مسبقاً", type: "C", reverse: false },
    { id: 30, text: "أتبع الجدول الزمني", type: "C", reverse: false },
    { id: 37, text: "أنسى الأشياء المهمة", type: "C", reverse: true },
    { id: 38, text: "أؤجل المهام", type: "C", reverse: true },
    { id: 39, text: "أترك الأمور للصدفة", type: "C", reverse: true },
    { id: 40, text: "أتأخر عن المواعيد", type: "C", reverse: true },
    { id: 41, text: "أتجنب المسؤوليات", type: "C", reverse: true },
    { id: 42, text: "فوضوي في ترتيب أشيائي", type: "C", reverse: true },
    
    // Extraversion (E) - First 12 questions 
    { id: 49, text: "أستمتع بالحفلات الاجتماعية", type: "E", reverse: false },
    { id: 50, text: "أحب التحدث مع الناس", type: "E", reverse: false },
    { id: 51, text: "أشعر بالراحة وسط الجموع", type: "E", reverse: false },
    { id: 52, text: "أكوّن صداقات بسهولة", type: "E", reverse: false },
    { id: 53, text: "أحب أن أكون مركز الاهتمام", type: "E", reverse: false },
    { id: 54, text: "لدي طاقة عالية", type: "E", reverse: false },
    { id: 61, text: "أفضل الوحدة", type: "E", reverse: true },
    { id: 62, text: "أتجنب الحشود", type: "E", reverse: true },
    { id: 63, text: "أحتاج وقتاً للانفراد", type: "E", reverse: true },
    { id: 64, text: "أجد صعوبة في بدء المحادثات", type: "E", reverse: true },
    { id: 65, text: "أشعر بالإرهاق من التجمعات", type: "E", reverse: true },
    { id: 66, text: "أفضل الأنشطة الفردية", type: "E", reverse: true },
    
    // Agreeableness (A) - First 12 questions
    { id: 73, text: "أثق بالآخرين بسهولة", type: "A", reverse: false },
    { id: 74, text: "أساعد الآخرين دون مقابل", type: "A", reverse: false },
    { id: 75, text: "أتعاطف مع مشاكل الآخرين", type: "A", reverse: false },
    { id: 76, text: "أسامح بسهولة", type: "A", reverse: false },
    { id: 77, text: "أحترم مشاعر الآخرين", type: "A", reverse: false },
    { id: 78, text: "أتعاون مع الجميع", type: "A", reverse: false },
    { id: 85, text: "أشك في نوايا الآخرين", type: "A", reverse: true },
    { id: 86, text: "أضع مصلحتي أولاً", type: "A", reverse: true },
    { id: 87, text: "أنتقد الآخرين بسهولة", type: "A", reverse: true },
    { id: 88, text: "أجد صعوبة في الثقة", type: "A", reverse: true },
    { id: 89, text: "لا أهتم بمشاكل الآخرين", type: "A", reverse: true },
    { id: 90, text: "أحمل الضغينة", type: "A", reverse: true },
    
    // Neuroticism (N) - First 12 questions
    { id: 97, text: "أقلق كثيراً", type: "N", reverse: false },
    { id: 98, text: "أشعر بالتوتر بسهولة", type: "N", reverse: false },
    { id: 99, text: "أغضب بسرعة", type: "N", reverse: false },
    { id: 100, text: "تتقلب مشاعري كثيراً", type: "N", reverse: false },
    { id: 101, text: "أشعر بالحزن غالباً", type: "N", reverse: false },
    { id: 102, text: "أنزعج من أشياء صغيرة", type: "N", reverse: false },
    { id: 109, text: "نادراً ما أشعر بالقلق", type: "N", reverse: true },
    { id: 110, text: "أبقى هادئاً تحت الضغط", type: "N", reverse: true },
    { id: 111, text: "أتحكم في انفعالاتي", type: "N", reverse: true },
    { id: 112, text: "نادراً ما أغضب", type: "N", reverse: true },
    { id: 113, text: "أشعر بالراحة معظم الوقت", type: "N", reverse: true },
    { id: 114, text: "أتعامل مع الضغوط جيداً", type: "N", reverse: true }
  ];

  const [sessionSeed, setSessionSeed] = useState(0);

  // Animation Styles
  const animationStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-10px) rotate(2deg); }
      50% { transform: translateY(-20px) rotate(0deg); }
      75% { transform: translateY(-10px) rotate(-2deg); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
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

  // Generate session ID and save session data
  useEffect(() => {
    const generateSessionId = () => {
      const timestamp = Date.now();
      const random = Math.floor(Math.random() * 1000);
      return `bigfive_${timestamp}_${random}`;
    };
    
    if (!sessionId) {
      const newSessionId = generateSessionId();
      setSessionId(newSessionId);
      setStartTime(new Date());
      
      // Save session start
      const sessionData = {
        sessionId: newSessionId,
        assessmentType: 'Big Five Personality',
        startTime: new Date().toISOString(),
        status: 'started',
        userId: 'guest', // يمكن تحديثه لاحقاً مع نظام المستخدمين
        language: 'ar'
      };
      
      try {
        const existingSessions = JSON.parse(localStorage.getItem('assessmentSessions') || '[]');
        existingSessions.push(sessionData);
        localStorage.setItem('assessmentSessions', JSON.stringify(existingSessions));
      } catch (error) {
        console.warn('Could not save session data:', error);
      }
    }
  }, [sessionId]);

  // Save session results
  const saveSessionResults = (results) => {
    try {
      const sessionResults = {
        sessionId,
        assessmentType: 'Big Five Personality',
        startTime: startTime?.toISOString(),
        endTime: new Date().toISOString(),
        duration: startTime ? Math.round((new Date() - startTime) / 1000) : 0,
        answers,
        scores: bigFiveScores,
        results,
        questionsAnswered: Object.keys(answers).length,
        totalQuestions: questions.length,
        completionPercentage: Math.round((Object.keys(answers).length / questions.length) * 100)
      };
      
      // Update session in localStorage
      const existingSessions = JSON.parse(localStorage.getItem('assessmentSessions') || '[]');
      const sessionIndex = existingSessions.findIndex(s => s.sessionId === sessionId);
      
      if (sessionIndex >= 0) {
        existingSessions[sessionIndex] = { ...existingSessions[sessionIndex], ...sessionResults, status: 'completed' };
      } else {
        existingSessions.push({ ...sessionResults, status: 'completed' });
      }
      
      localStorage.setItem('assessmentSessions', JSON.stringify(existingSessions));
      
      // Also save detailed results separately
      localStorage.setItem(`bigfive_results_${sessionId}`, JSON.stringify(sessionResults));
      
    } catch (error) {
      console.warn('Could not save session results:', error);
    }
  };

  // Generate deterministic seed and shuffle questions
  useEffect(() => {
    const now = new Date();
    const seed = (now.getFullYear() % 100) * 1000000 + 
                 (now.getMonth() + 1) * 10000 + 
                 now.getDate() * 100 + 
                 now.getHours();
    setSessionSeed(seed);
  }, []);

  useEffect(() => {
    if (sessionSeed === 0) return;
    
    // Enhanced deterministic shuffle
    const deterministicShuffle = (array, seed) => {
      const shuffled = [...array];
      
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = (shuffled[i].id * 17 + seed * 23 + i * 31) % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      return shuffled;
    };
    
    setQuestions(deterministicShuffle(allQuestions, sessionSeed));
  }, [sessionSeed]);

  useEffect(() => {
    if (currentStage === 'assessment' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentStage]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (value) => {
    if (isProcessing || !questions[currentQuestion]) return;
    
    setIsProcessing(true);
    const question = questions[currentQuestion];
    const questionType = question.type;
    
    // Calculate score using the new algorithm
    const score = question.reverse ? (6 - value) : value;
    
    setBigFiveScores(prev => ({
      ...prev,
      [questionType]: prev[questionType] + score
    }));
    
    setAnswers(prev => ({
      ...prev,
      [question.id]: value  // Use question ID instead of index
    }));

    setScore(prev => prev + (value * 2)); // Simple score for display

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        // Calculate final results using the comprehensive algorithm
        const finalResults = calculateBigFiveResults(answers);
        
        // Save session results
        saveSessionResults(finalResults);
        
        setCurrentStage('results');
      }
      setIsProcessing(false);
    }, 300);
  };

  // Intro stage
  if (currentStage === 'intro') {
    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a2e 50%, #16213e 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '700px',
          width: '100%',
          background: colors.card,
          backdropFilter: 'blur(20px)',
          borderRadius: '30px',
          padding: '50px',
          border: '1px solid rgba(102, 126, 234, 0.3)'
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
              🧠
            </div>
            
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: colors.text, marginBottom: '15px' }}>
              اختبار الشخصية الخماسي الكبير
            </h1>
            <p style={{ fontSize: '18px', color: colors.textSecondary, marginBottom: '5px' }}>
              Big Five Personality Test
            </p>
            <p style={{ fontSize: '16px', color: colors.textSecondary }}>
              60 سؤال لتحديد أبعاد شخصيتك الخمسة الرئيسية
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '15px',
            marginBottom: '30px'
          }}>
            {Object.entries(bigFiveTypes).map(([key, type]) => (
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
              cursor: 'pointer'
            }}
          >
            🚀 ابدأ التقييم الآن
          </button>
        </div>
      </div>
    );
  }

  // Assessment stage
  if (currentStage === 'assessment') {
    if (questions.length === 0) return <div style={{ color: 'white', textAlign: 'center', paddingTop: '50px' }}>جاري التحميل...</div>;
    
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a2e 50%, #16213e 100%)`,
        paddingTop: '20px'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(15, 15, 30, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(102, 126, 234, 0.3)',
          padding: '20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => router.push('/assessments')}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              ← العودة
            </button>
            
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ color: colors.text }}>
                ⏱️ {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ padding: '20px', background: colors.card }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary, marginBottom: '10px' }}>
              <span>السؤال {currentQuestion + 1} من {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                width: `${progress}%`,
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>
        </div>

        {/* Question */}
        <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
          <div style={{
            background: colors.card,
            borderRadius: '20px',
            padding: '40px',
            border: '1px solid rgba(102, 126, 234, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative gradient overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(139, 92, 246, 0.02) 50%, rgba(240, 147, 251, 0.03) 100%)',
              borderRadius: '20px',
              zIndex: 0
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ 
                  fontSize: '72px', 
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                  animation: 'float 3s ease-in-out infinite'
                }}>🤔</div>
                <h2 style={{ 
                  fontSize: '28px', 
                  color: colors.text,
                  fontWeight: '600',
                  lineHeight: '1.4',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>{currentQ.text}</h2>
              </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {[
                { value: 1, label: 'غير موافق بشدة', emoji: '😣', gradient: 'linear-gradient(135deg, #ff4757, #ff3742)' },
                { value: 2, label: 'غير موافق', emoji: '😕', gradient: 'linear-gradient(135deg, #ff7675, #fd79a8)' },
                { value: 3, label: 'محايد', emoji: '😐', gradient: 'linear-gradient(135deg, #fdcb6e, #f39c12)' },
                { value: 4, label: 'موافق', emoji: '😊', gradient: 'linear-gradient(135deg, #00b894, #00a085)' },
                { value: 5, label: 'موافق بشدة', emoji: '😍', gradient: 'linear-gradient(135deg, #667eea, #764ba2)' }
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  disabled={isProcessing}
                  style={{
                    padding: '15px 20px',
                    background: option.gradient,
                    border: 'none',
                    borderRadius: '15px',
                    color: 'white',
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    opacity: isProcessing ? 0.5 : 1,
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    transform: 'translateY(0)',
                    minWidth: '100px',
                    maxWidth: '140px',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isProcessing) {
                      e.target.style.transform = 'translateY(-8px) scale(1.05)';
                      e.target.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isProcessing) {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                    }
                  }}
                >
                  <div style={{ fontSize: '28px', marginBottom: '5px' }}>{option.emoji}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '2px' }}>{option.value}</div>
                  <div style={{ fontSize: '11px', fontWeight: '500' }}>{option.label}</div>
                </button>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results stage with comprehensive report
  if (currentStage === 'results') {
    // Calculate comprehensive results
    const finalResults = calculateBigFiveResults(answers);
    const dominantDimensions = Object.entries(finalResults.dimensions)
      .sort(([,a], [,b]) => b.percentage - a.percentage)
      .slice(0, 3);
    
    const primaryDimension = dominantDimensions[0];
    const dimensionInfo = bigFiveDimensions[primaryDimension[0]];

    return (
      <div style={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.dark} 0%, #1a1a2e 50%, #16213e 100%)`,
        padding: '20px'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(15, 15, 30, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(102, 126, 234, 0.3)',
          padding: '20px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => router.push('/assessments')}
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              ← العودة للتقييمات
            </button>
            
            <div style={{ color: colors.text, fontSize: '20px', fontWeight: 'bold' }}>
              🧠 تقرير Big Five الشامل
            </div>
            
            <div style={{ color: colors.text }}>
              ⭐ {score} نقطة
            </div>
          </div>
        </div>

        {/* Main Results Content */}
        <div style={{ maxWidth: '1200px', margin: '100px auto 0', display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Primary Result Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '25px',
            padding: '40px',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>{dimensionInfo.icon}</div>
            <h1 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #f093fb, #f5576c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '15px'
            }}>
              بُعدك الرئيسي: {dimensionInfo.name}
            </h1>
            <p style={{ fontSize: '20px', color: colors.textSecondary, marginBottom: '20px' }}>
              {dimensionInfo.description}
            </p>
            <div style={{ 
              display: 'inline-block',
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white'
            }}>
              {primaryDimension[1].percentage}% درجة
            </div>
          </div>

          {/* Detailed Analysis */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
            
            {/* Personality Traits */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h3 style={{ fontSize: '24px', color: colors.text, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                🌟 صفاتك الشخصية
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {dimensionInfo.traits.map((trait, index) => (
                  <span key={index} style={{
                    background: 'rgba(102, 126, 234, 0.2)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    color: colors.text,
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '30px',
              border: '1px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h3 style={{ fontSize: '24px', color: colors.text, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                ⚙️ مهاراتك القوية
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {dimensionInfo.skills.map((skill, index) => (
                  <span key={index} style={{
                    background: 'rgba(118, 75, 162, 0.2)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    color: colors.text,
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Career Recommendations */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <h3 style={{ fontSize: '24px', color: colors.text, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              💼 المهن المناسبة لك
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {dimensionInfo.careers.map((career, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  padding: '15px 20px',
                  borderRadius: '15px',
                  textAlign: 'center',
                  border: '1px solid rgba(102, 126, 234, 0.2)',
                  color: colors.text,
                  fontSize: '16px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))';
                }}>
                  {career}
                </div>
              ))}
            </div>
          </div>

          {/* Big Five Scores Chart */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: '30px',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            <h3 style={{ fontSize: '24px', color: colors.text, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📊 تحليل نتائج Big Five
            </h3>
            <div style={{ display: 'grid', gap: '15px' }}>
              {Object.entries(finalResults.dimensions).map(([dimKey, dimData], index) => {
                const typeData = bigFiveDimensions[dimKey];
                const isTop3 = index < 3;
                return (
                  <div key={dimKey} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    padding: '15px',
                    background: isTop3 ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '15px',
                    border: isTop3 ? '2px solid rgba(102, 126, 234, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div style={{ fontSize: '32px' }}>{typeData.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '18px', fontWeight: '600', color: colors.text, marginBottom: '5px' }}>
                        {typeData.name}
                      </div>
                      <div style={{ fontSize: '14px', color: colors.textSecondary }}>
                        {dimData.interpretation}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: colors.text }}>
                        {dimData.percentage}%
                      </div>
                      <div style={{ fontSize: '14px', color: colors.textSecondary }}>
                        {dimData.level}
                      </div>
                    </div>
                    <div style={{
                      width: '80px',
                      height: '8px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${dimData.percentage}%`,
                        height: '100%',
                        background: isTop3 ? 
                          `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` :
                          'rgba(255, 255, 255, 0.3)',
                        transition: 'width 1s ease'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setCurrentStage('intro');
                setCurrentQuestion(0);
                setAnswers({});
                setBigFiveScores({ O: 0, C: 0, E: 0, A: 0, N: 0 });
                setScore(0);
                setIsProcessing(false);
              }}
              style={{
                padding: '15px 30px',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                color: 'white',
                borderRadius: '15px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🔄 إعادة التقييم
            </button>
            
            <button
              onClick={() => router.push('/assessments')}
              style={{
                padding: '15px 30px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: colors.text,
                borderRadius: '15px',
                fontWeight: '600',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ← العودة للتقييمات
            </button>
            
            <button
              onClick={() => {
                const printContent = document.createElement('div');
                printContent.innerHTML = `
                  <h1>تقرير Big Five الشامل</h1>
                  <h2>بُعدك الرئيسي: ${dimensionInfo.name}</h2>
                  <p>وصف: ${dimensionInfo.description}</p>
                  <h3>الصفات الشخصية:</h3>
                  <ul>${dimensionInfo.traits.map(t => `<li>${t}</li>`).join('')}</ul>
                  <h3>المهارات:</h3>
                  <ul>${dimensionInfo.skills.map(s => `<li>${s}</li>`).join('')}</ul>
                  <h3>المهن المناسبة:</h3>
                  <ul>${dimensionInfo.careers.map(c => `<li>${c}</li>`).join('')}</ul>
                `;
                document.body.appendChild(printContent);
                window.print();
                document.body.removeChild(printContent);
              }}
              style={{
                padding: '15px 30px',
                background: 'linear-gradient(135deg, #f093fb, #f5576c)',
                color: 'white',
                borderRadius: '15px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              🖨️ طباعة التقرير
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BigFiveAssessment;