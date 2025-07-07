'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { Props as MediaProps } from '@/components/Media/types'
import { cn } from '@/utilities/ui'
import { getSeededRotation } from './utils'

interface FrameProps extends MediaProps {
  children?: React.ReactNode
}

export const Frame: React.FC<FrameProps> = ({ className, children, ...mediaProps }) => {
  const rotation = getSeededRotation(mediaProps.resource)

  const frameStyles = {
    transform: `rotate(${rotation}deg)`,
  }

  const frameClassName = cn(
    'border-[10px] border-white drop-shadow-md transition-transform duration-300 !rounded-none',
    className,
  )

  // If children exist, render as a div wrapper
  if (children) {
    return (
      <div className={frameClassName} style={frameStyles}>
        {children}
      </div>
    )
  }

  // If no children, render the Media component as before
  return <Media className={frameClassName} style={frameStyles} {...mediaProps} />
}
