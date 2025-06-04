'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { Props as MediaProps } from '@/components/Media/types'
import { cn } from '@/utilities/ui'

export const Frame: React.FC<MediaProps> = ({ className, ...mediaProps }) => {
  return (
    <Media className={cn('border-[10px] border-white drop-shadow-md', className)} {...mediaProps} />
  )
}
