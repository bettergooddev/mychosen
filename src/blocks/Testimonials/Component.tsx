import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Heading } from '@/components/Heading'

type Props = {
  disableInnerContainer?: boolean
} & TestimonialsBlockType

export const TestimonialsBlock: React.FC<Props> = async ({ heading, subheading }) => {
  const payload = await getPayload({ config: configPromise })

  const testimonialsGlobal = await payload.findGlobal({
    slug: 'testimonials',
    depth: 1,
  })

  const testimonials = testimonialsGlobal.testimonials || []

  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} />
    </div>
  )
}
