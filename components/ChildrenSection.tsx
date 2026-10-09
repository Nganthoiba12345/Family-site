import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Briefcase, Calendar, Heart, Sparkles, Users } from 'lucide-react'

interface ChildrenSectionProps {
  childrenMembers: any[]
}

export function ChildrenSection({ childrenMembers }: ChildrenSectionProps) {
  // Filter only the 4 main children of Grandparents: First Uncle, Second Uncle, Third Uncle, Aunty
  const mainChildren = childrenMembers.filter((m) =>
    ['first-uncle', 'second-uncle', 'third-uncle', 'aunty'].includes(m.slug) ||
    ['First Uncle', 'Second Uncle', 'Third Uncle', 'Aunty'].includes(m.relationship)
  )

  const getPhoto = (m: any) => {
    if (m?.profilePhoto?.url) return m.profilePhoto.url
    if (typeof m?.profilePhoto === 'string') return m.profilePhoto
    return '/uploads/grandfather.svg'
  }

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-cyan-600" />
            Generation 2
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Their Children
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            The four children who carried forward the family torch, founding branches of innovation, wisdom, and devotion.
          </p>
        </div>

        {/* 4 Children Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainChildren.map((child) => (
            <div
              key={child.id}
              className="group bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between glass-card-hover"
            >
              <div>
                {/* Photo with Neon Ring */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-100 group-hover:border-cyan-400 transition-colors">
                  <Image
                    src={getPhoto(child)}
                    alt={child.fullName}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute top-3 right-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/95 text-blue-700 border border-blue-200 shadow-xs">
                      {child.relationship}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {child.fullName}
                  </h3>

                  {child.occupation && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Briefcase className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="truncate">{child.occupation}</span>
                    </div>
                  )}

                  {child.shortBio && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2">
                      {child.shortBio}
                    </p>
                  )}

                  {/* Spouse & Children summary tags */}
                  <div className="pt-2 flex flex-col gap-1.5 text-[11px] text-slate-500">
                    {child.spouse && typeof child.spouse === 'object' && (
                      <div className="flex items-center gap-1 text-slate-700">
                        <Heart className="w-3 h-3 text-rose-500 shrink-0" />
                        <span className="font-semibold truncate">Spouse:</span>
                        <span className="truncate">{child.spouse.fullName}</span>
                      </div>
                    )}
                    {Array.isArray(child.children) && child.children.length > 0 && (
                      <div className="flex items-center gap-1 text-slate-700">
                        <Users className="w-3 h-3 text-cyan-600 shrink-0" />
                        <span className="font-semibold shrink-0">Children:</span>
                        <span className="truncate">
                          {child.children.map((c: any) => c.fullName || 'Child').join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href={`/family/${child.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 transition-all duration-200"
                >
                  <span>View Profile & Story</span>
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
