/**
 * RIASEC School2Career Enhanced Algorithm
 * نسخة محدثة ومطورة من خوارزمية RIASEC مخصصة لمنصة School2Career
 * 
 * Features:
 * - Modern career focus
 * - Enhanced reporting with dream-oriented language
 * - Future skills integration
 * - Emotional engagement
 * - Multi-dimensional analysis
 */

class RIASECSchool2Career {
  constructor() {
    this.version = "School2Career Enhanced v1.0";
    this.questionCount = 120;
    
    // معايير محدثة تتناسب مع نظام التسجيل الجديد
    this.scoringNorms = {
      school2career: {
        R: { description: "الميول العملية والتقنية" },
        I: { description: "الميول البحثية والاستقصائية" },
        A: { description: "الميول الإبداعية والفنية" },
        S: { description: "الميول الاجتماعية والخدمية" },
        E: { description: "الميول القيادية والريادية" },
        C: { description: "الميول التنظيمية والإدارية" }
      }
    };

    // مجالات الوظائف المستقبلية
    this.futureCareerClusters = {
      R: {
        traditional: ["مهندس ميكانيكي", "فني كهرباء", "نجار", "مزارع"],
        modern: ["مطور روبوتات", "فني طائرات بدون طيار", "مهندس طاقة متجددة", "مطور ألعاب VR"],
        emerging: ["مهندس طباعة ثلاثية الأبعاد", "فني ذكاء اصطناعي", "مطور حلول IoT", "متخصص زراعة عمودية"]
      },
      I: {
        traditional: ["عالم", "باحث", "طبيب", "محلل نفسي"],
        modern: ["عالم بيانات", "باحث ذكاء اصطناعي", "محلل أمن سيبراني", "مطور خوارزميات"],
        emerging: ["باحث علوم فضاء", "متخصص هندسة وراثية", "محلل بيانات كمية", "باحث واقع معزز"]
      },
      A: {
        traditional: ["فنان", "كاتب", "مصمم", "موسيقي"],
        modern: ["مصمم UX/UI", "منتج محتوى رقمي", "مصمم ألعاب", "منشئ محتوى"],
        emerging: ["مصمم تجارب واقع افتراضي", "فنان NFT", "مصمم ميتافيرس", "منشئ محتوى AI"]
      },
      S: {
        traditional: ["معلم", "ممرض", "أخصائي اجتماعي", "مرشد"],
        modern: ["مدرب حياة", "أخصائي صحة نفسية", "منسق مجتمعات رقمية", "مطور تطبيقات تعليمية"],
        emerging: ["معالج بالواقع الافتراضي", "منسق رفاهية رقمية", "مرشد مهني AI", "متخصص إدماج اجتماعي"]
      },
      E: {
        traditional: ["مدير", "رجل أعمال", "مسوق", "مندوب مبيعات"],
        modern: ["رائد أعمال تقني", "مدير منتج رقمي", "مؤثر", "مطور أعمال"],
        emerging: ["رائد أعمال ميتافيرس", "مدير استثمارات عملات رقمية", "منسق اقتصاد المنصات", "قائد تحول رقمي"]
      },
      C: {
        traditional: ["محاسب", "سكرتير", "موظف بنك", "أمين مكتبة"],
        modern: ["محلل بيانات مالية", "متخصص أتمتة", "مدير قواعد بيانات", "محلل امتثال"],
        emerging: ["مدير أمان بيانات", "متخصص blockchain", "محلل عمليات AI", "منسق أنظمة ذكية"]
      }
    };

    // رسائل تحفيزية وملهمة
    this.dreamMessages = {
      high: [
        "🌟 أنت تملك موهبة استثنائية في هذا المجال! حلمك قريب جداً",
        "✨ هذا المجال يناديك، وأنت تملك كل المقومات للنجاح فيه",
        "🚀 استعد لرحلة مذهلة في عالم مليء بالفرص والإنجازات",
        "🎯 هذا هو مجالك الذهبي - اتبع شغفك وسيقودك للنجاح"
      ],
      moderate: [
        "💫 لديك إمكانيات جيدة في هذا المجال، ويمكن تطويرها أكثر",
        "🌱 هذا المجال يناسبك، وبالتطوير المستمر ستحقق أهدافك",
        "📈 لديك أساس قوي، والاستثمار في تطوير مهاراتك سيثمر كثيراً",
        "🎨 إمكانياتك في هذا المجال واعدة، استمر في الاستكشاف"
      ],
      low: [
        "🔍 هذا المجال قد لا يكون الأولوية، لكن يمكن استكشافه كهواية",
        "🌙 ركز على مجالاتك القوية أولاً، وهذا يمكن أن يكون مجال ثانوي",
        "🗺️ خريطة مسارك تشير لاتجاهات أخرى أكثر تناسباً معك",
        "💡 استكشف المجالات الأخرى التي تظهر نقاط قوة أكبر لديك"
      ]
    };
  }

