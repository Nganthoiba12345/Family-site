import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Calendar, Briefcase, Heart } from 'lucide-react'

interface FamilyMemberCardProps {
  member: {
    id: string | number
    fullName: string
    slug: string
    relationship: string
    generation: number
    branch?: string
    occupation?: string
    shortBio?: string
    dateOfBirth?: string
    dateOfDeath?: string
    isLiving?: boolean
    profilePhoto?: any
    spouse?: any
    children?: any[]
  }
}

export function FamilyMemberCard({ member }: FamilyMemberCardProps) {
  // Extract photo url
  let photoUrl = '/uploads/grandfather.svg'
  if (member.profilePhoto) {
    if (typeof member.profilePhoto === 'object' && member.profilePhoto.url) {
      photoUrl = member.profilePhoto.url
    } else if (typeof member.profilePhoto === 'string') {
      photoUrl = member.profilePhoto
    }
  }

  // Generation badge styling
  const getGenBadge = (gen: number) => {
    switch (gen) {
      case 1:
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 2:
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 3:
        return 'bg-teal-100 text-teal-800 border-teal-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  return (
    <div className="group relative bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between glass-card-hover">
      {/* Top Media & Glow Container */}
      <div>
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-4 border border-slate-100 group-hover:border-cyan-300/80 transition-colors">
          <Image
            src={photoUrl}
            alt={member.fullName}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          {/* Subtle neon ring indicator */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5 group-hover:ring-cyan-400/50 transition-all pointer-events-none" />
          
          {/* Generation Tag */}
          <div className="absolute top-3 left-3">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-xs backdrop-blur-md ${getGenBadge(member.generation)}`}>
              Gen {member.generation}
            </span>
          </div>

          {/* Relationship Badge */}
          <div className="absolute top-3 right-3">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/95 text-blue-700 border border-blue-200 shadow-xs backdrop-blur-md">
              {member.relationship}
            </span>
          </div>
        </div>

        {/* Member Details */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              {member.fullName}
            </h3>
          </div>

          {/* Occupation */}
          {member.occupation && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Briefcase className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span className="truncate">{member.occupation}</span>
            </div>
          )}

          {/* Life Dates */}
          {(member.dateOfBirth || member.dateOfDeath) && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
              <span>
                {member.dateOfBirth || 'Unknown'} {member.dateOfDeath ? `– ${member.dateOfDeath}` : member.isLiving === false ? '– Passed' : '– Present'}
              </span>
            </div>
          )}

          {/* Short Bio */}
          {member.shortBio && (
            <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
              {member.shortBio}
            </p>
          )}
        </div>
      </div>

      {/* Card Action Link */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
          {member.branch || 'Heritage Branch'}
        </span>
        <Link
          href={`/family/${member.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-cyan-600 group-hover:translate-x-1 transition-all"
        >
          <span>View Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
