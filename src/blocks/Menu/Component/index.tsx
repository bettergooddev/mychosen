'use client'

import type { MenuBlock as MenuBlockType, Menu } from '@/payload-types'
import { IconSelect } from '../../../components/ui/icon-select'
import { useEffect, useState } from 'react'

export const MenuBlock: React.FC<MenuBlockType> = ({ heading, subheading, menus: menuProps }) => {
  const menus =
    menuProps?.filter((menu): menu is Menu => typeof menu === 'object' && menu !== null) || []

  const [selectedMenuId, setSelectedMenuId] = useState<string | undefined>(menus[0]?.id)

  return (
    <div className="max-w-4xl mx-auto -mt-48" data-theme="pizza">
      {menus.length > 1 && (
        <IconSelect items={menus} selected={selectedMenuId} onChange={setSelectedMenuId} />
      )}
    </div>
  )
}
