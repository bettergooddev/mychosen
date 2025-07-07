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
    <Card className="w-full overflow-hidden bg-muted border h-min">
      <CardContent className="p-0">
        <Tabs defaultValue={hours[0]?.brand.slug || ''} className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-none h-auto p-1 bg-background">
            {hours.map((business) => (
              <TabsTrigger
                key={business.id}
                value={business.brand.slug || ''}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-sm"
              >
                {business.brand.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {hours.map((business) => (
            <TabsContent key={business.id} value={business.brand.slug || ''} className="m-0">
              <Table>
                <TableBody>
                  {createWeekObject(business).map((item, index, arr) => {
                    const isToday = item.day === today
                    return (
                      <TableRow
                        key={item.day}
                        className={cn(
                          'border-background/50 hover:bg-transparent',
                          isToday && 'bg-black/5 font-bold hover:bg-black/5',
                          !isToday && 'font-medium',
                          index === arr.length - 1 && 'border-b-0',
                        )}
                      >
                        <TableCell className="px-4 py-3">{item.day}</TableCell>
                        <TableCell className="px-4 py-3 text-right">{item.hours}</TableCell>
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
