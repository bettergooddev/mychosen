import type { MenuBlock as MenuBlockType, Menu } from '@/payload-types'
import { MenuSelect } from './menu-select'

export const MenuBlock: React.FC<MenuBlockType> = ({ heading, subheading, menus }) => {
  // Filter out string IDs and only use populated Menu objects
  const populatedMenus =
    menus?.filter((menu): menu is Menu => typeof menu === 'object' && menu !== null) || []

  return (
    <div className="container">
      {heading && <h2 className="text-3xl font-bold mb-4">{heading}</h2>}
      {subheading && <p className="text-lg mb-6">{subheading}</p>}

      {populatedMenus.length > 0 ? (
        <MenuSelect menus={populatedMenus} />
      ) : (
        <p>No menus available</p>
      )}
    </div>
  )
}
