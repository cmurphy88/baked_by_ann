import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b-2 border-teal-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Left side - Logo + Text */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/BakedByAnnLogo.jpeg"
              alt="Baked by Ann"
              width={50}
              height={50}
              className="cursor-pointer group-hover:opacity-80 transition-opacity"
              priority
            />
            <h1 className="text-2xl font-semibold text-gray-800 group-hover:text-teal-400 transition-colors tracking-tight">
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
            <Instagram className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">@bakedbyann80</span>
          </a>
        </div>
      </div>
    </header>
  )
}