  /**
   * حساب النتائج المحسنة مع التركيز على الأحلام والطموحات
   */
  calculateEnhancedResults(responses, metadata = {}) {
    console.log('💪 Starting School2Career enhanced calculation...');
    console.log('📊 Received responses:', Object.keys(responses).length, 'questions');
    
    const results = {
      raw_scores: this.calculateRawScores(responses),
      percentiles: {},
      career_matches: {},
      personality_insights: {},
      dream_pathway: {},
      future_readiness: {},
      recommendation_engine: {},
      emotional_connection: {},
      metadata: {
        algorithm: this.version,
        timestamp: new Date().toISOString(),
        question_count: this.questionCount,
        ...metadata
      }
    };

    console.log('✅ Raw scores calculated:', results.raw_scores);

    // حساب النسب المئوية المحدثة
    results.percentiles = this.calculateModernPercentiles(results.raw_scores);
    console.log('✅ Percentiles calculated:', results.percentiles);
    
    // تحليل المطابقة المهنية
    results.career_matches = this.generateCareerMatches(results.percentiles);
    console.log('✅ Career matches generated');
    
    // رؤى الشخصية المهنية
    results.personality_insights = this.generatePersonalityInsights(results.percentiles);
    console.log('✅ Personality insights generated');
    
    // مسار الأحلام
    results.dream_pathway = this.createDreamPathway(results.percentiles, results.career_matches);
    console.log('✅ Dream pathway created');
    
    // جاهزية المستقبل
    results.future_readiness = this.assessFutureReadiness(results.percentiles);
    console.log('✅ Future readiness assessed');
    
    // محرك التوصيات
    results.recommendation_engine = this.generateRecommendations(results);
    console.log('✅ Recommendations generated');
    
    // الاتصال العاطفي
    results.emotional_connection = this.createEmotionalConnection(results);
    console.log('✅ Emotional connection created');

    console.log('🎆 School2Career calculation complete!');
    return results;
  }

  calculateRawScores(responses) {
    console.log('🔢 Calculating raw scores from responses:', typeof responses);
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    const counts = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    // Handle different response formats
    let processedResponses = responses;
    if (responses && typeof responses === 'object') {
      // If responses is an object with numeric keys (question indices)
      processedResponses = Object.entries(responses)
        .filter(([key, value]) => !isNaN(key) && value !== undefined && value !== null)
        .map(([key, value]) => ({ questionIndex: parseInt(key), answer: parseInt(value) }));
    }

    console.log('📊 Processing', processedResponses.length, 'responses');

    // Generate question types for mapping (since we're using demo questions)
    const questionTypes = [];
    const typesArray = ['R', 'I', 'A', 'S', 'E', 'C'];
    for (let i = 0; i < 120; i++) {
      const typeIndex = Math.floor(i / 20); // 20 questions per type
      questionTypes.push(typesArray[typeIndex]);
    }

    processedResponses.forEach((response, index) => {
      const questionIndex = response.questionIndex || index;
      const answer = response.answer || response;
      const type = questionTypes[questionIndex] || questionTypes[index];
      
      if (type && scores.hasOwnProperty(type)) {
        scores[type] += parseInt(answer) || 0;
        counts[type]++;
        console.log(`📝 Q${questionIndex + 1} (${type}): ${answer}`);
      }
    });

    // حساب النتائج الخام الصحيحة - مجموع الإجابات لكل نوع
    Object.keys(scores).forEach(type => {
      // النتيجة الخام هي مجموع الإجابات (من 20 إلى 100 لكل نوع مع 20 سؤال)
      console.log(`📊 ${type}: ${scores[type]} (from ${counts[type]} questions)`);
    });

    return scores;
  }

