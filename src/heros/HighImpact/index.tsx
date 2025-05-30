'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type ImageProps = {
  src: string
  alt?: string
}

const galleryImages: ImageProps[] = [
  {
    src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
    alt: 'Relume placeholder image 1',
  },
  {
    src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
    alt: 'Relume placeholder image 2',
  },
  {
    src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
    alt: 'Relume placeholder image 3',
  },
  {
    src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
    alt: 'Relume placeholder image 4',
  },
  {
    src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
    alt: 'Relume placeholder image 5',
  },
  {
    src: 'https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg',
    alt: 'Relume placeholder image 6',
  },
]

export const HighImpactHero: React.FC<Page['hero']> = (props) => {
  if (!props?.highImpact?.[0]) return null

  const { logos, heading, subheading, media, backgroundLayers } = props?.highImpact?.[0]
  const [logoLeft, logoCenter, logoRight] = logos || []

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <section className="relative h-screen overflow-hidden bg-amber-200" data-theme="green">
        <HeroBackground backgroundLayers={backgroundLayers} scrollY={scrollY} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          {/* Logos */}
          {logos && logos.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 md:mb-12 mb-14 w-full container md:max-w-screen-lg max-w-[360px] md:px-12 px-0 md:-mt-[8%]">
              <div className="flex w-full justify-between gap-10 md:contents">
                <CMSLink
                  {...logoLeft?.link}
                  appearance="inline"
                  label={null}
                  className="w-1/2 md:w-1/4 md:order-1"
                >
                  <Media resource={logoLeft?.logo} className="h-auto" imgClassName="size-full" />
                </CMSLink>
                <CMSLink
                  {...logoRight?.link}
                  appearance="inline"
                  label={null}
                  className="w-1/2 md:w-1/4 md:order-3"
                >
                  <Media resource={logoRight?.logo} className="h-auto" imgClassName="size-full" />
                </CMSLink>
              </div>

              <CMSLink
                {...logoCenter?.link}
                appearance="inline"
                label={null}
                className="w-3/4 md:w-2/4 md:order-2"
              >
                <Media resource={logoCenter?.logo} className="h-auto" imgClassName="size-full" />
              </CMSLink>
            </div>
          )}

          <div className="prose max-w-screen-lg text-center flex flex-col items-center">
            <h1 className="mb-0 text-foreground">{heading}</h1>
            {subheading && <p className="max-w-[46ch] mb-12 text-foreground">{subheading}</p>}
          </div>

          {/* Down Arrow */}
          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 text-foreground" />
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section id="relume" className="">
        <div className="flex w-screen justify-start overflow-hidden">
          <div className="grid shrink-0 grid-cols-1 gap-y-4">
            <div className="grid w-full animate-marquee-top auto-cols-fr grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((e, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {galleryImages.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <img
                        className="absolute inset-0 size-full object-cover"
                        src={image.src}
                        alt={image.alt}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="grid w-full animate-marquee-bottom grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((e, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {galleryImages.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <img
                        className="absolute inset-0 size-full object-cover"
                        src={image.src}
                        alt={image.alt}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const HeroBackground: React.FC<{
  backgroundLayers?: (string | MediaType)[] | null
  scrollY: number
}> = ({ backgroundLayers, scrollY }) => {
  return (
    <div className="absolute inset-0">
      {backgroundLayers?.map((layer, index) => {
        // Define parallax speeds for each layer (slowest to fastest)
        const parallaxSpeeds = [0.1, 0.15, 0.2, 0.25, 0.3]
        const parallaxSpeed = parallaxSpeeds[index] || 0.1

        return (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              transform: `translateY(${scrollY * parallaxSpeed}px)`,
            }}
          >
            <Media
              resource={layer}
              className="size-full absolute inset-0"
              imgClassName={`size-full object-cover`}
            />
          </div>
        )
      })}
    </div>
  )
}
