# 📋 دليل النشر: GitHub + Vercel خطوة بخطوة

<div dir="rtl">

## 🎯 الهدف
رفع مشروع School2Career على GitHub ونشره على Vercel للاستخدام العام.

---

## 📝 المتطلبات قبل البدء

### 1. **حسابات مطلوبة:**
- ✅ حساب GitHub ([github.com](https://github.com))
- ✅ حساب Vercel ([vercel.com](https://vercel.com))

### 2. **أدوات مطلوبة:**
- ✅ Git مثبت على الجهاز
- ✅ Node.js و npm
- ✅ محرر النصوص (VS Code مفضل)

---

## 🚀 الخطوة الأولى: تحضير المشروع

### 1. **فتح الـ Terminal**
```bash
# الانتقال لمجلد المشروع
cd "E:\Mona-Yashar\school2career-15-9-2025 - Copy"
```

### 2. **تهيئة Git**
```bash
# تهيئة المشروع كـ Git repository
git init

# إضافة جميع الملفات
git add .

# أول commit
git commit -m "🎉 Initial commit: School2Career Smart Recommendations System"
```

---

## 📂 الخطوة الثانية: إنشاء Repository على GitHub

### 1. **إنشاء Repository جديد:**
- اذهب إلى [github.com](https://github.com)
- اضغط على **"New"** أو **"+"** → **"New repository"**
- اسم الـ Repository: `school2career-smart-recommendations`
- الوصف: `🧠 نظام التوصيات الذكية للتوجيه المهني - مدعوم بالذكاء الاصطناعي`
- اختر **Public** (لتكون متاحة للجميع)
- **لا تضع** ✅ في README أو .gitignore أو License (لأننا عندنا بالفعل)
- اضغط **"Create repository"**

### 2. **نسخ رابط الـ Repository:**
بعد الإنشاء، انسخ الرابط اللي هيظهر (مثال):
```
https://github.com/your-username/school2career-smart-recommendations.git
```

---

## 🔗 الخطوة الثالثة: ربط المشروع المحلي بـ GitHub

### في الـ Terminal:
```bash
# ربط المشروع المحلي بـ GitHub
git remote add origin https://github.com/your-username/school2career-smart-recommendations.git

# تأكد من الربط
git remote -v

# رفع المشروع لـ GitHub
git push -u origin main
```

**ملاحظة:** لو طلب منك تسجيل دخول، استخدم:
- **Username**: اسم المستخدم في GitHub
- **Password**: Personal Access Token (مش كلمة المرور العادية)

---

## 🌐 الخطوة الرابعة: النشر على Vercel

### 1. **الدخول على Vercel:**
- اذهب إلى [vercel.com](https://vercel.com)
- اضغط **"Sign up"** أو **"Login"**
- اختر **"Continue with GitHub"** لربط الحساب

### 2. **استيراد المشروع:**
- من لوحة تحكم Vercel، اضغط **"New Project"**
- اختر الـ Repository اللي رفعته: `school2career-smart-recommendations`
- اضغط **"Import"**

### 3. **إعداد المشروع:**
```
Project Name: school2career-smart-recommendations
Framework Preset: Next.js (سيتم اكتشافه تلقائياً)
Root Directory: ./ (الافتراضي)
Build Command: npm run build (الافتراضي)
Output Directory: .next (الافتراضي)
Install Command: npm install (الافتراضي)
```

### 4. **إضافة متغيرات البيئة (Environment Variables):**
في قسم "Environment Variables":
```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_anon_key
```

### 5. **النشر:**
- اضغط **"Deploy"**
- انتظر 2-3 دقائق للبناء والنشر
- ستحصل على رابط الموقع مثل: `https://school2career-smart-recommendations.vercel.app`

---

## ✅ الخطوة الخامسة: التحقق من النشر

### 1. **اختبار الموقع:**
- افتح الرابط اللي أعطاك إياه Vercel
- تأكد إن الصفحة الرئيسية تعمل
- جرب صفحة التوصيات الذكية: `/smart-recommendations`
- تأكد من تشغيل نظام RIASEC

### 2. **مراقبة الأداء:**
- في لوحة تحكم Vercel، راقب:
  - **Functions**: تشغيل الـ API
  - **Analytics**: إحصائيات الزوار  
  - **Speed Insights**: سرعة التحميل

---

## 🔧 الخطوة السادسة: إعدادات متقدمة

### 1. **ربط Domain مخصص (اختياري):**
```
Domain Settings → Add Domain → your-custom-domain.com
```

### 2. **إعداد الأمان:**
```
Settings → Environment Variables → Add:
- NODE_ENV = production
- NEXT_PUBLIC_SITE_URL = https://your-domain.com
```

### 3. **تفعيل Analytics:**
```
Analytics → Enable → Real-time monitoring
```

---

## 📱 الخطوة السابعة: تحديثات مستقبلية

### لرفع تحديثات جديدة:
```bash
# إضافة التغييرات الجديدة
git add .

# إنشاء commit جديد
git commit -m "✨ إضافة ميزة جديدة: [وصف التحديث]"

# رفع على GitHub
git push origin main
```

**Vercel سيقوم بالنشر التلقائي** كل مرة ترفع فيها تحديث على GitHub!

---

## 🆘 حل المشاكل الشائعة

### ❌ **مشكلة: Git لا يرفع**
```bash
# تأكد من إعداد Git
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### ❌ **مشكلة: Build فشل على Vercel**
- تأكد من ملف `package.json` سليم
- تأكد من عدم وجود errors في الكود
- راجع الـ Build Logs في لوحة تحكم Vercel

### ❌ **مشكلة: الموقع لا يعمل**
- تأكد من متغيرات البيئة صحيحة
- تأكد من ملف `next.config.js` سليم
- راجع الـ Function Logs

---

## 🎉 تهانينا!

بكده تكون رفعت المشروع بنجاح على:
- ✅ **GitHub**: للكود المصدري والتعاون
- ✅ **Vercel**: للموقع المباشر والمتاح للجميع

### الروابط النهائية:
- **GitHub Repository**: `https://github.com/your-username/school2career-smart-recommendations`
- **Live Website**: `https://school2career-smart-recommendations.vercel.app`

---

## 📞 دعم إضافي

لو احتجت مساعدة في أي خطوة:
1. راجع الدليل مرة تانية
2. اشتغل خطوة بخطوة
3. اسأل إذا واجهت أي مشكلة

**المشروع جاهز للعالم! 🚀**

</div>