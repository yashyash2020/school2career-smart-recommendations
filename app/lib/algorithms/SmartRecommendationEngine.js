/**
 * 🧠 محرك التوصيات الذكية - School2Career AI Engine
 * نظام توصيات متطور يستخدم خوارزميات الذكاء الاصطناعي
 * للتنبؤ بأفضل المسارات المهنية والتخصصات الجامعية
 */

export default class SmartRecommendationEngine {
  constructor() {
    this.version = 'SmartReco_v2.0';
    this.confidence_threshold = 0.75;
    this.max_recommendations = 10;
    
    // أوزان خوارزمية التوصيات
    this.weights = {
      holland_code: 0.4,      // 40% وزن كود هولاند
      personality: 0.25,      // 25% وزن الشخصية 
      skills: 0.20,           // 20% وزن المهارات
      interests: 0.15         // 15% وزن الاهتمامات
    };
    
    // قاعدة بيانات التخصصات والمهن
    this.careerDatabase = this.initializeCareerDatabase();
    this.universityMajors = this.initializeUniversityMajors();
    this.skillRequirements = this.initializeSkillRequirements();
    
    console.log('🚀 محرك التوصيات الذكية جاهز!');
  }

  /**
   * 🎯 الدالة الرئيسية لتوليد التوصيات الذكية
   */
  async generateSmartRecommendations(userProfile, preferences = {}) {
    console.log('🧠 بدء توليد التوصيات الذكية...');
    console.log('📊 ملف المستخدم:', userProfile);
    
    try {
      const recommendations = {
        timestamp: new Date().toISOString(),
        user_id: userProfile.user_id || 'anonymous',
        confidence_score: 0,
        
        // التوصيات الأساسية
        careers: await this.generateCareerRecommendations(userProfile),
        university_majors: await this.generateUniversityRecommendations(userProfile),
        skills_development: await this.generateSkillRecommendations(userProfile),
        
        // التوصيات المتقدمة
        learning_paths: await this.generateLearningPaths(userProfile),
        future_opportunities: await this.predictFutureOpportunities(userProfile),
        market_insights: await this.getMarketInsights(userProfile),
        
        // التخصيص الشخصي
        personalized_advice: await this.generatePersonalizedAdvice(userProfile),
        risk_assessment: await this.assessCareerRisks(userProfile),
        growth_potential: await this.calculateGrowthPotential(userProfile),
        
        // البيانات الوصفية
        metadata: {
          algorithm_version: this.version,
          calculation_method: 'AI_Enhanced_Matching',
          data_sources: ['holland_theory', 'market_data', 'career_outcomes'],
          confidence_threshold: this.confidence_threshold
        }
      };
      
      // حساب درجة الثقة الإجمالية
      recommendations.confidence_score = this.calculateOverallConfidence(recommendations);
      
      console.log('✅ تم توليد التوصيات بنجاح');
      console.log(`🎯 درجة الثقة: ${recommendations.confidence_score}%`);
      
      return recommendations;
      
    } catch (error) {
      console.error('❌ خطأ في توليد التوصيات:', error);
      throw new Error(`فشل في توليد التوصيات: ${error.message}`);
    }
  }

