'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhotoGallery from '@/components/PhotoGallery'
import HeroSection from '@/components/HeroSection'
import InquiryForm from '@/components/InquiryForm'

export default function Home() {
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
    <div className="min-h-screen flex flex-col bg-linear-to-b from-teal-50 via-white to-teal-50">
      <Header />

      <main className="grow">
        {/* Hero Section */}
        <HeroSection />
        {/* Photo Gallery Section */}
        <PhotoGallery photos={galleryImages} />

        {/* Inquiry Form Section */}
        <InquiryForm />
      </main>

      <Footer />
    </div>
  )
}
