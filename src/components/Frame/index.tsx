'use client'

import React, { useMemo } from 'react'
import { Media } from '@/components/Media'
import type { Props as MediaProps } from '@/components/Media/types'
import { cn } from '@/utilities/ui'

export const Frame: React.FC<MediaProps> = ({ className, ...mediaProps }) => {
  const randomRotation = useMemo(() => {
    return (Math.random() - 0.5) * 2
  }, [])

  return (
    <Media
      className={cn('border-[10px] border-white drop-shadow-md !rounded-none', className)}
      style={{
        transform: `rotate(${randomRotation}deg)`,
      }}
      {...mediaProps}
    />
  )
}
