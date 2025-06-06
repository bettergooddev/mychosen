import { Card } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'
import { getClientSideURL } from '@/utilities/getURL'
type CardType = NonNullable<Card['cards']>[number]

function PlayingCard({ card, className }: { card: CardType; className?: string }) {
  const hasPatternUrl = card?.pattern && typeof card.pattern === 'object' && card.pattern.url
  const isPrimary = card.logo && typeof card.logo === 'object' && card.logo.url

  const patternStyle = {
    opacity: isPrimary ? '0.1' : '0.065',
    backgroundSize: isPrimary ? '300px' : '10px',
  }

  return (
    <>
      <div
        className={cn(
          'relative theme-pizza border-foreground border-[6px] rounded-xl overflow-hidden aspect-[5/7] h-[10rem]',
          className,
        )}
      >
        <div className="absolute inset-0 theme-sugar-shack bg-background -z-[1]">
          {hasPatternUrl && (
            <div
              className="absolute -z-[1] inset-0 w-full h-full mix-blend-darken"
              style={{
                backgroundImage: `url(${getClientSideURL()}${(card.pattern as any).url})`,
                backgroundRepeat: 'repeat',
                ...patternStyle,
              }}
            />
          )}
        </div>

        <div className="relative theme-pizza size-full flex flex-col items-center justify-center text-center ">
          {card.logo && <Media resource={card.logo} className="size-28 object-contain mb-4" />}
          <h2 className="type-h2 text-foreground">{card.name}</h2>
        </div>
      </div>
    </>
  )
}

export default PlayingCard
