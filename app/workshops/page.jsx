import Image from 'next/image'
import { Cake, Heart, Users, Sparkles, Check } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import WorkshopsEnquiryForm from '@/components/WorkshopsEnquiryForm'
import { workshopTypes } from '@/data/data'

const iconMap = {
  Cake: Cake,
  Heart: Heart,
  Users: Users,
  Sparkles: Sparkles,
}

export default function WorkshopsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-teal-50 via-white to-teal-50">
      <Header />
      <main className="grow">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/IMG_5544.webp"
              alt="Cake decoration workshop"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-teal-50/50" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-white" />
          </div>
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-600 mb-4">
              Workshops
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Hands-on decorating experience. Perfect for celebrations, team
              days, and anyone who loves a little creativity.
            </p>
          </div>
        </section>

        {/* Workshop Type Cards */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
                What We Offer
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workshopTypes.map((workshop) => {
                const Icon = iconMap[workshop.icon] || Cake
                return (
                  <div
                    key={workshop.id}
                    className="bg-white rounded-2xl shadow-xl border border-teal-100 p-8"
                  >
                    {/* Icon Badge */}
                    <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-teal-400" />
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-bold text-gray-700 mb-1">
                      {workshop.title}
                    </h3>
                    <p className="text-teal-500 text-sm font-medium mb-3">
                      {workshop.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 font-sans">
                      {workshop.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-6">
                      {workshop.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                          <span className="text-gray-600 text-sm font-sans">
                            {highlight}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Suitable For */}
                    <div className="border-t border-teal-100 pt-4">
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                        Suitable for
                      </span>
                      <p className="text-gray-600 text-sm mt-1">
                        {workshop.suitable}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Venue Callout */}
        <div className="bg-teal-50 border-y border-teal-100 py-10 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl md:text-2xl font-bold text-gray-700">
            You provide the venue — we provide the rest
            <span className="text-teal-400 align-super text-sm font-normal ml-0.5">
              *
            </span>
          </p>
          <p className="text-sm text-gray-500 font-sans mt-3">
            * We can check suitability of your venue before you book.
          </p>
        </div>

        {/* How It Works */}
        <section className="bg-linear-to-b from-white to-teal-50 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
                What to Expect
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: 1,
                  title: 'Get in Touch',
                  description:
                    "Send an enquiry with your workshop type, date, and group size. We'll confirm availability.",
                },
                {
                  step: 2,
                  title: 'Book Your Date',
                  description:
                    "A deposit secures your booking. We'll tailor the session to your group and occasion.",
                },
                {
                  step: 3,
                  title: 'Decorate & Enjoy',
                  description:
                    'Arrive, tie on your apron, and get creative. Everything is provided — you take home the results.',
                },
              ].map(({ step, title, description }) => (
                <div
                  key={step}
                  className="bg-white rounded-2xl shadow-sm border border-teal-100 p-6 text-center"
                >
                  <div className="w-10 h-10 bg-teal-300 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                    {step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-700 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry Form */}
        <WorkshopsEnquiryForm />
      </main>
      <Footer />
    </div>
  )
}
