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
import { cn } from '@/utilities/ui'
import { tv } from 'tailwind-variants'

const classes = {
  text: tv({
    variants: {
      style: {
        fancy: 'text-background',
        default: 'theme-sugar-shack text-foreground [&_*]:text-foreground',
      },
    },
  }),
}

export const CallToActionBlock: React.FC<CTABlockProps> = async ({
  style,
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

  const contentGrid = (
    <>
      <Frame className="lg:min-h-0">
        {googleMapsEmbedUrl && (
          <Map src={googleMapsEmbedUrl} className="min-h-[450px] lg:min-h-0" />
        )}
      </Frame>
      <div className={cn('flex flex-col gap-14', classes.text({ style }))}>
        <BusinessHours hours={hours} />
        <div className="flex flex-col gap-4">
          <h4 className="type-h4">Find Us</h4>
          {findUs.length > 0 && <IconList items={findUs} />}
        </div>
      </div>
    </>
  )

  return (
    <div className="" data-theme="pizza">
      <div className="container">
        <Heading heading={heading} subheading={subheading} actions={links || []} />
      </div>

      {style === 'fancy' ? (
        <MaskBackground
          shape="paper"
          innerClassName="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] container gap-14 py-20"
        >
          {contentGrid}
        </MaskBackground>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] container gap-14 pt-8">
          {contentGrid}
        </div>
      )}
    </div>
  )
}