  calculateModernPercentiles(rawScores) {
    const percentiles = {};
    
    // حساب النسب المئوية بناء على النتائج الخام
    // كل نوع يحتوي على 20 سؤال مع إجابات من 1-5
    // النتيجة القصوى = 20 × 5 = 100
    // النتيجة الدنيا = 20 × 1 = 20
    
    Object.keys(rawScores).forEach(type => {
      const raw = rawScores[type];
      const minScore = 20; // 20 سؤال × 1 نقطة
      const maxScore = 100; // 20 سؤال × 5 نقاط
      
      // تحويل النتيجة الخام إلى نسبة مئوية
      const percentage = ((raw - minScore) / (maxScore - minScore)) * 100;
      percentiles[type] = Math.max(0, Math.min(100, percentage));
      
      console.log(`🔢 ${type}: Raw=${raw}, Percentage=${percentiles[type].toFixed(1)}%`);
    });

    // التأكد من أن النسب المئوية متوازنة وتعكس الإجابات الفعلية
    console.log('✅ Calculated percentiles:', percentiles);
    return percentiles;
  }

  generateCareerMatches(percentiles) {
    const matches = {};
    
    Object.keys(percentiles).forEach(type => {
      const score = percentiles[type];
      const cluster = this.futureCareerClusters[type];
      
      let careers = [];
      if (score >= 75) {
        careers = [...cluster.emerging, ...cluster.modern, ...cluster.traditional.slice(0, 2)];
      } else if (score >= 50) {
        careers = [...cluster.modern, ...cluster.traditional];
      } else {
        careers = cluster.traditional;
      }

      matches[type] = {
        match_level: score >= 75 ? 'excellent' : score >= 50 ? 'good' : 'fair',
        score: score,
        careers: careers.slice(0, 6), // أفضل 6 وظائف
        growth_potential: score >= 70 ? 'high' : score >= 40 ? 'medium' : 'low'
      };
    });

    return matches;
  }

  generatePersonalityInsights(percentiles) {
    const insights = {};
    const types = Object.keys(percentiles);
    const primary = types.reduce((a, b) => percentiles[a] > percentiles[b] ? a : b);
    const secondary = types.filter(t => t !== primary).reduce((a, b) => percentiles[a] > percentiles[b] ? a : b);

    insights.primary_type = {
      code: primary,
      name: this.getTypeArabicName(primary),
      score: Math.round(percentiles[primary]),
      description: this.getTypeDescription(primary)
    };

    insights.secondary_type = {
      code: secondary,
      name: this.getTypeArabicName(secondary),
      score: Math.round(percentiles[secondary]),
      description: this.getTypeDescription(secondary)
    };

    insights.combination_profile = this.getCombinationProfile(primary, secondary);
    insights.strength_areas = this.getStrengthAreas(percentiles);
    insights.development_areas = this.getDevelopmentAreas(percentiles);

    return insights;
  }

  createDreamPathway(percentiles, careerMatches) {
    const pathway = {
      immediate_goals: [],
      short_term_steps: [],
      long_term_vision: "",
      success_probability: 0,
      motivation_message: ""
    };

    // البحث عن أعلى نقاط
    const topTypes = Object.entries(percentiles)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 2);

    const primaryType = topTypes[0][0];
    const primaryScore = topTypes[0][1];

