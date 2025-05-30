'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import type { Page } from '@/payload-types'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const HighImpactHero: React.FC<Page['hero']> = (props) => {
  // const { setHeaderTheme } = useHeaderTheme()

  // useEffect(() => {
  //   setHeaderTheme('dark')
  // })

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
    <section className="relative h-screen overflow-hidden bg-amber-200" data-theme="green">
      <HeroBackground backgroundLayers={backgroundLayers} scrollY={scrollY} />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        {/* Logos */}
        {logos && logos.length > 0 && (
          <div className="flex items-center justify-center gap-8 md:gap-16 mb-12 w-full container max-w-screen-md -mt-1/3">
            <CMSLink {...logoLeft?.link} appearance="inline" label={null} className="w-1/4">
              <Media resource={logoLeft?.logo} className="h-auto" imgClassName="size-full" />
            </CMSLink>
            <CMSLink {...logoCenter?.link} appearance="inline" label={null} className="w-2/4">
              <Media resource={logoCenter?.logo} className="h-auto" imgClassName="size-full" />
            </CMSLink>
            <CMSLink {...logoRight?.link} appearance="inline" label={null} className="w-1/4">
              <Media resource={logoRight?.logo} className="h-auto" imgClassName="size-full" />
            </CMSLink>
          </div>
        )}

        <div className="prose">
          <h1 className="mb-6 text-foreground">{heading}</h1>
          {subheading && <p className="max-w-[48ch] mb-12 text-foreground">{subheading}</p>}
        </div>

        {/* Down Arrow */}
        <div className="animate-bounce">
          <ChevronDown className="w-8 h-8 text-foreground" />
        </div>
      </div>
    </section>
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
            // style={{
            //   transform: `translateY(${scrollY * parallaxSpeed}px)`,
            // }}
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
