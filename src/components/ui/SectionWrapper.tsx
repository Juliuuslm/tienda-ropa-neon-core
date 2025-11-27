'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({
  children,
  className = '',
  id,
}: SectionWrapperProps) {
  const elementRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    if (elementRef.current) observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id={id}
      ref={elementRef}
      className={`transition-all duration-slower ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-20'
      } ${className}`}
    >
      <div className="container mx-auto px-4">{children}</div>
    </section>
  )
}
