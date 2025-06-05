import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Mask as MaskType, Media as MediaType } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'
import { Mask } from './Mask'

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

  const top = {
    ...maskTop,
    url: `${getClientSideURL()}${maskTop.url}`,
  }

  const bottom = {
    ...maskBottom,
    url: `${getClientSideURL()}${maskBottom.url}`,
  }

  if (!mask) return null

  // Configuration for the mask styling
  //   const config = {
  //     polka: {
  //       size: 15,
  //       opacity: 1.5,
  //     },
  //     blanket: {
  //       size: 700,
  //       opacity: 5,
  //     },
  //   }

  return (
    <div className="relative flex flex-col">
      <Mask media={top} className="bg-red-500" />
      {children}
      <Mask media={bottom} className="bg-blue-500" />
    </div>
  )
}
