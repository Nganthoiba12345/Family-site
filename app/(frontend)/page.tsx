import React from 'react'
import { Hero } from '@/components/Hero'
import { Grandparents } from '@/components/Grandparents'
import { FamilyTree } from '@/components/FamilyTree'
import { ChildrenSection } from '@/components/ChildrenSection'
import { GrandchildrenSection } from '@/components/GrandchildrenSection'
import { FeaturedPhotos } from '@/components/FeaturedPhotos'
import { RecentMemories } from '@/components/RecentMemories'
import { FamilyTimeline } from '@/components/FamilyTimeline'
import { CallToAction } from '@/components/CallToAction'
import {
  getAllFamilyMembers,
  getAllMedia,
  getAllMemories,
  getAllTimelineEvents,
} from '@/lib/payload'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [members, mediaDocs, memories, timelineEvents] = await Promise.all([
    getAllFamilyMembers(),
    getAllMedia({ limit: 12 }),
    getAllMemories(),
    getAllTimelineEvents(),
  ])

  // Extract Grandparents (Generation 1)
  const grandfather = members.find(
    (m) => m.slug === 'grandfather' || m.relationship === 'Grandfather'
  )
  const grandmother = members.find(
    (m) => m.slug === 'grandmother' || m.relationship === 'Grandmother'
  )

  // Extract Generation 2 (Children of Grandparents)
  const generation2 = members.filter((m) => m.generation === 2)

  // Extract Generation 3 (Grandchildren)
  const generation3 = members.filter((m) => m.generation === 3)

  return (
    <div className="relative">
      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Our Roots (Grandparents) */}
      <Grandparents grandfather={grandfather} grandmother={grandmother} />

      {/* 4. Family Tree Visualization */}
      <FamilyTree members={members} />

      {/* 5. Their Children */}
      <ChildrenSection childrenMembers={generation2} />

      {/* 6. Grandchildren */}
      <GrandchildrenSection grandchildren={generation3} />

      {/* 7. Featured Family Photos */}
      <FeaturedPhotos photos={mediaDocs} />

      {/* 8. Recent Memories */}
      <RecentMemories memories={memories} />

      {/* 9. Family Timeline */}
      <FamilyTimeline events={timelineEvents} />

      {/* 10. Call to Action */}
      <CallToAction />
    </div>
  )
}
