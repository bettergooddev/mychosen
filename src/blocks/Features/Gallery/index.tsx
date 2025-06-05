import React from 'react'
import { cva } from 'class-variance-authority'
import { tv } from 'tailwind-variants'

import type { FeaturesBlock, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Heading } from '@/components/Heading'
import { Frame } from '@/components/Frame'

const classes = {
  grid: tv({
    variants: {
      imageCount: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      },
    },
    defaultVariants: {
      imageCount: 3,
    },
  }),
}

export const Gallery: React.FC<FeaturesBlock> = ({ heading, subheading, images }) => {
  const hasSupportedNumberOfImages =
    images?.length && images.length in classes.grid['variants']['imageCount']

  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} />
      {hasSupportedNumberOfImages && <GalleryGrid images={images} />}
    </div>
  )
}

const GalleryGrid = ({ images }: { images: (string | MediaType)[] }) => {
  const imageCount = images?.length as keyof (typeof classes.grid)['variants']['imageCount']

  return (
    <div className={cn('grid gap-6', classes.grid({ imageCount }))}>
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
  )
}
