'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utilities/ui'

const hoursData = {
  hours: [
    {
      brand: {
        name: 'Cafe',
        slug: 'cafe',
      },
      monday: { openTime: '10am', closeTime: '9pm', isClosed: false },
      tuesday: { openTime: '10am', closeTime: '9pm', isClosed: false },
      wednesday: { openTime: '10am', closeTime: '9pm', isClosed: false },
      thursday: { openTime: '10am', closeTime: '9pm', isClosed: false },
      friday: { openTime: '10am', closeTime: '9pm', isClosed: false },
      saturday: { openTime: '9am', closeTime: '8pm', isClosed: false },
      sunday: { openTime: '9am', closeTime: '8pm', isClosed: false },
    },
    {
      brand: {
        name: 'Pizza',
        slug: 'pizza',
      },
      monday: { openTime: '9am', closeTime: '10pm', isClosed: false },
      tuesday: { openTime: '9am', closeTime: '10pm', isClosed: false },
      wednesday: { openTime: '9am', closeTime: '10pm', isClosed: false },
      thursday: { openTime: '9am', closeTime: '10pm', isClosed: false },
      friday: { openTime: '9am', closeTime: '10pm', isClosed: false },
      saturday: { openTime: '11am', closeTime: '6pm', isClosed: false },
      sunday: { isClosed: true },
    },
    {
      brand: {
        name: 'Sugar Shack',
        slug: 'sugar-shack',
      },
      monday: { openTime: '8am', closeTime: '4pm', isClosed: false },
      tuesday: { openTime: '8am', closeTime: '4pm', isClosed: false },
      wednesday: { isClosed: true },
      thursday: { openTime: '8am', closeTime: '4pm', isClosed: false },
      friday: { openTime: '8am', closeTime: '4pm', isClosed: false },
      saturday: { isClosed: true },
      sunday: { openTime: '7am', closeTime: '3pm', isClosed: false },
    },
  ],
}

type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

const daysOfWeek: Day[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export function BusinessHours() {
  const [currentDay, setCurrentDay] = React.useState('')

  React.useEffect(() => {
    // Note: In a real-world scenario, you might want to handle timezones.
    // new Date() uses the client's local time.
    const dayName = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase()
    setCurrentDay(dayName)
  }, [])

  return (
    <div className="w-full max-w-sm font-serif text-brown">
      <Tabs defaultValue={hoursData.hours[0]?.brand.slug}>
        <TabsList className="grid w-full grid-cols-3 bg-beige p-0 h-auto rounded-b-none rounded-t-lg">
          {hoursData.hours.map((business) => (
            <TabsTrigger
              key={business.brand.slug}
              value={business.brand.slug}
              className="py-3 text-base rounded-t-md rounded-b-none data-[state=active]:bg-maroon data-[state=active]:text-white data-[state=inactive]:bg-beige data-[state=inactive]:text-brown focus-visible:ring-offset-0 focus-visible:ring-2 focus-visible:ring-maroon"
            >
              {business.brand.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {hoursData.hours.map((business) => (
          <TabsContent
            key={business.brand.slug}
            value={business.brand.slug}
            className="bg-cream p-4 rounded-b-lg border border-t-0 border-beige mt-0"
          >
            <div className="space-y-2">
              {daysOfWeek.map((day, index) => {
                const hours = business[day as keyof typeof business] as {
                  openTime?: string
                  closeTime?: string
                  isClosed: boolean
                }
                const isCurrentDay = day === currentDay

                return (
                  <div
                    key={day}
                    className={cn(
                      'flex justify-between items-center py-3 px-2',
                      isCurrentDay && 'bg-beige rounded-md font-bold',
                      index !== 0 && 'border-t border-light-border',
                    )}
                  >
                    <p className="capitalize">{day}</p>
                    <p>{hours.isClosed ? 'Closed' : `${hours.openTime} - ${hours.closeTime}`}</p>
                  </div>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
