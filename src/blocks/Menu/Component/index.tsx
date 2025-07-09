import type { MenuBlock as MenuBlockType, Menu } from '@/payload-types'
import { MenuSelect } from './menu-select'

export const MenuBlock: React.FC<MenuBlockType> = ({ heading, subheading, menus: menuProps }) => {
  const menus =
    menuProps?.filter((menu): menu is Menu => typeof menu === 'object' && menu !== null) || []

  return (
    <div className="max-w-4xl mx-auto -mt-48" data-theme="pizza">
      <MenuSelect menus={menus} />
    </div>
  )
}
