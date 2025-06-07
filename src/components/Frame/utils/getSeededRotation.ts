import type { Media as MediaType } from '@/payload-types'
import { seededRandom } from './seededRandom'
import { stringToSeed } from './stringToSeed'
import { getURLFromResource } from './getURLFromResource'

type MediaResource = MediaType | string | number | null | undefined

export const getSeededRotation = (resource: MediaResource, rotationRange: number = 2): number => {
  const url = getURLFromResource(resource)
  if (!url) return 0

  const seed = stringToSeed(url)
  return (seededRandom(seed) - 0.5) * rotationRange
}
