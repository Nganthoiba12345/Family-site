import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Camera, MapPin, Sparkles } from 'lucide-react'

interface FeaturedPhotosProps {
  photos: any[]
}

export function FeaturedPhotos({ photos }: FeaturedPhotosProps) {
  if (!photos || photos.length === 0) return null

  const getImageUrl = (item: any) => {
    if (item.url) return item.url
    if (item.filename) return `/uploads/${item.filename}`
    return '/uploads/family-gathering.svg'
  }

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
              <Camera className="w-3.5 h-3.5 text-cyan-600" />
              Visual Archives
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Featured Family Photographs
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg">
              Moments frozen in time. Click any photo to view its complete story and historical details.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white border border-blue-200 transition-all self-start md:self-auto shrink-0"
          >
            <span>View All Gallery Photos</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.slice(0, 6).map((photo) => (
            <Link
              key={photo.id}
              href={`/photos/${photo.slug}`}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={getImageUrl(photo)}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                {/* Neon subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-blue-800 border border-blue-200 shadow-md backdrop-blur-md">
                    {photo.category || 'Family'}
                  </span>
                </div>

                {/* Overlaid Title and Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">
                    {photo.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-200 mt-1">
                    {photo.dateTaken && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {photo.dateTaken}
                      </span>
                    )}
                    {photo.location && (
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                        {photo.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Snippet */}
              {photo.caption && (
                <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 line-clamp-2">
                  {photo.caption}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
