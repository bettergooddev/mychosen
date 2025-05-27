'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<NonNullable<Footer['sitemap']>['footerItems']>[number]>()

  let label = `Row ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}`

  if (data?.data?.navigationItem) {
    const navItem = data.data.navigationItem

    if (navItem.type === 'link' && navItem.link?.label) {
      label = navItem.link.label
    } else if (navItem.type === 'dropdown' && navItem.dropdown?.label) {
      label = navItem.dropdown.label
    }
  }

  return <div>{label}</div>
}
