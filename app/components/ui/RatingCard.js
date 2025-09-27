'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardBody, Button, Progress, Chip } from '@nextui-org/react'
import { useTranslation } from '../lib/translation'

/**
 * مكون RatingCard قابل لإعادة الاستخدام
 * يدعم التقييمات النجمية والرقمية مع انتقالات سلسة
 */
const RatingCard = ({
  title,
  description,
  icon,
  rating = 0,
  maxRating = 5,
  type = 'stars', // 'stars' | 'slider' | 'progress'
  color = 'primary',
  size = 'md',
  isInteractive = true,
  showFeedback = true,
  onRatingChange,
  disabled = false,
  className = '',
  variant = 'shadow',
  // Props للتخصيص المتقدم
  customColors = {},
  animations = true,
  hapticFeedback = true,
  // Accessibility props
  ariaLabel,
  ariaDescription
}) => {
  const { t, direction } = useTranslation()
  const [currentRating, setCurrentRating] = useState(rating)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isPressed, setIsPressed] = useState(false)
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false)

  // تحديث التقييم عند تغيير المرر
  useEffect(() => {
    setCurrentRating(rating)
  }, [rating])

  // ألوان مخصصة للنجوم حسب التقييم
  const getRatingColor = (ratingValue) => {
    if (customColors[ratingValue]) return customColors[ratingValue]
    
    if (ratingValue <= 1) return 'danger'
    if (ratingValue <= 2) return 'warning'
    if (ratingValue <= 3) return 'default'
    if (ratingValue <= 4) return 'secondary'
    return 'success'
  }

  // رسائل التغذية الراجعة
  const getFeedbackMessage = (ratingValue) => {
    if (ratingValue <= 1) return t('rating.poor')
    if (ratingValue <= 2) return t('rating.fair')
    if (ratingValue <= 3) return t('rating.good')
    if (ratingValue <= 4) return t('rating.very_good')
    return t('rating.excellent')
  }

  // معالجة النقر على النجوم
  const handleStarClick = (starValue) => {
    if (!isInteractive || disabled) return
    
    // Haptic feedback للأجهزة المحمولة
    if (hapticFeedback && navigator.vibrate) {
      navigator.vibrate(50)
    }
    
    setCurrentRating(starValue)
    onRatingChange?.(starValue)
    
    if (showFeedback) {
      setShowFeedbackMessage(true)
      setTimeout(() => setShowFeedbackMessage(false), 2000)
    }
  }

  // معالجة التمرير على النجوم
  const handleStarHover = (starValue) => {
    if (!isInteractive || disabled) return
    setHoveredRating(starValue)
  }

  // إعادة تعيين التمرير
  const handleMouseLeave = () => {
    setHoveredRating(0)
  }

  // رندر النجوم
  const renderStars = () => {
    const stars = []
    const displayRating = hoveredRating || currentRating

    for (let i = 1; i <= maxRating; i++) {
      const isFilled = i <= displayRating
      const isHovered = i <= hoveredRating
      
      stars.push(
        <motion.button
          key={i}
          className={`
            rating-star
            ${isFilled ? 'filled' : ''}
            ${isHovered ? 'hovered' : ''}
            ${disabled ? 'disabled' : ''}
          `}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleStarHover(i)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          disabled={disabled}
          aria-label={`${t('rating.rate')} ${i} ${t('rating.out_of')} ${maxRating}`}
          whileHover={animations ? { scale: 1.1 } : {}}
          whileTap={animations ? { scale: 0.95 } : {}}
          animate={animations ? {
            color: isFilled ? `var(--nextui-colors-${getRatingColor(displayRating)})` : 'var(--nextui-colors-default-300)',
            scale: isPressed ? 0.9 : 1
          } : {}}
          transition={{ duration: 0.2 }}
        >
          ⭐
        </motion.button>
      )
    }

    return stars
  }

  // رندر شريط التقدم
  const renderProgress = () => (
    <div className="w-full space-y-2">
      <Progress
        value={(currentRating / maxRating) * 100}
        color={getRatingColor(currentRating)}
        size={size}
        className="w-full"
        aria-label={`${t('rating.current_rating')}: ${currentRating}/${maxRating}`}
      />
      <div className="flex justify-between text-sm text-default-500">
        <span>0</span>
        <span className="font-medium text-default-700">
          {currentRating.toFixed(1)}/{maxRating}
        </span>
        <span>{maxRating}</span>
      </div>
    </div>
  )

  // رندر منزلق التقييم
  const renderSlider = () => (
    <div className="w-full space-y-3">
      <input
        type="range"
        min="0"
        max={maxRating}
        step="0.1"
        value={currentRating}
        onChange={(e) => {
          const value = parseFloat(e.target.value)
          setCurrentRating(value)
          onRatingChange?.(value)
        }}
        className="w-full rating-slider"
        disabled={disabled}
        aria-label={ariaLabel || `${t('rating.rate')} ${title}`}
      />
      <div className="flex justify-center">
        <Chip
          color={getRatingColor(currentRating)}
          variant="flat"
          size="sm"
        >
          {currentRating.toFixed(1)}/{maxRating}
        </Chip>
      </div>
    </div>
  )

  return (
    <Card
      className={`rating-card ${className} ${direction === 'rtl' ? 'rtl' : 'ltr'}`}
      variant={variant}
      onMouseLeave={handleMouseLeave}
    >
      <CardBody className="p-6 space-y-4">
        {/* عنوان الكارت مع الأيقونة */}
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-2xl" role="img" aria-label={title}>
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-default-700">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-default-500 mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* منطقة التقييم */}
        <div className="rating-container" role="group" aria-label={ariaLabel || `${t('rating.rate')} ${title}`}>
          {type === 'stars' && (
            <div className="flex items-center justify-center gap-1 py-2">
              {renderStars()}
            </div>
          )}
          
          {type === 'progress' && renderProgress()}
          
          {type === 'slider' && renderSlider()}
        </div>

        {/* رسالة التغذية الراجعة */}
        <AnimatePresence>
          {showFeedbackMessage && showFeedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <Chip
                color={getRatingColor(currentRating)}
                variant="flat"
                size="sm"
              >
                {getFeedbackMessage(currentRating)}
              </Chip>
            </motion.div>
          )}
        </AnimatePresence>

        {/* معلومات إضافية */}
        {ariaDescription && (
          <p className="sr-only" id={`rating-description-${title}`}>
            {ariaDescription}
          </p>
        )}
      </CardBody>

      <style jsx>{`
        .rating-card {
          transition: all 0.3s ease;
        }
        
        .rating-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--nextui-shadows-lg);
        }
        
        .rating-star {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: var(--nextui-colors-default-300);
          padding: 0.25rem;
          border-radius: 0.5rem;
        }
        
        .rating-star:hover:not(.disabled) {
          background: var(--nextui-colors-default-100);
        }
        
        .rating-star.filled {
          color: var(--nextui-colors-warning);
        }
        
        .rating-star.disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        
        .rating-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 8px;
          border-radius: 5px;
          background: var(--nextui-colors-default-200);
          outline: none;
          transition: all 0.3s ease;
        }
        
        .rating-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--nextui-colors-primary);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .rating-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 8px var(--nextui-colors-primary-100);
        }
        
        .rating-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--nextui-colors-primary);
          cursor: pointer;
          border: none;
        }
        
        /* RTL Support */
        .rtl .rating-container {
          direction: rtl;
        }
        
        .rtl .rating-star {
          margin-left: 0.25rem;
          margin-right: 0;
        }
        
        /* Dark Mode Support */
        [data-theme="dark"] .rating-card {
          background: var(--nextui-colors-content2);
        }
        
        /* Mobile Responsive */
        @media (max-width: 768px) {
          .rating-star {
            font-size: 1.25rem;
            padding: 0.5rem;
          }
          
          .rating-card {
            padding: 1rem;
          }
        }
        
        /* Animation Classes */
        .rating-enter {
          opacity: 0;
          transform: scale(0.8);
        }
        
        .rating-enter-active {
          opacity: 1;
          transform: scale(1);
          transition: all 0.3s ease;
        }
        
        .rating-exit {
          opacity: 1;
          transform: scale(1);
        }
        
        .rating-exit-active {
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.3s ease;
        }
      `}</style>
    </Card>
  )
}

export default RatingCard