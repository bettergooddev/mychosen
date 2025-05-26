import React from 'react'

import type { ArchiveBlock } from '@/payload-types'

import { Menus } from './Menus'

const archives = {
  menus: Menus,
}

export const RenderArchive: React.FC<ArchiveBlock> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const ArchiveToRender = archives[type as keyof typeof archives]

  if (!ArchiveToRender) return null

  return <ArchiveToRender {...props} />
}
