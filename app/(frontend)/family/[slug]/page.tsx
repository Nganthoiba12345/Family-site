import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getFamilyMemberBySlug, getAllMedia, getAllMemories } from '@/lib/payload'
import {
  ArrowLeft,
  Calendar,
  Briefcase,
  Heart,
  Users,
  Camera,
  BookOpen,
  Sparkles,
  User,
} from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const member = await getFamilyMemberBySlug(slug)

  if (!member) {
    return {
      title: 'Family Member Not Found | Our Family Heritage',
    }
  }

  const title = `${member.fullName} | Our Family Heritage`
  const description =
    member.shortBio ||
    `${member.relationship} in Generation ${member.generation} of our family tree.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function FamilyMemberPage({ params }: Props) {
  const { slug } = await params
  const member = await getFamilyMemberBySlug(slug)

  if (!member) {
    notFound()
  }

  // Fetch photos that feature this family member
  const allPhotos = await getAllMedia({ limit: 50 })
  const memberPhotos = allPhotos.filter((p: any) => {
    if (!Array.isArray(p.familyMembers)) return false
    return p.familyMembers.some((fm: any) => {
      const id = typeof fm === 'object' ? fm.id : fm
      return id === member.id
    })
  })

  // Fetch memories involving this family member
  const allMemories = await getAllMemories()
  const memberMemories = allMemories.filter((m: any) => {
    if (!Array.isArray(m.people)) return false
    return m.people.some((p: any) => {
      const id = typeof p === 'object' ? p.id : p
      return id === member.id
    })
  })

  const getPhotoUrl = (item: any) => {
    if (item?.profilePhoto?.url) return item.profilePhoto.url
    if (typeof item?.profilePhoto === 'string') return item.profilePhoto
    if (item?.url) return item.url
    if (item?.filename) return `/uploads/${item.filename}`
    return '/uploads/grandfather.svg'
  }

  const profilePhotoUrl = getPhotoUrl(member)

  return (
    <div className="py-12 md:py-20 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/family"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Family Members</span>
          </Link>
        </div>

        {/* Member Profile Hero Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg shadow-blue-500/5 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Large Profile Photo with Glowing Neon Ring */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shrink-0 border-4 border-cyan-300 shadow-xl shadow-cyan-500/20">
              <Image
                src={profilePhotoUrl}
                alt={member.fullName}
                fill
                className="object-cover"
                unoptimized
                priority
              />
              <div className="absolute inset-0 ring-2 ring-inset ring-cyan-400/50 pointer-events-none" />
            </div>

            {/* Profile Info */}
            <div className="space-y-4 text-center md:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  Generation {member.generation}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 border border-cyan-200">
                  {member.relationship}
                </span>
                {member.branch && (
                  <span className="px-3.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                    {member.branch}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                {member.fullName}
              </h1>

              {member.occupation && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-600 font-semibold">
                  <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{member.occupation}</span>
                </div>
              )}

              {(member.dateOfBirth || member.dateOfDeath) && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-500">
                  <Calendar className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>
                    Born: {member.dateOfBirth || 'Unknown'} {member.dateOfDeath ? `• Passed: ${member.dateOfDeath}` : member.isLiving === false ? '• Deceased' : '• Living'}
                  </span>
                </div>
              )}

              {member.shortBio && (
                <p className="text-base text-slate-700 leading-relaxed font-normal pt-2">
                  {member.shortBio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Biography Section */}
        {member.biography && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              Full Biography & Life Story
            </h2>
            <div className="prose max-w-none text-slate-700 leading-relaxed text-base whitespace-pre-line">
              {member.biography}
            </div>
          </div>
        )}

        {/* Connected Family Relationships */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Family Connections
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Spouse */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1 mb-2">
                <Heart className="w-3.5 h-3.5" />
                Spouse
              </span>
              {member.spouse && typeof member.spouse === 'object' ? (
                <Link
                  href={`/family/${member.spouse.slug}`}
                  className="flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 transition-colors group"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border">
                    <Image src={getPhotoUrl(member.spouse)} alt={member.spouse.fullName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-rose-700 truncate">
                      {member.spouse.fullName}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{member.spouse.relationship}</div>
                  </div>
                </Link>
              ) : (
                <p className="text-xs text-slate-400 italic">None recorded</p>
              )}
            </div>

            {/* Parents */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1 mb-2">
                <User className="w-3.5 h-3.5" />
                Parent / Ascendant
              </span>
              {member.parent && typeof member.parent === 'object' ? (
                <Link
                  href={`/family/${member.parent.slug}`}
                  className="flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-colors group"
                >
                  <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border">
                    <Image src={getPhotoUrl(member.parent)} alt={member.parent.fullName} fill className="object-cover" unoptimized />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-700 truncate">
                      {member.parent.fullName}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{member.parent.relationship}</div>
                  </div>
                </Link>
              ) : (
                <p className="text-xs text-slate-400 italic">Lineage Roots (Foundational)</p>
              )}
            </div>

            {/* Children */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider flex items-center gap-1 mb-2">
                <Users className="w-3.5 h-3.5" />
                Children
              </span>
              {Array.isArray(member.children) && member.children.length > 0 ? (
                <div className="space-y-2">
                  {member.children.map((child: any) => {
                    if (typeof child !== 'object') return null
                    return (
                      <Link
                        key={child.id}
                        href={`/family/${child.slug}`}
                        className="flex items-center gap-3 p-2 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-colors group"
                      >
                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border">
                          <Image src={getPhotoUrl(child)} alt={child.fullName} fill className="object-cover" unoptimized />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate">
                            {child.fullName}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">{child.relationship}</div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">None recorded</p>
              )}
            </div>
          </div>
        </div>

        {/* Photos Featuring this Member */}
        {memberPhotos.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" />
              Photographs Featuring {member.fullName}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {memberPhotos.map((photo: any) => (
                <Link
                  key={photo.id}
                  href={`/photos/${photo.slug}`}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-cyan-400 transition-all shadow-xs"
                >
                  <div className="relative aspect-4/3 w-full bg-slate-100">
                    <Image
                      src={photo.url || `/uploads/${photo.filename}`}
                      alt={photo.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {photo.title}
                    </h4>
                    <span className="text-[11px] text-slate-500">{photo.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Memories Involving this Member */}
        {memberMemories.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Related Family Memories
            </h2>

            <div className="space-y-4">
              {memberMemories.map((mem: any) => (
                <div key={mem.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-900">{mem.title}</h3>
                    {mem.date && <span className="text-xs font-semibold text-blue-700">{mem.date}</span>}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{mem.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
