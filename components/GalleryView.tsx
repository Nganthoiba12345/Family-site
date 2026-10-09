'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Camera, MapPin, Search } from 'lucide-react'

interface GalleryViewProps {
  photos: any[]
}

const CATEGORIES = [
  'All',
  'Family',
  'Wedding',
  'Childhood',
  'Birthday',
  'Festival',
  'Travel',
  'Old Memories',
  'Family Gathering',
  'Other',
]

export function GalleryView({ photos }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesCat =
        selectedCategory === 'All' || photo.category === selectedCategory

      const matchesSearch =
        photo.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.caption?.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCat && matchesSearch
    })
  }, [photos, selectedCategory, searchQuery])

  const getPhotoUrl = (photo: any) => {
    if (photo.url) return photo.url
    if (photo.filename) return `/uploads/${photo.filename}`
    return '/uploads/family-gathering.svg'
  }

  return (
    <div className="space-y-8">
      {/* Filters Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm glass-card space-y-5">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search photos by title, place, memory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-400 focus:bg-white transition-all"
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-blue-600">{filteredPhotos.length}</strong> of{' '}
            {photos.length} photos
          </span>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="text-blue-600 font-bold hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Photos */}
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <Link
              key={photo.id}
              href={`/photos/${photo.slug}`}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={getPhotoUrl(photo)}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-75 group-hover:opacity-90 transition-opacity" />

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
                  <div className="flex items-center gap-3 text-xs text-slate-200 mt-1">
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

              {photo.caption && (
                <div className="p-4 bg-white border-t border-slate-100 text-xs text-slate-600 line-clamp-2">
                  {photo.caption}
                </div>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <Camera className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700">No photographs found</h3>
          <p className="text-sm text-slate-500 mt-1">Try selecting another category or clearing search.</p>
        </div>
      )}
    </div>
  )
}
