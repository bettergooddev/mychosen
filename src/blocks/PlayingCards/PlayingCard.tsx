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
        <div className="theme-sugar-shack bg-background size-full">
          {card.logo && <Media resource={card.logo} className="size-32 object-contain" />}
          <h2 className="type-h2">{card.name}</h2>
        </div>
      </div>
    </>
  )
}

export default PlayingCard
