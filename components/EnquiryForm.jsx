import {
  Heart,
  Calendar,
  Users,
  Loader2,
  Check,
  X,
  Upload,
  ChevronDown,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { flavours } from '@/data/data'

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    socialMedia: '',
    venue: '',
    weddingDate: '',
    guestCount: '',
    budget: '',
    additionalDetails: '',
  })
  const [inspirationImages, setInspirationImages] = useState([])
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [isFlavoursOpen, setIsFlavoursOpen] = useState(false)
  const timeoutRef = useRef(null)
  const fileInputRef = useRef(null)
  const successMessageRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (status === 'success' && successMessageRef.current) {
      successMessageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [status])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const maxFiles = 3
    const maxSize = 5 * 1024 * 1024 // 5MB

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith('image/')) {
        return false
      }
      if (file.size > maxSize) {
        return false
      }
      return true
    })

    const remainingSlots = maxFiles - inspirationImages.length
    const filesToAdd = validFiles.slice(0, remainingSlots)

    filesToAdd.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setInspirationImages((prev) => [
          ...prev,
          {
            file,
            preview: e.target.result,
            name: file.name,
          },
        ])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index) => {
    setInspirationImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      // Prepare images as base64
      const images = inspirationImages.map((img) => ({
        data: img.preview,
        name: img.name,
      }))

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, inspirationImages: images }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send enquiry')
      }

      // Success
      setStatus('success')
      setFormData({
        name: '',
        email: '',
        socialMedia: '',
        venue: '',
        weddingDate: '',
        guestCount: '',
        budget: '',
        additionalDetails: '',
      })
      setInspirationImages([])

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
            Enquire About Your Wedding
          </h2>
          <p className="text-gray-600">
            Give us a few details about your special day, and we&#39;ll get back
            to you
          </p>
        </div>

        {/* Available Flavours Dropdown */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setIsFlavoursOpen(!isFlavoursOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors"
          >
            <span className="text-gray-600 font-medium font-sans">
              Available Flavours
            </span>
            <ChevronDown
              className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                isFlavoursOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isFlavoursOpen ? 'max-h-[800px] mt-3' : 'max-h-0'
            }`}
          >
            <div className="bg-white border border-teal-200 rounded-lg p-4 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                {flavours.map((flavour, index) => (
                  <div key={index}>• {flavour}</div>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-4">
                Just for reference, you don&#39;t need to decide today
              </p>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <div
            ref={successMessageRef}
            className="mb-6 bg-teal-50 border border-teal-300 rounded-lg p-4 flex items-start gap-3"
          >
            <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-teal-800 font-medium">
                Thank you for your enquiry!
              </p>
              <p className="text-teal-700 text-sm mt-1">
                We&#39;ve received your wedding enquiry and will get back to you
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
              className="block text-gray-700 font-medium mb-2 font-sans"
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
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2 font-sans"
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
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="your.email@example.com"
            />
          </div>

          {/* Social Media Field */}
          <div className="mb-6">
            <label
              htmlFor="socialMedia"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              Instagram or Facebook{' '}
              <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <input
              type="text"
              id="socialMedia"
              name="socialMedia"
              value={formData.socialMedia}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="@yourusername or profile link"
            />
            <p className="text-gray-500 text-xs mt-2 font-sans">
              Share your Instagram or Facebook username or profile link
            </p>
          </div>

          {/* Venue Field */}
          <div className="mb-6">
            <label
              htmlFor="venue"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              Venue <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="Enter your wedding venue"
            />
          </div>

          {/* Wedding Date and Guest Count - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Wedding Date */}
            <div>
              <label
                htmlFor="weddingDate"
                className="block text-gray-700 font-medium mb-2 font-sans"
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
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              />
            </div>

            {/* Guest Count */}
            <div>
              <label
                htmlFor="guestCount"
                className="block text-gray-700 font-medium mb-2 font-sans"
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
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                placeholder="e.g., 100"
              />
            </div>
          </div>

          {/* Budget Estimate */}
          <div className="mb-6">
            <label
              htmlFor="budget"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              Budget Estimate <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="e.g., £200 - £400"
            />
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <label
              htmlFor="additionalDetails"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              Additional Details or Special Requests{' '}
              <span className="text-teal-500">*</span>
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              required
              rows="4"
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="Tell us about your theme, colours, any special requests or how many tiers you'd like..."
            ></textarea>
          </div>

          {/* Inspiration Images */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2 font-sans">
              Inspiration Images{' '}
              <span className="text-gray-400 text-sm">(Optional, max 3)</span>
            </label>
            <p className="text-gray-500 text-xs mb-3 font-sans">
              Upload up to 3 images to show us your vision (max 5MB each)
            </p>

            {/* Image Previews */}
            {inspirationImages.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-3">
                {inspirationImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img.preview}
                      alt={`Inspiration ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-lg border border-teal-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      disabled={status === 'loading'}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Button */}
            {inspirationImages.length < 3 && (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  disabled={status === 'loading'}
                  className="hidden"
                  id="inspiration-upload"
                />
                <label
                  htmlFor="inspiration-upload"
                  className={`inline-flex items-center gap-2 px-4 py-2 border border-teal-200 rounded-lg cursor-pointer hover:bg-teal-50 transition-colors font-sans text-sm ${
                    status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <Upload className="w-4 h-4 text-teal-400" />
                  <span className="text-gray-600">
                    {inspirationImages.length === 0
                      ? 'Upload Images'
                      : 'Add More'}
                  </span>
                </label>
              </div>
            )}
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
                Submit Enquiry
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

export default EnquiryForm
