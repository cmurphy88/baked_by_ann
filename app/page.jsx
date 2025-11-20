'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhotoGallery from '@/components/PhotoGallery'
import HeroSection from '@/components/HeroSection'
import EnquiryForm from '@/components/EnquiryForm'
import ReviewCards from '@/components/ReviewCards'
import FAQSection from '@/components/FAQSection'
import { faqs, reviews, galleryImages } from '@/data/data'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-teal-50 via-white to-teal-50">
      <Header />

      <main className="grow">
        <HeroSection />
        <PhotoGallery photos={galleryImages} />
        <ReviewCards reviews={reviews} />
        <FAQSection faqs={faqs} />
        <EnquiryForm />
      </main>

      <Footer />
    </div>
  )
}
