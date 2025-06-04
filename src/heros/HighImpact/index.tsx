'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Frame } from '@/components/Frame'

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
      <section className="relative h-[110dvh] overflow-hidden" data-theme="cafe">
        <HeroBackground backgroundLayers={backgroundLayers} scrollY={scrollY} />

        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          {/* Logos */}
          {logos && logos.length > 0 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16 md:mb-12 mb-[4rem] w-full container md:max-w-screen-lg max-w-[360px] md:px-12 px-0 md:-mt-[13%] -mt-[40%]">
              <CMSLink
                {...logoCenter?.link}
                appearance="inline"
                label={null}
                className="w-[70%] md:w-[35%] md:order-2"
              >
                <Media resource={logoCenter?.logo} className="h-auto" imgClassName="size-full" />
              </CMSLink>

              <div className="flex w-full justify-center gap-8 md:contents">
                <CMSLink
                  {...logoLeft?.link}
                  appearance="inline"
                  label={null}
                  className="w-[35%] md:w-[17.5%] md:order-1"
                >
                  <Media resource={logoLeft?.logo} className="h-auto" imgClassName="size-full" />
                </CMSLink>
                <CMSLink
                  {...logoRight?.link}
                  appearance="inline"
                  label={null}
                  className="w-[35%] md:w-[17.5%] md:order-3"
                >
                  <Media resource={logoRight?.logo} className="h-auto" imgClassName="size-full" />
                </CMSLink>
              </div>
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
      <section id="relume" className="-mt-32">
        <div className="flex w-screen justify-start overflow-hidden">
          <div className="grid shrink-0 grid-cols-1 gap-y-4">
            <div className="grid w-full animate-marquee-top auto-cols-fr grid-cols-2 gap-4 self-center">
              {[...new Array(2)].map((_, index) => (
                <div key={index} className="grid w-full grid-flow-col gap-4">
                  {imagePool1.map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="relative w-[60vw] pt-[110%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <Frame
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
                      className="relative w-[60vw] pt-[110%] sm:w-[18rem] md:w-[26rem]"
                    >
                      <Frame
                        resource={image}
                        className="absolute inset-0 size-full object-cover"
                        imgClassName="size-full object-cover inset-0"
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
  const [rightLayer, leftLayer, centerLayer] = backgroundLayers || []

  return (
    <div className="absolute inset-0">
      {rightLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        >
          <Media
            resource={rightLayer}
            className="size-full absolute inset-0 "
            imgClassName="size-full object-cover translate-x-[2rem]"
          />
        </div>
      )}

      {leftLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
        >
          <Media
            resource={leftLayer}
            className="size-full absolute inset-0"
            imgClassName="size-full object-cover -translate-x-[5rem]"
          />
        </div>
      )}

      {centerLayer && (
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * -0.15}px)`,
          }}
        >
          <Media
            resource={centerLayer}
            className="size-full absolute inset-0"
            imgClassName="size-full object-cover"
          />
        </div>
      )}

      <div
        data-theme="sugar-shack"
        className="absolute inset-0 h-[30%] mt-auto bg-gradient-to-b from-background/0 to-background"
        style={{
          transform: `translateY(${scrollY * -0.145}px)`,
        }}
      />
    </div>
  )
}
