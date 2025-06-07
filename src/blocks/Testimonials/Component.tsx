import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Heading } from '@/components/Heading'
import { Frame } from '@/components/Frame'
import StarRating from '@/components/StarRating'
import { Media } from '@/components/Media'

type Props = {
  disableInnerContainer?: boolean
} & TestimonialsBlockType

export const TestimonialsBlock: React.FC<Props> = async ({ heading, subheading }) => {
  const payload = await getPayload({ config: configPromise })

  const testimonialsGlobal = await payload.findGlobal({
    slug: 'testimonials',
    depth: 1,
  })

  const testimonials = testimonialsGlobal.testimonials || []

  return (
    <div className="container py-16">
      <Heading heading={heading} subheading={subheading} />

      {testimonials.length > 0 && (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 theme-sugar-shack">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex w-full flex-col items-start border-[10px] border-white drop-shadow-md bg-white"
            >
              <Media
                resource={testimonial.image}
                className="size-full min-h-[20rem]"
                imgClassName="size-full"
              />

              <div className="p-4 md:p-6 mt-2 flex flex-col size-full">
                <div className="mb-5 flex md:mb-6">
                  <StarRating
                    rating={parseFloat(testimonial.rating)}
                    className="[&>svg]:theme-pizza [&>svg]:text-primary"
                  />
                </div>
                <blockquote className="type-h5 !font-normal text-foreground/65 md:text-md mb-5 md:mb-6">
                  {testimonial.review}
                </blockquote>

                <div className="mt-auto flex w-full flex-col items-start md:w-fit md:flex-row md:items-center">
                  <div className="mb-4 size-11 min-h-11 min-w-11 rounded-full overflow-hidden md:mb-0 md:mr-4">
                    <Media
                      resource={testimonial.author.profilePicture}
                      className="size-full object-cover !border-0 !drop-shadow-none !transform-none"
                    />
                  </div>
                  <div className="">
                    <p className="type-h5 text-foreground ">{testimonial.author.name}</p>
                    <p className="type-h5 text-foreground/65 !font-normal mt-0.5 ">
                      {testimonial.author.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
