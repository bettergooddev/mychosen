import { Heading } from '@/components/Heading'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { TimelineBlock as TimelineBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ChevronRight } from 'lucide-react'

export const TimelineBlock = (props: TimelineBlockType) => {
  const { heading, subheading, events } = props

  return (
    <div className="overflow-hidden py-16">
      <div className="container">
        <Heading heading={heading} subheading={subheading} />

        <div className="relative grid auto-cols-fr grid-cols-1 md:flex">
          {events.map((item, index) => (
            <TimelineItem
              key={index}
              isFirstItem={index === 0}
              isLastItem={index === events.length - 1}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const TimelineItem = ({
  image,
  year,
  description,
  isFirstItem,
  isLastItem,
}: {
  image: string | MediaType
  year: number
  description: string
  isFirstItem: boolean
  isLastItem: boolean
  id?: string | null
}) => {
  return (
    <div className="relative grid auto-cols-fr grid-cols-[0.5fr_max-content_1fr] items-start gap-4 md:flex md:flex-col md:items-center md:gap-0">
      <div className="mb-8 w-full overflow-hidden md:mb-0 md:w-3/5">
        <Media resource={image} className="w-full" />
      </div>
      <div className="relative flex flex-col items-center self-stretch md:mb-4 md:mt-8 md:w-full md:flex-row md:self-auto">
        {isFirstItem && (
          <div className="absolute left-0 top-1.5 z-10 hidden h-1 w-16 bg-gradient-to-r from-background-primary to-transparent md:block" />
        )}
        <div className="h-2 w-[3px] bg-neutral-black md:h-[3px] md:w-full" />
        <div className="z-20 size-[0.9375rem] flex-none rounded-full bg-neutral-black shadow-[0_0_0_8px_white]" />
        <div
          className={cn('h-full w-[3px] bg-neutral-black md:h-[3px] md:w-full', {
            'hidden md:block': isLastItem,
          })}
        />
        {isLastItem && (
          <div className="absolute right-0 top-1.5 z-0 hidden h-1 w-16 bg-gradient-to-l from-background-primary to-transparent md:block" />
        )}
      </div>
      <div className="pb-4 sm:pb-0 md:mb-0 md:px-3 md:text-center">
        <h3 className="mb-2 text-xl font-bold md:text-2xl">{year}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}
