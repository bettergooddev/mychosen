import { Card } from '@/payload-types'
type CardType = NonNullable<Card['cards']>[number]

function PlayingCard({ card }: { card: CardType }) {
  return <div>{card.name}</div>
}

export default PlayingCard
