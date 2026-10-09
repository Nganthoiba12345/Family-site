import React from 'react'
import type { Metadata } from 'next'
import { getAllMedia } from '@/lib/payload'
import { GalleryView } from '@/components/GalleryView'
import { Camera } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Heritage Photo Gallery | Our Family Heritage',
  description: 'Explore the complete archive of family photographs across generations and celebrations.',
}

export const dynamic = 'force-dynamic'

export default async function GalleryPage() {
  const photos = await getAllMedia({ limit: 100 })

  return (
    <div className="py-12 md:py-20 bg-slate-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-cyan-600" />
            Photo Collection
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Family Photo Gallery
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            High-resolution visual memories chronicling weddings, gatherings, milestones, and childhood stories.
          </p>
        </div>

        <GalleryView photos={photos} />
      </div>
    </div>
  )
}