    // تحديد مستوى الرسالة التحفيزية
    let messageLevel = 'low';
    if (primaryScore >= 70) messageLevel = 'high';
    else if (primaryScore >= 50) messageLevel = 'moderate';

    pathway.motivation_message = this.dreamMessages[messageLevel][
      Math.floor(Math.random() * this.dreamMessages[messageLevel].length)
    ];

    // أهداف فورية
    pathway.immediate_goals = [
      `استكشف المجالات المرتبطة بـ ${this.getTypeArabicName(primaryType)}`,
      "احضر ورش عمل أو دورات تدريبية في مجال اهتمامك",
      "تواصل مع محترفين في المجال عبر LinkedIn",
      "ابدأ مشروع صغير أو هواية ترتبط بميولك"
    ];

    // خطوات قصيرة المدى
    pathway.short_term_steps = [
      "طور مهاراتك التقنية والرقمية",
      "ابني شبكة علاقات مهنية قوية",
      "احصل على شهادات متخصصة في مجالك",
      "تطوع في مشاريع ترتبط بمجال اهتمامك"
    ];

    // رؤية طويلة المدى
    const topCareers = careerMatches[primaryType]?.careers?.slice(0, 3) || [];
    pathway.long_term_vision = `أن تصبح رائداً في مجال ${this.getTypeArabicName(primaryType)}، ` +
      `مع التخصص في إحدى هذه المهن: ${topCareers.join(', ')}`;

    // احتمالية النجاح
    pathway.success_probability = Math.min(95, Math.max(40, primaryScore + 15));

