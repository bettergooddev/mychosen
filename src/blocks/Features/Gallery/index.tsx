'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useLayoutEffect, useRef } from 'react'

import type { FeaturesBlock, Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { annotate } from 'rough-notation'
import { RoughAnnotation } from 'rough-notation/lib/model'

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

class Annotation {
  constructor(
    public element: HTMLElement,
    public annotation: RoughAnnotation,
  ) {
    this.element = element
    this.annotation = annotation
  }

  static create(element: HTMLElement) {
    const annotation = annotate(element, { type: 'underline' })
    return new Annotation(element, annotation)
  }

  show() {
    this.annotation.show()
  }

  hide() {
    this.annotation.hide()
  }
}

const Heading = ({
  heading,
  subheading,
}: {
  heading?: FeaturesBlock['heading']
  subheading?: string | null
}) => {
  const textWrapper = useRef<HTMLDivElement>(null)
  const annotations = useRef<Annotation[]>([])

  useEffect(() => {
    if (!textWrapper.current) return
    const text = textWrapper.current.querySelectorAll('em') as NodeListOf<HTMLElement>

    text.forEach((t) => {
      const annotation = Annotation.create(t)
      annotation.show()
      annotations.current.push(annotation)
    })

    return () => {
      annotations.current.forEach((a) => a.hide())
      annotations.current = []
    }
  }, [])

  return (
    <div className="container" data-theme="sugar-shack">
      {heading && (
        <div className="mb-6" ref={textWrapper}>
          <RichText
            data={heading}
            enableGutter={false}
            className={cn(
              'prose-center [&_*]:text-foreground type-h1 text-center',
              '[&_em]:type-h2-accent [&_em]:theme-pizza',
            )}
          />
        </div>
      )}

      {subheading && (
        <p className="opacity-75 type-body text-center text-foreground mx-auto max-w-[52ch]">
          {subheading}
        </p>
      )}
    </div>
  )
}
