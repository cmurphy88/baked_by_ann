import Image from 'next/image'

const PhotoGallery = ({ photos }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600 mb-4">
            Inspiration
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A glimpse of our handcrafted creations for couples&#39; special days
          </p>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-4 sm:px-6 lg:px-8 scrollbar-hide">
          {/* Left padding spacer for centering on larger screens */}
          <div className="shrink-0 w-0 lg:w-[calc((100vw-72rem)/2)]" />

          {photos.map((image) => (
            <div
              key={image.id}
              className="relative shrink-0 h-72 sm:h-80 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group snap-center"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={0}
                height={320}
                sizes="100vw"
                className="h-full w-auto"
              />
              {/* Overlay effect on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}

          {/* Right padding spacer */}
          <div className="shrink-0 w-0 lg:w-[calc((100vw-72rem)/2)]" />
        </div>
      </div>

      {/* Scroll hint */}
      <p className="text-center text-gray-400 text-sm mt-4">
        Swipe to see more →
      </p>
    </section>
  )
}

export default PhotoGallery
