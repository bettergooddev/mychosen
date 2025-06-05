import React from 'react'
import { cva } from 'class-variance-authority'

import type { FeaturesBlock, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Heading } from '@/components/Heading'
import { Frame } from '@/components/Frame'

const galleryGridVariants = cva('grid gap-6', {
  variants: {
    imageCount: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    },
  },
  defaultVariants: {
    imageCount: 3,
  },
})

export const Gallery: React.FC<FeaturesBlock> = ({ heading, subheading, images }) => {
  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} />

      <div className="text-center mb-12">
        {/* Placeholder for future actions/CMS link buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {/* TODO: Add CMS link buttons here when needed */}
          {/* Example structure:
          <CMSLink {...primaryAction} size="lg" />
          <CMSLink {...secondaryAction} size="lg" appearance="outline" />
          */}
        </div>
      </div>

      {images && images.length > 0 && (
        <div
          className={galleryGridVariants({
            imageCount: images?.length as 1 | 2 | 3,
          })}
        >
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Frame
                resource={image}
                className="w-full overflow-hidden"
                imgClassName="w-full h-auto scale-[1.025]"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
