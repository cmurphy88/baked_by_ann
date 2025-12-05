'use client'

import FeedbackForm from '@/components/FeedbackForm'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const FeedbackPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-teal-50 via-white to-teal-50">
      <Header />
      <main className="grow">
        <FeedbackForm />
      </main>
      <Footer />
    </div>
  )
}

export default FeedbackPage
