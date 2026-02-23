'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close on scroll
  useEffect(() => {
    if (!isMenuOpen) return
    const handleScroll = () => setIsMenuOpen(false)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  // Close on tap/click outside the header
  useEffect(() => {
    if (!isMenuOpen) return
    const handleOutside = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    document.addEventListener('touchstart', handleOutside)
    return () => {
      document.removeEventListener('mousedown', handleOutside)
      document.removeEventListener('touchstart', handleOutside)
    }
  }, [isMenuOpen])

  return (
    <header
      ref={headerRef}
      className={`relative bg-teal-300/30 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center">
          {/* Left side - Logo + Text */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/BakedByAnnLogo.jpeg"
              alt="Baked by Ann"
              width={isScrolled ? 40 : 50}
              height={isScrolled ? 40 : 50}
              className="cursor-pointer group-hover:opacity-80 transition-all duration-300"
              priority
            />
            <h1
              className={`text-3xl font-bold text-gray-600 group-hover:text-teal-400 transition-all duration-300 overflow-hidden whitespace-nowrap font-[family-name:var(--font-handwritten)] ${
                isScrolled ? 'w-0 opacity-0' : 'w-auto opacity-100'
              }`}
            >
              Baked by Ann
            </h1>
          </Link>

          {/* Right side - Instagram + Burger */}
          <div className="flex items-center gap-3 ml-auto">
            <a
              href="https://instagram.com/bakedbyann80"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-teal-400 transition-colors"
            >
              <Instagram
                className={`transition-all duration-300 ${
                  isScrolled ? 'w-4 h-4' : 'w-5 h-5'
                }`}
              />
              <span
                className={`transition-all duration-300 ${
                  isScrolled ? 'text-xs' : 'text-sm'
                }`}
              >
                @bakedbyann80
              </span>
            </a>

            {/* Burger button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-teal-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Nav dropdown */}
      <div
        className={`absolute top-full left-0 right-0 bg-teal-300/30 backdrop-blur-sm px-4 py-3 border-t border-teal-200/40 shadow-sm transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className={`py-2 text-lg font-[family-name:var(--font-handwritten)] transition-colors ${
              pathname === '/'
                ? 'text-teal-500'
                : 'text-gray-600 hover:text-teal-400'
            }`}
          >
            Home
          </Link>
          <Link
            href="/workshops"
            onClick={() => setIsMenuOpen(false)}
            className={`py-2 text-lg font-[family-name:var(--font-handwritten)] transition-colors ${
              pathname === '/workshops'
                ? 'text-teal-500'
                : 'text-gray-600 hover:text-teal-400'
            }`}
          >
            Workshops
          </Link>
        </nav>
      </div>
    </header>
  )
}
