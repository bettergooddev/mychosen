import { NavigationClient } from '@/Navigation/Nav/client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Navigation } from '@/payload-types'

export async function Navigation() {
  const navigationData = (await getCachedGlobal('navigation', 1)()) as Navigation

  return <NavigationClient data={navigationData} />
}
