import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-oswald)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      // Sistema de tipografía consistente
      fontSize: {
        'display-xl': ['7rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading-lg': ['2.5rem', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-md': ['2rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-sm': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
      colors: {
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          900: '#164e63',
        },
        // Colores semánticos para texto
        'text-primary': '#ffffff',
        'text-secondary': '#d1d5db', // gray-300
        'text-tertiary': '#9ca3af',  // gray-400
        'text-muted': '#6b7280',     // gray-500
      },
      // Espaciado consistente (base-8)
      spacing: {
        'section-sm': '4rem',   // 64px
        'section-md': '6rem',   // 96px
        'section-lg': '8rem',   // 128px
        'section-xl': '10rem',  // 160px
      },
      // Sistema de timing de animaciones
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'moderate': '350ms',
        'slow': '500ms',
        'slower': '700ms',
      },
      // Easing functions naturales
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
        'spin-reverse-slow': 'spin-reverse 20s linear infinite',
        'grid-move': 'grid-move 3s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -20px, 0)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'grid-move': {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(40px, 40px, 0)' },
        },
        'text-reveal': {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        glitch: {
          '0%': { clipPath: 'inset(50% 0 30% 0)', transform: 'translate(-5px,0)' },
          '20%': { clipPath: 'inset(80% 0 1% 0)', transform: 'translate(5px,0)' },
          '40%': { clipPath: 'inset(10% 0 50% 0)', transform: 'translate(5px,0)' },
          '60%': { clipPath: 'inset(40% 0 40% 0)', transform: 'translate(-5px,0)' },
          '80%': { clipPath: 'inset(20% 0 20% 0)', transform: 'translate(0,0)' },
          '100%': { clipPath: 'inset(10% 0 70% 0)', transform: 'translate(0,0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'scale(1.2)', opacity: '0' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
