import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, Calendar, MapPin, Users } from 'lucide-react'

interface RecentMemoriesProps {
  memories: any[]
}

export function RecentMemories({ memories }: RecentMemoriesProps) {
  if (!memories || memories.length === 0) return null

  const getMemoryPhoto = (mem: any) => {
    if (Array.isArray(mem.photos) && mem.photos.length > 0) {
      const p = mem.photos[0]
      if (p.url) return p.url
      if (p.filename) return `/uploads/${p.filename}`
    }
    return '/uploads/family-gathering.svg'
  }

  return (
    <section className="py-20 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-cyan-600" />
              Stories & Chronicles
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Recent Memories
            </h2>
            <p className="mt-2 text-slate-600 text-base sm:text-lg">
              Cherished milestones, heartfelt gatherings, and oral folklore passed through generations.
            </p>
          </div>

          <Link
            href="/memories"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-blue-700 bg-white hover:bg-blue-600 hover:text-white border border-slate-200 shadow-xs transition-all self-start md:self-auto shrink-0"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memories.slice(0, 3).map((mem) => (
            <div
              key={mem.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between glass-card-hover"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={getMemoryPhoto(mem)}
                    alt={mem.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {mem.date && (
                    <div className="absolute top-3 left-3 bg-white/95 text-blue-800 text-xs font-bold px-3 py-1 rounded-full border border-blue-200 shadow-md backdrop-blur-md flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-cyan-600" />
                      <span>{mem.date}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {mem.title}
                  </h3>

                  {mem.location && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>{mem.location}</span>
                    </div>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {mem.description}
                  </p>

                  {/* People involved */}
                  {Array.isArray(mem.people) && mem.people.length > 0 && (
                    <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                      <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">
                        Featuring: {mem.people.map((p: any) => p.fullName || 'Member').join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href="/memories"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-cyan-600 transition-colors"
                >
                  <span>Read Full Chronicle</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
