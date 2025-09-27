/**
 * RIASEC – International Scoring & Triad Selection (Hexagon-aware)
 * 
 * Author: Advanced Career Assessment System
 * Mode: International (strict adjacency; bans opposite pairs unless strong evidence)
 * 
 * Inputs:
 *  - responses: Object of items with values {0,1,2}, e.g. { "R1":2, "R2":1, ..., "C30":0 }
 *  - opts:
 *      country: 'international' | 'egypt' | 'saudi'   // norms set
 *      version: 'full' | 'medium' | 'short'          // to softly de-noise shorter forms
 *      lambda: number (penalty weight for distances; default 0.35)
 *      sdGate: number (how strong top type must exceed next to allow opposite-pair codes; default 1.0)
 * 
 * Output:
 *  - Detailed scoring object with:
 *      raw_scores[type] = { raw, percentage, z, percentile, liked, stronglyLiked, subdomains, interpretation }
 *      holland_code (chosen triad, e.g., "RIA")
 *      triad_details (all candidate triads with scores/explanations)
 *      indices: differentiation, consistency, congruence, profile_elevation
 */

class RIASECInternational {
  constructor() {
    this.types = ['R','I','A','S','E','C'];
    this.typeNames = {
      R: 'Realistic', I: 'Investigative', A: 'Artistic',
      S: 'Social', E: 'Enterprising', C: 'Conventional'
    };

    // 10-10-10 تقسيم المجالات الفرعية كما في الدليل
    this.subdomains = {
      R: { 'ميكانيكي/تقني': [1,10], 'زراعي/طبيعي': [11,20], 'بدني/خارجي': [21,30] },
      I: { 'علمي/بحثي': [1,10], 'رياضي/تحليلي': [11,20], 'استكشافي/تقصي': [21,30] },
      A: { 'إبداعي بصري': [1,10], 'أدبي/لغوي': [11,20], 'أدائي/موسيقي': [21,30] },
      S: { 'تعليمي/تدريبي': [1,10], 'صحي/رعاية': [11,20], 'خدمي/مجتمعي': [21,30] },
      E: { 'قيادي/إداري': [1,10], 'تجاري/مبيعات': [11,20], 'ريادي/أعمال': [21,30] },
      C: { 'إداري/تنظيمي': [1,10], 'محاسبي/مالي': [11,20], 'امتثال/جودة': [21,30] },
    };

    // مصفوفة مسافات السداسي (0..3) – مطابقة لمنطق الشكل في الدليل
    this.hexDist = {
      R: {R:0,I:1,A:2,S:3,E:2,C:1},
      I: {R:1,I:0,A:1,S:2,E:3,C:2},
      A: {R:2,I:1,A:0,S:1,E:2,C:3},
      S: {R:3,I:2,A:1,S:0,E:1,C:2},
      E: {R:2,I:3,A:2,S:1,E:0,C:1},
      C: {R:1,I:2,A:3,S:2,E:1,C:0},
    };

    // المعايير (متوسط/انحراف معياري) - محدثة للنسخ الثلاث مع التكييف التلقائي
    // بناءً على عدد الاستجابات الفعلي بدلاً من الإعدادات الثابتة
    this.norms = {
      international: { 
        R:{mean:30,sd:12}, I:{mean:24,sd:10}, A:{mean:20,sd:9}, 
        S:{mean:26,sd:11}, E:{mean:22,sd:9}, C:{mean:25,sd:10} 
      },
      egypt: { 
        R:{mean:32,sd:13}, I:{mean:23,sd:10}, A:{mean:19,sd:8}, 
        S:{mean:28,sd:12}, E:{mean:21,sd:9}, C:{mean:27,sd:11} 
      },
      saudi: { 
        R:{mean:34,sd:14}, I:{mean:25,sd:11}, A:{mean:18,sd:7}, 
        S:{mean:30,sd:13}, E:{mean:24,sd:10}, C:{mean:29,sd:12} 
      },
    };

    // إعدادات افتراضية
    this.defaults = {
      country: 'international',
      version: 'full',   // 'full'|'medium'|'short'
      lambda: 0.35,
      sdGate: 1.0,
    };
  }

