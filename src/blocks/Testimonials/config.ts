import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  imageURL: '/api/media/file/block-testimonials.png',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
  ],
}
