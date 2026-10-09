import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllMemories } from '@/lib/payload'
import { BookOpen, Calendar, MapPin, Users, Camera } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Memories & Stories | Our Family Heritage',
  description: 'Chronicles, historic gatherings, and heartfelt milestones across our family lineage.',
}

export const dynamic = 'force-dynamic'

export default async function MemoriesPage() {
  const memories = await getAllMemories()

  const getPhotoUrl = (photo: any) => {
    if (!photo) return '/uploads/family-gathering.svg'
    if (photo.url) return photo.url
    if (photo.filename) return `/uploads/${photo.filename}`
    return '/uploads/family-gathering.svg'
  }

  return (
    <div className="py-12 md:py-20 bg-slate-50/40 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
            Oral Histories & Milestones
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Family Memories & Chronicles
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Every generation has stories to tell. Explore the gatherings, festivals, and unforgettable milestones that shape who we are today.
          </p>
        </div>

        {/* Stories Flow */}
        <div className="space-y-12">
          {memories.map((mem: any, index: number) => {
            const hasPhotos = Array.isArray(mem.photos) && mem.photos.length > 0
            const leadPhoto = hasPhotos ? mem.photos[0] : null

            return (
              <article
                key={mem.id || index}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl hover:border-cyan-300 transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-0"
              >
                {/* Photo Side */}
                {leadPhoto && (
                  <div className="md:col-span-5 relative aspect-16/10 md:aspect-auto min-h-[260px] bg-slate-100 overflow-hidden">
                    <Image
                      src={getPhotoUrl(leadPhoto)}
                      alt={mem.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    {mem.date && (
                      <div className="absolute top-4 left-4 bg-white/95 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 shadow-md backdrop-blur-md flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                        <span>{mem.date}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Content Side */}
                <div className={`${leadPhoto ? 'md:col-span-7' : 'md:col-span-12'} p-6 sm:p-10 flex flex-col justify-between space-y-6`}>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      {!leadPhoto && mem.date && (
                        <span className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                          {mem.date}
                        </span>
                      )}
                      {mem.location && (
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                          <span>{mem.location}</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                      {mem.title}
                    </h2>

                    <div className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                      {mem.description}
                    </div>
                  </div>

                  {/* People Tagged */}
                  {Array.isArray(mem.people) && mem.people.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mb-2">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>Family Members Involved:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {mem.people.map((person: any) => {
                          if (typeof person !== 'object') return null
                          return (
                            <Link
                              key={person.id}
                              href={`/family/${person.slug}`}
                              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 transition-colors"
                            >
                              {person.fullName}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </div>
  )
}
