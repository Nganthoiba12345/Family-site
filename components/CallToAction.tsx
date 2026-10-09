import React from 'react'
import Link from 'next/link'
import { ArrowRight, Camera, GitBranch, Heart, Sparkles } from 'lucide-react'

export function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-tr from-blue-900 via-blue-800 to-cyan-900 text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-cyan-400/20 pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-blue-400/20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-cyan-400/40 text-cyan-200 text-xs font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-300" />
          A Timeless Heritage
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-6">
          Explore Our Family Heritage
        </h2>

        <p className="text-base sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Walk through the photo archives, read the life chronicles of each loved one, and cherish the enduring bond that links our yesterday to tomorrow.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/family"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-white text-blue-950 shadow-xl shadow-cyan-500/20 hover:bg-cyan-50 hover:scale-105 active:scale-95 transition-all"
          >
            <GitBranch className="w-5 h-5 text-blue-600" />
            <span>Meet All Family Members</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-bold bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all backdrop-blur-md"
          >
            <Camera className="w-5 h-5 text-cyan-300" />
            <span>Open Photo Album</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
