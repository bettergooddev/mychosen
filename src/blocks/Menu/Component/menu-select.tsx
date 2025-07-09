'use client'

import type { Menu } from '@/payload-types'
import { DynamicIcon } from 'lucide-react/dynamic'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

interface MenuSelectProps {
  menus: Menu[]
}

export const MenuSelect: React.FC<MenuSelectProps> = ({ menus }) => {
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null)

  return (
    <Select
      value={selectedMenu?.id}
      onValueChange={(value) => setSelectedMenu(menus.find((menu) => menu.id === value) || null)}
    >
      <SelectTrigger className="w-full bg-primary text-background h-14 rounded-none">
        <SelectValue>
          {selectedMenu && (
            <div className="flex items-center pl-1 gap-3 text-background">
              {selectedMenu.lucideIcon && (
                <DynamicIcon name={selectedMenu.lucideIcon as any} size={24} strokeWidth={2.25} />
              )}
              <div className="flex flex-col items-start">
                <span className="type-body text-background -mb-1">{selectedMenu.name}</span>
              </div>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>

      <SelectContent className="rounded-none" data-theme="pizza">
        {menus.map((menu) => (
          <SelectItem
            key={menu.id}
            value={menu.id}
            className="focus:bg-secondary py-3 rounded-none"
          >
            <div className="flex items-center pl-1 gap-2">
              {menu.lucideIcon && <DynamicIcon name={menu.lucideIcon as any} size={20} />}
              <div className="flex flex-col items-start">
                <span className="type-body text-foreground -mb-1">{menu.name}</span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
