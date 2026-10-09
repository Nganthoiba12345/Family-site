import React from 'react'
import Link from 'next/link'
import { ArrowRight, GitBranch, Heart, Sparkles, Users, Camera } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-white">
      {/* Background Neon Glowing Orbs */}
      <div className="hero-glow-orb top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-300 via-cyan-200 to-blue-100 opacity-60" />
      <div className="hero-glow-orb top-[20%] left-[-150px] w-[400px] h-[400px] bg-blue-200/40" />
      <div className="hero-glow-orb top-[40%] right-[-150px] w-[450px] h-[450px] bg-cyan-200/40" />

      {/* Decorative Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50/90 border border-cyan-300/60 shadow-xs shadow-cyan-500/10 mb-8 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-600 animate-pulse" />
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            Our Living Family Archive & Tree
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          <span className="block text-slate-900">OUR FAMILY</span>
          <span className="block bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent mt-2">
            A Story Across Generations
          </span>
        </h1>

        {/* Emotional Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Every photograph tells a story. Every generation leaves a legacy. 
          Discover the roots that ground us and the branches that reach into tomorrow.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#family-tree"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-cyan-400/35 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <GitBranch className="w-5 h-5 text-cyan-200" />
            <span>Explore Family Tree</span>
            <ArrowRight className="w-4 h-4 text-cyan-200 ml-1" />
          </a>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold bg-white text-slate-800 border border-slate-200 shadow-sm hover:border-cyan-300 hover:text-blue-600 hover:bg-blue-50/40 hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <Camera className="w-5 h-5 text-blue-600" />
            <span>Browse Photos</span>
          </Link>
        </div>

        {/* Stats Glassmorphism Grid */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="glass-card rounded-2xl p-4 text-center shadow-xs border border-blue-100 hover:border-cyan-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">3</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Generations</div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center shadow-xs border border-blue-100 hover:border-cyan-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">14</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Family Members</div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center shadow-xs border border-blue-100 hover:border-cyan-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600">4</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Family Branches</div>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center shadow-xs border border-blue-100 hover:border-cyan-300 transition-colors">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">1960+</div>
            <div className="text-xs sm:text-sm font-medium text-slate-500 mt-1">Years of Heritage</div>
          </div>
        </div>
      </div>
    </section>
  )
}
