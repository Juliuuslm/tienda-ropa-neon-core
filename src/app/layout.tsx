import { Oswald, Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ui/ScrollProgress'

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['300', '500', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '600'],
})

export const metadata: Metadata = {
  title: 'Neon Core - Future Wear',
  description:
    'Hoodies, Playeras y Gorras diseñadas para la distopía digital. Tejidos de alta densidad, estética agresiva y comodidad para el caos urbano.',
  keywords: ['streetwear', 'cyberpunk', 'hoodie', 'ropa urbana', 'neon'],
  openGraph: {
    title: 'Neon Core - Future Wear',
    description:
      'Hoodies, Playeras y Gorras diseñadas para la distopía digital.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-black text-white">
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}
