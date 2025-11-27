'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Menu,
  X,
  ArrowRight,
  Zap,
  ShoppingBag,
  Lock,
  Download,
  ChevronRight,
  Instagram,
  Twitter,
  Youtube,
  Activity,
} from 'lucide-react'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import type { NavItem, ProductItem, Review, TechFeature } from '@/types'

const NeonCore: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [scrollY, setScrollY] = useState<number>(0)
  const [activeSection, setActiveSection] = useState<string>('')
  const [reviewIds, setReviewIds] = useState<number[]>([])
  const [formEmail, setFormEmail] = useState<string>('')
  const [formStatus, setFormStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState<string>('')

  const navItems: NavItem[] = [
    { label: 'Colección', id: 'colección' },
    { label: 'Manifiesto', id: 'manifiesto' },
    { label: 'Tech', id: 'tech' },
    { label: 'Lookbook', id: 'lookbook' },
    { label: 'Reseñas', id: 'reviews' },
    { label: 'Comunidad', id: 'comunidad' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setScrollY(window.scrollY)

      // Detect active section
      const sections = navItems.map((item) => {
        const element = document.getElementById(item.id)
        return element
          ? {
              id: item.id,
              top: element.offsetTop,
              height: element.offsetHeight,
            }
          : null
      }).filter(Boolean)

      const currentScroll = window.scrollY + 150
      const current = sections.find(
        (section) =>
          section &&
          currentScroll >= section.top &&
          currentScroll < section.top + section.height
      )
      setActiveSection(current?.id || '')
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate review IDs only on client to avoid hydration mismatch
  useEffect(() => {
    setReviewIds([
      Math.floor(Math.random() * 9000) + 1000,
      Math.floor(Math.random() * 9000) + 1000,
      Math.floor(Math.random() * 9000) + 1000,
    ])
  }, [])

  const modalRef = useFocusTrap(isModalOpen)
  const toggleModal = (): void => setIsModalOpen(!isModalOpen)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError('')

    if (!formEmail.trim()) {
      setFormStatus('error')
      setFormError('Por favor ingresa un correo electrónico')
      return
    }

    if (!validateEmail(formEmail)) {
      setFormStatus('error')
      setFormError('Por favor ingresa un correo válido')
      return
    }

    setFormStatus('validating')
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success')
      setFormError('')
      setTimeout(() => {
        setFormEmail('')
        setFormStatus('idle')
      }, 2000)
    }, 500)
  }

  return (
    <main className="bg-black text-white min-h-screen font-body selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      {/* --- SKIP LINK --- */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:bg-cyan-400 focus:text-black focus:px-4 focus:py-2 focus:font-bold"
      >
        Saltar al contenido principal
      </a>

      {/* --- SECCIÓN 1: NAVBAR --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-slow border-b ${
          scrolled
            ? 'bg-black/80 backdrop-blur-lg border-cyan-500/20 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="text-2xl font-display font-bold tracking-tighter italic group cursor-pointer">
            NEON{' '}
            <span className="text-cyan-400 group-hover:text-white transition-colors duration-base">
              CORE
            </span>
            <div className="h-0.5 w-0 group-hover:w-full bg-cyan-400 transition-all duration-base"></div>
          </div>

          <div className="hidden md:flex space-x-8 text-sm font-bold tracking-widest uppercase text-gray-300">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                className={`relative overflow-hidden group h-6 block transition-colors duration-base ${
                  activeSection === item.id ? 'text-cyan-400' : ''
                }`}
              >
                <span
                  className={`block group-hover:-translate-y-full transition-transform duration-base ease-in-out ${
                    activeSection === item.id ? '-translate-y-full' : ''
                  }`}
                >
                  {item.label}
                </span>

                <span
                  className={`absolute top-full left-0 w-full text-cyan-400 group-hover:-translate-y-full transition-transform duration-base ease-in-out ${
                    activeSection === item.id ? '-translate-y-full' : ''
                  }`}
                >
                  {item.label}
                </span>
              </a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleModal}
              className="hidden md:flex items-center space-x-2 bg-white text-black px-5 py-2 text-xs font-bold uppercase tracking-wide hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all duration-base shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]"
            >
              <span>Join Protocol</span>
              <ArrowRight size={14} />
            </button>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-6 md:space-y-8 font-display text-3xl sm:text-4xl uppercase animate-in fade-in duration-300 overflow-y-auto py-20">
          {navItems.map((item, i) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-base tracking-wider focus-visible:outline-2 focus-visible:outline-cyan-400"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleModal}
            className="mt-6 bg-cyan-400 text-black px-6 py-3 text-base font-bold uppercase tracking-wide hover:bg-white transition-all duration-base min-h-[44px]"
          >
            Join Protocol
          </button>
        </div>
      )}

      {/* --- SECCIÓN 2: HERO (Cinematic Entry + Cyber Reactor Center) --- */}
      <section id="main-content" className="relative min-h-[600px] sm:min-h-[700px] md:min-h-[800px] lg:h-screen w-full flex items-center justify-center overflow-hidden border-b border-cyan-900/30">
        <div className="absolute inset-0 z-0" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <Image
            src="/images/hero/hero.jpg"
            alt="Cyberpunk City"
            fill
            priority
            quality={75}
            sizes="100vw"
            className="object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* --- EFECTO: CYBER REACTOR CORE (CENTER) --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 opacity-60 hidden md:block">
          <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-spin-slow border-dashed"></div>

          <div className="absolute inset-[15%] border border-purple-500/20 rounded-full animate-spin-reverse-slow border-dotted shadow-[0_0_30px_rgba(168,85,247,0.1)]"></div>

          <div className="absolute inset-[30%] border-t-2 border-b-2 border-transparent border-t-cyan-400/30 border-b-cyan-400/30 rounded-full animate-spin duration-[3s]"></div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full border border-cyan-400/20 animate-[pulse-ring_3s_ease-out_infinite]"></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full border border-cyan-400/20 animate-[pulse-ring_3s_ease-out_infinite]"
            style={{ animationDelay: '1s' }}
          ></div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent"></div>
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          {/* Señal de Datos */}
          <div className="reveal-child mb-6 flex flex-col items-center justify-center gap-3">
            <div className="flex items-end justify-center gap-[3px] h-8">
              <div
                className="w-1 bg-cyan-400 animate-[pulse_0.6s_ease-in-out_infinite] h-full"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className="w-1 bg-cyan-400 animate-[pulse_0.8s_ease-in-out_infinite] h-2/3"
                style={{ animationDelay: '100ms' }}
              ></div>
              <div
                className="w-1 bg-cyan-400 animate-[pulse_0.4s_ease-in-out_infinite] h-1/2"
                style={{ animationDelay: '200ms' }}
              ></div>
              <div
                className="w-1 bg-purple-500 animate-[pulse_0.7s_ease-in-out_infinite] h-3/4"
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className="w-1 bg-cyan-400 animate-[pulse_0.5s_ease-in-out_infinite] h-1/3"
                style={{ animationDelay: '300ms' }}
              ></div>
              <div
                className="w-1 bg-cyan-400 animate-[pulse_0.9s_ease-in-out_infinite] h-full"
                style={{ animationDelay: '50ms' }}
              ></div>
            </div>
            <div className="text-[10px] text-cyan-400 font-mono tracking-[0.4em] uppercase opacity-90 animate-pulse border-t border-cyan-500/30 pt-2 px-4">
              Signal Detected
            </div>
          </div>

          <h1 className="font-display text-6xl md:text-9xl font-bold uppercase leading-none tracking-tighter mb-6 flex flex-col items-center relative">
            <div className="hidden md:block absolute -top-4 -left-8 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50"></div>
            <div className="hidden md:block absolute -top-4 -right-8 w-8 h-8 border-t-2 border-r-2 border-cyan-500/50"></div>
            <div className="hidden md:block absolute -bottom-4 -left-8 w-8 h-8 border-b-2 border-l-2 border-cyan-500/50"></div>
            <div className="hidden md:block absolute -bottom-4 -right-8 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50"></div>

            <div className="text-reveal-wrapper overflow-hidden">
              <span className="block reveal-child delay-100" style={{ animationDelay: '0.1s' }}>Future</span>
            </div>
            <div className="text-reveal-wrapper overflow-hidden">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 reveal-child delay-200" style={{ animationDelay: '0.2s' }}>
                Wear
              </span>
            </div>
          </h1>

          <div className="text-reveal-wrapper mb-8">
            <p className="max-w-xl mx-auto text-gray-300 font-body leading-relaxed reveal-child delay-300" style={{ animationDelay: '0.3s' }}>
              Hoodies, Playeras y Gorras diseñadas para la distopía digital.
              Tejidos de alta densidad, estética agresiva y comodidad para el
              caos urbano.
            </p>
          </div>

          <div
            className="flex flex-col md:flex-row gap-4 justify-center reveal-child delay-300"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={() =>
                document.getElementById('colección')?.scrollIntoView()
              }
              className="group bg-cyan-400 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explorar Drop <ShoppingBag size={18} />
              </span>
              <div className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-base ease-out z-0"></div>
            </button>
            <button
              onClick={toggleModal}
              className="border border-white/30 text-white px-8 py-4 font-bold uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all duration-300"
            >
              Acceso VIP
            </button>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: MARQUEE (Functional Animation) --- */}
      <div className="bg-cyan-400 text-black overflow-hidden py-3 border-y-4 border-black relative z-20 rotate-1 hover:rotate-0 transition-transform duration-slow group">
        <div className="flex w-[200%] animate-marquee group-hover:[animation-play-state:paused]">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="text-2xl font-display font-bold mx-8 italic uppercase shrink-0"
            >
              /// HOODIES. PLAYERAS. GORRAS. /// NEON CORE ///
            </span>
          ))}
        </div>
      </div>

      {/* --- SECCIÓN 4: MANIFIESTO (Glitch Reveal) --- */}
      <SectionWrapper
        id="manifiesto"
        className="py-24 border-b border-white/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2
              className="text-4xl md:text-6xl font-display font-bold uppercase mb-6 leading-none glitch-effect"
              data-text="Solo lo esencial."
            >
              Solo lo <br />
              <span className="text-stroke text-white">esencial.</span>
            </h2>
            <p className="text-gray-300 mb-6 font-body text-lg border-l-2 border-cyan-500 pl-4">
              En Neon Core rechazamos el exceso. No hacemos catálogos infinitos.
              Nos especializamos en lo único que necesitas para navegar la
              ciudad: una hoodie indestructible, una playera gráfica y una gorra
              que oculte tu identidad.
            </p>
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div className="group hover:-translate-y-2 transition-transform duration-base">
                <h3 className="text-4xl font-bold text-cyan-400 mb-2 group-hover:text-white transition-colors">
                  01
                </h3>
                <p className="uppercase text-sm tracking-widest font-bold">
                  Heavyweight Cotton
                </p>
              </div>
              <div className="group hover:-translate-y-2 transition-transform duration-base delay-100">
                <h3 className="text-4xl font-bold text-purple-500 mb-2 group-hover:text-white transition-colors">
                  02
                </h3>
                <p className="uppercase text-sm tracking-widest font-bold">
                  Anti-Scan Visors
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] border border-white/20 p-2 group overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-slow z-20"></div>
            <img
              src="/images/manifiesto/about.jpg"
              alt="Modelo Hoodie"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-slower ease-out"
            />
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_1.5s_linear_infinite] pointer-events-none z-30 shadow-[0_0_10px_#22d3ee]"></div>
          </div>
        </div>
      </SectionWrapper>

      {/* --- SECCIÓN 5: LA COLECCIÓN (Staggered Cards) --- */}
      <SectionWrapper
        id="colección"
        className="py-24 bg-zinc-950"
      >
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-cyan-400 font-bold tracking-widest uppercase text-sm animate-pulse">
              Season 04 // Live Now
            </span>
            <h2 className="text-5xl font-display font-bold uppercase mt-2">
              Core_Essentials
            </h2>
          </div>
          <button
            onClick={toggleModal}
            className="hidden md:block text-sm border-b border-cyan-400 pb-1 uppercase hover:text-cyan-400 transition-colors"
          >
            Ver todo el catálogo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Cyber Hoodie V2',
              price: '$85',
              img: '/images/coleccion/coleccion (1).jpg',
            },
            {
              name: 'System_Failure Tee',
              price: '$45',
              img: '/images/coleccion/coleccion (2).jpg',
            },
            {
              name: 'Neural_Link Cap',
              price: '$35',
              img: '/images/coleccion/coleccion (3).jpg',
            },
          ].map((item: ProductItem, idx: number) => (
            <div
              key={idx}
              className="group relative overflow-hidden border border-white/10 bg-black hover:border-cyan-400/50 transition-colors duration-300"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="aspect-[3/4] overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-slower group-hover:scale-105 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-base">
                <div className="bg-black/80 backdrop-blur-md p-6 border border-cyan-500/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-base">
                  <Lock className="w-8 h-8 text-cyan-400 mb-2 mx-auto" />
                  <h3 className="text-xl font-bold uppercase mb-1">
                    {item.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4">Acceso Restringido</p>
                  <button
                    onClick={toggleModal}
                    className="bg-cyan-400 text-black px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white transition-colors duration-base w-full"
                  >
                    Desbloquear
                  </button>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-4 z-10 group-hover:translate-y-full transition-transform duration-base">
                <div className="flex justify-between items-end border-t border-white/20 pt-4">
                  <h3 className="text-xl font-bold uppercase">{item.name}</h3>
                  <span className="text-cyan-400 font-mono">{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* --- SECCIÓN 6: TECH SPECS (Floating Elements) --- */}
      <section
        id="tech"
        className="py-24 border-y border-white/10 overflow-hidden relative bg-neutral-900"
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-purple-500/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

              <img
                src="/images/tech/tech.jpg"
                alt="Tech Fabric"
                className="relative z-10 w-full rounded-lg shadow-[0_0_50px_rgba(34,211,238,0.2)] animate-float"
              />
            </div>

            <SectionWrapper className="order-1 md:order-2">
              <h2 className="text-5xl font-display font-bold uppercase mb-8">
                Materiales <span className="text-stroke-cyan">NEON-READY</span>
              </h2>
              <ul className="space-y-6">
                {[
                  {
                    title: 'Algodón Bio-Híbrido',
                    desc: '450 GSM. Pesado, estructurado y suave al tacto.',
                  },
                  {
                    title: 'Estampado Reactivo',
                    desc: 'Gráficos de alta densidad que no se agrietan con el tiempo.',
                  },
                  {
                    title: 'Ajuste Oversized',
                    desc: 'Corte diseñado para movimiento y capas tácticas.',
                  },
                ].map((feature: TechFeature, i: number) => (
                  <li
                    key={i}
                    className="flex items-start space-x-4 group p-4 border border-transparent hover:border-white/10 hover:bg-white/5 transition-all duration-300 rounded-lg"
                  >
                    <div className="mt-1 w-8 h-8 rounded-full border border-cyan-400 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                      <Zap size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold uppercase text-lg group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-sm">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN NUEVA 7: FIELD REPORTS (Lookbook) --- */}
      <SectionWrapper id="lookbook" className="py-24 bg-black border-b border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase">
              Field <span className="text-cyan-400">Reports</span>
            </h2>
            <div className="h-1 w-20 bg-cyan-400 mt-4"></div>
          </div>
          <p className="text-gray-300 font-mono text-sm mt-4 md:mt-0 animate-pulse">
            // UPLOADED FROM THE WASTELANDS_
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-2 h-auto md:h-[600px]">
          <div className="col-span-1 sm:col-span-2 md:col-span-2 md:row-span-2 aspect-square sm:aspect-[4/3] md:aspect-auto relative group overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-slow">
            <Image
              src="/images/lookbook/lookbook (1).jpg"
              alt="Look 1"
              fill
              className="object-cover transition-transform duration-slower group-hover:scale-105 grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
              <div className="border-l-2 border-cyan-400 pl-3">
                <span className="bg-black text-cyan-400 text-xs px-2 py-1 font-mono mb-1 inline-block">
                  LOC: SECTOR_7
                </span>
                <p className="text-white font-bold uppercase text-lg">
                  Night Ops Hoodie
                </p>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_1.5s_linear_infinite] pointer-events-none"></div>
          </div>

          <div className="col-span-1 sm:col-span-1 md:col-span-1 md:row-span-1 aspect-square relative group overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-slow">
            <Image
              src="/images/lookbook/lookbook (2).jpg"
              alt="Look 2"
              fill
              className="object-cover transition-transform duration-slower group-hover:scale-105 grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 backdrop-blur-sm">
              <Activity className="text-cyan-400" />
            </div>
          </div>

          <div className="col-span-1 sm:col-span-1 md:col-span-1 aspect-square relative group overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-base">
            <Image
              src="/images/lookbook/lookbook (3).jpg"
              alt="Look 3"
              fill
              className="object-cover transition-transform duration-slower group-hover:scale-105 grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
            />
            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-cyan-400 bg-black/80 px-2">
              IMG_8842.RAW
            </div>
          </div>

          <div className="col-span-1 sm:col-span-2 md:col-span-2 aspect-square sm:aspect-[4/3] md:aspect-auto relative group overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all duration-base">
            <Image
              src="/images/lookbook/lookbook (4).jpg"
              alt="Look 4"
              fill
              className="object-cover transition-transform duration-slower group-hover:scale-105 grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            />
            <div className="absolute top-4 right-4 border border-white/30 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-base">
              <div className="text-[10px] text-white font-mono leading-tight">
                TARGET: UNKNOWN
                <br />
                DIST: 40M
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* --- SECCIÓN NUEVA 8: ENCRYPTED TRANSMISSIONS (Testimonials) --- */}
      <SectionWrapper
        id="reviews"
        className="py-24 bg-zinc-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(34,211,238,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-center text-4xl font-display font-bold uppercase mb-16">
            Encrypted <span className="text-stroke text-white">Transmissions</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                user: 'KAI_ZEN',
                role: 'Netrunner',
                text: 'La Hoodie V2 sobrevivió a una rave de 12 horas en Neo-Seoul. El algodón pesa pero respira.',
                rating: 5,
              },
              {
                user: 'V0ID_WALKER',
                role: 'Urban Explorer',
                text: 'La gorra 5-Panel tiene el ajuste perfecto. Ideal para evitar cámaras de seguridad.',
                rating: 5,
              },
              {
                user: 'NEON_GHOST',
                role: 'Digital Artist',
                text: 'El print de la playera "Failure" no se ha desgastado después de 20 lavadas. Calidad sólida.',
                rating: 4,
              },
            ].map((review: Review, i: number) => {
              const reviewImages = [
                '/images/reviews/reviwes (1).jpg',
                '/images/reviews/reviwes (2).jpg',
                '/images/reviews/reviwes (3).jpg',
                '/images/reviews/reviwes (4).jpg',
              ];
              return (
              <div
                key={i}
                className="bg-black border border-white/10 p-8 hover:border-cyan-400/50 transition-all duration-base relative group hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                  <img
                    src={reviewImages[i] || '/images/reviews/reviwes (1).jpg'}
                    alt={review.user}
                    className="w-12 h-12 rounded-sm border border-cyan-500/30 object-cover group-hover:border-cyan-400 transition-colors duration-base"
                  />
                  <div>
                    <h4 className="font-bold text-white uppercase tracking-wider">
                      {review.user}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-[10px] text-gray-500 font-mono uppercase">
                        {review.role}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 font-mono text-sm leading-relaxed relative">
                  <span className="text-cyan-500/30 absolute -left-2 -top-2 text-2xl">
                    "
                  </span>
                  {review.text}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex text-cyan-400 gap-1">
                    {[...Array(review.rating)].map((_, r) => (
                      <Zap key={r} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-600 font-mono">
                    ID: #{reviewIds[i] || '????'}
                  </span>
                </div>

                <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-cyan-500 opacity-0 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 transition-all duration-base"></div>
                <div className="absolute bottom-0 left-0 w-0 h-0 border-b-2 border-l-2 border-cyan-500 opacity-0 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 transition-all duration-base"></div>
              </div>
            );
            })}
          </div>
        </div>
      </SectionWrapper>

      {/* --- SECCIÓN 9: SOCIAL (Grid Stagger) --- */}
      <SectionWrapper id="comunidad" className="py-20 text-center">
        <h2 className="text-4xl font-display font-bold uppercase mb-12">
          Global <span className="text-stroke text-white">Syndicate</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            '/images/social/social (1).jpg',
            '/images/social/social (2).jpg',
            '/images/social/social (3).jpg',
            '/images/social/social (4).jpg',
          ].map((img: string, i: number) => (
            <div
              key={i}
              className="relative group aspect-square overflow-hidden cursor-pointer border border-transparent hover:border-cyan-400 transition-all duration-base"
            >
              <img
                src={img}
                className="w-full h-full object-cover transition-transform duration-slow group-hover:scale-105 group-hover:rotate-2"
                alt={`Social ${i + 1}`}
              />
              <div className="absolute inset-0 bg-cyan-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <Instagram className="text-white w-10 h-10 animate-bounce" />
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* --- SECCIÓN 10: NEWSLETTER (Moving Grid Background) --- */}
      <section className="py-32 bg-black relative border-t border-cyan-900/30 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 animate-grid"
          style={{
            backgroundImage:
              'linear-gradient(rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

        <div className="container mx-auto px-4 text-center max-w-3xl relative z-10">
          <SectionWrapper>
            <h2 className="text-6xl md:text-8xl font-display font-bold uppercase mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-800 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Join The <br /> Resistance
            </h2>
            <p className="text-xl text-cyan-400 mb-10 font-mono">
              // Suscríbete para recibir drops exclusivos y coordenadas
              secretas.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-slow group-hover:duration-base"></div>
              <input
                type="email"
                placeholder="INGRESA TU CORREO"
                className="relative bg-black border border-white/20 text-white px-6 py-4 outline-none focus:border-cyan-400 w-full uppercase placeholder:text-gray-600 z-10"
              />
              <button className="relative bg-cyan-400 text-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-white hover:scale-105 transition-all duration-base whitespace-nowrap z-10 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                Suscribirse
              </button>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold italic mb-4">
              NEON CORE
            </h3>
            <p className="text-gray-500 text-sm">
              Ropa técnica para la era post-digital. Diseñado en 2088.
            </p>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-around">
            <div>
              <h4 className="font-bold uppercase mb-4 text-sm tracking-widest text-cyan-400">
                Shop
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                {['Novedades', 'Hombres', 'Mujeres', 'Accesorios'].map(
                  (item) => (
                    <li
                      key={item}
                      className="hover:text-cyan-400 hover:translate-x-2 transition-all duration-base cursor-pointer block"
                    >
                      <span className="inline-block opacity-0 -ml-2 group-hover:opacity-100 transition-opacity">
                        ›
                      </span>{' '}
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4 text-sm tracking-widest text-cyan-400">
                Legal
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                {['Términos', 'Privacidad', 'Envíos'].map((item) => (
                  <li
                    key={item}
                    className="hover:text-cyan-400 hover:translate-x-2 transition-all duration-base cursor-pointer block"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="font-bold uppercase mb-4 text-sm tracking-widest text-cyan-400">
              Social
            </h4>
            <div className="flex space-x-4">
              <button className="p-3 text-gray-300 hover:text-white transition-colors duration-base focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:rounded-sm" aria-label="Seguir en Instagram">
                <Instagram className="w-6 h-6" />
              </button>
              <button className="p-3 text-gray-300 hover:text-white transition-colors duration-base focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:rounded-sm" aria-label="Seguir en Twitter">
                <Twitter className="w-6 h-6" />
              </button>
              <button className="p-3 text-gray-300 hover:text-white transition-colors duration-base focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:rounded-sm" aria-label="Seguir en YouTube">
                <Youtube className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-700 text-xs font-mono uppercase border-t border-gray-900 pt-8">
          © 2024 Neon Core Systems. All rights reserved.
        </div>
      </footer>

      {/* --- MODAL POPUP (CRT & Scanline Animation) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={toggleModal}
            aria-hidden="true"
          ></div>
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            className="bg-black border border-cyan-400 p-6 sm:p-8 md:p-12 relative z-10 w-full max-w-[calc(100%-2rem)] sm:max-w-md md:max-w-lg shadow-[0_0_60px_rgba(34,211,238,0.4)] animate-modal-entry overflow-hidden"
            style={{ animation: 'modalEntry 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/30 animate-[scanline_3s_linear_infinite] pointer-events-none z-20"></div>

            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 text-gray-400 hover:text-white transition-all duration-base focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:rounded-sm"
              aria-label="Cerrar modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center relative z-30">
              <div className="inline-block p-4 rounded-full bg-cyan-900/20 text-cyan-400 mb-6 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Download size={32} />
              </div>
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase mb-4 text-center glitch-effect"
                data-text="Acceso Restringido"
              >
                Acceso Restringido
              </h2>
              <p id="modal-description" className="text-gray-300 mb-8 font-mono text-sm">
                &gt; DETECTED: UNAUTHORIZED USER
                <br />
                &gt; ACTION: SUBSCRIBE TO UNLOCK CATALOG_V4
              </p>

              <form
                className="space-y-4"
                onSubmit={handleFormSubmit}
              >
                <div>
                  <input
                    type="email"
                    placeholder="TU@EMAIL.COM"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    aria-invalid={formStatus === 'error' ? 'true' : 'false'}
                    aria-describedby={formError ? 'form-error' : undefined}
                    className={`w-full px-4 py-3 outline-none uppercase text-center transition-all duration-base border ${
                      formStatus === 'error'
                        ? 'border-red-500 bg-red-950/20 focus:border-red-400 focus:shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                        : formStatus === 'success'
                          ? 'border-green-500 bg-green-950/20 focus:border-green-400 focus:shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                          : 'bg-zinc-900 border-zinc-700 text-white focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                    }`}
                    disabled={formStatus === 'validating' || formStatus === 'success'}
                  />
                  {formError && (
                    <p id="form-error" className="text-red-400 text-xs mt-2">
                      {formError}
                    </p>
                  )}
                  {formStatus === 'success' && (
                    <p className="text-green-400 text-xs mt-2">
                      ¡Verificación completada! Revisa tu correo.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'validating' || formStatus === 'success'}
                  className={`group w-full font-bold uppercase py-4 tracking-widest transition-all duration-base flex items-center justify-center gap-2 relative overflow-hidden ${
                    formStatus === 'validating'
                      ? 'opacity-75 cursor-wait'
                      : formStatus === 'success'
                        ? 'bg-green-500 text-black hover:bg-green-600'
                        : 'bg-cyan-400 text-black hover:bg-white'
                  }`}
                >
                  <span className="relative z-10 flex items-center">
                    {formStatus === 'validating'
                      ? 'Procesando...'
                      : formStatus === 'success'
                        ? '✓ Confirmado'
                        : 'Unirse y Descargar'}
                    {formStatus !== 'validating' && formStatus !== 'success' && (
                      <ChevronRight
                        size={16}
                        className="ml-1 group-hover:translate-x-1 transition-transform duration-base"
                      />
                    )}
                  </span>
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-base ease-out z-0"></div>
                </button>
              </form>
              <p className="text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
                Encrypted Connection // Secure Protocol
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default NeonCore
