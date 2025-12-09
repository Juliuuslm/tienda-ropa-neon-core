'use client'

import { useEffect, useState, useRef } from 'react'

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState<number>(0)
  const rafRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      // Cancelar RAF anterior si existe
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }

      // Throttle a ~16ms (60fps máximo)
      rafRef.current = requestAnimationFrame(() => {
        const now = performance.now()
        if (now - lastUpdateRef.current < 16) return

        lastUpdateRef.current = now
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrolled = window.scrollY
        const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0
        setScrollProgress(progress)
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 z-[999]"
      style={{
        width: `${scrollProgress}%`,
        transform: 'translateZ(0)',
        willChange: 'width',
      }}
    />
  )
}
