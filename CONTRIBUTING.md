# المساهمة في مشروع School2Career

## 🤝 مرحباً بالمساهمين

نحن نرحب بمساهماتكم في تطوير منصة School2Career! إليكم الدليل الشامل للمساهمة.

## 🚀 كيفية البدء

### 1. **إعداد البيئة المحلية**
```bash
# استنساخ المشروع
git clone https://github.com/your-username/school2career-riasec.git
cd school2career-riasec

# تسطيب المكتبات
npm install

# إعداد متغيرات البيئة
cp .env.local.example .env.local
# قم بملء القيم المطلوبة

# تشغيل المشروع
npm run dev
```

### 2. **إنشاء فرع جديد**
```bash
git checkout -b feature/your-feature-name
```

## 📋 أنواع المساهمات المرحب بها

### 🐛 **إصلاح الأخطاء (Bug Fixes)**
- أخطاء في الواجهة
- مشاكل في الخوارزميات
- أخطاء في قاعدة البيانات

### ✨ **ميزات جديدة (New Features)**
- تقييمات إضافية
- تحسينات في الواجهة
- ميزات تحليلية جديدة

### 📚 **تحسين التوثيق**
- إضافة أمثلة
- تحديث الدليل
- ترجمة المحتوى

### 🌍 **الترجمة والتوطين**
- إضافة لغات جديدة
- تحسين الترجمات الموجودة
- دعم RTL للغات أخرى

## 🛠️ معايير الكود

### **JavaScript/React**
```javascript
// استخدم const/let بدلاً من var
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// استخدم Arrow Functions
const calculateScore = (responses) => {
  return responses.reduce((sum, response) => sum + response, 0);
};

// استخدم template literals
const message = `النتيجة: ${score}%`;
```

### **CSS/Styling**
```css
/* استخدم Tailwind CSS classes */
.assessment-card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
}

/* للـ RTL support */
.rtl-text {
  direction: rtl;
  text-align: right;
}
```

## 🧪 الاختبارات

### **تشغيل الاختبارات**
```bash
# اختبارات الوحدة
npm run test

# اختبارات E2E
npm run test:e2e

# فحص الكود
npm run lint
```

### **كتابة اختبارات جديدة**
```javascript
// مثال لاختبار component
import { render, screen } from '@testing-library/react';
import AssessmentCard from '../components/AssessmentCard';

test('يعرض عنوان التقييم بشكل صحيح', () => {
  render(<AssessmentCard title="RIASEC Assessment" />);
  expect(screen.getByText('RIASEC Assessment')).toBeInTheDocument();
});
```

## 📝 Process المراجعة

### 1. **قبل إرسال Pull Request**
- ✅ تأكد من مرور جميع الاختبارات
- ✅ اتبع معايير الكود
- ✅ أضف التوثيق المناسب
- ✅ اختبر الميزة محلياً

### 2. **معلومات Pull Request**
```markdown
## نوع التغيير
- [ ] إصلاح خطأ (bug fix)
- [ ] ميزة جديدة (new feature)
- [ ] تحسين (enhancement)
- [ ] توثيق (documentation)

## الوصف
وصف مختصر للتغييرات...

## الاختبارات
- [ ] تم اختبار الميزة محلياً
- [ ] تم إضافة اختبارات جديدة
- [ ] جميع الاختبارات تمر بنجاح

## لقطات الشاشة (إن وجدت)
![screenshot](url)
```

## 🌍 المساهمة في الترجمة

### **إضافة لغة جديدة**
1. أنشئ مجلد جديد في `public/locales/[language-code]/`
2. انسخ ملفات الترجمة من `public/locales/ar/`
3. ترجم المحتوى
4. أضف اللغة في `next-i18next.config.js`

### **مثال ملف ترجمة**
```json
{
  "common": {
    "welcome": "مرحباً بك",
    "start_assessment": "ابدأ التقييم",
    "results": "النتائج"
  },
  "riasec": {
    "realistic": "واقعي",
    "investigative": "استقصائي",
    "artistic": "فني"
  }
}
```

## 🔬 المساهمة في البحث العلمي

### **البيانات والإحصائيات**
- تحليل البيانات الجديدة
- تحديث المعايير
- إضافة معايير محلية

### **الخوارزميات**
- تحسين خوارزميات الحساب
- إضافة مؤشرات جديدة
- تطوير نماذج الذكي الاصطناعي

## 🐛 الإبلاغ عن الأخطاء

### **قبل الإبلاغ**
1. ابحث في Issues الموجودة
2. تأكد من أنك تستخدم أحدث إصدار
3. اجمع معلومات النظام

### **معلومات مطلوبة**
```markdown
## وصف الخطأ
وصف واضح للمشكلة...

## خطوات إعادة الإنتاج
1. اذهب إلى...
2. اضغط على...
3. شاهد الخطأ...

## السلوك المتوقع
ما الذي توقعت حدوثه...

## لقطات الشاشة
إن وجدت...

## معلومات النظام
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 91]
- Version: [e.g. 2.1.0]
```

## 💬 التواصل

### **قنوات التواصل**
- 💬 **Discord**: [رابط الخادم](https://discord.gg/school2career)
- 📧 **Email**: contributors@school2career.com
- 🐦 **Twitter**: [@School2Career](https://twitter.com/school2career)

### **اجتماعات المساهمين**
- 📅 كل أسبوعين - الأحد 8:00 م (بتوقيت القاهرة)
- 🔗 Zoom Link: [الرابط](https://zoom.us/j/xxx)

## 🏆 التقدير

### **مستويات المساهمة**
- 🥉 **Bronze**: 1-5 مساهمات
- 🥈 **Silver**: 6-15 مساهمة
- 🥇 **Gold**: 16+ مساهمة
- 💎 **Diamond**: مساهم أساسي

### **المكافآت**
- شهادة تقدير رقمية
- ذكر في صفحة المساهمين
- دعوة لفعاليات خاصة
- مراجع مهنية

## 📜 مدونة السلوك

نحن ملتزمون بتوفير بيئة ترحيبية وآمنة للجميع. يرجى قراءة [مدونة السلوك](CODE_OF_CONDUCT.md) الخاصة بنا.

---

## 🙏 شكراً لك!

مساهمتك تجعل School2Career أفضل للجميع. كل سطر كود، كل اقتراح، وكل تقرير خطأ يساعد في بناء منصة أفضل لتوجيه الشباب نحو مستقبل مهني مشرق.

**🎯 معاً نبني جسر بين التعليم والمهنة!**