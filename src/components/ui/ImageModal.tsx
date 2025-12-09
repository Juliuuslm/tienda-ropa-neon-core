'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  location?: string
  id?: string
}

export default function ImageModal({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  title,
  description,
  location,
  id,
}: ImageModalProps) {
  // Bloquear scroll cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
        style={{ willChange: 'backdrop-filter' }}
      />

      {/* Modal Content */}
      <div className="relative z-10 max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/80 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:scale-110"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-black border-2 border-cyan-400 shadow-[0_0_60px_rgba(34,211,238,0.6)]">
          {/* Imagen */}
          <div className="relative aspect-square md:aspect-auto min-h-[300px] md:min-h-[500px] overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
            {/* Scanline effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 animate-[scanline_2s_linear_infinite] pointer-events-none"></div>
            {/* CRT effect overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
          </div>

          {/* Info Panel */}
          <div className="relative p-8 flex flex-col justify-center bg-black border-l-2 border-cyan-400/30">
            {/* Data Header */}
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-cyan-500/30">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] text-cyan-400 font-mono tracking-[0.3em] uppercase">
                Transmisión Activa
              </span>
            </div>

            {/* Location Tag */}
            {location && (
              <div className="mb-4">
                <span className="bg-cyan-400/10 text-cyan-400 text-xs px-3 py-1 font-mono border border-cyan-400/30">
                  LOC: {location}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-display font-bold uppercase mb-4 text-white">
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 font-body leading-relaxed mb-6 text-sm md:text-base">
              {description}
            </p>

            {/* Footer Info */}
            <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
              <div>
                <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                  Image ID
                </span>
                <p className="text-cyan-400 font-mono text-sm">
                  #{id || Math.floor(Math.random() * 9000) + 1000}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">
                  Status
                </span>
                <p className="text-green-400 font-mono text-sm flex items-center justify-end gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  VERIFIED
                </p>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 pointer-events-none"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50 pointer-events-none"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50 pointer-events-none"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
