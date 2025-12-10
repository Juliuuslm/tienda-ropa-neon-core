'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react'
import { useCarousel } from '@/hooks/useCarousel'
import type { Review } from '@/types'

interface ReviewCarouselProps {
  reviews: Review[]
  reviewImages: string[]
}

export default function ReviewCarousel({
  reviews,
  reviewImages,
}: ReviewCarouselProps) {
  const {
    containerRef,
    currentIndex,
    canScrollPrev,
    canScrollNext,
    scrollPrev,
    scrollNext,
    scrollToIndex,
    pause,
    resume,
  } = useCarousel(reviews.length, 5000, {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  })

  // IDs aleatorios (hydration-safe)
  const [reviewIds, setReviewIds] = useState<number[]>([])
  useEffect(() => {
    setReviewIds(reviews.map(() => Math.floor(Math.random() * 9000) + 1000))
  }, [reviews.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') scrollPrev()
      if (e.key === 'ArrowRight') scrollNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [scrollPrev, scrollNext])

  return (
    <div
      className="relative w-full py-8"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth snap-x snap-mandatory px-4 md:px-6 lg:px-8"
        role="region"
        aria-label="Carrusel de reseñas"
      >
        {reviews.map((review, idx) => (
          <ReviewCard
            key={idx}
            review={review}
            image={reviewImages[idx] || '/images/reviews/reviwes (1).jpg'}
            reviewId={reviewIds[idx] || 0}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <NavigationButton
        direction="prev"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
      />
      <NavigationButton
        direction="next"
        onClick={scrollNext}
        disabled={!canScrollNext}
      />

      {/* Dots Indicators */}
      <DotsIndicators
        totalDots={Math.ceil(reviews.length / 3)}
        currentIndex={Math.floor(currentIndex / 3)}
        onDotClick={(dotIndex) => scrollToIndex(dotIndex * 3)}
      />
    </div>
  )
}

// Navigation Button Component
interface NavigationButtonProps {
  direction: 'prev' | 'next'
  onClick: () => void
  disabled: boolean
}

function NavigationButton({ direction, onClick, disabled }: NavigationButtonProps) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  const position = direction === 'prev' ? 'left-2 md:left-4' : 'right-2 md:right-4'

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        absolute ${position} top-1/2 -translate-y-1/2 z-10
        w-10 h-10 md:w-12 md:h-12
        bg-black/80 backdrop-blur-sm
        border border-white/10 rounded-sm
        flex items-center justify-center
        text-cyan-400
        hover:border-cyan-400
        hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
        disabled:opacity-30 disabled:cursor-not-allowed
        disabled:hover:border-white/10 disabled:hover:shadow-none
        transition-all duration-300
        focus-visible:outline-2 focus-visible:outline-cyan-400
      `}
      aria-label={direction === 'prev' ? 'Reseña anterior' : 'Siguiente reseña'}
      aria-disabled={disabled}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  )
}

// Dots Indicators Component
interface DotsIndicatorsProps {
  totalDots: number
  currentIndex: number
  onDotClick: (index: number) => void
}

function DotsIndicators({ totalDots, currentIndex, onDotClick }: DotsIndicatorsProps) {
  return (
    <div className="flex justify-center gap-2 mt-6 px-4" role="tablist" aria-label="Navegación de reseñas">
      {Array.from({ length: totalDots }).map((_, idx) => {
        const isActive = currentIndex === idx

        return (
          <button
            key={idx}
            onClick={() => onDotClick(idx)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${isActive ? 'bg-cyan-400 w-8' : 'bg-white/20 hover:bg-white/40 w-2'}
            `}
            role="tab"
            aria-selected={isActive}
            aria-label={`Ir a grupo ${idx + 1}`}
          />
        )
      })}
    </div>
  )
}

// Review Card Component
interface ReviewCardProps {
  review: Review
  image: string
  reviewId: number
}

function ReviewCard({ review, image, reviewId }: ReviewCardProps) {
  return (
    <div className="
      min-w-[280px] max-w-[350px]
      md:min-w-[calc(50%-12px)] md:max-w-[calc(50%-12px)]
      lg:min-w-[calc(33.333%-16px)] lg:max-w-[calc(33.333%-16px)]
      shrink-0
      snap-start
    ">
      <div className="
        bg-black
        border border-white/10
        p-6
        rounded-sm
        hover:border-cyan-400
        hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
        transition-all
        duration-300
        relative
        h-full
        max-h-[450px]
        overflow-y-auto
      ">
        {/* Header - Avatar + User Info */}
        <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
          <div className="relative w-12 h-12 rounded-sm border border-cyan-500/30 overflow-hidden flex-shrink-0">
            <Image
              src={image}
              alt={review.user}
              width={48}
              height={48}
              quality={60}
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-white uppercase tracking-wider whitespace-normal break-words">
              {review.user}
            </h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0"></div>
              <span className="text-[10px] text-gray-500 font-mono uppercase whitespace-nowrap">
                {review.role}
              </span>
            </div>
          </div>
        </div>

        {/* Review Text */}
        <p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed relative whitespace-normal break-words">
          <span className="text-cyan-500/30 absolute -left-2 -top-2 text-2xl flex-shrink-0">
            "
          </span>
          {review.text}
        </p>

        {/* Footer - Rating + ID */}
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex text-cyan-400 gap-1">
            {[...Array(review.rating)].map((_, r) => (
              <Zap key={r} size={14} fill="currentColor" className="flex-shrink-0" />
            ))}
          </div>
          <span className="text-[10px] text-gray-600 font-mono whitespace-nowrap">
            ID: #{reviewId || '????'}
          </span>
        </div>

        {/* Decorative Corners */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30"></div>
      </div>
    </div>
  )
}
