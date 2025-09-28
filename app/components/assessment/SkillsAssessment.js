'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Progress, Divider, Chip } from '@nextui-org/react'
import { useTranslation } from '../../lib/translation'
import RatingCard from '../ui/RatingCard'

/**
 * مكون تقييم المهارات التفاعلي
 * يستخدم RatingCard لعرض وتقييم المهارات المختلفة
 */
const SkillsAssessment = ({
  skills = [],
  onAssessmentComplete,
  showProgress = true,
  allowSave = true,
  className = ''
}) => {
  const { t, direction } = useTranslation()
  const [skillRatings, setSkillRatings] = useState({})
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [savedProgress, setSavedProgress] = useState(false)

  // المهارات الافتراضية إذا لم يتم تمرير مهارات
  const defaultSkills = [
    {
      id: 'scientific',
      icon: '🧪',
      type: 'stars',
      category: 'technical'
    },
    {
      id: 'literary', 
      icon: '📖',
      type: 'stars',
      category: 'communication'
    },
    {
      id: 'technical',
      icon: '💻', 
      type: 'stars',
      category: 'technical'
    },
    {
      id: 'artistic',
      icon: '🎨',
      type: 'stars', 
      category: 'creative'
    },
    {
      id: 'social',
      icon: '🤝',
      type: 'stars',
      category: 'interpersonal'
    },
    {
      id: 'critical_thinking',
      icon: '💡',
      type: 'stars',
      category: 'analytical'
    },
    {
      id: 'sports',
      icon: '⚽',
      type: 'stars',
      category: 'physical'
    },
    {
      id: 'medical',
      icon: '🏥',
      type: 'stars',
      category: 'healthcare'
    }
  ]

  const displaySkills = skills.length > 0 ? skills : defaultSkills

  // تحميل التقديرات المحفوظة
  useEffect(() => {
    const saved = localStorage.getItem('skillsAssessment')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setSkillRatings(data.ratings || {})
        setCurrentStep(data.currentStep || 0)
      } catch (error) {
        console.error('Error loading saved assessment:', error)
      }
    }
  }, [])

  // حفظ التقدم تلقائياً
  useEffect(() => {
    if (Object.keys(skillRatings).length > 0) {
      const dataToSave = {
        ratings: skillRatings,
        currentStep,
        timestamp: Date.now()
      }
      localStorage.setItem('skillsAssessment', JSON.stringify(dataToSave))
      setSavedProgress(true)
      setTimeout(() => setSavedProgress(false), 2000)
    }
  }, [skillRatings, currentStep])

  // معالجة تغيير التقييم
  const handleRatingChange = (skillId, rating) => {
    setSkillRatings(prev => ({
      ...prev,
      [skillId]: rating
    }))

    // التحقق من اكتمال التقييم
    const updatedRatings = { ...skillRatings, [skillId]: rating }
    const completedCount = Object.keys(updatedRatings).length
    
    if (completedCount === displaySkills.length) {
      setIsCompleted(true)
      onAssessmentComplete?.(updatedRatings)
    }
  }

  // حساب نسبة التقدم
  const progressPercentage = (Object.keys(skillRatings).length / displaySkills.length) * 100

  // الحصول على متوسط التقييم لكل فئة
  const getCategoryAverage = (category) => {
    const categorySkills = displaySkills.filter(skill => skill.category === category)
    const categoryRatings = categorySkills
      .map(skill => skillRatings[skill.id])
      .filter(rating => rating !== undefined)
    
    if (categoryRatings.length === 0) return 0
    return categoryRatings.reduce((sum, rating) => sum + rating, 0) / categoryRatings.length
  }

  // الحصول على الفئات المختلفة
  const categories = [...new Set(displaySkills.map(skill => skill.category))]

  // ترتيب المهارات حسب الفئة
  const skillsByCategory = categories.reduce((acc, category) => {
    acc[category] = displaySkills.filter(skill => skill.category === category)
    return acc
  }, {})

  // إعادة تعيين التقييم
  const resetAssessment = () => {
    setSkillRatings({})
    setCurrentStep(0)
    setIsCompleted(false)
    localStorage.removeItem('skillsAssessment')
  }

  // انتقالات الحركة
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  }

  return (
    <div className={`skills-assessment ${direction === 'rtl' ? 'rtl' : 'ltr'} ${className}`}>
      {/* شريط التقدم */}
      {showProgress && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card>
            <CardBody className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    {t('assessment.progress')}
                  </h3>
                  <div className="flex items-center gap-2">
                    {savedProgress && (
                      <Chip size="sm" color="success" variant="flat">
                        {t('assessment.saved')}
                      </Chip>
                    )}
                    <span className="text-sm text-default-500">
                      {Object.keys(skillRatings).length}/{displaySkills.length}
                    </span>
                  </div>
                </div>
                <Progress
                  value={progressPercentage}
                  color={progressPercentage === 100 ? 'success' : 'primary'}
                  size="md"
                  className="w-full"
                />
              </div>
            </CardBody>
          </Card>
        </motion.div>
      )}

      {/* تقييم المهارات */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {categories.map((category, categoryIndex) => (
          <motion.div key={category} variants={cardVariants}>
            <div className="space-y-4">
              {/* عنوان الفئة */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-default-700">
                  {t(`skills.categories.${category}`)}
                </h3>
                {getCategoryAverage(category) > 0 && (
                  <Chip
                    color={getCategoryAverage(category) >= 4 ? 'success' : 
                           getCategoryAverage(category) >= 3 ? 'warning' : 'default'}
                    variant="flat"
                  >
                    {getCategoryAverage(category).toFixed(1)}/5
                  </Chip>
                )}
              </div>

              {/* مهارات الفئة */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillsByCategory[category].map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    variants={cardVariants}
                    custom={skillIndex}
                  >
                    <RatingCard
                      title={t(`skills.${skill.id}.name`)}
                      description={t(`skills.${skill.id}.category`)}
                      icon={skill.icon}
                      rating={skillRatings[skill.id] || 0}
                      type={skill.type || 'stars'}
                      onRatingChange={(rating) => handleRatingChange(skill.id, rating)}
                      ariaLabel={`${t('rating.rate')} ${t(`skills.${skill.id}.name`)}`}
                      ariaDescription={t(`skills.${skill.id}.category`)}
                      animations={true}
                      hapticFeedback={true}
                      showFeedback={true}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {categoryIndex < categories.length - 1 && (
              <Divider className="mt-8" />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* نتائج التقييم */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mt-8"
          >
            <Card className="border-success-200 bg-success-50">
              <CardBody className="p-6 text-center">
                <div className="space-y-4">
                  <div className="text-4xl">🎉</div>
                  <h3 className="text-xl font-bold text-success-700">
                    {t('assessment.completed')}
                  </h3>
                  <p className="text-success-600">
                    {t('assessment.completed_description')}
                  </p>
                  
                  {/* ملخص النتائج */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    {categories.map(category => (
                      <div key={category} className="text-center">
                        <div className="text-sm text-default-500 mb-1">
                          {t(`skills.categories.${category}`)}
                        </div>
                        <div className="text-lg font-bold text-default-700">
                          {getCategoryAverage(category).toFixed(1)}/5
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 justify-center mt-6">
                    <Button
                      color="success"
                      variant="solid"
                      onPress={() => onAssessmentComplete?.(skillRatings)}
                    >
                      {t('assessment.view_results')}
                    </Button>
                    <Button
                      color="default"
                      variant="bordered"
                      onPress={resetAssessment}
                    >
                      {t('assessment.retake')}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .skills-assessment {
          max-width: 100%;
          margin: 0 auto;
        }
        
        /* RTL Support */
        .rtl {
          direction: rtl;
        }
        
        .rtl .grid {
          direction: rtl;
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .skills-assessment .grid {
            grid-template-columns: 1fr;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .skills-assessment .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        /* Animation Classes */
        .category-enter {
          opacity: 0;
          transform: translateY(20px);
        }
        
        .category-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.4s ease;
        }
        
        .category-enter-done {
          opacity: 1;
        }
        
        /* Dark Mode Support */
        [data-theme="dark"] .skills-assessment {
          color: var(--nextui-colors-dark-foreground);
        }
      `}</style>
    </div>
  )
}

export default SkillsAssessment