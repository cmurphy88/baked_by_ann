import { Heart, Calendar, Users, Loader2, Check, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const InquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    socialMedia: '',
    weddingDate: '',
    guestCount: '',
    services: '',
    additionalDetails: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const timeoutRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send inquiry')
      }

      // Success
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        socialMedia: '',
        weddingDate: '',
        guestCount: '',
        services: '',
        additionalDetails: '',
      })

      // Auto-dismiss success message after 30 seconds
      timeoutRef.current = setTimeout(() => {
        setStatus('idle')
      }, 30000)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error.message || 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-teal-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
            Inquire About Your Wedding
          </h2>
          <p className="text-gray-600">
            Give us a few details about your special day, and we&#39;ll get back
            to you
          </p>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <div className="mb-6 bg-teal-50 border border-teal-300 rounded-lg p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-teal-800 font-medium">
                Thank you for your inquiry!
              </p>
              <p className="text-teal-700 text-sm mt-1">
                We&#39;ve received your wedding inquiry and will get back to you
                soon.
              </p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="text-teal-500 hover:text-teal-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Error Message */}
        {status === 'error' && (
          <div className="mb-6 bg-red-50 border border-red-300 rounded-lg p-4 flex items-start gap-3">
            <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-red-800 font-medium">
                Oops! Something went wrong
              </p>
              <p className="text-red-700 text-sm mt-1">{errorMessage}</p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

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
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Social Media Field */}
          <div className="mb-6">
            <label
              htmlFor="socialMedia"
              className="block text-gray-700 font-medium mb-2"
            >
              Instagram or Facebook <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <input
              type="text"
              id="socialMedia"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="@yourusername or profile link"
            />
            <p className="text-gray-500 text-xs mt-2">
              Share your Instagram or Facebook username or profile link
            </p>
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
                disabled={status === 'loading'}
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={status === 'loading'}
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
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
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Tell us about your theme, colors, dietary restrictions, or any special requests..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-teal-300 text-white font-semibold py-4 px-8 rounded-lg hover:bg-teal-400 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Heart className="w-5 h-5 fill-white" />
                Submit Inquiry
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            We typically respond within 24-48 hours
          </p>
        </form>
      </div>
    </section>
  )
}

export default InquiryForm
