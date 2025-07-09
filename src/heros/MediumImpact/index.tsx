'use client'

import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Frame } from '@/components/Frame'

export const MediumImpactHero: React.FC<Page['hero']> = (props) => {
  if (!props?.mediumImpact?.[0]) return null

  const { logo, heading, subheading, Buttons, image, theme = 'cafe' } = props.mediumImpact[0]

  const primary = Buttons?.primaryButton?.[0]?.link
  const secondary = Buttons?.secondaryButton?.[0]?.link
  const tertiary = Buttons?.tertiaryButton?.[0]?.link

  return (
    <div
      className="w-full pt-16 pb-32 flex flex-col items-center text-center px-4"
      data-theme={theme}
    >
      {logo && <Media resource={logo} className="w-48 h-auto" imgClassName="h-full w-auto" />}

      {heading && <h1 className="text-foreground mt-2 type-h1">{heading}</h1>}

      {subheading && (
        <p className="opacity-75 text-foreground mt-4 max-w-[60ch] mx-auto">{subheading}</p>
      )}

      {(primary || secondary || tertiary) && (
        <div className="flex flex-col items-center gap-4 justify-center mt-7">
          {(primary || secondary) && (
            <div className="flex flex-row gap-4">
              {secondary && <CMSLink {...secondary} appearance="secondary" />}
              {primary && <CMSLink {...primary} appearance="default" />}
            </div>
          )}
          {tertiary && (
            <CMSLink {...tertiary} appearance="link" className="opacity-75 hover:opacity-100" />
          )}
        </div>
      )}

      {image && <Media resource={image} className="mt-5 w-full max-w-screen-lg rotate-[1deg]" />}
    </div>
  )
}
