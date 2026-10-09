import type { CollectionConfig } from 'payload'

export const Memories: CollectionConfig = {
  slug: 'memories',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'featured'],
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
      label: 'Memory Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL Slug',
    },
    {
      name: 'date',
      type: 'text',
      label: 'Date or Time Period (e.g., Summer 1984, 1999)',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location / Family Residence',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'The Story / Memory',
    },
    {
      name: 'photos',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Photos of this Memory',
    },
    {
      name: 'people',
      type: 'relationship',
      relationTo: 'family-members',
      hasMany: true,
      label: 'Family Members Involved',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      label: 'Featured Memory on Homepage',
    },
  ],
}
