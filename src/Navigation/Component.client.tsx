'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Navigation } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { HeaderNav } from './Nav'

interface NavigationClientProps {
  data: Navigation
}

export const NavigationClient: React.FC<NavigationClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const { logo, navItems, actions } = data || {}

  return (
    <header className="container relative z-20   " {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex justify-between items-center">
        {/* Brand Section */}
        <div className="flex items-center">
          {logo?.link ? (
            <CMSLink {...logo.link} className="flex items-center">
              {/* Desktop Logo */}
              <div className="hidden md:block">
                {logo.desktopLogo && typeof logo.desktopLogo === 'object' && (
                  <Media resource={logo.desktopLogo} className="max-h-12" />
                )}
              </div>
              {/* Mobile Logo */}
              <div className="block md:hidden">
                {logo.mobileLogo && typeof logo.mobileLogo === 'object' && (
                  <Media resource={logo.mobileLogo} className="max-h-10" />
                )}
              </div>
            </CMSLink>
          ) : (
            <div className="flex items-center">
              {/* Desktop Logo */}
              <div className="hidden md:block">
                {logo?.desktopLogo && typeof logo.desktopLogo === 'object' && (
                  <Media resource={logo.desktopLogo} className="max-h-12" />
                )}
              </div>
              {/* Mobile Logo */}
              <div className="block md:hidden">
                {logo?.mobileLogo && typeof logo.mobileLogo === 'object' && (
                  <Media resource={logo.mobileLogo} className="max-h-10" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <HeaderNav navItems={navItems} actions={actions} />
      </div>
    </header>
  )
}
