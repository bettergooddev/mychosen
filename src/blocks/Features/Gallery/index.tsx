'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { motion, useInView } from 'motion/react'

import type { FeaturesBlock, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Heading } from '@/components/Heading'

export const Gallery: React.FC<FeaturesBlock> = ({ heading, subheading, images }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  // Determine grid layout based on number of images
  const getGridClasses = (imageCount: number) => {
    if (imageCount === 1) return 'grid-cols-1'
    if (imageCount === 2) return 'grid-cols-1 md:grid-cols-2'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  const imageCount = images?.length || 0

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

      {/* Images Grid */}
      {images && images.length > 0 && (
        <div className={`grid gap-6 ${getGridClasses(imageCount)}`}>
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Media
                resource={image}
                className="w-full"
                imgClassName="w-full h-auto rounded-lg border border-border"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
