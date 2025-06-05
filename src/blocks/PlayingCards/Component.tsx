import { Heading } from '@/components/Heading'
import { MaskBackground } from '@/components/MaskBackground'
import type { Card, PlayingCardsBlock as PlayingCardsBlockProps } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const PlayingCardsBlock: React.FC<PlayingCardsBlockProps> = async (props) => {
  const cardsResponse: Card = await getCachedGlobal('card', 1)()
  const cards = cardsResponse.cards
  const { heading, subheading } = props

  return (
    <div className="relative py-16">
      <div className="container">
        <Heading heading={heading} subheading={subheading} />
      </div>

      <MaskBackground>
        <div className="container">
          <Heading heading={heading} subheading={subheading} />
        </div>
      </MaskBackground>
    </div>
  )
}
