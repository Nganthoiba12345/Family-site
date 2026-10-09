import type { Metadata } from 'next'
import '../globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Family Heritage | Across Generations',
  description: 'A living digital sanctuary preserving our family tree, historical photographs, and generational legacy.',
  openGraph: {
    title: 'Our Family Heritage | Across Generations',
    description: 'A living digital sanctuary preserving our family tree, historical photographs, and generational legacy.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-cyan-100 selection:text-blue-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