    return pathway;
  }

  assessFutureReadiness(percentiles) {
    const readiness = {
      digital_skills: 0,
      adaptability: 0,
      innovation_mindset: 0,
      collaboration: 0,
      overall_readiness: 0,
      recommendations: []
    };

    // مهارات رقمية (أعلى في I و C)
    readiness.digital_skills = Math.max(percentiles.I, percentiles.C);
    
    // قابلية التكيف (أعلى في A و E)
    readiness.adaptability = Math.max(percentiles.A, percentiles.E);
    
    // عقلية الابتكار (أعلى في A و I)
    readiness.innovation_mindset = Math.max(percentiles.A, percentiles.I);
    
    // التعاون (أعلى في S و E)
    readiness.collaboration = Math.max(percentiles.S, percentiles.E);

    // التقييم الشامل
    readiness.overall_readiness = (
      readiness.digital_skills * 0.3 +
      readiness.adaptability * 0.25 +
      readiness.innovation_mindset * 0.25 +
      readiness.collaboration * 0.2
    );

    // توصيات التطوير
    if (readiness.digital_skills < 60) {
      readiness.recommendations.push("طور مهاراتك الرقمية والتقنية");
    }
    if (readiness.adaptability < 60) {
      readiness.recommendations.push("احرص على تطوير مرونتك وقدرتك على التكيف");
    }
    if (readiness.innovation_mindset < 60) {
      readiness.recommendations.push("عزز تفكيرك الإبداعي والابتكاري");
    }
    if (readiness.collaboration < 60) {
      readiness.recommendations.push("طور مهارات العمل الجماعي والتواصل");
    }

    return readiness;
  }

  generateRecommendations(results) {
    const recommendations = {
      education_paths: [],
      skill_development: [],
      experience_building: [],
      networking: [],
      next_steps: []
    };

    const primaryType = results.personality_insights.primary_type.code;
    const primaryScore = results.personality_insights.primary_type.score;

    // مسارات تعليمية
    const educationMap = {
      R: ["هندسة", "تكنولوجيا المعلومات", "علوم تطبيقية", "تقنيات حديثة"],
      I: ["علوم", "بحث وتطوير", "طب", "دراسات عليا"],
      A: ["فنون وتصميم", "إعلام", "أدب", "فنون رقمية"],
      S: ["تعليم", "علم نفس", "خدمة اجتماعية", "صحة عامة"],
      E: ["إدارة أعمال", "تسويق", "ريادة أعمال", "علاقات عامة"],
      C: ["محاسبة", "إدارة", "علوم إدارية", "نظم معلومات"]
    };

    recommendations.education_paths = educationMap[primaryType] || [];

    // تطوير المهارات
    recommendations.skill_development = [
      "مهارات القرن الواحد والعشرين",
      "التفكير النقدي والإبداعي",
      "مهارات التواصل الرقمي",
      "القيادة والعمل الجماعي"
    ];

    // بناء الخبرة
    recommendations.experience_building = [
      "التطوع في مجال اهتمامك",
      "المشاركة في مشاريع طلابية",
      "التدريب الصيفي أو المهني",
      "بناء مشاريع شخصية"
    ];

    return recommendations;
  }

  createEmotionalConnection(results) {
    const connection = {
      personal_message: "",
      inspiration_quote: "",
      role_models: [],
      success_stories: "",
      confidence_boosters: []
    };

    const primaryType = results.personality_insights.primary_type.code;
    const score = results.personality_insights.primary_type.score;

    // رسالة شخصية
    connection.personal_message = `أنت تملك شخصية ${this.getTypeArabicName(primaryType)} قوية، ` +
      `وهذا يعني أن لديك إمكانيات هائلة لتحقيق أحلامك في هذا المجال. ` +
      `نقاط قوتك الطبيعية ستكون بوابتك للنجاح والتميز.`;

    // اقتباس ملهم
    const quotes = [
      "أحلامك لا تنتهي صلاحيتها، ولا يوجد عمر محدد لتحقيقها",
      "النجاح ليس مفتاحاً للسعادة، السعادة هي مفتاح النجاح",
      "اختر وظيفة تحبها، ولن تعمل يوماً واحداً في حياتك",
      "المستقبل ينتمي لأولئك الذين يؤمنون بجمال أحلامهم"
    ];
    connection.inspiration_quote = quotes[Math.floor(Math.random() * quotes.length)];

    // معززات الثقة
    connection.confidence_boosters = [
      `نقاط قوتك في ${this.getTypeArabicName(primaryType)} تجعلك مميزاً`,
      "شغفك هو بوصلتك نحو النجاح",
      "كل خطوة صغيرة تقربك من حلمك الكبير",
      "أنت تملك كل ما يلزم لتحقيق أهدافك"
    ];

    return connection;
  }

  // Helper methods
  getTypeArabicName(type) {
    const names = {
      R: "الواقعي العملي",
      I: "الاستقصائي الباحث", 
      A: "الفني الإبداعي",
      S: "الاجتماعي الخدومي",
      E: "القيادي المغامر",
      C: "التقليدي المنظم"
    };
    return names[type] || type;
  }

  getTypeDescription(type) {
    const descriptions = {
      R: "يحب العمل بيديه والأنشطة العملية والحلول الملموسة",
      I: "يستمتع بالبحث والاستكشاف وحل المشكلات المعقدة",
      A: "يميل للإبداع والفن والتعبير عن الذات",
      S: "يجد سعادته في مساعدة الآخرين وخدمة المجتمع",
      E: "يحب القيادة وريادة الأعمال والتأثير على الآخرين",
      C: "يفضل النظام والدقة والعمل ضمن هياكل واضحة"
    };
    return descriptions[type] || "";
  }

  getCombinationProfile(primary, secondary) {
    return `شخصيتك تجمع بين قوة ${this.getTypeArabicName(primary)} ` +
           `ومرونة ${this.getTypeArabicName(secondary)}، ` +
           `مما يعطيك ميزة تنافسية في سوق العمل المستقبلي.`;
  }

  getStrengthAreas(percentiles) {
    return Object.entries(percentiles)
      .filter(([, score]) => score >= 60)
      .map(([type]) => this.getTypeArabicName(type));
  }

  getDevelopmentAreas(percentiles) {
    return Object.entries(percentiles)
      .filter(([, score]) => score < 40)
      .map(([type]) => this.getTypeArabicName(type));
  }
}

export default RIASECSchool2Career;