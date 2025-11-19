'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PhotoGallery from '@/components/PhotoGallery'
import HeroSection from '@/components/HeroSection'
import EnquiryForm from '@/components/EnquiryForm'
import ReviewCards from '@/components/ReviewCards'

export default function Home() {
  const galleryImages = [
    { id: 1, src: '/images/1000017634.webp', alt: 'Wedding cake design' },
    { id: 2, src: '/images/0FDF35C6.webp', alt: 'Wedding cake creation' },
    {
      id: 3,
      src: '/images/746A84EB-A58B-416B-A0B3-B363B34FCF1B.webp',
      alt: 'Custom cake',
    },
    { id: 4, src: '/images/IMG_8767.webp', alt: 'Wedding cake creation' },
    { id: 5, src: '/images/IMG_0277.webp', alt: 'Wedding cake display' },
    { id: 6, src: '/images/IMG_0877.webp', alt: 'Elegant cake design' },
    { id: 7, src: '/images/IMG_1517.webp', alt: 'Elegant wedding cake' },
    { id: 8, src: '/images/IMG_2041.webp', alt: 'Beautiful cake design' },
    { id: 9, src: '/images/IMG_2171.webp', alt: 'Wedding cake creation' },
    { id: 10, src: '/images/IMG_5389.webp', alt: 'Custom wedding cake' },
    { id: 11, src: '/images/IMG_5544.webp', alt: 'Cake decoration' },
    { id: 12, src: '/images/IMG_6117.webp', alt: 'Wedding cake display' },
    { id: 13, src: '/images/IMG_6125.webp', alt: 'Custom wedding cake' },
    { id: 14, src: '/images/IMG_6580.webp', alt: 'Wedding cake display' },
    { id: 15, src: '/images/IMG_7957.webp', alt: 'Romantic cake design' },
  ]

  const reviews = [
    {
      id: 1,
      name: 'Jane',
      content: 'Amazing cakes and excellent service. Highly recommend!',
    },
    {
      id: 2,
      name: 'Sarah',
      content: 'We loved our cake, looked lovely in the photos.',
    },
    {
      id: 3,
      name: 'Emily',
      content: 'Delicious cakes that everyone loved. Thank you, Ann!',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-teal-50 via-white to-teal-50">
      <Header />

      <main className="grow">
        <HeroSection />
        <PhotoGallery photos={galleryImages} />
        <ReviewCards reviews={reviews} />
        <EnquiryForm />
      </main>

      <Footer />
    </div>
  )
}
