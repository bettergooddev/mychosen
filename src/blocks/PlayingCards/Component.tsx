import { Heading } from '@/components/Heading'
import type { Card, PlayingCardsBlock as PlayingCardsBlockProps } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const PlayingCardsBlock: React.FC<PlayingCardsBlockProps> = async (props) => {
  const cardsResponse: Card = await getCachedGlobal('card', 1)()
  const cards = cardsResponse.cards
  const { heading, subheading } = props

  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} />
    </div>
  )
}
