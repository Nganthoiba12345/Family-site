import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Briefcase, Heart, Sparkles, BookOpen } from 'lucide-react'

interface GrandparentsProps {
  grandfather: any
  grandmother: any
}

export function Grandparents({ grandfather, grandmother }: GrandparentsProps) {
  if (!grandfather || !grandmother) return null

  const getPhoto = (member: any, fallback: string) => {
    if (member?.profilePhoto?.url) return member.profilePhoto.url
    if (typeof member?.profilePhoto === 'string') return member.profilePhoto
    return fallback
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-blue-50/30 to-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            Generation 1
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our Roots
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            The foundation of our lineage. Their love, integrity, and sacrifices paved the road for every branch of our family.
          </p>
        </div>

        {/* Grandparents Side-by-Side Container with glowing bridge */}
        <div className="relative">
          {/* Glowing connecting line between grandparents (Desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 items-center justify-center">
            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 shadow-[0_0_12px_#00d9ff]" />
            <div className="w-12 h-12 rounded-full bg-white border-2 border-cyan-400 shadow-md shadow-cyan-500/30 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500 shadow-[0_0_12px_#00d9ff]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {/* Grandfather Card */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-blue-100 shadow-lg shadow-blue-500/5 hover:border-cyan-300 hover:shadow-cyan-400/15 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 border-2 border-blue-200/80 shadow-md">
                  <Image
                    src={getPhoto(grandfather, '/uploads/grandfather.svg')}
                    alt={grandfather.fullName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-cyan-400/40 pointer-events-none" />
                </div>

                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                    Patriarch • Generation 1
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {grandfather.fullName}
                  </h3>
                  
                  {grandfather.occupation && (
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-600 font-medium">
                      <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{grandfather.occupation}</span>
                    </div>
                  )}

                  {(grandfather.dateOfBirth || grandfather.dateOfDeath) && (
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500">
                      <Calendar className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>{grandfather.dateOfBirth} – {grandfather.dateOfDeath || 'Present'}</span>
                    </div>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {grandfather.shortBio}
                  </p>

                  <div className="pt-3">
                    <Link
                      href={`/family/${grandfather.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 transition-all duration-200"
                    >
                      <span>View Profile & Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Grandmother Card */}
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-teal-100 shadow-lg shadow-teal-500/5 hover:border-cyan-300 hover:shadow-cyan-400/15 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 border-2 border-teal-200/80 shadow-md">
                  <Image
                    src={getPhoto(grandmother, '/uploads/grandmother.svg')}
                    alt={grandmother.fullName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-cyan-400/40 pointer-events-none" />
                </div>

                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
                    Matriarch • Generation 1
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {grandmother.fullName}
                  </h3>

                  {grandmother.occupation && (
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-slate-600 font-medium">
                      <Briefcase className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{grandmother.occupation}</span>
                    </div>
                  )}

                  {(grandmother.dateOfBirth || grandmother.dateOfDeath) && (
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-500">
                      <Calendar className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span>{grandmother.dateOfBirth} – {grandmother.dateOfDeath || 'Present'}</span>
                    </div>
                  )}

                  <p className="text-sm text-slate-600 leading-relaxed pt-1">
                    {grandmother.shortBio}
                  </p>

                  <div className="pt-3">
                    <Link
                      href={`/family/${grandmother.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-teal-50 text-teal-800 hover:bg-teal-600 hover:text-white border border-teal-200 transition-all duration-200"
                    >
                      <span>View Profile & Story</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
