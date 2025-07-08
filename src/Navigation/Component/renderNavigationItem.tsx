import React from 'react'
import { ChevronDown } from 'lucide-react'

import { CMSLink } from '@/components/Link'
import type { Navigation as NavigationType } from '@/payload-types'

export const renderNavigationItem = (
  item:
    | NonNullable<NavigationType['navItems']>[number]
    | NonNullable<NavigationType['actions']>[number],
  index: number | string,
): React.ReactNode => {
  const navItem = item.navigationItem
  if (!navItem) return null

  // Simple link
  if (navItem.type === 'link' && navItem.link) {
    return <CMSLink key={index} {...navItem.link} appearance="link" />
  }

  // Dropdown with sub-items
  if (navItem.type === 'dropdown' && navItem.dropdown?.label && navItem.dropdown?.items) {
    return (
      <div key={index} className="relative group">
        <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
          {navItem.dropdown.label}
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="py-2">
            {navItem.dropdown.items.map((dropdownItem, dropdownIndex) => (
              <CMSLink
                key={dropdownIndex}
                {...dropdownItem.link}
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default renderNavigationItem
