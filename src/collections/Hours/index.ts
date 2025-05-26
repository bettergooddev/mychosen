import type { CollectionConfig, GlobalConfig, Field } from 'payload'
import { link } from '@/fields/link'

const Day: Field = {
  name: 'hours',
  type: 'group',
  label: false,
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'openTime',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'closeTime',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'isClosed',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
  ],
}

const Week: Field[] = [
  {
    name: 'monday',
    type: 'group',
    label: 'Monday',
    fields: [Day],
  },
  {
    name: 'tuesday',
    type: 'group',
    label: 'Tuesday',
    fields: [Day],
  },
  {
    name: 'wednesday',
    type: 'group',
    label: 'Wednesday',
    fields: [Day],
  },
  {
    name: 'thursday',
    type: 'group',
    label: 'Thursday',
    fields: [Day],
  },
  {
    name: 'friday',
    type: 'group',
    label: 'Friday',
    fields: [Day],
  },
  {
    name: 'saturday',
    type: 'group',
    label: 'Saturday',
    fields: [Day],
  },
  {
    name: 'sunday',
    type: 'group',
    label: 'Sunday',
    fields: [Day],
  },
]

const HourSet: Field[] = [
  {
    name: 'brand',
    type: 'relationship',
    relationTo: 'brands',
    required: true,
    maxDepth: 1,
    hasMany: false,
    admin: {
      hidden: true,
    },
  },
  {
    name: 'week',
    label: false,
    type: 'group',
    fields: Week,
  },
]
export const Hours: GlobalConfig = {
  slug: 'hours',
  label: {
    singular: 'Hours',
    plural: 'Hours',
  },
  fields: [
    {
      name: 'hours',
      type: 'array',
      fields: HourSet,
      maxRows: 3,
      minRows: 3,
      admin: {
        components: {
          RowLabel: '@/collections/Hours/RowLabel#RowLabel',
        },
      },
    },
  ],
}
