import type { CollectionConfig, GlobalConfig, Field } from 'payload'
import { link } from '@/fields/link'

export const Background: GlobalConfig = {
  slug: 'background',
  admin: {
    hidden: true,
  },
  label: {
    singular: 'Background',
    plural: 'Backgrounds',
  },
  fields: [
    {
      name: 'layers',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
