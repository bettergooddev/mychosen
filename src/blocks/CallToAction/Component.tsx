import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Heading } from '@/components/Heading'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ heading, subheading, links }) => {
  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} />
    </div>
  )
}
