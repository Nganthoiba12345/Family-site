import { getPayload } from 'payload'
import config from '@payload-config'
import { cached } from './redis'

export const getPayloadClient = async () => {
  return await getPayload({ config })
}

export async function getAllFamilyMembers() {
  return cached('all_family_members', 60, async () => {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'family-members',
        depth: 2,
        limit: 100,
        sort: 'displayOrder',
      })
      return result.docs || []
    } catch (err: any) {
      console.warn('[Payload] getAllFamilyMembers notice:', err?.message || err)
      return []
    }
  })
}

export async function getFamilyMemberBySlug(slug: string) {
  return cached(`family_member_${slug}`, 60, async () => {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'family-members',
        where: {
          slug: {
            equals: slug,
          },
        },
        depth: 2,
        limit: 1,
      })
      return result.docs[0] || null
    } catch (err: any) {
      console.warn(`[Payload] getFamilyMemberBySlug (${slug}) notice:`, err?.message || err)
      return null
    }
  })
}

export async function getAllMedia(filters?: {
  category?: string
  familyMemberId?: string
  limit?: number
}) {
  const cacheKey = `media_${filters?.category || 'all'}_${filters?.familyMemberId || 'all'}_${filters?.limit || 50}`
  return cached(cacheKey, 60, async () => {
    try {
      const payload = await getPayloadClient()
      const where: any = {}

      if (filters?.category && filters.category !== 'All') {
        where.category = { equals: filters.category }
      }

      if (filters?.familyMemberId) {
        where.familyMembers = { contains: filters.familyMemberId }
      }

      const result = await payload.find({
        collection: 'media',
        where,
        depth: 2,
        limit: filters?.limit || 100,
        sort: '-dateTaken',
      })
      return result.docs || []
    } catch (err: any) {
      console.warn('[Payload] getAllMedia notice:', err?.message || err)
      return []
    }
  })
}

export async function getMediaBySlug(slug: string) {
  return cached(`media_slug_${slug}`, 60, async () => {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'media',
        where: {
          slug: {
            equals: slug,
          },
        },
        depth: 2,
        limit: 1,
      })
      return result.docs[0] || null
    } catch (err: any) {
      console.warn(`[Payload] getMediaBySlug (${slug}) notice:`, err?.message || err)
      return null
    }
  })
}

export async function getAllMemories() {
  return cached('all_memories', 60, async () => {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'memories',
        depth: 2,
        limit: 100,
        sort: '-createdAt',
      })
      return result.docs || []
    } catch (err: any) {
      console.warn('[Payload] getAllMemories notice:', err?.message || err)
      return []
    }
  })
}

export async function getAllTimelineEvents() {
  return cached('all_timeline_events', 60, async () => {
    try {
      const payload = await getPayloadClient()
      const result = await payload.find({
        collection: 'timeline-events',
        depth: 2,
        limit: 100,
        sort: 'order',
      })
      return result.docs || []
    } catch (err: any) {
      console.warn('[Payload] getAllTimelineEvents notice:', err?.message || err)
      return []
    }
  })
}
