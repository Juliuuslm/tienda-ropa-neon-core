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
  title: 'Neon Core - Moda del Futuro',
  description:
    'Hoodies, playeras y gorras premium de calidad superior. Diseño urbano moderno, tejidos duraderos y estilo que define tu identidad.',
  keywords: ['streetwear', 'hoodie premium', 'moda urbana', 'ropa de calidad', 'neon'],
  openGraph: {
    title: 'Neon Core - Moda del Futuro',
    description:
      'Hoodies, playeras y gorras premium. Diseño urbano con tejidos de alta calidad.',
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
