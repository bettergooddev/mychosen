import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import type { Mask as MaskType, Media as MediaType } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

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
    <div className="absolute inset-0 flex flex-col">
      <div
        className="w-full h-auto"
        style={{
          backgroundImage: `url(${top.url})`,
          backgroundRepeat: 'no-repeat',
          aspectRatio: (top?.width || 1) / (top?.height || 1),
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      ></div>

      {/* <div
        className=""
        style={{
          opacity: config.polka.opacity / 100,
          backgroundImage: `url(${getClientSideURL()}${typeof top === 'string' ? top : top?.url})`,
          backgroundRepeat: 'repeat',
          backgroundSize: `${config.polka.size}px ${config.polka.size}px`,
        }}
      /> */}

      {children}
    </div>
  )
}
