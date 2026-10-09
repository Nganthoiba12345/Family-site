'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GitBranch, Heart, ArrowRight, UserCheck, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

interface FamilyTreeProps {
  members: any[]
}

export function FamilyTree({ members }: FamilyTreeProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'uncle1' | 'uncle2' | 'uncle3' | 'aunty'>('all')

  // Find grandparents
  const grandfather = members.find((m) => m.slug === 'grandfather' || m.relationship === 'Grandfather')
  const grandmother = members.find((m) => m.slug === 'grandmother' || m.relationship === 'Grandmother')

  // Find Gen 2
  const uncle1 = members.find((m) => m.slug === 'first-uncle' || m.relationship === 'First Uncle')
  const uncle1Wife = members.find((m) => m.slug === 'first-uncle-wife')
  const uncle1Daughter = members.find((m) => m.slug === 'uncle-1-daughter')

  const uncle2 = members.find((m) => m.slug === 'second-uncle' || m.relationship === 'Second Uncle')
  const uncle2Wife = members.find((m) => m.slug === 'second-uncle-wife')
  const uncle2ElderDaughter = members.find((m) => m.slug === 'second-uncle-elder-daughter')
  const uncle2Son = members.find((m) => m.slug === 'second-uncle-son')

  const uncle3 = members.find((m) => m.slug === 'third-uncle' || m.relationship === 'Third Uncle')
  const uncle3Wife = members.find((m) => m.slug === 'third-uncle-wife')
  const uncle3Daughter = members.find((m) => m.slug === 'third-uncle-daughter')

  const aunty = members.find((m) => m.slug === 'aunty' || m.relationship === 'Aunty')
  const auntySon = members.find((m) => m.slug === 'aunty-son')

  const getPhoto = (m: any) => {
    if (!m) return '/uploads/grandfather.svg'
    if (m?.profilePhoto?.url) return m.profilePhoto.url
    if (typeof m?.profilePhoto === 'string') return m.profilePhoto
    return '/uploads/grandfather.svg'
  }

  // Branch data
  const branches = [
    {
      id: 'uncle1',
      title: 'First Uncle Branch',
      parent: uncle1,
      spouse: uncle1Wife,
      children: [uncle1Daughter].filter(Boolean),
      color: 'from-blue-600 to-indigo-600',
    },
    {
      id: 'uncle2',
      title: 'Second Uncle Branch',
      parent: uncle2,
      spouse: uncle2Wife,
      children: [uncle2ElderDaughter, uncle2Son].filter(Boolean),
      color: 'from-cyan-600 to-blue-600',
    },
    {
      id: 'uncle3',
      title: 'Third Uncle Branch',
      parent: uncle3,
      spouse: uncle3Wife,
      children: [uncle3Daughter].filter(Boolean),
      color: 'from-teal-600 to-emerald-600',
    },
    {
      id: 'aunty',
      title: 'Aunty Branch',
      parent: aunty,
      spouse: null,
      children: [auntySon].filter(Boolean),
      color: 'from-rose-600 to-pink-600',
    },
  ]

  const filteredBranches = activeTab === 'all' ? branches : branches.filter((b) => b.id === activeTab)

  return (
    <section id="family-tree" className="py-20 bg-slate-50/60 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-cyan-400 text-blue-800 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <GitBranch className="w-3.5 h-3.5 text-cyan-600" />
            Lineage Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Family Tree Visualization
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            A dynamic, multi-generational representation of our ancestors and descendants.
          </p>

          {/* Branch filter pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Full Family Tree
            </button>
            {branches.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveTab(b.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === b.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {b.title}
              </button>
            ))}
          </div>
        </div>

        {/* 1. ROOT LEVEL: Grandparents Node */}
        {grandfather && grandmother && (
          <div className="flex flex-col items-center">
            {/* Generation 1 Tag */}
            <div className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">
              Generation 1 • Roots
            </div>

            <div className="relative flex flex-wrap items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6 bg-white/95 rounded-3xl border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
              {/* Grandfather Node */}
              <Link
                href={`/family/${grandfather.slug}`}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-blue-50/70 transition-colors group"
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500 shrink-0">
                  <Image src={getPhoto(grandfather)} alt={grandfather.fullName} fill className="object-cover" unoptimized />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {grandfather.fullName}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">Patriarch (1935–2015)</div>
                </div>
              </Link>

              {/* Heart Marriage Link */}
              <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-rose-600 text-xs font-semibold">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>Married 1960</span>
              </div>

              {/* Grandmother Node */}
              <Link
                href={`/family/${grandmother.slug}`}
                className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-teal-50/70 transition-colors group"
              >
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-teal-500 shrink-0">
                  <Image src={getPhoto(grandmother)} alt={grandmother.fullName} fill className="object-cover" unoptimized />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {grandmother.fullName}
                  </div>
                  <div className="text-[11px] font-medium text-slate-500">Matriarch (1938–2019)</div>
                </div>
              </Link>
            </div>

            {/* Glowing Trunk Line descending from Grandparents */}
            <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_10px_#00d9ff] my-1" />
          </div>
        )}

        {/* 2. BRANCH LEVEL: 4 Main Branches */}
        <div className="mt-2">
          {/* Horizontal crossbar on desktop if showing all */}
          {activeTab === 'all' && (
            <div className="hidden lg:block relative w-11/12 max-w-5xl mx-auto h-0.5 bg-gradient-to-r from-blue-300 via-cyan-400 to-blue-300 shadow-[0_0_10px_#00d9ff] mb-8" />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBranches.map((b) => (
              <div
                key={b.id}
                className="relative bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Branch Header */}
                <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-700 tracking-wide uppercase">
                    {b.title}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                    Gen 2 → 3
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Generation 2 Parent Card */}
                  {b.parent && (
                    <Link
                      href={`/family/${b.parent.slug}`}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50/50 border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                    >
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-blue-200">
                        <Image src={getPhoto(b.parent)} alt={b.parent.fullName} fill className="object-cover" unoptimized />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          {b.parent.fullName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium truncate">
                          {b.parent.relationship}
                        </div>
                      </div>
                    </Link>
                  )}

                  {/* Generation 2 Spouse Node if applicable */}
                  {b.spouse && (
                    <div className="relative pl-6">
                      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-pink-300/80" />
                      <Link
                        href={`/family/${b.spouse.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-2xl bg-pink-50/40 border border-pink-100 hover:border-pink-300 hover:bg-pink-50 transition-all group"
                      >
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-pink-200">
                          <Image src={getPhoto(b.spouse)} alt={b.spouse.fullName} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-800 group-hover:text-pink-600 transition-colors truncate">
                            {b.spouse.fullName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">Spouse</div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Descending Line to Children */}
                  <div className="flex items-center justify-center my-1">
                    <div className="w-0.5 h-6 bg-cyan-400 shadow-[0_0_6px_#00d9ff]" />
                  </div>

                  {/* Generation 3 Children */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
                      Children (Gen 3)
                    </div>
                    {b.children.map((child: any) => (
                      <Link
                        key={child.id}
                        href={`/family/${child.slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-2xl bg-teal-50/50 border border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-all group"
                      >
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-teal-200">
                          <Image src={getPhoto(child)} alt={child.fullName} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                            {child.fullName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">{child.relationship}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
