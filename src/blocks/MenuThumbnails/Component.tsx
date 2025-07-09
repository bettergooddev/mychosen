import { Heading } from '@/components/Heading'
import type { Menu, MenuThumbnailsBlock as MenuThumbnailsBlockType } from '@/payload-types'
import { DynamicIcon } from 'lucide-react/dynamic'
import { CMSLink } from '@/components/Link'
import { Frame } from '@/components/Frame'

export const MenuThumbnailsBlock: React.FC<MenuThumbnailsBlockType> = (props) => {
  const { heading, subheading, menus: menuProps = [] } = props

  const menus: Menu[] = (menuProps as any[]).filter(
    (menu): menu is Menu => typeof menu === 'object' && menu !== null,
  )

  return (
    <div className="container" data-theme="pizza">
      <Heading heading={heading} subheading={subheading} />

      <div className="grid gap-8 sm:grid-cols-2 max-w-xl mx-auto">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  )
}

const MenuCard: React.FC<{ menu: Menu }> = ({ menu }) => {
  const pdfUrl = typeof menu.pdf === 'object' ? (menu.pdf as any).url : '#'

  return (
    <CMSLink
      url={pdfUrl}
      newTab
      appearance="inline"
      className="flex flex-col items-stretch group shadow-md"
      label={null}
    >
      <Frame
        resource={menu.thumbnail}
        className="aspect-square overflow-hidden !rotate-0 drop-shadow-none !shadow-none"
        imgClassName="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 !rotate-0"
      />
      <div className="bg-primary text-background flex items-center gap-2 pb-4 pt-3 px-4 transition-opacity duration-200 group-hover:opacity-75">
        {menu.lucideIcon && (
          <DynamicIcon name={menu.lucideIcon as any} size={20} strokeWidth={2.25} />
        )}
        <span className="type-body font-medium -mb-1">{menu.name}</span>
      </div>
    </CMSLink>
  )
}
