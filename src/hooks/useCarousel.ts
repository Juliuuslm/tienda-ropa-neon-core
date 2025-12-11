'use client'

import { useState, useRef, useCallback, useEffect, RefObject } from 'react'

interface UseCarouselReturn {
  containerRef: RefObject<HTMLDivElement | null>
  currentIndex: number
  canScrollPrev: boolean
  canScrollNext: boolean
  scrollToIndex: (index: number) => void
  scrollPrev: () => void
  scrollNext: () => void
  pause: () => void
  resume: () => void
}

export function useCarousel(
  totalItems: number,
  autoPlayDelay: number = 5000,
  itemsPerView: { mobile: number; tablet: number; desktop: number }
): UseCarouselReturn {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Detectar items per view según viewport
  const getItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return itemsPerView.desktop

    if (window.innerWidth < 768) return itemsPerView.mobile
    if (window.innerWidth < 1024) return itemsPerView.tablet
    return itemsPerView.desktop
  }, [itemsPerView])

  // Scroll to specific index
  const scrollToIndex = useCallback((index: number) => {
    if (!containerRef.current) return

    const container = containerRef.current
    const firstCard = container.firstElementChild as HTMLElement
    if (!firstCard) return

    const cardWidth = firstCard.offsetWidth
    const gap = 24 // gap-6 = 24px
    const scrollPosition = index * (cardWidth + gap)

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    })

    setCurrentIndex(index)
  }, [])

  // Scroll prev
  const scrollPrev = useCallback(() => {
    const items = getItemsPerView()
    const newIndex = Math.max(0, currentIndex - items)
    scrollToIndex(newIndex)
  }, [currentIndex, getItemsPerView, scrollToIndex])

  // Scroll next
  const scrollNext = useCallback(() => {
    const items = getItemsPerView()
    const newIndex = Math.min(totalItems - items, currentIndex + items)
    scrollToIndex(newIndex)
  }, [currentIndex, totalItems, getItemsPerView, scrollToIndex])

  // Can scroll
  const canScrollPrev = currentIndex > 0
  const canScrollNext = currentIndex < totalItems - getItemsPerView()

  // Pause/Resume
  const pause = useCallback(() => setIsPaused(true), [])
  const resume = useCallback(() => setIsPaused(false), [])

  // Auto-play
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      if (canScrollNext) {
        scrollNext()
      } else {
        scrollToIndex(0) // Loop back to start
      }
    }, autoPlayDelay)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, canScrollNext, scrollNext, scrollToIndex, autoPlayDelay])

  return {
    containerRef,
    currentIndex,
    canScrollPrev,
    canScrollNext,
    scrollToIndex,
    scrollPrev,
    scrollNext,
    pause,
    resume,
  }
}
