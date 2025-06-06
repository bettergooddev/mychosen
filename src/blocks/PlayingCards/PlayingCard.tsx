import { Card } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
type CardType = NonNullable<Card['cards']>[number]

function PlayingCard({ card, className }: { card: CardType; className?: string }) {
  return (
    <>
      <div
        className={cn(
          'theme-pizza border-foreground border-[6px] rounded-xl overflow-hidden aspect-[5/7] h-[10rem]',
          className,
        )}
      >
        <div className="theme-sugar-shack [&_*]:theme-pizza bg-background size-full flex flex-col items-center justify-center text-center ">
          {card.logo && <Media resource={card.logo} className="size-28 object-contain mb-4" />}
          <h2 className="type-h2 text-foreground">{card.name}</h2>
        </div>
      </div>
    </>
  )
}

export default PlayingCard
