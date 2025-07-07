import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { Heading } from '@/components/Heading'
import React from 'react'
import { DesktopCarousel } from './Desktop'
import { MobileTimeline } from './Mobile'

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ heading, subheading, events }) => {
  if (!events || events.length === 0) return null

  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} />

      {/* Mobile (vertical list) */}
      <MobileTimeline events={events} className="md:hidden" />

      {/* Desktop (carousel) */}
      <DesktopCarousel events={events} className="hidden md:block" />
    </div>
  )
}
