import React from 'react'
import Link from 'next/link'
import { GitBranch, Heart, Shield, Sparkles } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-blue-100/80 text-slate-600 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Heritage Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GitBranch className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-600 bg-clip-text text-transparent">
                  OUR FAMILY HERITAGE
                </span>
                <p className="text-xs text-blue-600 font-medium tracking-wide">
                  Across Generations & Centuries
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              &ldquo;Every photograph tells a story. Every generation leaves a legacy.&rdquo; 
              Preserving the love, values, milestones, and treasured memories of our ancestors and descendants in a living digital sanctuary.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-100/60 px-3 py-1.5 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>Preserved with love for generations to come</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/#family-tree" className="hover:text-blue-600 transition-colors">
                  Interactive Family Tree
                </Link>
              </li>
              <li>
                <Link href="/family" className="hover:text-blue-600 transition-colors">
                  All Family Members
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-600 transition-colors">
                  Heritage Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/memories" className="hover:text-blue-600 transition-colors">
                  Family Stories & Memories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About Our Ancestry
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Administration & Technology */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider uppercase">Management</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <Shield className="w-4 h-4" />
                  Payload CMS Admin
                </Link>
              </li>
              <li className="text-slate-500 text-xs pt-1">
                Content is dynamically managed in Payload CMS with SQLite and Redis caching.
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Our Family Heritage Archive. All family photographs and biographies preserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
            <span>for our beloved family</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
