import React from 'react'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { Footer as FooterType } from '@/payload-types'
import type { HoursType } from '@/collections/Hours/types'

import { FooterClient } from './client'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType

  const payload = await getPayload({ config: configPromise })
  const hoursData = await payload.findGlobal({
    slug: 'hours',
    depth: 1,
  })

  const hours = (hoursData.hours || []) as HoursType

  return <FooterClient data={footerData} hours={hours} />
}

export default Footer
