import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { FamilyMembers } from './collections/FamilyMembers'
import { Media } from './collections/Media'
import { Memories } from './collections/Memories'
import { TimelineEvents } from './collections/TimelineEvents'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const databaseUrl = process.env.DATABASE_URL || 'file:./data/family.db'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    FamilyMembers,
    Media,
    Memories,
    TimelineEvents,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'family-heritage-secret-key-change-in-production-12345',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    autoGenerate: false,
  },
  db: sqliteAdapter({
    client: {
      url: databaseUrl,
    },
  }),
  sharp,
})
