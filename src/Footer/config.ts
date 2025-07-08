import type { GlobalConfig } from 'payload'

import { navigationItem } from '@/fields/navigationItem'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
    },
  },
  fields: [
    {
      name: 'sitemap',
      type: 'group',
      label: 'Sitemap',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
        },
        {
          name: 'footerItems',
          type: 'array',
          label: 'Footer Items',
          fields: [
            navigationItem({
              overrides: {
                label: false,
              },
            }),
          ],
          maxRows: 8,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
    {
      name: 'whatToDo',
      type: 'group',
      label: 'What To Do',
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
        },
        {
          name: 'footerItems',
          type: 'array',
          label: 'Footer Items',
          fields: [
            navigationItem({
              overrides: {
                label: false,
              },
            }),
          ],
          maxRows: 8,
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
