import { HoursType } from '@/collections/Hours/types'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/utilities/ui'

const weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

function createWeekObject(business: HoursType[number]) {
  return weekdays.map((day) => {
    const dayData = business[day]
    const dayName = day.charAt(0).toUpperCase() + day.slice(1)

    if (!dayData || dayData.isClosed) {
      return { day: dayName, hours: 'Closed' }
    }

    return {
      day: dayName,
      hours: `${dayData.openTime} - ${dayData.closeTime}`,
    }
  })
}

export function BusinessHours({ hours }: { hours: HoursType }) {
  const today = new Date().toLocaleString('en-us', { weekday: 'long' })

  if (!hours || hours.length === 0) return <Fallback />

  return (
    <Card
      className="w-full overflow-hidden bg-background h-min shadow-md rounded-none border-none"
      data-theme="sugar-shack"
    >
      <CardContent className="p-0">
        <Tabs defaultValue={hours[0]?.brand.slug || ''} className="w-full" data-theme="pizza">
          <TabsList className="grid w-full grid-cols-3 rounded-none h-auto p-0.5 relative bg-transparent">
            {hours.map((business) => (
              <TabsTrigger
                key={business.id}
                value={business.brand.slug || ''}
                className="!type-h5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm py-2 z-10 "
              >
                {business.brand.name}
              </TabsTrigger>
            ))}

            <div
              className={cn(
                'absolute inset-0 bg-muted z-0 theme-sugar-shack',
                // 'border-b border-primary/15',
              )}
            />
          </TabsList>

          {hours.map((business) => (
            <TabsContent
              key={business.id}
              value={business.brand.slug || ''}
              className="m-0"
              data-theme="sugar-shack"
            >
              <Table>
                <TableBody>
                  {createWeekObject(business).map((item, index, arr) => {
                    const isToday = item.day === today
                    return (
                      <TableRow
                        key={item.day}
                        className={cn(
                          'border-primary/5 border-b hover:bg-transparent',
                          isToday &&
                            'bg-muted/50 [&_*]:!font-bold [&_*]:theme-pizza [&_*]:text-foreground hover:bg-muted/50 border-none',
                          index === arr.length - 1 && 'border-b-0',
                        )}
                      >
                        <TableCell className="type-button px-3 py-2">{item.day}</TableCell>
                        <TableCell className="type-button px-3 py-2 text-right">
                          {item.hours}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

function Fallback() {
  return (
    <Card className="w-full max-w-md overflow-hidden">
      <CardContent className="p-4 text-center">No hours available.</CardContent>
    </Card>
  )
}

export default Fallback
