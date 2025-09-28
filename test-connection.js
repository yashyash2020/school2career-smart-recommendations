// اختبار اتصال Supabase
const https = require('https');

const supabaseUrl = 'https://fpcnnndjofzwqmkrnujo.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwY25ubmRqb2Z6d3Fta3JudWpvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNjc4OTYwMiwiZXhwIjoyMDQyMzY1NjAyfQ.fWKlb06qUyHkPzEQ6ynfVvQ3SJmFVDBMf66SBjKVbYo';

console.log('🔍 اختبار الاتصال مع Supabase...');

// اختبار بسيط للاتصال
https.get(`${supabaseUrl}/rest/v1/assessment_tools?select=id,code&limit=1`, {
    headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
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