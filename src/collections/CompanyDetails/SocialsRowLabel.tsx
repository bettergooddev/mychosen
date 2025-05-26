'use client'

import { CompanyDetail } from '@/payload-types'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel = () => {
  const { data, rowNumber: rowNumberRaw } =
    useRowLabel<NonNullable<CompanyDetail['socials']>[number]>()

  const rowNumber = (rowNumberRaw || 0) + 1

  const customLabel = `${data.link?.label || `Social Item ${String(rowNumber).padStart(2, '0')}`}`

  return <div>{customLabel}</div>
}
