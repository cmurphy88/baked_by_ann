import { Heart } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-teal-100 via-teal-50 to-teal-100">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Heart className="w-16 h-16 text-teal-300 fill-teal-100" />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-4">
          Wedding Inquiries
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Celebrate your special day with a bespoke wedding cake.
        </p>
      </div>
    </section>
  )
}

export default HeroSection
