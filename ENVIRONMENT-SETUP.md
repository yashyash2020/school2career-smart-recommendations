# إعداد متغيرات البيئة - Environment Variables Setup

## 🔑 المتغيرات المطلوبة للمشروع

### 1. متغيرات Supabase (مطلوبة)

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. متغيرات التطبيق

```bash
NEXTAUTH_URL=http://localhost:3000  # للتطوير المحلي
APP_URL=http://localhost:3000       # للتطوير المحلي
NEXTAUTH_SECRET=your_random_secret_key
```

## 🚀 كيفية الحصول على قيم Supabase:

### الطريقة الأولى: من لوحة تحكم Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. سجل الدخول أو أنشئ حساب جديد
3. أنشئ مشروع جديد
4. اذهب إلى Settings > API
5. انسخ القيم التالية:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY`

### الطريقة الثانية: إذا كان لديك مشروع موجود
1. اذهب إلى مشروعك في Supabase
2. Settings > API
3. انسخ القيم المطلوبة

## ⚙️ إعداد المتغيرات:

### للتطوير المحلي:
1. انسخ ملف `.env.example` إلى `.env.local`
2. احرر القيم في `.env.local`
3. احفظ الملف

### للنشر على Vercel:
1. اذهب إلى مشروعك في Vercel Dashboard
2. انقر على **Settings**
3. انقر على **Environment Variables**
4. أضف كل متغير على حدة:

**المتغير الأول:**
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: `https://imobhmzywvzbvyqpzcau.supabase.co`
   - Environment: ✅ **Production**, ✅ **Preview**, ✅ **Development**

**المتغير الثاني:**
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2JobXp5d3Z6YnZ5cXB6Y2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NDkzNTEsImV4cCI6MjA3MjQyNTM1MX0.FpUXi86I-o38ecc0S1eJ6E2o1TRgYP-yNmOHqyYO3Pg`
   - Environment: ✅ **Production**, ✅ **Preview**, ✅ **Development**

5. انقر **Save** لكل متغير
6. ستتم إعادة النشر تلقائياً

## 🔧 اختبار الاتصال:

بعد إعداد المتغيرات، شغّل:

```bash
npm run dev
```

إذا ظهرت أخطاء في وحدة التحكم، تأكد من:
- صحة رابط Supabase
- صحة مفاتيح API
- أن المشروع مفعل في Supabase

## 🔐 نصائح الأمان:

1. **لا تشارك** ملف `.env.local` أو `.env.production`
2. **لا ترفع** ملفات البيئة إلى Git
3. **استخدم** قيم مختلفة للتطوير والإنتاج
4. **قم بتغيير** المفاتيح إذا تم تسريبها

## 📝 ملاحظات:

- `NEXT_PUBLIC_*` متغيرات مرئية للمتصفح
- المتغيرات الأخرى سرية ومتاحة فقط للخادم
- يجب إعادة تشغيل التطبيق بعد تغيير المتغيرات

---

## 🆘 إذا واجهت مشاكل:

1. تأكد من أن أسماء المتغيرات صحيحة (حساسة للأحرف الكبيرة/الصغيرة)
2. تأكد من عدم وجود مسافات في بداية أو نهاية القيم
3. أعد تشغيل التطبيق بعد التعديل
4. تحقق من سجلات Vercel للأخطاء التفصيلية