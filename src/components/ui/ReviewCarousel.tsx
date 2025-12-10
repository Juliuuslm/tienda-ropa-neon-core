'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Zap } from 'lucide-react'
import type { Review } from '@/types'

interface ReviewCarouselProps {
  reviews: Review[]
  reviewImages: string[]
}

export default function ReviewCarousel({
  reviews,
  reviewImages,
}: ReviewCarouselProps) {
  const [reviewIds, setReviewIds] = useState<number[]>([])

  // Generar IDs aleatorios solo una vez (hydration-safe)
  useEffect(() => {
    setReviewIds(
      reviews.map(() => Math.floor(Math.random() * 9000) + 1000)
    )
  }, [reviews.length])

  // Duplicar reviews para efecto infinito
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <div className="relative w-full overflow-hidden py-8">
      {/* Marquee Track */}
      <div
        className="flex gap-6 animate-marquee w-max hover:[animation-play-state:paused] active:[animation-play-state:paused] focus:[animation-play-state:paused]"
        tabIndex={0}
        role="region"
        aria-label="Carrusel de reseñas"
      >
        {duplicatedReviews.map((review, idx) => {
          const imageIndex = idx % reviews.length
          return (
            <div
              key={`review-${idx}`}
              className="w-fit min-w-[280px] max-w-[450px] shrink-0"
            >
              <div className="
                bg-black
                border border-white/10
                p-6
                rounded-sm
                hover:border-cyan-400
                hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]
                active:border-cyan-400
                active:shadow-[0_0_20px_rgba(34,211,238,0.5)]
                transition-all
                duration-300
                relative
                h-full
              ">
                {/* Header - Avatar + User Info */}
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                  <div className="relative w-12 h-12 rounded-sm border border-cyan-500/30 overflow-hidden">
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

                {/* Review Text */}
                <p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed relative">
                  <span className="text-cyan-500/30 absolute -left-2 -top-2 text-2xl">
                    "
                  </span>
                  {review.text}
                </p>

                {/* Footer - Rating + ID */}
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

                {/* Decorative Corners */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30"></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
