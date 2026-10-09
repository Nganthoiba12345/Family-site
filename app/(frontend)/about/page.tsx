import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GitBranch, Heart, Shield, Sparkles, BookOpen, Camera, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Our Family Heritage | Across Generations',
  description: 'The story behind our living digital family archive, history, and generational mission.',
}

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 bg-slate-50/40 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-widest uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            Our Mission & Roots
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            About Our Family Heritage
          </h1>
          <p className="mt-4 text-slate-600 text-lg leading-relaxed">
            Founded on the lifelong principles of Grandfather and Grandmother, this project is a dedicated living digital archive designed to preserve photographs, oral memories, and genealogy records for generations yet to come.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            A Living Sanctuary Across Generations
          </h2>
          <p className="text-slate-600 leading-relaxed">
            In traditional physical photo albums, fading paper and scattered memories risk being lost with time. 
            This digital heritage archive unites all branches of our family—from the foundational roots of our grandparents to the growing ambitions of our grandchildren—into a cohesive, searchable, and beautifully preserved digital monument.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Here, every family member has a voice and a profile. Historical photographs are cataloged with dates, locations, and context, ensuring that future great-grandchildren can trace back their ancestral lineage with pride, reverence, and clarity.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">14 Members & Growing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Three dynamic generations spanning engineers, doctors, artists, educators, and innovators across four thriving branches.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center text-cyan-600">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">High-Fidelity Archiving</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All photographs and historical documents are stored in lossless format, enriched with metadata, and backed up persistently.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Payload CMS Powered</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Family elders and designated administrators can easily add new births, weddings, and photographs directly through the CMS dashboard.
            </p>
          </div>
        </div>

        {/* CTA to Admin or Explore */}
        <div className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold">Have a New Photograph or Memory?</h3>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Designated family contributors can log into the Payload CMS administration portal to upload new historical photos, write memory chronicles, or update family profiles.
          </p>
          <div className="pt-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-white text-blue-950 hover:bg-cyan-50 transition-colors shadow-lg"
            >
              <Shield className="w-4 h-4 text-blue-600" />
              <span>Access Payload Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
