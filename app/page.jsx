'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhotoGallery from '@/components/PhotoGallery'
import HeroSection from '@/components/HeroSection'
import EnquiryForm from '@/components/EnquiryForm'

export default function Home() {
  const galleryImages = [
    { id: 1, src: '/images/0FDF35C6.png', alt: 'Wedding cake creation' },
    { id: 2, src: '/images/IMG_1517.png', alt: 'Elegant wedding cake' },
    { id: 3, src: '/images/IMG_2041.png', alt: 'Beautiful cake design' },
    { id: 4, src: '/images/IMG_6125.png', alt: 'Custom wedding cake' },
    { id: 5, src: '/images/IMG_6580.png', alt: 'Wedding cake display' },
    { id: 6, src: '/images/IMG_7957.png', alt: 'Romantic cake design' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-teal-50 via-white to-teal-50">
      <Header />

      <main className="grow">
        {/* Hero Section */}
        <HeroSection />
        {/* Photo Gallery Section */}
        <PhotoGallery photos={galleryImages} />
        {/* Enquiry Form Section */}
        <EnquiryForm />
      </main>

      <Footer />
    </div>
  )
}
