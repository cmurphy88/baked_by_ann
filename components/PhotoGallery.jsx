import { Cake } from 'lucide-react'

const PhotoGallery = ({ photos }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
            Inspiration
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A glimpse of our handcrafted creations for couples&#39; special days
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-full h-full bg-linear-to-br from-teal-200 via-teal-100 to-teal-50 flex items-center justify-center">
                <div className="text-center p-8">
                  <Cake className="w-16 h-16 text-teal-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">{image.alt}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    Image placeholder
                  </p>
                </div>
              </div>
              {/* Overlay effect on hover */}
              <div className="absolute inset-0 bg-linear-to-t from-teal-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PhotoGallery