  // Normal CDF approximation → Percentile %
  percentileFromZ(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    const p = (z > 0) ? (1 - prob) : prob;
    return Math.round(p * 100);
  }

  // تفسير مبسّط للنوع بناءً على النسبة %
  interpret(percentage, type) {
    const levels = percentage > 60 ? 'high' : percentage > 30 ? 'medium' : 'low';
    const m = {
      R:{high:'اهتمام قوي بالعمل اليدوي/العملي', medium:'اهتمام معتدل بالأنشطة العملية', low:'تفضيل منخفض للمهام اليدوية'},
      I:{high:'شغف بالبحث والتحليل', medium:'اهتمام متوسط بالبحث', low:'تفضيل محدود للأنشطة النظرية'},
      A:{high:'ميل قوي للإبداع والتعبير', medium:'اهتمام متوازن بالإبداع', low:'تفضيل محدود للفنون'},
      S:{high:'رغبة قوية في مساعدة الآخرين', medium:'اهتمام اجتماعي معتدل', low:'تفضيل العمل الفردي'},
      E:{high:'طموح قيادي وتأثيري', medium:'اهتمام متوسط بالأعمال/القيادة', low:'تجنب المواقف التنافسية'},
      C:{high:'تفضيل للنظام والدقة', medium:'اهتمام تنظيمي متوازن', low:'تفضيل المرونة على الروتين'},
    };
    return m[type][levels];
  }

  // حساب مؤشرات: وضوح/توافق/مناسبة/قوة
  calcDifferentiation(sortedTypes) {
    const highest = sortedTypes[0][1].raw;
    const lowest  = sortedTypes[5][1].raw;
    const score = ( (highest - lowest) / 60 ) * 100;
    return { score: parseFloat(score.toFixed(2)), interpretation: score>40 ? 'ملف واضح ومحدد' : score>20 ? 'متوسط الوضوح' : 'متنوع/غير محدد' };
  }

  calcConsistency(code) {
    const [a,b,c] = code.split('');
    const dists = [
      this.hexDist[a][b],
      this.hexDist[a][c],
      this.hexDist[b][c],
    ];
    const avg = (dists[0]+dists[1]+dists[2]) / 3;
    const score = 100 - (avg * 25);
    return { score: parseFloat(score.toFixed(2)), interpretation: score>75 ? 'توافق عالٍ' : score>50 ? 'توافق متوسط' : 'توافق منخفض' };
  }

  calcCongruence(code) {
    const first = code[0];
    // القائمة الموثقة أكاديمياً (28 كود بس) - بناءً على المراجعة الشاملة للمصادر الأكاديمية
    // Strong Interest Inventory + O*NET + SDS Holland + ACT Manual
    const academicallyVerified28Codes = {
      R: ['RIA','RIC','RCI'], // 3 أكواد موثقة (إزالة RAI)
      I: ['IRA','IRC','IAR','IAS','ISA'], // 5 أكواد موثقة (إزالة ICR)
      A: ['ARI','AIR','AIS','ASI'], // 4 أكواد موثقة 
      S: ['SAI','SIA','SAE','SEA','SEC'], // 5 أكواد موثقة (إزالة SCE)
      E: ['ESA','EAS','ECA','ECR','ECS','ESC'], // 6 أكواد موثقة
      C: ['CRI','CRE','CIR','CER','CSI'], // 5 أكواد موثقة (إزالة CSE)
    };
    // المجموع: R(3) + I(5) + A(4) + S(5) + E(6) + C(5) = 28 كود موثق أكاديمياً
    const high = academicallyVerified28Codes[first].includes(code);
    const score = high ? 90 : 50;
    return { score: parseFloat(score.toFixed(2)), interpretation: high ? 'مناسبة عالية' : 'مناسبة متوسطة' };
  }

