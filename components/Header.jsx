'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`bg-teal-300/30 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
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

          {/* Right side - Instagram Link */}
          <a
            href="https://instagram.com/bakedbyann80"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-teal-400 transition-colors"
          >
            <Instagram className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
            <span
              className={`transition-all duration-300 ${
                isScrolled ? 'text-xs' : 'text-sm'
              }`}
            >
              @bakedbyann80
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
