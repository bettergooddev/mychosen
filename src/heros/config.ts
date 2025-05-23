import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { link } from '@/fields/link'

const logo: Field[] = [
  {
    name: 'logo',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  link(),
]

const highImpact: Field[] = [
  {
    name: 'logos',
    type: 'array',
    fields: logo,
    maxRows: 3,
    admin: {
      components: {
        RowLabel: '@/heros/HighImpact/LogosRowLabel#LogosRowLabel',
      },
    },
  },
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
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    hasMany: true,
    required: true,
    maxRows: 21,
  },
]

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },

    {
      name: 'highImpact',
      type: 'array',
      fields: highImpact,
      label: 'Content',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
        components: {
          RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
        },
      },
      maxRows: 1,
    },

    // {
    //   name: 'mediumImpact',
    //   type: 'array',
    //   fields: mediumImpact,
    //   label: 'Content',
    //   admin: {
    //     condition: (_, { type } = {}) => type === 'mediumImpact',
    //     components: {
    //       RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
    //     },
    //   },
    //   maxRows: 1,
    // },

    // {
    //   name: 'lowImpact',
    //   type: 'array',
    //   fields: lowImpact,
    //   label: 'Content',
    //   admin: {
    //     condition: (_, { type } = {}) => type === 'lowImpact',
    //     components: {
    //  RowLabel: '@/heros/HeroRowLabel#HeroRowLabel',
    //     },
    //   },
    //   maxRows: 1,
    // },

    // {
    //   name: 'richText',
    //   type: 'richText',
    //   editor: lexicalEditor({
    //     features: ({ rootFeatures }) => {
    //       return [
    //         ...rootFeatures,
    //         HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
    //         FixedToolbarFeature(),
    //         InlineToolbarFeature(),
    //       ]
    //     },
    //   }),
    //   label: false,
    // },
    // linkGroup({
    //   overrides: {
    //     maxRows: 2,
    //   },
    // }),
    // {
    //   name: 'media',
    //   type: 'upload',
    //   admin: {
    //     condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
    //   },
    //   relationTo: 'media',
    //   required: true,
    // },
  ],
  label: false,
}
