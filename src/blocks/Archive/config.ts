import type { Block, Field } from 'payload'

const menus: Field[] = [
  {
    name: 'menus',
    type: 'relationship',
    relationTo: 'menus',
    hasMany: true,
    required: true,
  },
]

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Menus',
          value: 'menus',
        },
      ],
      required: true,
    },

    {
      name: 'heading',
      type: 'text',
      // required: true,
    },
    {
      name: 'subheading',
      type: 'text',
    },

    // @ts-expect-error the convenience of this set up was worth it
    ...menus.map((field: Field) => ({
      ...field,
      admin: {
        ...field.admin,
        condition: (_: any, { type }: { type: string }) => type === 'menus',
      },
    })),
  ],
  labels: {
    plural: 'Archives',
    singular: 'Archive',
  },
}
