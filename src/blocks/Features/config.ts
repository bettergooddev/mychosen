import type { Block, Field } from 'payload'

const gallery: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
]

const highlights: Field[] = [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
]

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'gallery',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Gallery',
          value: 'gallery',
        },
        {
          label: 'Highlights',
          value: 'highlights',
        },
      ],
      required: true,
    },

    {
      name: 'gallery',
      type: 'array',
      fields: gallery,
      label: 'Gallery Content',
      admin: {
        condition: (_, { type } = {}) => type === 'gallery',
      },
      maxRows: 1,
    },

    {
      name: 'highlights',
      type: 'array',
      fields: highlights,
      label: 'Highlights Content',
      admin: {
        condition: (_, { type } = {}) => type === 'highlights',
      },
      maxRows: 1,
    },
  ],
  labels: {
    plural: 'Features',
    singular: 'Feature',
  },
}
