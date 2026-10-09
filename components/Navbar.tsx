'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, Image, BookOpen, GitBranch, Home, Shield, Menu, X, Info } from 'lucide-react'

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Family Tree', href: '/#family-tree', icon: GitBranch },
    { name: 'Family Members', href: '/family', icon: Users },
    { name: 'Gallery', href: '/gallery', icon: Image },
    { name: 'Memories', href: '/memories', icon: BookOpen },
    { name: 'About Family', href: '/about', icon: Info },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.startsWith('/#')) return false
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-600 bg-clip-text text-transparent tracking-tight">
                OUR FAMILY
              </span>
              <p className="text-xs text-blue-600 font-medium tracking-wider uppercase">
                Heritage & Legacy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = isActive(link.href)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-blue-50 text-blue-700 shadow-xs border border-blue-200/60 font-semibold'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Admin Link & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200"
            >
              <Shield className="w-4 h-4 text-cyan-200" />
              <span>Admin CMS</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-blue-100 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-slate-400'}`} />
                {link.name}
              </Link>
            )
          })}
          <div className="pt-2">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
            >
              <Shield className="w-5 h-5 text-cyan-200" />
              Payload Admin CMS
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
