'use client'

import type { ArchiveBlock, Menu } from '@/payload-types'
import { MenuSelect } from './menu-select'

export const Menus: React.FC<ArchiveBlock> = (props) => {
  // Filter out string references and keep only Menu objects
  const menuObjects = (props.menus || []).filter(
    (menu): menu is Menu => typeof menu === 'object' && menu !== null,
  )

  const hasMultipleMenus = menuObjects.length > 1

  return (
    <div className="container -mt-48" data-theme="pizza">
      {hasMultipleMenus && (
        <>
          <h4 className="type-h4 mb-4">Select a Menu:</h4>
          <MenuSelect menus={menuObjects} />
        </>
      )}
    </div>
  )
}
