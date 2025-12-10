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
      {/* Marquee Track - CRÍTICO: flex + flex-row + flex-nowrap */}
      <div
        className="flex flex-row flex-nowrap items-start gap-6 animate-marquee w-max hover:[animation-play-state:paused] active:[animation-play-state:paused] focus:[animation-play-state:paused]"
        tabIndex={0}
        role="region"
        aria-label="Carrusel de reseñas"
      >
        {duplicatedReviews.map((review, idx) => {
          const imageIndex = idx % reviews.length
          return (
            <div
              key={`review-${idx}`}
              className="w-fit max-w-[85vw] md:max-w-[450px] shrink-0"
            >
              <div className="
                bg-black
                border border-white/10
                p-6
                rounded-sm
                hover:border-cyan-400
                hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
                active:border-cyan-400
                active:shadow-[0_0_20px_rgba(34,211,238,0.3)]
                transition-all
                duration-300
                relative
                h-full
              ">
                {/* Header - Avatar + User Info */}
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                  <div className="relative w-12 h-12 rounded-sm border border-cyan-500/30 overflow-hidden flex-shrink-0">
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
