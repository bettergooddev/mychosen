import type { Media as MediaType } from '@/payload-types'

type MediaResource = MediaType | string | number | null | undefined

export const getURLFromResource = (resource: MediaResource) => {
  if (typeof resource === 'object' && resource !== null) {
    return resource.url
  }
  return null
}
