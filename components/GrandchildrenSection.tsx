import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Briefcase, Sparkles } from 'lucide-react'

interface GrandchildrenSectionProps {
  grandchildren: any[]
}

export function GrandchildrenSection({ grandchildren }: GrandchildrenSectionProps) {
  if (!grandchildren || grandchildren.length === 0) return null

  const getPhoto = (m: any) => {
    if (m?.profilePhoto?.url) return m.profilePhoto.url
    if (typeof m?.profilePhoto === 'string') return m.profilePhoto
    return '/uploads/grandfather.svg'
  }

  return (
    <section className="py-20 bg-slate-50/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            Generation 3
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            The Grandchildren
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            The next generation carrying the heritage forward into the digital age and future century.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {grandchildren.map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between glass-card-hover"
            >
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                  <Image
                    src={getPhoto(g)}
                    alt={g.fullName}
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-teal-700 border border-teal-200 shadow-xs">
                      {g.relationship}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-base font-bold text-slate-900 truncate">
                    {g.fullName}
                  </h4>
                  {g.occupation && (
                    <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium truncate">
                      <Briefcase className="w-3 h-3 text-teal-600 shrink-0" />
                      <span className="truncate">{g.occupation}</span>
                    </div>
                  )}
                  {g.shortBio && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed pt-1">
                      {g.shortBio}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  href={`/family/${g.slug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-teal-700 hover:text-cyan-600 transition-colors"
                >
                  <span>Profile</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
