// اختبار اتصال Supabase
import https from 'https';

const supabaseUrl = 'https://imobhmzywvzbvyqpzcau.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltb2JobXp5d3Z6YnZ5cXB6Y2F1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4NDkzNTEsImV4cCI6MjA3MjQyNTM1MX0.FpUXi86I-o38ecc0S1eJ6E2o1TRgYP-yNmOHqyYO3Pg';

console.log('🔍 اختبار الاتصال مع Supabase...');

// اختبار بسيط للاتصال
https.get(`${supabaseUrl}/rest/v1/assessment_tools?select=id,code&limit=1`, {
    headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`,
        'Content-Type': 'application/json'
    }
}, (res) => {
    console.log('✅ حالة الاستجابة:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        console.log('📡 البيانات المستلمة:', data);
        console.log('🎯 الاتصال يعمل بنجاح!');
    });
}).on('error', (err) => {
    console.error('❌ خطأ في الاتصال:', err.message);
});