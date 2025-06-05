import React from 'react'
import type { Media as MediaType } from '@/payload-types'

interface MaskProps {
  media: MediaType & { url: string }
  className?: string
}

export function Mask({ media, className = '' }: MaskProps) {
  return (
    <div
      className={`w-full h-auto ${className}`}
      style={{
        maskImage: `url(${media.url})`,
        maskSize: 'cover',
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        aspectRatio: (media?.width || 1) / (media?.height || 1),
      }}
    ></div>
  )
}
