import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Heading } from '@/components/Heading'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const CallToActionBlock: React.FC<CTABlockProps> = async ({
  heading,
  subheading,
  links,
}) => {
  const payload = await getPayload({ config: configPromise })

  const hoursData = await payload.findGlobal({
    slug: 'hours',
    depth: 1,
  })

  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} actions={links || []} />
      <div className="grid grid-cols-2 gap-16">
        <div>hey</div>
        {/* <BusinessHours /> */}
      </div>
    </div>
  )
}