  // دالة للتحقق من صحة الكود أكاديمياً والعثور على بديل إن لزم الأمر
  validateAndSuggestCode(code) {
    const academicallyVerified28Codes = {
      R: ['RIA','RIC','RCI'], // 3 أكواد موثقة
      I: ['IRA','IRC','IAR','IAS','ISA'], // 5 أكواد موثقة
      A: ['ARI','AIR','AIS','ASI'], // 4 أكواد موثقة
      S: ['SAI','SIA','SAE','SEA','SEC'], // 5 أكواد موثقة
      E: ['ESA','EAS','ECA','ECR','ECS','ESC'], // 6 أكواد موثقة
      C: ['CRI','CRE','CIR','CER','CSI'], // 5 أكواد موثقة
    };
    // المجموع الكلي: 28 كود موثق بس
    
    const firstLetter = code[0];
    const isValid = academicallyVerified28Codes[firstLetter]?.includes(code);
    
    if (isValid) {
      return {
        code: code,
        isValid: true,
        confidence: 'high',
        message: 'كود موثق أكاديمياً'
      };
    }
    
    // البحث عن أقرب بديل موثق
    const codeLetters = code.split('');
    const allValidCodes = Object.values(academicallyVerified28Codes).flat();
    
    // البحث عن كود يحتوي على نفس الحروف
    const exactMatch = allValidCodes.find(validCode => {
      const validLetters = validCode.split('');
      return codeLetters.every(letter => validLetters.includes(letter)) &&
             validLetters.every(letter => codeLetters.includes(letter));
    });
    
    if (exactMatch) {
      return {
        code: exactMatch,
        isValid: false,
        confidence: 'medium',
        originalCode: code,
        message: `تم اقتراح بديل موثق: ${exactMatch} بدلاً من ${code}`
      };
    }
    
    // البحث عن أقرب كود بنفس الحرف الأول
    const sameFirstLetter = academicallyVerified28Codes[firstLetter];
    if (sameFirstLetter && sameFirstLetter.length > 0) {
      const suggestion = sameFirstLetter[0]; // أول كود متاح
      return {
        code: suggestion,
        isValid: false,
        confidence: 'low',
        originalCode: code,
        message: `كود غير موثق، تم اقتراح: ${suggestion}`
      };
    }
    
    // في حالة عدم وجود بديل
    return {
      code: 'RIA', // كود افتراضي آمن
      isValid: false,
      confidence: 'very_low',
      originalCode: code,
      message: `كود غير موثق، تم استخدام RIA كافتراضي`
    };
  }

  calcElevation(typeMap) {
    const total = Object.values(typeMap).reduce((s,t)=>s + t.raw, 0);
    const avg = total / 6;
    const score = (avg / 30) * 100;
    return { score: parseFloat(score.toFixed(2)), interpretation: score>60 ? 'اهتمامات واسعة' : score>40 ? 'اهتمامات متوسطة' : 'اهتمامات مركّزة' };
  }

  // Helper: مجموع استجابات مجال فرعي - محدث ليتعامل مع النسخ المختلفة
  subdomainScores(responses, type, questionsPerType) {
    const result = {};
    const questionsPerSubdomain = Math.ceil(questionsPerType / 3); // تقسيم على 3 مجالات فرعية
    const maxSubdomainScore = questionsPerSubdomain * 2; // أقصى درجة للمجال الفرعي
    
    // حساب الدرجات بناءً على الأسئلة المتاحة فعلياً
    const typeResponses = Object.keys(responses).filter(key => key.startsWith(type));
    const sortedKeys = typeResponses.sort((a, b) => {
      const numA = parseInt(a.substring(1));
      const numB = parseInt(b.substring(1));
      return numA - numB;
    });
    
    let subdomainIndex = 0;
    for (const [name] of Object.entries(this.subdomains[type])) {
      let s = 0;
      const startIndex = subdomainIndex * questionsPerSubdomain;
      const endIndex = Math.min(startIndex + questionsPerSubdomain, sortedKeys.length);
      
      for (let i = startIndex; i < endIndex; i++) {
        if (sortedKeys[i]) {
          s += (responses[sortedKeys[i]] || 0);
        }
      }
      
      const percentage = maxSubdomainScore > 0 ? parseFloat(((s/maxSubdomainScore)*100).toFixed(2)) : 0;
      result[name] = { score: s, percentage };
      subdomainIndex++;
    }
    
    return result;
  }

