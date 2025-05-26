import type { GlobalConfig } from 'payload'
import { iconLink } from '@/fields/iconLink'

export const ContactDetails: GlobalConfig = {
  slug: 'contactDetails',
  label: {
    singular: 'Contact Details',
    plural: 'Contact Details',
  },
  fields: [
    {
      name: 'findUs',
      type: 'array',
      label: 'Find Us',
      fields: iconLink,
      admin: {
        components: {
          RowLabel: '@/collections/ContactDetails/FindUsRowLabel#RowLabel',
          Field: '@/collections/ContactDetails/Field#Field',
        },
      },
    },
    {
      name: 'socials',
      type: 'array',
      label: 'Socials',
      fields: iconLink,
      admin: {
        components: {
          RowLabel: '@/collections/ContactDetails/SocialsRowLabel#RowLabel',
          Field: '@/collections/ContactDetails/Field#Field',
        },
      },
    },
  ],
}
