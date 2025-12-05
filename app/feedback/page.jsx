'use client'

import { Suspense } from 'react'
import FeedbackForm from '@/components/FeedbackForm'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const FeedbackPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-teal-50 via-white to-teal-50">
      <Header />
      <main className="grow">
        <Suspense fallback={<div className="py-16 text-center text-gray-600">Loading...</div>}>
          <FeedbackForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default FeedbackPage
