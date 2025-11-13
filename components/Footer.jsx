export default function Footer() {
  return (
    <footer className="bg-white shadow mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Baked by Ann. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
