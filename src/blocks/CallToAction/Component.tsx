import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import { IconList } from '@/components/IconList'
import { Heading } from '@/components/Heading'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { BusinessHours } from '@/components/BusinessHours'
import { HoursType } from '@/collections/Hours/types'
import { Frame } from '@/components/Frame'
import Map from '@/components/Map'
import { MaskBackground } from '@/components/MaskBackground'

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

  const companyDetailsData = await payload.findGlobal({
    slug: 'companyDetails',
    depth: 1,
  })

  const hours = (hoursData.hours || []) as HoursType
  const { googleMapsEmbedUrl } = companyDetailsData?.location || {}
  const findUs = companyDetailsData?.findUs || []

  return (
    <div className="py-16" data-theme="pizza">
      <Heading heading={heading} subheading={subheading} actions={links || []} />

      <MaskBackground
        shape={'paper'}
        backgroundClassName="bg-primary"
        innerClassName="grid grid-cols-1 lg:grid-cols-2 container gap-14 py-20"
      >
        <Frame className="lg:min-h-0">
          {googleMapsEmbedUrl && (
            <Map src={googleMapsEmbedUrl} className="min-h-[450px] lg:min-h-0" />
          )}
        </Frame>
        <div className="flex flex-col gap-14 text-background">
          <BusinessHours hours={hours} />
          <div className="flex flex-col gap-4">
            <h4 className="type-h4">Find Us</h4>
            {findUs.length > 0 && <IconList items={findUs} />}
          </div>
        </div>
      </MaskBackground>
    </div>
  )
}
