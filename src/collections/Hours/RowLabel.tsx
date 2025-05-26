'use client'

import { useRowLabel } from '@payloadcms/ui'
import { v4 as uuidv4 } from 'uuid'

interface ContactInfoData {
  name?: string
}

export const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<ContactInfoData>()

  const customLabel = data?.name || `Contact Info ${String((rowNumber || 0) + 1).padStart(2, '0')}`

  return <div key={uuidv4()}>{customLabel}</div>
}
