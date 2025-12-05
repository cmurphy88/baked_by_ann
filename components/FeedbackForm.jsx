'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Star,
  MessageSquare,
  Loader2,
  Check,
  X,
  Calendar,
  ThumbsUp,
} from 'lucide-react'

// StarRating Sub-component
const StarRating = ({ value, onChange, label, required, disabled }) => {
  const [hover, setHover] = useState(0)

  const handleKeyDown = (e, star) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onChange(star)
    }
    if (e.key === 'ArrowLeft' && star > 1) {
      e.preventDefault()
      onChange(star - 1)
    }
    if (e.key === 'ArrowRight' && star < 5) {
      e.preventDefault()
      onChange(star + 1)
    }
  }

  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2 font-sans">
        {label} {required && <span className="text-teal-500">*</span>}
      </label>
      <div className="flex items-center gap-2">
        <div className="flex gap-1" role="radiogroup" aria-label={label}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-8 h-8 cursor-pointer transition-all ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                star <= (hover || value)
                  ? 'fill-amber-400 stroke-amber-500'
                  : 'fill-none stroke-teal-300'
              } ${
                hover >= star && star > value
                  ? 'fill-amber-300 stroke-amber-400'
                  : ''
              }`}
              onClick={() => !disabled && onChange(star)}
              onMouseEnter={() => !disabled && setHover(star)}
              onMouseLeave={() => setHover(0)}
              onKeyDown={(e) => !disabled && handleKeyDown(e, star)}
              tabIndex={disabled ? -1 : 0}
              aria-label={`${star} star${star > 1 ? 's' : ''}`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 font-sans">
          {value > 0 ? `${value}/5` : 'Not rated'}
        </span>
      </div>
    </div>
  )
}

// Main FeedbackForm Component
const FeedbackForm = () => {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    classDate: '',
    overallSatisfaction: 0,
    recommendationLikelihood: 0,
    enjoyedMost: '',
    improvements: '',
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')
  const [isDateFromURL, setIsDateFromURL] = useState(false)
  const timeoutRef = useRef(null)
  const successMessageRef = useRef(null)

  // Parse URL parameters on mount
  useEffect(() => {
    const dateParam = searchParams.get('date')

    if (dateParam) {
      // Validate date format YYYY-MM-DD
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/
      if (dateRegex.test(dateParam)) {
        const parsedDate = new Date(dateParam)
        if (!isNaN(parsedDate.getTime())) {
          setFormData((prev) => ({ ...prev, classDate: dateParam }))
          setIsDateFromURL(true)
          return
        }
      }
    }

    // No valid date in URL - user will need to select
    setIsDateFromURL(false)
  }, [searchParams])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // Scroll to success message when it appears
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

  const handleStarChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    // Validation
    if (!formData.classDate) {
      setStatus('error')
      setErrorMessage('Please select a class date')
      return
    }

    if (formData.overallSatisfaction === 0) {
      setStatus('error')
      setErrorMessage('Please rate your overall satisfaction')
      return
    }

    if (formData.recommendationLikelihood === 0) {
      setStatus('error')
      setErrorMessage('Please rate how likely you are to recommend this class')
      return
    }

    if (formData.enjoyedMost.trim().length < 10) {
      setStatus('error')
      setErrorMessage(
        'Please provide more detail about what you enjoyed (at least 10 characters)'
      )
      return
    }

    if (formData.improvements.trim().length < 10) {
      setStatus('error')
      setErrorMessage(
        'Please provide more detail about improvements (at least 10 characters)'
      )
      return
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit feedback')
      }

      // Success
      setStatus('success')
      setFormData({
        classDate: isDateFromURL ? formData.classDate : '',
        overallSatisfaction: 0,
        recommendationLikelihood: 0,
        enjoyedMost: '',
        improvements: '',
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

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white to-teal-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
            Class Feedback
          </h2>
          <p className="text-gray-600">
            We&#39;d love to hear about your experience
          </p>
        </div>

        {/* Date Display/Input Section */}
        {isDateFromURL && formData.classDate && (
          <div className="mb-6 bg-teal-50 border border-teal-300 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-500" />
              <p className="text-gray-700 font-medium font-sans">
                Feedback for class on {formatDateForDisplay(formData.classDate)}
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {status === 'success' && (
          <div
            ref={successMessageRef}
            className="mb-6 bg-teal-50 border border-teal-300 rounded-lg p-4 flex items-start gap-3"
          >
            <Check className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-teal-800 font-medium">
                Thank you for your feedback!
              </p>
              <p className="text-teal-700 text-sm mt-1">
                Your feedback has been submitted successfully. We appreciate you
                taking the time to share your thoughts!
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
          {/* Date Field (if not from URL) */}
          {!isDateFromURL && (
            <div className="mb-6">
              <label
                htmlFor="classDate"
                className="block text-gray-700 font-medium mb-2 font-sans"
              >
                <Calendar className="inline w-4 h-4 mr-1 text-teal-400" />
                Class Date <span className="text-teal-500">*</span>
              </label>
              <input
                type="date"
                id="classDate"
                name="classDate"
                value={formData.classDate}
                onChange={handleChange}
                required
                disabled={status === 'loading'}
                className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              />
            </div>
          )}

          {/* Overall Satisfaction Star Rating */}
          <StarRating
            value={formData.overallSatisfaction}
            onChange={(value) => handleStarChange('overallSatisfaction', value)}
            label="Overall, how satisfied were you with the class?"
            required
            disabled={status === 'loading'}
          />

          {/* Recommendation Likelihood Star Rating */}
          <StarRating
            value={formData.recommendationLikelihood}
            onChange={(value) =>
              handleStarChange('recommendationLikelihood', value)
            }
            label="How likely are you to recommend this class to someone else?"
            required
            disabled={status === 'loading'}
          />

          {/* What did you enjoy most */}
          <div className="mb-6">
            <label
              htmlFor="enjoyedMost"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              <ThumbsUp className="inline w-4 h-4 mr-1 text-teal-400" />
              What did you enjoy most about the class?{' '}
              <span className="text-teal-500">*</span>
            </label>
            <textarea
              id="enjoyedMost"
              name="enjoyedMost"
              value={formData.enjoyedMost}
              onChange={handleChange}
              required
              rows="4"
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="Tell us what you enjoyed..."
            ></textarea>
          </div>

          {/* What could be improved */}
          <div className="mb-8">
            <label
              htmlFor="improvements"
              className="block text-gray-700 font-medium mb-2 font-sans"
            >
              <MessageSquare className="inline w-4 h-4 mr-1 text-teal-400" />
              What could be improved for future classes?{' '}
              <span className="text-teal-500">*</span>
            </label>
            <textarea
              id="improvements"
              name="improvements"
              value={formData.improvements}
              onChange={handleChange}
              required
              rows="4"
              disabled={status === 'loading'}
              className="w-full px-4 py-3 border border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed font-sans"
              placeholder="Your suggestions help us improve..."
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
                <MessageSquare className="w-5 h-5" />
                Submit Feedback
              </>
            )}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6 font-sans">
            Your feedback is completely anonymous
          </p>
        </form>
      </div>
    </section>
  )
}

export default FeedbackForm
