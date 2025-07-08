import type { Menu } from '@/payload-types'
import { getClientSideURL } from '@/utilities/getURL'

/**
 * Derive an absolute URL for the PDF attached to a menu.
 *
 * Handles both Media objects and raw string URLs stored in the `pdf` field.
 */
export const getPdfUrl = (menu?: Menu): string | undefined => {
  if (!menu) return undefined

  const { pdf } = menu

  // If pdf is a Media object created by PayloadCMS
  if (typeof pdf === 'object' && pdf !== null && 'url' in pdf) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - Payload types don\'t expose url directly on Media union type
    const mediaUrl: string | undefined = (pdf as any).url
    if (mediaUrl) {
      return `${getClientSideURL()}${mediaUrl}`
    }
  }

  // If pdf is already a string URL
  if (typeof pdf === 'string') {
    return pdf
  }

  return undefined
}
