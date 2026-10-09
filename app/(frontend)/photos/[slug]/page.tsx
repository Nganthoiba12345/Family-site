import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getMediaBySlug, getAllMedia } from '@/lib/payload'
import {
  ArrowLeft,
  Calendar,
  MapPin,
  User,
  Users,
  Camera,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
} from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const photo = await getMediaBySlug(slug)

  if (!photo) {
    return {
      title: 'Photo Not Found | Our Family Heritage',
    }
  }

  const title = `${photo.title} | Our Family Heritage`
  const description =
    photo.caption || photo.description || `Family photograph from our historical collection.`

  const imageUrl = photo.url || `/uploads/${photo.filename}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: photo.title,
        },
      ],
    },
  }
}

export const dynamic = 'force-dynamic'

export default async function PhotoDetailPage({ params }: Props) {
  const { slug } = await params
  const photo = await getMediaBySlug(slug)

  if (!photo) {
    notFound()
  }

  // Get all photos to compute Previous, Next, and Related photos
  const allPhotos = await getAllMedia({ limit: 100 })
  const currentIndex = allPhotos.findIndex((p: any) => p.slug === slug)

  const prevPhoto = currentIndex > 0 ? allPhotos[currentIndex - 1] : null
  const nextPhoto = currentIndex < allPhotos.length - 1 ? allPhotos[currentIndex + 1] : null

  // Related photos in the same category (excluding current)
  const relatedPhotos = allPhotos
    .filter((p: any) => p.id !== photo.id && p.category === photo.category)
    .slice(0, 3)

  const getImageUrl = (item: any) => {
    if (item?.url) return item.url
    if (item?.filename) return `/uploads/${item.filename}`
    return '/uploads/family-gathering.svg'
  }

  const mainImageUrl = getImageUrl(photo)

  return (
    <div className="py-12 md:py-20 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Controls Bar */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Gallery</span>
          </Link>

          {/* Previous / Next buttons */}
          <div className="flex items-center gap-2">
            {prevPhoto ? (
              <Link
                href={`/photos/${prevPhoto.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                title={`Previous: ${prevPhoto.title}`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-100 cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </span>
            )}

            {nextPhoto ? (
              <Link
                href={`/photos/${nextPhoto.slug}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                title={`Next: ${nextPhoto.title}`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-100 cursor-not-allowed">
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            )}
          </div>
        </div>

        {/* Large Main Photo Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl shadow-blue-500/5 mb-12">
          {/* Main Visual Image Display */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            <Image
              src={mainImageUrl}
              alt={photo.title}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>

          {/* Photo Metadata Details */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3 border border-blue-200">
                  <Tag className="w-3.5 h-3.5" />
                  {photo.category || 'Family'}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {photo.title}
                </h1>
              </div>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
                {photo.dateTaken && (
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                    <Calendar className="w-4 h-4 text-cyan-600" />
                    <span>{photo.dateTaken}</span>
                  </div>
                )}
                {photo.location && (
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                    <MapPin className="w-4 h-4 text-cyan-600" />
                    <span>{photo.location}</span>
                  </div>
                )}
                {photo.photographer && (
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
                    <Camera className="w-4 h-4 text-blue-600" />
                    <span>By: {photo.photographer}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Caption */}
            {photo.caption && (
              <p className="text-lg font-medium text-slate-800 italic">
                &ldquo;{photo.caption}&rdquo;
              </p>
            )}

            {/* Detailed Description */}
            {photo.description && (
              <div className="prose max-w-none text-slate-700 leading-relaxed text-base whitespace-pre-line">
                {photo.description}
              </div>
            )}

            {/* Tagged Family Members */}
            {Array.isArray(photo.familyMembers) && photo.familyMembers.length > 0 && (
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  Family Members in this Photograph
                </h3>

                <div className="flex flex-wrap gap-3">
                  {photo.familyMembers.map((fm: any) => {
                    const memberObj = typeof fm === 'object' ? fm : null
                    if (!memberObj) return null

                    return (
                      <Link
                        key={memberObj.id}
                        href={`/family/${memberObj.slug}`}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all group"
                      >
                        <User className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                        <span>{memberObj.fullName}</span>
                        <span className="text-[10px] text-blue-500 group-hover:text-cyan-200">
                          ({memberObj.relationship})
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Photos Section */}
        {relatedPhotos.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              More Photos in {photo.category}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPhotos.map((rp: any) => (
                <Link
                  key={rp.id}
                  href={`/photos/${rp.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-cyan-400 transition-all shadow-xs"
                >
                  <div className="relative aspect-4/3 w-full bg-slate-100">
                    <Image
                      src={getImageUrl(rp)}
                      alt={rp.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {rp.title}
                    </h4>
                    <span className="text-xs text-slate-500">{rp.dateTaken || rp.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
