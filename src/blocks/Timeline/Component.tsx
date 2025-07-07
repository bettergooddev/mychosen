import type { TimelineBlock as TimelineBlockProps } from '@/payload-types'
import { Heading } from '@/components/Heading'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Media } from '@/components/Media'
import React from 'react'

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ heading, subheading, events }) => {
  if (!events || events.length === 0) return null

  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} />

      {/* Timeline carousel */}
      <Carousel
        opts={{
          align: 'start',
          loop: false,
        }}
        className="mt-8"
      >
        <CarouselContent className="-ml-4">
          {events.map((event) => (
            <TimelineEventItem key={event.id} event={event} />
          ))}
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

const TimelineEventItem: React.FC<{ event: NonNullable<TimelineBlockProps['events']>[number] }> = ({
  event,
}) => {
  return (
    <CarouselItem className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
      <div className="flex flex-col items-center text-center h-full p-4">
        <Media
          resource={event.image}
          className="aspect-square w-full max-w-[10rem] overflow-hidden rounded-md"
          imgClassName="size-full object-cover"
        />
        <p className="type-h5 text-foreground mt-4">{event.year}</p>
        {event.description && (
          <p className="type-body text-foreground/75 mt-2">{event.description}</p>
        )}
      </div>
    </CarouselItem>
  )
}
