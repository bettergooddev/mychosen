import { NavigationClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Navigation } from '@/payload-types'

export async function Navigation() {
  // Check footer for how it used to grab this data and choose accordingly. claude insisteted on changing it into this but this was not the original approach.
  // const navigationData = (await getCachedGlobal('navigation', 1)()) as Navigation

  return (
    <></>
    // <NavigationClient data={navigationData} />
  )
}
