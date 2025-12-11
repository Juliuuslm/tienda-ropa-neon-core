'use client'

import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    // Respetar preferencia de movimiento reducido
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Si el usuario prefiere movimiento reducido, usar scroll nativo
      return
    }

    // Deshabilitar Lenis en mobile/tablet para evitar conflictos con touch
    const isMobileOrTablet = window.innerWidth < 1024 || 'ontouchstart' in window

    if (isMobileOrTablet) {
      // En mobile usar scroll nativo para mejor UX y evitar conflictos
      return
    }

    const lenis = new Lenis({
      duration: 0.6, // Reducido a 0.6s para scroll más rápido y responsive
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2, // Aumentado para más velocidad de respuesta
      touchMultiplier: 1.5, // Mejor respuesta en mobile (aunque no se usa aquí)
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