  // Build candidates from Top-4, keep original order by score
  buildTriads(top4) {
    const [t1,t2,t3,t4] = top4;
    const triads = [];
    const arr = [t1,t2,t3,t4];
    for (let i=0;i<4;i++){
      for (let j=i+1;j<4;j++){
        for (let k=j+1;k<4;k++){
          triads.push([arr[i],arr[j],arr[k]]);
        }
      }
    }
    return triads;
  }

  // هل يوجد زوج متقابل (مسافة = 3)؟
  hasOppositePair(triad){
    const [a,b,c]=triad;
    return (
      this.hexDist[a][b]===3 ||
      this.hexDist[a][c]===3 ||
      this.hexDist[b][c]===3
    );
  }

  // درجة ثلاثي (International): مجموع z ناقص عقوبة المسافات + Bonus الاتساق
  scoreTriad(triad, zMap, lambda){
    const [a,b,c]=triad;
    const zSum = zMap[a] + zMap[b] + zMap[c];
    const distPenalty = this.hexDist[a][b] + this.hexDist[a][c] + this.hexDist[b][c];
    const base = zSum - lambda * distPenalty;
    const code = triad.join('');
    const consistency = this.calcConsistency(code).score;
    const score = base + 0.25 * (consistency/100); // Bonus صغير
    return { code, score, zSum, distPenalty, consistency };
  }

  // اختيار الكود الثلاثي وفق International rules
  chooseTriad(sortedByRaw, zMap, opts) {
    const lambda = opts.lambda ?? this.defaults.lambda;
    const sdGate = opts.sdGate ?? this.defaults.sdGate;

    const top4 = sortedByRaw.slice(0,4).map(([t])=>t);
    const triads = this.buildTriads(top4);

    // لو في زوج متقابل (distance=3)، لا نقبل إلا لو أعلى نوع يتجاوز التالي بـ sdGate SD
    const topZ = zMap[top4[0]];
    const secondZ = zMap[sortedByRaw[1][0]];
    const strongLead = (topZ - secondZ) >= sdGate;

    const candidates = [];
    for (const tri of triads) {
      if (this.hasOppositePair(tri) && !strongLead) continue; // فلترة صارمة
      candidates.push(this.scoreTriad(tri, zMap, lambda));
    }

    if (candidates.length===0) {
      // إن اتفلترت كلها، نخفف الشرط ونسمح بالأقرب
      for (const tri of triads) candidates.push(this.scoreTriad(tri, zMap, lambda+0.1));
    }

    // أعلى Score، ثم تفاضل أعلى، ثم أعلى نوع
    candidates.sort((a,b)=> b.score - a.score);
    let best = candidates[0];
    
    // التحقق من التوثيق الأكاديمي واقتراح بديل إن لزم
    const validation = this.validateAndSuggestCode(best.code);
    
    if (!validation.isValid) {
      console.log(`⚠️  تحذير: الكود ${best.code} غير موثق أكاديمياً`);
      console.log(`💡 ${validation.message}`);
      
      // تحديث الكود بالبديل المقترح
      best = {
        ...best,
        code: validation.code,
        originalCode: validation.originalCode,
        academicValidation: validation,
        isAcademicallyVerified: false
      };
    } else {
      best = {
        ...best,
        academicValidation: validation,
        isAcademicallyVerified: true
      };
    }

    // روابط إضافية للمقارنة
    return { best, candidates };
  }

  // عامل تقليل الضوضاء للنسخ الأقصر - محدث ليشمل النسخ الثلاث
  versionAttenuation(version){
    // النسخة القصيرة (30 سؤال): تقليل بسيط للضوضاء
    if (version==='short') return 0.85;
    // النسخة المتوسطة (60 سؤال): تقليل أقل
    if (version==='medium') return 0.92;
    // النسخة الكاملة (180 سؤال): لا تقليل
    return 1.00;
  }

