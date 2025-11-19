'use client'

import { useEffect, useState } from 'react'
import { Quote } from 'lucide-react'

const ReviewCards = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
        setFade(true)
      }, 300)
    }, 8000)

    return () => clearInterval(interval)
  }, [reviews.length])

  if (!reviews || reviews.length === 0) return null

  const currentReview = reviews[currentIndex]

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-teal-50">
      {/* Bottom fade to white */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
            What Our Customers Say
          </h2>
        </div>

        <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-teal-100">
          {/* Quote Icon */}
          <div className="absolute top-6 left-6 opacity-10">
            <Quote className="w-16 h-16 text-teal-300" />
          </div>

          {/* Review Content */}
          <div
            className={`relative transition-opacity duration-300 min-h-32 flex flex-col justify-center ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-xl md:text-2xl text-gray-600 mb-6 italic text-center">
              &ldquo;{currentReview.content}&rdquo;
            </p>
            <p className="text-teal-400 font-semibold text-center">
              — {currentReview.name}
            </p>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setFade(false)
                  setTimeout(() => {
                    setCurrentIndex(index)
                    setFade(true)
                  }, 300)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-teal-400 w-8'
                    : 'bg-teal-200 hover:bg-teal-300'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReviewCards
