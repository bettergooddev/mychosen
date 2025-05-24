import type { Block, Field } from 'payload'

export const PlayingCards: Block = {
  slug: 'playingCards',
  interfaceName: 'PlayingCardsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
      required: true,
    },
    {
      name: 'attachToFooter',
      label: 'Attach to Footer',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
