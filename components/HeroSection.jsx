import { Heart } from 'lucide-react'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/IMG_2041.webp"
          alt=""
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-teal-50/50" />
        {/* Bottom fade to white */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600 mb-4">
          Wedding Enquiries
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Celebrate your special day with a Baked By Ann wedding cake.
        </p>
      </div>
    </section>
  )
}

export default HeroSection