  // واجهة التشغيل الرئيسية
  calculate(responses, opts={}) {
    console.log('🔍 خوارزمية RIASEC: بداية الحساب');
    console.log('📥 الاستجابات الواردة:', responses);
    console.log('📊 عدد الاستجابات:', Object.keys(responses).length);
    console.log('⚙️ إعدادات الحساب:', opts);
    
    const settings = { ...this.defaults, ...opts };
    
    // تحديد عدد الأسئلة لكل نوع بناءً على النسخة
    const questionsPerType = this.getQuestionsPerType(responses);
    const maxScore = questionsPerType * 2; // أقصى درجة لكل نوع
    
    // حساب المعايير الديناميكية بناءً على عدد الأسئلة الفعلي
    const norms = this.getDynamicNorms(questionsPerType, settings.country);
    const atten = this.versionAttenuation(settings.version);
    
    console.log('📈 أسئلة لكل نوع:', questionsPerType);
    console.log('🎯 أقصى درجة لكل نوع:', maxScore);

    // 1) حساب درجات النوع
    const typeMap = {};
    console.log('🎚️ بداية حساب درجات النوع لكل RIASEC type...');
    
    for (const t of this.types) {
      let raw = 0, liked=[], strong=[];
      
      console.log(`\n⚙️ حساب نوع ${t}:`);
      
      // جمع الدرجات من جميع الأسئلة المتاحة لهذا النوع
      const typeResponses = Object.keys(responses).filter(key => key.startsWith(t));
      console.log(`  📄 أسئلة النوع ${t}:`, typeResponses);
      
      Object.keys(responses).forEach(key => {
        if (key.startsWith(t)) {
          const v = responses[key] ?? 0;
          console.log(`    ${key}: ${v}`);
          raw += v;
          if (v===1) liked.push(key);
          else if (v===2) strong.push(key);
        }
      });
      
      console.log(`  📊 الدرجة الخام لنوع ${t}: ${raw}`);
      
      const percentage = parseFloat(((raw/maxScore)*100).toFixed(2));
      const z = parseFloat((((raw - norms[t].mean) / norms[t].sd) * atten).toFixed(2));
      const percentile = this.percentileFromZ(z);
      const sub = this.subdomainScores(responses, t, questionsPerType);
      
      console.log(`  📊 النسبة المئوية لنوع ${t}: ${percentage}%`);
      
      typeMap[t] = {
        raw, percentage, z, percentile,
        liked, stronglyLiked: strong,
        subdomains: sub,
        interpretation: this.interpret(percentage, t),
      };
    }

    // 2) ترتيب الأنواع
    const sorted = Object.entries(typeMap).sort((a,b)=> b[1].raw - a[1].raw);

    // 3) اختيار الكود الثلاثي (International)
    const zMap = Object.fromEntries(this.types.map(t=>[t, typeMap[t].z]));
    const { best, candidates } = this.chooseTriad(sorted, zMap, settings);
    const hollandCode = best.code;

    // 4) مؤشرات الملف الشخصي
    const differentiation = this.calcDifferentiation(sorted);
    const consistency = this.calcConsistency(hollandCode);
    const congruence = this.calcCongruence(hollandCode);
    const elevation = this.calcElevation(typeMap);

    // 5) تجميع نتيجة شاملة
    const result = {
      params: settings,
      norms_used: settings.country,
      raw_scores: typeMap,
      ranking: sorted.map(([t,v])=>({ type:t, name:this.typeNames[t], raw:v.raw, z:v.z, pct:v.percentile })),
      holland_code: hollandCode,
      triad_details: {
        winner: best,
        top5: candidates.slice(0,5),
        all_candidates: candidates,
        rule_notes: {
          opposite_pairs_banned: 'Yes (مسافة=3) إلا عند strongLead≥sdGate',
          strongLead: ((zMap[sorted[0][0]] - zMap[sorted[1][0]])).toFixed(2),
          sdGate: settings.sdGate
        }
      },
      indices: {
        differentiation, consistency, congruence, profile_elevation: elevation
      }
    };
    
    console.log('🎉 نتائج الحساب النهائية:');
    console.log('📊 الدرجات الخام:', Object.keys(typeMap).map(t => `${t}: ${typeMap[t].raw} (${typeMap[t].percentage}%)`));
    console.log('🎯 نتائج الترتيب:', result.ranking.map(r => `${r.type}: ${r.raw}`));
    console.log('🅰️ رقم هولاند:', hollandCode);
    
    // عرض معلومات التوثيق الأكاديمي
    if (best.academicValidation) {
      console.log('🎓 حالة التوثيق الأكاديمي:', best.academicValidation.confidence);
      console.log('⚙️ معلومات التحقق:', best.academicValidation.message);
    }
    
    return result;
  }

