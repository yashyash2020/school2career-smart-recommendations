/**
 * 🧠 واجهة التوصيات الذكية 
 * عرض توصيات شخصية مدعومة بالذكاء الاصطناعي
 */

'use client';
import { useState, useEffect } from 'react';
import SmartRecommendationEngine from '../../lib/algorithms/SmartRecommendationEngine.js';

export default function SmartRecommendations({ userProfile, riasecResults }) {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('careers');
  const [engine] = useState(() => new SmartRecommendationEngine());

  useEffect(() => {
    async function generateRecommendations() {
      try {
        setLoading(true);
        console.log('🧠 بدء توليد التوصيات الذكية...');
        
        const profile = {
          ...userProfile,
          holland_code: riasecResults?.holland_code || '',
          personality: riasecResults?.personality || {},
          interests: riasecResults?.interests || {},
          skills: riasecResults?.skills || {}
        };
        
        const smartRecs = await engine.generateSmartRecommendations(profile);
        setRecommendations(smartRecs);
        console.log('✅ تم توليد التوصيات بنجاح');
        
      } catch (error) {
        console.error('❌ خطأ في التوصيات:', error);
      } finally {
        setLoading(false);
      }
    }

    if (riasecResults) {
      generateRecommendations();
    }
  }, [userProfile, riasecResults, engine]);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>🧠</div>
        <h3>جاري تحليل ملفك الشخصي...</h3>
        <p>الذكاء الاصطناعي يعمل على إنشاء توصيات مخصصة لك</p>
      </div>
    );
  }

  if (!recommendations) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>لم يتمكن من توليد التوصيات</h3>
        <p>يرجى المحاولة مرة أخرى</p>
      </div>
    );
  }

  const tabs = [
    { id: 'careers', title: '💼 المهن المقترحة', icon: '💼' },
    { id: 'majors', title: '🎓 التخصصات الجامعية', icon: '🎓' },
    { id: 'skills', title: '🛠️ تطوير المهارات', icon: '🛠️' },
    { id: 'learning', title: '📚 مسارات التعلم', icon: '📚' },
    { id: 'future', title: '🔮 الفرص المستقبلية', icon: '🔮' }
  ];

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Cairo, Arabic, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '20px',
        color: 'white',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
          🧠 توصياتك الذكية المخصصة
        </h1>
        <p style={{ fontSize: '16px', opacity: 0.9 }}>
          مدعومة بالذكاء الاصطناعي • درجة الثقة: {recommendations.confidence_score}%
        </p>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '30px',
        justifyContent: 'center'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 20px',
              border: 'none',
              borderRadius: '25px',
              background: activeTab === tab.id 
                ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                : 'rgba(255,255,255,0.1)',
              color: activeTab === tab.id ? 'white' : '#333',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: activeTab === tab.id ? 'none' : '2px solid #ddd'
            }}
          >
            {tab.icon} {tab.title.split(' ').slice(1).join(' ')}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        {activeTab === 'careers' && (
          <CareersTab careers={recommendations.careers} />
        )}
        
        {activeTab === 'majors' && (
          <MajorsTab majors={recommendations.university_majors} />
        )}
        
        {activeTab === 'skills' && (
          <SkillsTab skills={recommendations.skills_development} />
        )}
        
        {activeTab === 'learning' && (
          <LearningTab paths={recommendations.learning_paths} />
        )}
        
        {activeTab === 'future' && (
          <FutureTab opportunities={recommendations.future_opportunities} />
        )}
      </div>

      {/* Personal Advice */}
      {recommendations.personalized_advice && (
        <div style={{
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
          padding: '25px',
          borderRadius: '20px',
          marginTop: '30px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>
            💡 نصائح شخصية مخصصة لك
          </h3>
          <div style={{ color: '#555' }}>
            <strong>الخطوات الفورية:</strong>
            <ul>
              {recommendations.personalized_advice.immediate_actions.map((action, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{action}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Components للتبويبات
function CareersTab({ careers }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>💼 أفضل المهن المناسبة لك</h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        {careers.slice(0, 6).map((career, index) => (
          <div key={index} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '15px',
            padding: '20px',
            background: '#f9f9f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#333', marginBottom: '8px' }}>{career.name_ar}</h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                  {career.reasoning}
                </p>
                <div style={{ display: 'flex', gap: '15px', fontSize: '13px' }}>
                  <span style={{ color: '#555' }}>💰 {career.salary_range}</span>
                  <span style={{ color: '#555' }}>📈 {career.growth_rate}</span>
                </div>
              </div>
              <div style={{
                background: career.match_score >= 90 ? '#4CAF50' : career.match_score >= 80 ? '#FF9800' : '#2196F3',
                color: 'white',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {career.match_score}% تطابق
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MajorsTab({ majors }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>🎓 التخصصات الجامعية المقترحة</h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        {majors.slice(0, 5).map((major, index) => (
          <div key={index} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '15px',
            padding: '20px',
            background: '#f9f9f9'
          }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>{major.name_ar}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', fontSize: '14px' }}>
              <div>
                <strong>مدة الدراسة:</strong> {major.study_duration}
              </div>
              <div>
                <strong>مستوى الصعوبة:</strong> {major.difficulty_level}
              </div>
              <div>
                <strong>سوق العمل:</strong> {major.job_market}
              </div>
              <div style={{
                background: major.match_score >= 90 ? '#4CAF50' : '#FF9800',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '15px',
                textAlign: 'center'
              }}>
                {major.match_score}% تطابق
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsTab({ skills }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>🛠️ خطة تطوير المهارات</h2>
      <div style={{ display: 'grid', gap: '15px' }}>
        {skills.slice(0, 6).map((skill, index) => (
          <div key={index} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '15px',
            padding: '15px',
            background: '#f9f9f9'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ color: '#333' }}>{skill.skill_name}</h4>
              <span style={{
                background: skill.priority === 'عالي' ? '#F44336' : '#FF9800',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '10px',
                fontSize: '12px'
              }}>
                {skill.priority}
              </span>
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              <div>⏰ الوقت المتوقع: {skill.estimated_time}</div>
              <div>💰 التكلفة المقدرة: {skill.cost_estimate}</div>
              <div>📊 الصعوبة: {skill.difficulty}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LearningTab({ paths }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>📚 مسارات التعلم المقترحة</h2>
      {paths.map((path, index) => (
        <div key={index} style={{
          border: '1px solid #e0e0e0',
          borderRadius: '15px',
          padding: '20px',
          background: '#f9f9f9',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>{path.path_name}</h3>
          <div style={{ marginBottom: '15px', fontSize: '14px', color: '#666' }}>
            📅 المدة: {path.duration} | 📊 الصعوبة: {path.difficulty}
          </div>
          
          <div style={{ display: 'grid', gap: '10px' }}>
            {path.phases.map((phase, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #eee'
              }}>
                <h4 style={{ color: '#555', marginBottom: '8px' }}>{phase.phase_name}</h4>
                <div style={{ fontSize: '13px', color: '#777' }}>
                  ⏰ {phase.duration} | 🎯 {phase.skills.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function FutureTab({ opportunities }) {
  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>🔮 الفرص المستقبلية</h2>
      
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ color: '#555', marginBottom: '15px' }}>🚀 المهن الناشئة</h3>
        <div style={{ display: 'grid', gap: '15px' }}>
          {opportunities.emerging_careers.map((career, index) => (
            <div key={index} style={{
              border: '1px solid #e0e0e0',
              borderRadius: '15px',
              padding: '15px',
              background: '#f0f8ff'
            }}>
              <h4 style={{ color: '#333', marginBottom: '8px' }}>{career.career}</h4>
              <div style={{ fontSize: '13px', color: '#666' }}>
                <div>📈 معدل النمو: {career.growth_rate}</div>
                <div>🎯 مستوى الطلب: {career.demand_level}</div>
                <div>💰 نطاق الراتب: {career.salary_projection}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '20px',
        borderRadius: '15px'
      }}>
        <h3 style={{ marginBottom: '10px' }}>🎯 توقعاتك الشخصية</h3>
        <p style={{ opacity: 0.9 }}>{opportunities.personalized_forecast}</p>
      </div>
    </div>
  );
}