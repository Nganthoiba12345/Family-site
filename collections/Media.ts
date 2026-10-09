import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'uploads',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'medium',
        width: 800,
        height: 600,
        position: 'centre',
      },
      {
        name: 'large',
        width: 1600,
        height: 1200,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'dateTaken', 'location'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Photo Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL Slug',
      admin: {
        description: 'Used in the URL /photos/[slug]',
      },
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Short Caption',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Photo Description / Story',
    },
    {
      name: 'dateTaken',
      type: 'date',
      label: 'Date Taken / Approximate Date',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location / City / Landmark',
    },
    {
      name: 'photographer',
      type: 'text',
      label: 'Photographer / Contributed By',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'Family',
      required: true,
      options: [
        { label: 'Family', value: 'Family' },
        { label: 'Wedding', value: 'Wedding' },
        { label: 'Childhood', value: 'Childhood' },
        { label: 'Birthday', value: 'Birthday' },
        { label: 'Festival', value: 'Festival' },
        { label: 'Travel', value: 'Travel' },
        { label: 'Old Memories', value: 'Old Memories' },
        { label: 'Family Gathering', value: 'Family Gathering' },
        { label: 'Other', value: 'Other' },
      ],
    },
    {
      name: 'familyMembers',
      type: 'relationship',
      relationTo: 'family-members',
      hasMany: true,
      label: 'Family Members Appearing',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Photo (Show on Homepage)',
    },
  ],
}
