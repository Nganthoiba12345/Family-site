import React from 'react'
import type { Metadata } from 'next'
import { getAllFamilyMembers } from '@/lib/payload'
import { FamilyDirectory } from '@/components/FamilyDirectory'
import { Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Members Directory | Our Family Heritage',
  description: 'Explore the individual profiles, stories, and branches of our entire family.',
}

export const dynamic = 'force-dynamic'

export default async function FamilyPage() {
  const members = await getAllFamilyMembers()

  return (
    <div className="py-12 md:py-20 bg-slate-50/40 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Users className="w-3.5 h-3.5 text-cyan-600" />
            Lineage Directory
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            All Family Members
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg">
            Discover each relative across three generations, their roles, milestones, and individual biographies.
          </p>
        </div>

        {/* Directory with filters */}
        <FamilyDirectory members={members} />
      </div>
    </div>
  )
}
