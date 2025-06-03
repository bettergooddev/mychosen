'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

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

  const imagePool1 = media.slice(0, Math.floor(media.length / 2))
  const imagePool2 = media.slice(Math.floor(media.length / 2))

  return (
    <>
      <section className="relative h-screen overflow-hidden" data-theme="cafe">
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
      {/* <section id="relume" className="">
        <div className="flex w-screen justify-start overflow-hidden">
          <div className="grid shrink-0 grid-cols-1 gap-y-4">
            <div className="grid w-full animate-marquee-top auto-cols-fr grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((_, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {imagePool1.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <Media
                        resource={image}
                        className="absolute inset-0 size-full object-cover"
                        imgClassName="size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="grid w-full animate-marquee-bottom grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((_, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {imagePool2.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[75%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <Media
                        resource={image}
                        className="absolute inset-0 size-full object-cover"
                        imgClassName="size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
    </>
  )
}

const HeroBackground: React.FC<{
  backgroundLayers?: (string | MediaType)[] | null
  scrollY: number
}> = ({ backgroundLayers, scrollY }) => {
  const [rightLayer, centerLayer, leftLayer] = backgroundLayers || []

  return (
    <div className="absolute inset-0">
      {rightLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <Media
            resource={rightLayer}
            className="size-full absolute inset-0"
            imgClassName={`size-full object-cover`}
          />
        </div>
      )}

      {centerLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        >
          <Media
            resource={centerLayer}
            className="size-full absolute inset-0"
            imgClassName={`size-full object-cover`}
          />
        </div>
      )}

      {leftLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          <Media
            resource={leftLayer}
            className="size-full absolute inset-0"
            imgClassName={`size-full object-cover`}
          />
        </div>
      )}
    </div>
  )
}
