'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { Hour, Brand } from '@/payload-types'

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

type HoursType = NonNullable<Hour['hours']>
type DayType = HoursType[number]['monday']

export function BusinessHours({
  hours,
}: {
  hours: Array<NonNullable<HoursType> & { brand: Brand }>
}) {
  const defaultBrand = hours[0]?.brand?.toString() || ''

  const [currentDay, setCurrentDay] = React.useState('')

  React.useEffect(() => {
    const dayName = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase()
    setCurrentDay(dayName)
  }, [])

  if (!hours) return null

  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue={defaultBrand}>
        <TabsList className="grid w-full grid-cols-3">
          {hours.map(({ brand }) => (
            <TabsTrigger key={brand?.slug || ''} value={brand?.slug || ''}>
              {brand?.name || ''}
            </TabsTrigger>
          ))}
        </TabsList>
        {hours.map(({ brand, id, ...days }) => (
          <TabsContent key={brand?.slug || ''} value={brand?.slug || ''} className="mt-2">
            <Card>
              <CardContent className="p-4 space-y-1">
                {daysOfWeek.map((day, index) => (
                  <Day day={days[day as keyof typeof days]} index={index} key={index} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function Day({ day }: { day: Day }) {
  return (
    <div
      key={day}
      className={cn(
        'flex justify-between items-center py-2.5 px-2', // Add px-2 to all rows for consistency
        //   isCurrentDay && 'bg-muted rounded-md font-semibold',
        index !== 0 && 'border-t',
      )}
    >
      <p className="capitalize">{day}</p>
      <p>{days[index].isClosed ? 'Closed' : `${hours.openTime} - ${hours.closeTime}`}</p>
    </div>
  )
}

export default index
