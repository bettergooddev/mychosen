'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { Props as MediaProps } from '@/components/Media/types'
import { cn } from '@/utilities/ui'
import { getSeededRotation } from './utils'

export const Frame: React.FC<MediaProps> = ({ className, ...mediaProps }) => {
  const rotation = getSeededRotation(mediaProps.resource)

  return (
    <Media
      className={cn(
        'border-[10px] border-white drop-shadow-md transition-transform duration-300 !rounded-none',
        className,
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
      {...mediaProps}
    />
  )
}
