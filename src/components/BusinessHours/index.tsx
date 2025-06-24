import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/utilities/ui'
import { Hour, Brand } from '@/payload-types'

// TODO: Working on the hours component.

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

type HoursType = NonNullable<Hour['hours']>
type DayType = HoursType[number]['monday']

export function BusinessHours({
  hours,
}: {
  hours: Array<NonNullable<Hour['hours']>[number] & { brand: Brand }>
}) {
  const defaultBrand = hours[0]?.brand?.toString() || ''

  if (!hours) return null

  return (
    <div className="w-full max-w-md">
      {/* <Tabs defaultValue={defaultBrand}>
        <TabsList className="grid w-full grid-cols-3">
          {hours.map(({ brand }) => (
            <TabsTrigger key={brand?.slug || ''} value={brand?.slug || ''}>
              {brand?.name || ''}
            </TabsTrigger>
          ))}
        </TabsList>
        {hours.map((hours) => (
          <TabsContent key={brand?.slug || ''} value={brand?.slug || ''} className="mt-2">
            <Card>
              <CardContent className="p-4 space-y-1">
                {daysOfWeek.map((dayName, index) => (
                  <Day day={days[dayName]} key={index} index={index} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs> */}
    </div>
  )
}
function Day({ day, index }: { day: DayType; index: number }) {
  return (
    <div
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
