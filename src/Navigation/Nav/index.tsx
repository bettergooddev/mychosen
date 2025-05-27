'use client'

import React from 'react'

import type { Navigation } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, ChevronDown } from 'lucide-react'

interface HeaderNavProps {
  navItems?: Navigation['navItems']
  actions?: Navigation['actions']
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ navItems, actions }) => {
  const renderNavigationItem = (
    item: NonNullable<Navigation['navItems']>[number] | NonNullable<Navigation['actions']>[number],
    index: number | string,
  ) => {
    const navItem = item.navigationItem

    if (!navItem) return null

    if (navItem.type === 'link' && navItem.link) {
      return <CMSLink key={index} {...navItem.link} appearance="link" />
    }

    if (navItem.type === 'dropdown' && navItem.dropdownLabel && navItem.dropdownItems) {
      return (
        <div key={index} className="relative group">
          <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
            {navItem.dropdownLabel}
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-card border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              {navItem.dropdownItems.map((dropdownItem, dropdownIndex) => (
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

  return (
    <nav className="flex gap-6 items-center">
      {/* Navigation Items */}
      {navItems?.map((item, index) => renderNavigationItem(item, index))}

      {/* Actions */}
      {actions?.map((item, index) => renderNavigationItem(item, `action-${index}`))}

      {/* Search Icon */}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary hover:text-primary/80 transition-colors" />
      </Link>
    </nav>
  )
}
