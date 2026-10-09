import type { CollectionConfig } from 'payload'

export const TimelineEvents: CollectionConfig = {
  slug: 'timeline-events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['year', 'title', 'category', 'order'],
  },
  fields: [
    {
      name: 'year',
      type: 'text',
      required: true,
      label: 'Year or Era (e.g., 1960, 1970)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Milestone Title',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description of the Event',
    },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'Family Milestone',
      options: [
        { label: 'Family Milestone', value: 'Family Milestone' },
        { label: 'Marriage', value: 'Marriage' },
        { label: 'Birth', value: 'Birth' },
        { label: 'Relocation / Home', value: 'Relocation' },
        { label: 'Achievement', value: 'Achievement' },
        { label: 'Celebration', value: 'Celebration' },
      ],
      label: 'Milestone Category',
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 1,
      label: 'Sort Order',
    },
    {
      name: 'photo',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      label: 'Associated Photo',
    },
  ],
}
