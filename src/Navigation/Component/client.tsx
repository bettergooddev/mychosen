'use client'

import React from 'react'
import { NavLogo } from './logo'
import { renderNavigationItem } from './renderNavigationItem'
import type { Navigation as NavigationType } from '@/payload-types'

interface NavigationClientProps {
  data: NavigationType
}
export const NavigationClient: React.FC<NavigationClientProps> = ({ data }) => {
  const navItems = (data?.navItems ?? []) as NonNullable<NavigationType['navItems']>
  const actions = (data?.actions ?? []) as NonNullable<NavigationType['actions']>

  return (
    <header
      data-theme="sugar-shack"
      className="bg-background border-b border-primary/25 sticky top-0 z-50"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo – left aligned */}
        <div className="flex-shrink-0">
          <NavLogo logo={data?.logo ?? null} />
        </div>

        {/* Primary navigation items – centered */}
        <nav className="flex-1 flex items-center justify-center gap-6">
          {navItems.map((item, index) =>
            renderNavigationItem(item, index, { appearance: 'inline' }),
          )}
        </nav>

        {/* Actions – right aligned */}
        <div className="flex items-center gap-6" data-theme="cafe">
          {actions.map((item, index) => renderNavigationItem(item, `action-${index}`))}
        </div>
      </div>
    </header>
  )
}

export default NavigationClient
