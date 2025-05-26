import React from 'react'
import type { TimelineBlock as TimelineBlockType, Media } from '@/payload-types'

type Props = {
  disableInnerContainer?: boolean
} & TimelineBlockType

export const TimelineBlock: React.FC<Props> = ({ heading, subheading, events }) => {
  return (
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-3xl font-bold text-center mb-4">{heading}</h2>}
      {subheading && <p className="text-lg text-center text-gray-600 mb-8">{subheading}</p>}

      {events && events.length > 0 && (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

          <div className="space-y-12">
            {events.map((event: TimelineBlockType['events'][0], index: number) => {
              const isEven = index % 2 === 0

              return (
                <div
                  key={index}
                  className={`flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg shadow-lg p-6">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{event.year}</div>
                      <p className="text-gray-700 leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="w-2/12 flex justify-center">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                  </div>

                  {/* Image */}
                  <div className={`w-5/12 ${isEven ? 'pl-8' : 'pr-8'}`}>
                    {event.image && typeof event.image === 'object' && (
                      <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                          src={(event.image as Media).url || ''}
                          alt={(event.image as Media).alt || `Event from ${event.year}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
