'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Heart, Calendar, Users, Cake } from 'lucide-react'

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weddingDate: '',
    guestCount: '',
    services: '',
    additionalDetails: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Wedding Inquiry Form Data:', formData)
    // TODO: Add backend submission
    alert('Thank you for your inquiry! We will get back to you soon.')
    // Reset form
    setFormData({
      name: '',
      email: '',
      weddingDate: '',
      guestCount: '',
      services: '',
      additionalDetails: '',
    })
  }

  const galleryImages = [
    { id: 1, src: '/images/wedding-1.jpg', alt: 'Wedding cake with flowers' },
    { id: 2, src: '/images/wedding-2.jpg', alt: 'Elegant tiered wedding cake' },
    { id: 3, src: '/images/wedding-3.jpg', alt: 'Wedding dessert table' },
    { id: 4, src: '/images/wedding-4.jpg', alt: 'Custom wedding cookies' },
    { id: 5, src: '/images/wedding-5.jpg', alt: 'Wedding cupcakes display' },
    {
      id: 6,
      src: '/images/wedding-6.jpg',
      alt: 'Romantic wedding cake design',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 via-white to-teal-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-teal-100 via-teal-50 to-teal-100">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Heart className="w-16 h-16 text-teal-300 fill-teal-100" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-800 mb-4">
              Let&#39;s Create Your Dream Wedding
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Every love story deserves a sweet celebration. Let us craft the
              perfect desserts to make your special day unforgettable.
            </p>
          </div>
        </section>

        {/* Photo Gallery Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
                Our Wedding Collection
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A glimpse of our handcrafted creations for couples&#39; special
                days
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="w-full h-full bg-gradient-to-br from-teal-200 via-teal-100 to-teal-50 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Cake className="w-16 h-16 text-teal-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">{image.alt}</p>
                      <p className="text-gray-400 text-xs mt-2">
                        Image placeholder
                      </p>
                    </div>
                  </div>
                  {/* Overlay effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Form Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-teal-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
                Start Your Sweet Journey
              </h2>
              <p className="text-gray-600">
                Tell us about your vision, and we&#39;ll bring it to life
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-teal-100"
            >
              {/* Name Field */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name <span className="text-teal-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address <span className="text-teal-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Wedding Date and Guest Count - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Wedding Date */}
                <div>
                  <label
                    htmlFor="weddingDate"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    <Calendar className="inline w-4 h-4 mr-1 text-teal-400" />
                    Wedding Date <span className="text-teal-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="weddingDate"
                    name="weddingDate"
                    value={formData.weddingDate}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none"
                  />
                </div>

                {/* Guest Count */}
                <div>
                  <label
                    htmlFor="guestCount"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    <Users className="inline w-4 h-4 mr-1 text-teal-400" />
                    Number of Guests <span className="text-teal-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none"
                    placeholder="e.g., 100"
                  />
                </div>
              </div>

              {/* Services Interested In */}
              <div className="mb-6">
                <label
                  htmlFor="services"
                  className="block text-gray-700 font-medium mb-2"
                >
                  What services are you interested in?{' '}
                  <span className="text-teal-500">*</span>
                </label>
                <textarea
                  id="services"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Wedding cake, cupcakes, dessert table, cookies, etc."
                ></textarea>
              </div>

              {/* Additional Details */}
              <div className="mb-8">
                <label
                  htmlFor="additionalDetails"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Additional Details or Special Requests{' '}
                  <span className="text-gray-400 text-sm">(Optional)</span>
                </label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Tell us about your theme, colors, dietary restrictions, or any special requests..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-teal-300 text-white font-semibold py-4 px-8 rounded-lg hover:bg-teal-400 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5 fill-white" />
                Submit Inquiry
              </button>

              <p className="text-center text-gray-500 text-sm mt-6">
                We typically respond within 24-48 hours
              </p>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
