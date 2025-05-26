import type { Block, Field } from 'payload'

const Event: Field[] = [
  {
    name: 'year',
    type: 'number',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
]

export const Timeline: Block = {
  slug: 'timeline',
  interfaceName: 'TimelineBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },
    {
      name: 'events',
      type: 'array',
      fields: Event,
      required: true,
      minRows: 1,
      admin: {
        components: {
          RowLabel: '@/blocks/Timeline/RowLabel#RowLabel',
        },
      },
    },
  ],
}
