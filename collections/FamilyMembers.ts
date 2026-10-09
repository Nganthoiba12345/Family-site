import type { CollectionConfig } from 'payload'

export const FamilyMembers: CollectionConfig = {
  slug: 'family-members',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'relationship', 'generation', 'branch', 'displayOrder'],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.fullName) {
          data.slug = data.fullName
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
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL Slug',
      admin: {
        description: 'Used in the URL /family/[slug]',
      },
    },
    {
      name: 'relationship',
      type: 'select',
      required: true,
      options: [
        { label: 'Grandfather', value: 'Grandfather' },
        { label: 'Grandmother', value: 'Grandmother' },
        { label: 'First Uncle', value: 'First Uncle' },
        { label: 'Second Uncle', value: 'Second Uncle' },
        { label: 'Third Uncle', value: 'Third Uncle' },
        { label: 'Aunty', value: 'Aunty' },
        { label: 'Wife', value: 'Wife' },
        { label: 'Husband', value: 'Husband' },
        { label: 'Elder Daughter', value: 'Elder Daughter' },
        { label: 'Daughter', value: 'Daughter' },
        { label: 'Son', value: 'Son' },
        { label: 'Other', value: 'Other' },
      ],
      label: 'Family Relationship',
    },
    {
      name: 'gender',
      type: 'select',
      defaultValue: 'male',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
      label: 'Gender',
    },
    {
      name: 'generation',
      type: 'number',
      required: true,
      defaultValue: 1,
      label: 'Generation (1 = Grandparents, 2 = Children & Spouses, 3 = Grandchildren)',
    },
    {
      name: 'branch',
      type: 'select',
      defaultValue: 'Roots',
      options: [
        { label: 'Roots (Grandparents)', value: 'Roots' },
        { label: 'Uncle 1 Branch', value: 'Uncle 1 Branch' },
        { label: 'Uncle 2 Branch', value: 'Uncle 2 Branch' },
        { label: 'Uncle 3 Branch', value: 'Uncle 3 Branch' },
        { label: 'Aunty Branch', value: 'Aunty Branch' },
      ],
      label: 'Family Branch',
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 1,
      label: 'Display Order / Tree Sequence',
    },
    {
      name: 'dateOfBirth',
      type: 'text',
      label: 'Date of Birth (e.g. 1935 or June 14, 1935)',
    },
    {
      name: 'dateOfDeath',
      type: 'text',
      label: 'Date of Passing (optional, e.g. 2015)',
    },
    {
      name: 'isLiving',
      type: 'checkbox',
      defaultValue: true,
      label: 'Currently Living',
    },
    {
      name: 'occupation',
      type: 'text',
      label: 'Occupation / Profession / Passion',
    },
    {
      name: 'shortBio',
      type: 'textarea',
      label: 'Short Bio (Brief card summary)',
    },
    {
      name: 'biography',
      type: 'textarea',
      label: 'Full Biography / Life Story',
    },
    {
      name: 'profilePhoto',
      type: 'relationship',
      relationTo: 'media',
      hasMany: false,
      label: 'Profile Photo',
    },
    {
      name: 'gallery',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      label: 'Photo Gallery',
    },
    {
      name: 'spouse',
      type: 'relationship',
      relationTo: 'family-members',
      hasMany: false,
      label: 'Spouse',
    },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'family-members',
      hasMany: false,
      label: 'Parent (Primary Branch Link)',
    },
    {
      name: 'children',
      type: 'relationship',
      relationTo: 'family-members',
      hasMany: true,
      label: 'Children',
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      label: 'Featured on Homepage',
    },
  ],
}
