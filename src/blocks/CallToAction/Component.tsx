import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Heading } from '@/components/Heading'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { BusinessHours } from '@/components/BusinessHours'
import { HoursType } from '@/collections/Hours/types'
import { Frame } from '@/components/Frame'
import Map from '@/components/Map'

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

  const hours = (hoursData.hours || []) as HoursType

  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} actions={links || []} />
      <div className="grid grid-cols-2 gap-16">
        <Frame>
          <Map />
        </Frame>
        <BusinessHours hours={hours} />
      </div>
    </div>
  )
}
