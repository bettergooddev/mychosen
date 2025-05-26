import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockType } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Props = {
  disableInnerContainer?: boolean
} & TestimonialsBlockType

export const TestimonialsBlock: React.FC<Props> = async ({ heading }) => {
  const payload = await getPayload({ config: configPromise })

  const testimonialsGlobal = await payload.findGlobal({
    slug: 'testimonials',
    depth: 1,
  })

  const testimonials = testimonialsGlobal.testimonials || []

  return (
    <div className="container mx-auto px-4">
      {heading && <h2 className="text-3xl font-bold text-center mb-8">{heading}</h2>}

      {testimonials && testimonials.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                {testimonial.image && typeof testimonial.image === 'object' && (
                  <div className="mb-4">
                    <img
                      src={testimonial.image.url || ''}
                      alt={testimonial.image.alt || ''}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }, (_, i) => {
                    const rating = parseFloat(testimonial.rating || '0')
                    const filled = i < Math.floor(rating)
                    const halfFilled = i === Math.floor(rating) && rating % 1 !== 0

                    return (
                      <span
                        key={i}
                        className={`text-lg ${
                          filled
                            ? 'text-yellow-400'
                            : halfFilled
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                        }`}
                      >
                        {halfFilled ? '★' : '★'}
                      </span>
                    )
                  })}
                  <span className="ml-2 text-sm text-gray-600">{testimonial.rating}</span>
                </div>

                {testimonial.author && (
                  <div className="flex items-center">
                    {testimonial.author.profilePicture &&
                      typeof testimonial.author.profilePicture === 'object' && (
                        <img
                          src={testimonial.author.profilePicture.url || ''}
                          alt={testimonial.author.profilePicture.alt || ''}
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                      )}
                    <div>
                      <p className="font-semibold">{testimonial.author.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.author.role}</p>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