  /**
   * 💼 توليد توصيات المهن
   */
  async generateCareerRecommendations(userProfile) {
    console.log('💼 توليد توصيات المهن...');
    
    const hollandCode = userProfile.holland_code || '';
    const personality = userProfile.personality || {};
    const interests = userProfile.interests || {};
    
    const careerMatches = [];
    
    // البحث في قاعدة البيانات
    for (const [careerCode, careerData] of Object.entries(this.careerDatabase)) {
      const matchScore = this.calculateCareerMatch(
        hollandCode, 
        personality, 
        interests, 
        careerData
      );
      
      if (matchScore >= this.confidence_threshold) {
        careerMatches.push({
          ...careerData,
          match_score: matchScore,
          confidence: this.getConfidenceLevel(matchScore),
          reasoning: this.generateMatchReasoning(userProfile, careerData)
        });
      }
    }
    
    // ترتيب حسب درجة التطابق
    return careerMatches
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, this.max_recommendations);
  }

  /**
   * 🎓 توليد توصيات التخصصات الجامعية
   */
  async generateUniversityRecommendations(userProfile) {
    console.log('🎓 توليد توصيات التخصصات الجامعية...');
    
    const hollandCode = userProfile.holland_code || '';
    const academicStrengths = userProfile.academic_strengths || {};
    
    const majorMatches = [];
    
    for (const [majorCode, majorData] of Object.entries(this.universityMajors)) {
      const matchScore = this.calculateMajorMatch(
        hollandCode, 
        academicStrengths, 
        majorData
      );
      
      if (matchScore >= this.confidence_threshold) {
        majorMatches.push({
          ...majorData,
          match_score: matchScore,
          confidence: this.getConfidenceLevel(matchScore),
          career_prospects: this.getCareerProspects(majorCode),
          admission_requirements: this.getAdmissionRequirements(majorCode),
          study_duration: majorData.duration || '4 سنوات',
          difficulty_level: this.calculateDifficultyLevel(majorData, academicStrengths)
        });
      }
    }
    
    return majorMatches
      .sort((a, b) => b.match_score - a.match_score)
      .slice(0, this.max_recommendations);
  }

  /**
   * 🛠️ توليد توصيات تطوير المهارات
   */
  async generateSkillRecommendations(userProfile) {
    console.log('🛠️ توليد توصيات تطوير المهارات...');
    
    const currentSkills = userProfile.skills || {};
    const targetCareers = userProfile.target_careers || [];
    
    const skillGaps = this.identifySkillGaps(currentSkills, targetCareers);
    const developmentPlan = [];
    
    for (const skill of skillGaps) {
      const recommendation = {
        skill_name: skill.name,
        current_level: skill.current_level || 0,
        target_level: skill.target_level || 80,
        priority: skill.priority || 'متوسط',
        learning_resources: this.getLearningResources(skill.name),
        estimated_time: this.estimateLearningTime(skill),
        cost_estimate: this.estimateLearningCost(skill),
        difficulty: skill.difficulty || 'متوسط'
      };
      
      developmentPlan.push(recommendation);
    }
    
    return developmentPlan
      .sort((a, b) => this.getPriorityWeight(b.priority) - this.getPriorityWeight(a.priority))
      .slice(0, 8);
  }

  /**
   * 📚 توليد مسارات التعلم
   */
  async generateLearningPaths(userProfile) {
    console.log('📚 توليد مسارات التعلم...');
    
    const targetCareer = userProfile.primary_career_interest || '';
    const currentLevel = userProfile.experience_level || 'beginner';
    
    return [
      {
        path_name: `مسار ${targetCareer} الشامل`,
        duration: '12-18 شهر',
        difficulty: 'متوسط إلى متقدم',
        phases: [
          {
            phase_name: 'المرحلة التأسيسية',
            duration: '3-4 أشهر',
            skills: ['أساسيات المجال', 'المفاهيم الأساسية', 'الأدوات الأساسية'],
            resources: ['كورسات أونلاين', 'كتب تخصصية', 'ورش عمل']
          },
          {
            phase_name: 'المرحلة المتوسطة',
            duration: '4-6 أشهر',
            skills: ['المهارات التطبيقية', 'المشاريع العملية', 'العمل الجماعي'],
            resources: ['مشاريع حقيقية', 'تدريب عملي', 'منتورشيب']
          },
          {
            phase_name: 'المرحلة المتقدمة',
            duration: '5-8 أشهر',
            skills: ['التخصص العميق', 'القيادة', 'الابتكار'],
            resources: ['شهادات متقدمة', 'مؤتمرات', 'بحوث تطبيقية']
          }
        ],
        success_metrics: [
          'إنجاز 3 مشاريع حقيقية',
          'الحصول على شهادة معتمدة',
          'بناء شبكة مهنية قوية'
        ]
      }
    ];
  }

  /**
   * 🔮 التنبؤ بالفرص المستقبلية
   */
  async predictFutureOpportunities(userProfile) {
    console.log('🔮 التنبؤ بالفرص المستقبلية...');
    
    const hollandCode = userProfile.holland_code || '';
    const currentTrends = this.getCurrentMarketTrends();
    
    return {
      emerging_careers: [
        {
          career: 'مهندس ذكاء اصطناعي',
          growth_rate: '+25% سنوياً',
          demand_level: 'عالي جداً',
          timeline: '2025-2030',
          entry_requirements: ['برمجة متقدمة', 'رياضيات', 'تعلم آلة'],
          salary_projection: '25,000-45,000 ريال'
        },
        {
          career: 'أخصائي أمن سيبراني',
          growth_rate: '+18% سنوياً',
          demand_level: 'عالي',
          timeline: '2024-2028',
          entry_requirements: ['أمن المعلومات', 'شبكات', 'أنظمة'],
          salary_projection: '20,000-35,000 ريال'
        }
      ],
      market_predictions: {
        next_5_years: 'نمو متسارع في التقنيات الذكية',
        automation_impact: 'تغيير طبيعة 40% من الوظائف الحالية',
        new_skills_needed: ['الذكاء الاصطناعي', 'تحليل البيانات', 'الأمن السيبراني']
      },
      personalized_forecast: `بناءً على ملفك الشخصي (${hollandCode})، متوقع نمو فرصك المهنية بنسبة 15-20% خلال السنوات القادمة`
    };
  }

  /**
   * 📈 معلومات السوق والطلب
   */
  async getMarketInsights(userProfile) {
    console.log('📈 جمع معلومات السوق...');
    
    return {
      current_demand: {
        high_demand: ['تقنية المعلومات', 'الرعاية الصحية', 'التعليم الرقمي'],
        moderate_demand: ['التسويق الرقمي', 'إدارة المشاريع', 'الترجمة'],
        low_demand: ['الأعمال التقليدية', 'بعض المهن الحرفية']
      },
      salary_ranges: {
        technology: '15,000-40,000 ريال',
        healthcare: '12,000-30,000 ريال',
        business: '10,000-25,000 ريال',
        education: '8,000-20,000 ريال'
      },
      geographic_opportunities: {
        riyadh: 'أعلى فرص في التقنية والأعمال',
        jeddah: 'قوي في التجارة والسياحة',
        dammam: 'فرص ممتازة في الصناعة والطاقة',
        online: 'فرص لا محدودة في العمل عن بُعد'
      }
    };
  }

  /**
   * 💡 نصائح شخصية مخصصة
   */
  async generatePersonalizedAdvice(userProfile) {
    console.log('💡 توليد النصائح الشخصية...');
    
    const hollandCode = userProfile.holland_code || '';
    const personality = userProfile.personality || {};
    
    return {
      immediate_actions: [
        'ابدأ بتعلم مهارة جديدة ذات صلة بمجالك المفضل',
        'احضر ورشة عمل أو مؤتمر في مجال اهتمامك',
        'تواصل مع محترفين في المجال عبر LinkedIn'
      ],
      medium_term_goals: [
        'احصل على شهادة مهنية معتمدة',
        'قم ببناء مشروع شخصي يبرز مهاراتك',
        'ابحث عن فرصة تدريب في الشركات الرائدة'
      ],
      long_term_vision: [
        'ضع خطة خمسية لتطوير مسيرتك المهنية',
        'فكر في إمكانية ريادة الأعمال في مجالك',
        'خطط للحصول على درجة علمية متقدمة إذا لزم الأمر'
      ],
      personal_mantras: [
        `أنت من النوع ${hollandCode[0]} - استثمر نقاط قوتك الطبيعية`,
        'كل خطوة تتخذها اليوم تقربك من هدفك المهني',
        'النجاح يأتي لمن يجمع بين الشغف والعمل الذكي'
      ]
    };
  }

  /**
   * ⚠️ تقييم المخاطر المهنية
   */
  async assessCareerRisks(userProfile) {
    console.log('⚠️ تقييم المخاطر المهنية...');
    
    return {
      automation_risk: {
        level: 'منخفض',
        percentage: '15%',
        explanation: 'المهن المقترحة تتطلب إبداع وتفاعل إنساني صعب الأتمتة'
      },
      market_saturation: {
        level: 'متوسط',
        timeline: '5-7 سنوات',
        mitigation: 'التخصص في مجالات فرعية متقدمة'
      },
      skill_obsolescence: {
        risk_level: 'منخفض إلى متوسط',
        update_frequency: 'تحديث المهارات كل 2-3 سنوات',
        recommended_strategy: 'التعلم المستمر والتكيف مع التقنيات الجديدة'
      }
    };
  }

  /**
   * 📊 حساب إمكانية النمو
   */
  async calculateGrowthPotential(userProfile) {
    console.log('📊 حساب إمكانية النمو...');
    
    const strengths = userProfile.strengths || [];
    const interests = userProfile.interests || {};
    
    return {
      overall_score: 85,
      breakdown: {
        market_demand: 90,
        skill_alignment: 80,
        personal_fit: 85,
        growth_trajectory: 80
      },
      factors: {
        positive: [
          'توافق قوي مع اتجاهات السوق',
          'مهارات قابلة للتطوير',
          'شغف واضح في المجال'
        ],
        challenges: [
          'حاجة لتطوير بعض المهارات التقنية',
          'المنافسة المتزايدة في السوق'
        ]
      },
      recommendations: [
        'استثمر في التطوير المستمر للمهارات',
        'ابنِ شبكة مهنية قوية',
        'ركز على التخصصات النادرة في مجالك'
      ]
    };
  }

  // ========== دوال مساعدة ==========

  /**
   * حساب تطابق المهنة
   */
  calculateCareerMatch(hollandCode, personality, interests, careerData) {
    let totalScore = 0;
    
    // تطابق كود هولاند (40%)
    const hollandMatch = this.calculateHollandMatch(hollandCode, careerData.holland_requirements);
    totalScore += hollandMatch * this.weights.holland_code;
    
    // تطابق الشخصية (25%)
    const personalityMatch = this.calculatePersonalityMatch(personality, careerData.personality_fit);
    totalScore += personalityMatch * this.weights.personality;
    
    // تطابق المهارات (20%)
    const skillsMatch = this.calculateSkillsMatch(interests.skills, careerData.required_skills);
    totalScore += skillsMatch * this.weights.skills;
    
    // تطابق الاهتمامات (15%)
    const interestsMatch = this.calculateInterestsMatch(interests, careerData.interest_areas);
    totalScore += interestsMatch * this.weights.interests;
    
    return Math.round(totalScore * 100); // تحويل إلى نسبة مئوية
  }

  /**
   * حساب تطابق كود هولاند
   */
  calculateHollandMatch(userCode, careerRequirements) {
    if (!userCode || !careerRequirements) return 0.5;
    
    const userTypes = userCode.split('');
    const careerTypes = careerRequirements.split('');
    
    let matchScore = 0;
    for (let i = 0; i < Math.min(userTypes.length, careerTypes.length); i++) {
      if (userTypes[i] === careerTypes[i]) {
        matchScore += (3 - i) * 0.2; // أولوية أعلى للأنواع الأولى
      }
    }
    
    return Math.min(matchScore, 1);
  }

  /**
   * تحديد فجوات المهارات
   */
  identifySkillGaps(currentSkills, targetCareers) {
    const gaps = [];
    
    // تحليل المهارات المطلوبة للمهن المستهدفة
    for (const career of targetCareers) {
      const requiredSkills = this.skillRequirements[career] || [];
      
      for (const skill of requiredSkills) {
        const currentLevel = currentSkills[skill.name] || 0;
        
        if (currentLevel < skill.minimum_level) {
          gaps.push({
            name: skill.name,
            current_level: currentLevel,
            target_level: skill.minimum_level,
            priority: skill.priority || 'متوسط',
            difficulty: skill.difficulty || 'متوسط'
          });
        }
      }
    }
    
    return gaps;
  }

  /**
   * حساب درجة الثقة الإجمالية
   */
  calculateOverallConfidence(recommendations) {
    const scores = [
      recommendations.careers.length > 0 ? 90 : 60,
      recommendations.university_majors.length > 0 ? 85 : 55,
      recommendations.skills_development.length > 0 ? 80 : 50
    ];
    
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }

  /**
   * تحديد مستوى الثقة
   */
  getConfidenceLevel(score) {
    if (score >= 90) return 'عالي جداً';
    if (score >= 80) return 'عالي';
    if (score >= 70) return 'متوسط';
    if (score >= 60) return 'منخفض';
    return 'ضعيف';
  }

  /**
   * تهيئة قاعدة بيانات المهن
   */
  initializeCareerDatabase() {
    return {
      'software_engineer': {
        name_ar: 'مهندس برمجيات',
        name_en: 'Software Engineer',
        holland_requirements: 'IRA',
        required_skills: ['programming', 'problem_solving', 'logical_thinking'],
        personality_fit: ['analytical', 'detail_oriented', 'creative'],
        interest_areas: ['technology', 'innovation', 'problem_solving'],
        salary_range: '15,000-35,000 ريال',
        growth_rate: '+22% سنوياً',
        education_level: 'bachelor',
        experience_requirements: 'entry_to_senior'
      },
      'data_scientist': {
        name_ar: 'عالم بيانات',
        name_en: 'Data Scientist',
        holland_requirements: 'IAR',
        required_skills: ['statistics', 'programming', 'data_analysis'],
        personality_fit: ['analytical', 'curious', 'methodical'],
        interest_areas: ['mathematics', 'research', 'patterns'],
        salary_range: '20,000-45,000 ريال',
        growth_rate: '+31% سنوياً',
        education_level: 'bachelor_plus',
        experience_requirements: 'intermediate_to_senior'
      },
      'teacher': {
        name_ar: 'معلم',
        name_en: 'Teacher',
        holland_requirements: 'SAI',
        required_skills: ['communication', 'patience', 'empathy'],
        personality_fit: ['social', 'patient', 'caring'],
        interest_areas: ['education', 'helping_others', 'knowledge_sharing'],
        salary_range: '8,000-18,000 ريال',
        growth_rate: '+7% سنوياً',
        education_level: 'bachelor',
        experience_requirements: 'entry_to_senior'
      }
      // يمكن إضافة المزيد من المهن...
    };
  }

  /**
   * تهيئة قاعدة بيانات التخصصات الجامعية
   */
  initializeUniversityMajors() {
    return {
      'computer_science': {
        name_ar: 'علوم الحاسوب',
        name_en: 'Computer Science',
        holland_fit: 'IRA',
        duration: '4 سنوات',
        difficulty_level: 'عالي',
        prerequisites: ['رياضيات متقدمة', 'فيزياء'],
        career_outcomes: ['مهندس برمجيات', 'عالم بيانات', 'محلل أنظمة'],
        average_salary: '18,000-40,000 ريال',
        job_market: 'ممتاز'
      },
      'medicine': {
        name_ar: 'الطب',
        name_en: 'Medicine',
        holland_fit: 'ISA',
        duration: '6-7 سنوات',
        difficulty_level: 'عالي جداً',
        prerequisites: ['أحياء', 'كيمياء', 'فيزياء', 'رياضيات'],
        career_outcomes: ['طبيب عام', 'أخصائي', 'جراح'],
        average_salary: '25,000-80,000 ريال',
        job_market: 'ممتاز'
      },
      'business_administration': {
        name_ar: 'إدارة الأعمال',
        name_en: 'Business Administration',
        holland_fit: 'ESC',
        duration: '4 سنوات',
        difficulty_level: 'متوسط',
        prerequisites: ['رياضيات', 'إنجليزي'],
        career_outcomes: ['مدير أعمال', 'محلل مالي', 'ريادي أعمال'],
        average_salary: '12,000-30,000 ريال',
        job_market: 'جيد'
      },
      'education': {
        name_ar: 'التربية والتعليم',
        name_en: 'Education',
        holland_fit: 'SAI',
        duration: '4 سنوات',
        difficulty_level: 'متوسط',
        prerequisites: ['اختبار قدرات', 'مقابلة شخصية'],
        career_outcomes: ['معلم', 'مدرب', 'مطور مناهج'],
        average_salary: '8,000-20,000 ريال',
        job_market: 'جيد'
      }
    };
  }

  /**
   * تهيئة متطلبات المهارات
   */
  initializeSkillRequirements() {
    return {
      'software_engineer': [
        { name: 'programming', minimum_level: 80, priority: 'عالي', difficulty: 'متوسط' },
        { name: 'problem_solving', minimum_level: 75, priority: 'عالي', difficulty: 'متوسط' },
        { name: 'teamwork', minimum_level: 70, priority: 'متوسط', difficulty: 'سهل' }
      ],
      'data_scientist': [
        { name: 'statistics', minimum_level: 85, priority: 'عالي', difficulty: 'صعب' },
        { name: 'programming', minimum_level: 80, priority: 'عالي', difficulty: 'متوسط' },
        { name: 'data_analysis', minimum_level: 80, priority: 'عالي', difficulty: 'متوسط' }
      ],
      'teacher': [
        { name: 'communication', minimum_level: 85, priority: 'عالي', difficulty: 'سهل' },
        { name: 'patience', minimum_level: 80, priority: 'عالي', difficulty: 'متوسط' },
        { name: 'subject_knowledge', minimum_level: 75, priority: 'عالي', difficulty: 'متوسط' }
      ]
    };
  }

  /**
   * الحصول على الاتجاهات الحالية للسوق
   */
  getCurrentMarketTrends() {
    return {
      high_growth: ['AI', 'cybersecurity', 'data_science', 'cloud_computing'],
      declining: ['traditional_manufacturing', 'print_media'],
      stable: ['healthcare', 'education', 'government'],
      emerging: ['renewable_energy', 'biotechnology', 'virtual_reality']
    };
  }

  /**
   * الحصول على موارد التعلم
   */
  getLearningResources(skillName) {
    const resources = {
      'programming': [
        { name: 'Coursera Programming Courses', type: 'online', cost: 'مدفوع' },
        { name: 'freeCodeCamp', type: 'online', cost: 'مجاني' },
        { name: 'Local Programming Bootcamps', type: 'offline', cost: 'مدفوع' }
      ],
      'data_analysis': [
        { name: 'Kaggle Learn', type: 'online', cost: 'مجاني' },
        { name: 'edX Data Science Courses', type: 'online', cost: 'مدفوع' },
        { name: 'University Extension Programs', type: 'offline', cost: 'مدفوع' }
      ],
      'communication': [
        { name: 'Toastmasters International', type: 'offline', cost: 'رسوم عضوية' },
        { name: 'Online Communication Courses', type: 'online', cost: 'مدفوع' },
        { name: 'Public Speaking Workshops', type: 'offline', cost: 'مدفوع' }
      ]
    };
    
    return resources[skillName] || [
      { name: 'Online Courses', type: 'online', cost: 'متنوع' },
      { name: 'Books and Articles', type: 'self_study', cost: 'منخفض' },
      { name: 'Professional Workshops', type: 'offline', cost: 'مدفوع' }
    ];
  }

  /**
   * تقدير وقت التعلم
   */
  estimateLearningTime(skill) {
    const baseTimes = {
      'سهل': '2-4 أشهر',
      'متوسط': '4-8 أشهر',
      'صعب': '8-12 شهر',
      'صعب جداً': '12+ شهر'
    };
    
    return baseTimes[skill.difficulty] || '4-6 أشهر';
  }

  /**
   * تقدير تكلفة التعلم
   */
  estimateLearningCost(skill) {
    const baseCosts = {
      'سهل': '500-2,000 ريال',
      'متوسط': '2,000-5,000 ريال',
      'صعب': '5,000-10,000 ريال',
      'صعب جداً': '10,000+ ريال'
    };
    
    return baseCosts[skill.difficulty] || '2,000-5,000 ريال';
  }

  /**
   * الحصول على وزن الأولوية
   */
  getPriorityWeight(priority) {
    const weights = {
      'عالي': 3,
      'متوسط': 2,
      'منخفض': 1
    };
    
    return weights[priority] || 2;
  }

  /**
   * تطابق الشخصية
   */
  calculatePersonalityMatch(userPersonality, careerFit) {
    if (!userPersonality || !careerFit) return 0.7;
    
    let matches = 0;
    let total = careerFit.length;
    
    for (const trait of careerFit) {
      if (userPersonality[trait] && userPersonality[trait] > 70) {
        matches++;
      }
    }
    
    return total > 0 ? matches / total : 0.7;
  }

  /**
   * تطابق المهارات
   */
  calculateSkillsMatch(userSkills, requiredSkills) {
    if (!userSkills || !requiredSkills) return 0.6;
    
    let totalMatch = 0;
    let skillCount = requiredSkills.length;
    
    for (const skill of requiredSkills) {
      const userLevel = userSkills[skill] || 0;
      const match = Math.min(userLevel / 80, 1); // افتراض أن 80 هو المستوى المطلوب
      totalMatch += match;
    }
    
    return skillCount > 0 ? totalMatch / skillCount : 0.6;
  }

  /**
   * تطابق الاهتمامات
   */
  calculateInterestsMatch(userInterests, careerAreas) {
    if (!userInterests || !careerAreas) return 0.6;
    
    let matches = 0;
    let total = careerAreas.length;
    
    for (const area of careerAreas) {
      if (userInterests[area] && userInterests[area] > 60) {
        matches++;
      }
    }
    
    return total > 0 ? matches / total : 0.6;
  }

  /**
   * توليد تفسير التطابق
   */
  generateMatchReasoning(userProfile, careerData) {
    const reasons = [];
    
    if (userProfile.holland_code && careerData.holland_requirements) {
      const match = this.calculateHollandMatch(userProfile.holland_code, careerData.holland_requirements);
      if (match > 0.7) {
        reasons.push('تطابق قوي مع نوع شخصيتك المهنية');
      }
    }
    
    if (userProfile.strengths && userProfile.strengths.includes('analytical')) {
      reasons.push('مهاراتك التحليلية تناسب هذا المجال');
    }
    
    if (reasons.length === 0) {
      reasons.push('توافق عام مع ملفك الشخصي');
    }
    
    return reasons.join(', ');
  }

  /**
   * الحصول على آفاق المسيرة المهنية
   */
  getCareerProspects(majorCode) {
    const prospects = {
      'computer_science': [
        'مطور برمجيات',
        'مهندس أنظمة',
        'مدير تقني',
        'ريادي تقني'
      ],
      'medicine': [
        'طبيب عام',
        'طبيب أخصائي',
        'باحث طبي',
        'إداري طبي'
      ],
      'business_administration': [
        'مدير أعمال',
        'مستشار إداري',
        'ريادي أعمال',
        'محلل أعمال'
      ]
    };
    
    return prospects[majorCode] || ['متخصص في المجال', 'مدير', 'استشاري', 'ريادي'];
  }

  /**
   * الحصول على متطلبات القبول
   */
  getAdmissionRequirements(majorCode) {
    const requirements = {
      'computer_science': {
        gpa: '3.5+',
        tests: ['اختبار القدرات', 'اختبار التحصيلي'],
        subjects: ['رياضيات متقدمة', 'فيزياء'],
        additional: ['مهارات برمجة أساسية (مفضل)']
      },
      'medicine': {
        gpa: '4.5+',
        tests: ['اختبار القدرات', 'اختبار التحصيلي'],
        subjects: ['أحياء', 'كيمياء', 'فيزياء', 'رياضيات'],
        additional: ['مقابلة شخصية', 'خدمة مجتمعية']
      },
      'business_administration': {
        gpa: '3.0+',
        tests: ['اختبار القدرات'],
        subjects: ['رياضيات', 'إنجليزي'],
        additional: ['مهارات قيادية (مفضل)']
      }
    };
    
    return requirements[majorCode] || {
      gpa: '3.0+',
      tests: ['اختبار القدرات'],
      subjects: ['حسب التخصص'],
      additional: ['متطلبات إضافية حسب الجامعة']
    };
  }

  /**
   * حساب مستوى الصعوبة
   */
  calculateDifficultyLevel(majorData, academicStrengths) {
    const baseDifficulty = {
      'سهل': 1,
      'متوسط': 2,
      'صعب': 3,
      'صعب جداً': 4
    };
    
    let difficulty = baseDifficulty[majorData.difficulty_level] || 2;
    
    // تعديل الصعوبة بناءً على نقاط القوة الأكاديمية
    if (academicStrengths && academicStrengths.mathematics > 80) {
      difficulty -= 0.5;
    }
    if (academicStrengths && academicStrengths.sciences > 80) {
      difficulty -= 0.3;
    }
    
    const levels = ['سهل', 'متوسط', 'صعب', 'صعب جداً'];
    return levels[Math.max(0, Math.min(3, Math.round(difficulty - 1)))];
  }

  /**
   * حساب تطابق التخصص
   */
  calculateMajorMatch(hollandCode, academicStrengths, majorData) {
    let score = 0;
    
    // تطابق هولاند (60%)
    const hollandMatch = this.calculateHollandMatch(hollandCode, majorData.holland_fit);
    score += hollandMatch * 0.6;
    
    // القوة الأكاديمية (40%)
    const academicMatch = this.calculateAcademicMatch(academicStrengths, majorData.prerequisites);
    score += academicMatch * 0.4;
    
    return Math.round(score * 100);
  }

  /**
   * حساب التطابق الأكاديمي
   */
  calculateAcademicMatch(academicStrengths, prerequisites) {
    if (!academicStrengths || !prerequisites) return 0.7;
    
    const strengthMap = {
      'رياضيات': academicStrengths.mathematics || 50,
      'فيزياء': academicStrengths.physics || 50,
      'كيمياء': academicStrengths.chemistry || 50,
      'أحياء': academicStrengths.biology || 50,
      'إنجليزي': academicStrengths.english || 50
    };
    
    let totalMatch = 0;
    let count = 0;
    
    for (const prereq of prerequisites) {
      if (strengthMap[prereq]) {
        totalMatch += strengthMap[prereq] / 100;
        count++;
      }
    }
    
    return count > 0 ? totalMatch / count : 0.7;
  }
}