  // دالة للتعامل مع النسخ المختلفة من التقييم (30, 60, 180)
  adaptToVersion(responses, version = 'full') {
    console.log('🔄 adaptToVersion: بداية التكييف');
    console.log('📊 عدد الاستجابات الواردة:', Object.keys(responses).length);
    console.log('🏷️ النسخة المطلوبة:', version);
    
    const responseCount = Object.keys(responses).length;
    console.log('📈 responseCount:', responseCount);
    
    // تحديد النسخة تلقائياً بناءً على عدد الاستجابات
    if (responseCount <= 30) {
      version = 'short';
      console.log('🔄 تغيير النسخة إلى: short (عدد الاستجابات <= 30)');
    } else if (responseCount <= 60) {
      version = 'medium';
      console.log('🔄 تغيير النسخة إلى: medium (عدد الاستجابات <= 60)');
    } else {
      version = 'full';
      console.log('🔄 تغيير النسخة إلى: full (عدد الاستجابات > 60)');
    }

    // نعمل مع الاستجابات مباشرة بدون تحويل
    const adaptedResponses = responses;
    
    console.log('🚀 استدعاء calculate مع النسخة:', version);
    
    return this.calculate(adaptedResponses, { version });
  }

  // دالة لحساب المعايير الديناميكية بناءً على عدد الأسئلة الفعلي
  getDynamicNorms(questionsPerType, country = 'international') {
    const baseNorms = this.norms[country] || this.norms.international;
    const scaleFactor = questionsPerType / 30; // النسبة من النسخة الكاملة (30 سؤال لكل نوع)
    
    const adjustedNorms = {};
    for (const [type, norm] of Object.entries(baseNorms)) {
      adjustedNorms[type] = {
        mean: Math.round(norm.mean * scaleFactor),
        sd: Math.round(norm.sd * Math.sqrt(scaleFactor)) // الانحراف المعياري ينقص بالجذر التربيعي
      };
    }
    
    console.log(`📐 معايير ديناميكية لـ ${questionsPerType} أسئلة/نوع:`, adjustedNorms);
    return adjustedNorms;
  }

  // دالة لتحديد عدد الأسئلة لكل نوع
  getQuestionsPerType(responses) {
    const typeQuestions = {};
    
    for (const type of this.types) {
      typeQuestions[type] = Object.keys(responses).filter(key => key.startsWith(type)).length;
    }
    
    // أخذ المتوسط أو الأقل لضمان الاتساق
    const counts = Object.values(typeQuestions);
    return Math.min(...counts) || 5; // افتراضي 5 أسئلة لكل نوع كحد أدنى
  }

  // تحويل الاستجابات لتناسب خوارزمية النسخة الكاملة
  adaptResponses(responses, version) {
    // لا نحتاج تحويل - نعمل مع الاستجابات كما هي
    return responses;
  }
}

// تصدير الكلاس
export default RIASECInternational;

/* ===== مثال استخدام سريع =====
const engine = new RIASECInternational();
const responses = {
  R1:2, R2:1, // ... أكمل بقية البنود حتى C30
};
const results = engine.calculate(responses, {
  country: 'international', // أو 'egypt' | 'saudi'
  version: 'full',          // 'full'|'medium'|'short'
  lambda: 0.35,
  sdGate: 1.0
});
console.log(results);
*/