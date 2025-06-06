import { Card } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
type CardType = NonNullable<Card['cards']>[number]

function PlayingCard({ card, className }: { card: CardType; className?: string }) {
  return (
    <>
      <div className={cn('theme-sugar-shack bg-background aspect-[5/7] h-[10rem]', className)}>
        <Media resource={card.logo} className="size-32 object-contain" />
      </div>
    </>
  )
}

export default PlayingCard
