'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Zap } from 'lucide-react'
import type { Review } from '@/types'

interface ReviewCarouselProps {
  reviews: Review[]
  reviewImages: string[]
  autoplayInterval?: number
}

export default function ReviewCarousel({
  reviews,
  reviewImages,
  autoplayInterval = 5000,
}: ReviewCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [reviewIds, setReviewIds] = useState<number[]>([])
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Generar IDs aleatorios solo una vez (hydration-safe)
  useEffect(() => {
    setReviewIds(
      reviews.map(() => Math.floor(Math.random() * 9000) + 1000)
    )
  }, [reviews.length])

  // Duplicar reviews para efecto infinito
  const duplicatedReviews = [...reviews, ...reviews]

  // Autoplay logic
  useEffect(() => {
    if (!isAutoplay) return

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, autoplayInterval)

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [isAutoplay, autoplayInterval, reviews.length])

  const handleCardClick = () => {
    setIsAutoplay(false)
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
    }

    // Reanudar autoplay después de 8 segundos
    setTimeout(() => {
      setIsAutoplay(true)
    }, 8000)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
    handleCardClick()
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    handleCardClick()
  }

  return (
    <div className="relative w-full">
      {/* Carrusel Container */}
      <div
        ref={carouselRef}
        className="overflow-hidden rounded-lg"
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(-${currentIndex} * (100% + 32px)))`,
          }}
        >
          {duplicatedReviews.map((review, idx) => {
            const imageIndex = idx % reviews.length
            return (
              <div
                key={idx}
                className="min-w-[calc(100% - 0px)] md:min-w-[calc(50% - 16px)] lg:min-w-[calc(33.333% - 21.33px)] px-4 flex-shrink-0 cursor-pointer"
                onClick={handleCardClick}
              >
                <div className="bg-black border border-white/10 p-8 hover:border-cyan-400/50 transition-all duration-base relative group hover:-translate-y-2 h-full">
                  <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                    <div className="relative w-12 h-12 rounded-sm border border-cyan-500/30 group-hover:border-cyan-400 transition-colors duration-base overflow-hidden">
                      <Image
                        src={reviewImages[imageIndex] || '/images/reviews/reviwes (1).jpg'}
                        alt={review.user}
                        width={48}
                        height={48}
                        quality={60}
                        loading="lazy"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-wider">
                        {review.user}
                      </h4>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] text-gray-500 font-mono uppercase">
                          {review.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed relative">
                    <span className="text-cyan-500/30 absolute -left-2 -top-2 text-2xl">
                      "
                    </span>
                    {review.text}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex text-cyan-400 gap-1">
                      {[...Array(review.rating)].map((_, r) => (
                        <Zap key={r} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-600 font-mono">
                      ID: #{reviewIds[imageIndex] || '????'}
                    </span>
                  </div>

                  <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 transition-all duration-base"></div>
                  <div className="absolute bottom-0 left-0 w-0 h-0 border-b-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 transition-all duration-base"></div>

                  {/* Pause indicator */}
                  {!isAutoplay && currentIndex === imageIndex % reviews.length && (
                    <div className="absolute top-2 right-2 bg-cyan-400/20 border border-cyan-400 px-2 py-1 rounded text-[10px] text-cyan-400 font-mono">
                      ⏸ PAUSED
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-14 z-20 w-10 h-10 flex items-center justify-center border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-110 font-bold"
      >
        ‹
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-14 z-20 w-10 h-10 flex items-center justify-center border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-110 font-bold"
      >
        ›
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentIndex(idx)
              handleCardClick()
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'bg-cyan-400 w-8'
                : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>

      {/* Autoplay Status */}
      <div className="mt-4 text-center">
        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
          {isAutoplay ? (
            <span>
              ▶ AUTOPLAY • Click para pausar
            </span>
          ) : (
            <span>
              ⏸ PAUSED • Se reanudará en 8s
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
