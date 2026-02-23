import './globals.css'
import { Dancing_Script } from 'next/font/google'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-handwritten',
})

export const metadata = {
  title: 'Baked by Ann',
  description: 'Created with Next.js',
  icons: {
    icon: '/BakedByAnnLogo.jpeg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={dancingScript.variable}>
      <body className="min-h-screen bg-gray-50 text-gray-600 font-[family-name:var(--font-handwritten)]">
        {children}
      </body>
    </html>
  )
}
