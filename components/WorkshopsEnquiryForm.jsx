'use client'

import { Cake, Calendar, Users, Loader2, Check, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const WorkshopsEnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workshopType: '',
    location: '',
    preferredDate: '',
    groupSize: '',
    additionalDetails: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const timeoutRef = useRef(null)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const { name, email, workshopType, location, preferredDate, groupSize } = formData

    if (!name || !email || !workshopType || !location || !preferredDate || !groupSize) {
      setStatus('error')
      setErrorMessage('Please fill in all required fields.')
      return
    }

    try {
      const response = await fetch('/api/workshops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send enquiry')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        workshopType: '',
        location: '',
        preferredDate: '',
        groupSize: '',
        additionalDetails: '',
      })

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
            Book a Workshop
          </h2>
          <p className="text-gray-600">
            Tell us about your group and what you have in mind — we&apos;ll get
            back to you to confirm availability.
          </p>
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
                We&apos;ve received your workshop enquiry and will get back to
                you soon.
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

          {/* Phone Field */}
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              Phone Number{' '}
              <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="e.g., 07700 900000"
            />
          </div>

          {/* Workshop Type Field */}
          <div className="mb-6">
            <label
              htmlFor="workshopType"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              Workshop Type <span className="text-teal-500">*</span>
            </label>
            <select
              id="workshopType"
              name="workshopType"
              value={formData.workshopType}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans bg-white"
            >
              <option value="" disabled>
                Select a workshop type
              </option>
              <option value="Cupcake & Cake Decorating">
                Cupcake &amp; Cake Decorating
              </option>
              <option value="Baby Shower">Baby Shower</option>
              <option value="Hen Party">Hen Party</option>
              <option value="Team Building">Team Building</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Location Field */}
          <div className="mb-6">
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              Location <span className="text-teal-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="Where would you like the workshop to be held?"
            />
          </div>

          {/* Preferred Date and Group Size - Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Preferred Date */}
            <div>
              <label
                htmlFor="preferredDate"
                className="block text-gray-700 font-medium mb-2 font-sans"
              >
                <Calendar className="inline w-4 h-4 mr-1 text-teal-400" />
                Preferred Date <span className="text-teal-500">*</span>
              </label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              />
            </div>

            {/* Group Size */}
            <div>
              <label
                htmlFor="groupSize"
                className="block text-gray-700 font-medium mb-2 font-sans"
              >
                <Users className="inline w-4 h-4 mr-1 text-teal-400" />
                Group Size <span className="text-teal-500">*</span>
              </label>
              <input
                type="number"
                id="groupSize"
                name="groupSize"
                value={formData.groupSize}
                onChange={handleChange}
                required
                min="1"
                disabled={status === 'loading'}
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                placeholder="e.g., 10"
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-8">
            <label
              htmlFor="additionalDetails"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              Additional Details{' '}
              <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              rows="4"
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="Tell us about your occasion, any theme you have in mind, or anything else we should know..."
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
                <Cake className="w-5 h-5" />
                Send Enquiry
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            We typically respond within 24–48 hours
          </p>
        </form>
      </div>
    </section>
  )
}

export default WorkshopsEnquiryForm
