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
      colors: {
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          900: '#164e63',
        },
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
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'grid-move': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
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
