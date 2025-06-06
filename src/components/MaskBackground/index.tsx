import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Mask as MaskType, Media as MediaType } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'
import { Mask } from './Mask'
import { Media } from '../Media'

interface MaskBackgroundProps {
  children: React.ReactNode
  shape?: 'wood' | 'paper'
}

export async function MaskBackground({ children, shape = 'wood' }: MaskBackgroundProps) {
  const masksData: MaskType = await getCachedGlobal('masks', 1)()
  const { masks } = masksData

  const mask = masks?.find((mask) => mask.name == shape) as NonNullable<MaskType['masks']>[number]

  const maskTop = mask.top as MediaType
  const maskBottom = mask.bottom as MediaType
  const backgroundImage = mask.backgroundImage as MediaType | null

  const top = {
    ...maskTop,
    fullUrl: `${getClientSideURL()}${maskTop.url}`,
  }

  const bottom = {
    ...maskBottom,
    fullUrl: `${getClientSideURL()}${maskBottom.url}`,
  }

  if (!mask) return null

  return (
    <div className="relative flex flex-col overflow-hidden">
      {backgroundImage ? (
        <Media
          resource={backgroundImage}
          className="absolute -z-10 size-full object-cover"
          imgClassName="size-full object-cover"
        />
      ) : (
        <div className="absolute -z-10 size-full bg-foreground" />
      )}

      <Mask media={top} className="theme-sugar-shack bg-background -translate-y-[2px]" />
      {children}
      <Mask media={bottom} className="theme-sugar-shack bg-background translate-y-[2px]" />
    </div>
  )
}
