'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import Link from 'next/link'
import { formVerificationAction } from '@/actions/form-verification'
import { getCaptchaToken } from '@/components/Frame/utils/captcha'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 0)

        const token = await getCaptchaToken()
        const captchaResponse = await formVerificationAction(token)

        if (captchaResponse.success) {
          try {
            const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
              body: JSON.stringify({
                form: formID,
                submissionData: dataToSend,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            })

            const res = await req.json()

            clearTimeout(loadingTimerID)

            if (req.status >= 400) {
              setIsLoading(false)

              setError({
                message: res.errors?.[0]?.message || 'Internal Server Error',
                status: res.status,
              })

              return
            }

            setIsLoading(false)
            setHasSubmitted(true)

            if (confirmationType === 'redirect' && redirect) {
              const { url } = redirect

              const redirectUrl = url

              if (redirectUrl) router.push(redirectUrl)
            }
          } catch (err) {
            console.warn(err)
            clearTimeout(loadingTimerID)
            setIsLoading(false)
            setError({
              message: 'Something went wrong.',
            })
          }
        } else {
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({
            message: 'Captcha Failed',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container lg:max-w-[48rem] -mt-[6rem] md:-mt-48 theme-sugar-shack">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <FormProvider {...formMethods}>
        {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <RichText
            className="[&_*]:!text-foreground text-center [&_h2]:mb-6 [&_p]:opacity-75"
            data={confirmationMessage}
          />
        )}
        {!hasSubmitted && (
          <form id={formID} onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 last:mb-0">
              {formFromProps &&
                formFromProps.fields &&
                formFromProps.fields?.map((field, index) => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                  if (Field) {
                    return (
                      <div className="mb-6 last:mb-0" key={index}>
                        <Field
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      </div>
                    )
                  }
                  return null
                })}
            </div>

            <p className="mt-7 mb-1 [&_*]:!type-caption !type-caption [&_*]:!font-normal !font-normal text-muted-foreground text-left opacity-85">
              This site is protected by reCAPTCHA and the Google{' '}
              <Link
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Terms of Service
              </Link>{' '}
              apply.
            </p>

            <Button
              className="theme-pizza mt-4"
              form={formID}
              type="submit"
              variant="default"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : submitButtonLabel}
            </Button>
            {error && (
              <div className="theme-pizza type-caption text-primary mt-4">
                Error: {error.status && `${error.status}: `}
                {error.message || ''}
              </div>
            )}
          </form>
        )}
      </FormProvider>
    </div>
  )
}
