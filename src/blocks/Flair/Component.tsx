import React from 'react'
import { cva } from 'class-variance-authority'
import { tv } from 'tailwind-variants'

import type { FlairBlock as FlairBlockType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import { Heading } from '@/components/Heading'
import { Frame } from '@/components/Frame'

export const FlairBlock: React.FC<FlairBlockType> = ({ image }) => {
  return (
    <div className="relative -z-10 w-full">
      <div className="absolute w-full h-[100dvh] top-1/2 -translate-y-1/2 opacity-[0.8] scale-[1.15] overflow-hidden">
        <Media
          resource={image}
          className="w-full h-full object-cover -translate-y-[4rem] mix-blend-darken"
          imgClassName="size-full object-cover mix-blend-darken"
        />
      </div>
    </div>
  )
}
