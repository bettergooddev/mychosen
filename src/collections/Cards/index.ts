import type { CollectionConfig, GlobalConfig, Field } from 'payload'
import { link } from '@/fields/link'

const Card: Field[] = [
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: false,
  },
  {
    name: 'name',
    type: 'text',
    required: true,
  },
  {
    name: 'pattern',
    type: 'upload',
    relationTo: 'media',
    required: false,
  },
  link({
    appearances: false,
    overrides: {
      required: true,
    },
  }),
]

export const Cards: GlobalConfig = {
  slug: 'card',
  label: {
    singular: 'Playing Cards',
    plural: 'Playing Cards',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'cards',
      type: 'array',
      fields: Card,
      admin: {
        components: {
          RowLabel: '@/collections/Cards/RowLabel#RowLabel',
        },
      },
    },
  ],
}
