import { FixedToolbarFeature, HeadingFeature } from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block, Field } from 'payload'

export const PlayingCards: Block = {
  slug: 'playingCards',
  interfaceName: 'PlayingCardsBlock',
  fields: [
    {
      name: 'heading',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2'] }),
            FixedToolbarFeature(),
            // InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: false,
    },
    {
      name: 'attachToFooter',
      label: 'Attach to Footer',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
