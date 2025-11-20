# Standard Operating Procedure: Implementing Google reCAPTCHA v3

This document provides exact step-by-step instructions for implementing Google reCAPTCHA v3 in a Next.js application with Payload CMS.

## Prerequisites

- Next.js application with Payload CMS
- Access to Google reCAPTCHA admin console (https://www.google.com/recaptcha/admin)
- Environment variables configuration access

## Step 1: Install Required Dependencies

Install the TypeScript types for Google reCAPTCHA:

```bash
npm install --save-dev @types/grecaptcha
```

Or if using pnpm:

```bash
pnpm add -D @types/grecaptcha
```

## Step 2: Configure Environment Variables

Add the following environment variables to your `.env.local` file (or your environment configuration):

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
NEXT_PRIVATE_RECAPTCHA_SECRET_KEY=your_secret_key_here
```

**Important Notes:**
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is prefixed with `NEXT_PUBLIC_` so it's accessible on the client side
- `NEXT_PRIVATE_RECAPTCHA_SECRET_KEY` is server-side only (no `NEXT_PUBLIC_` prefix)
- Obtain these keys from the Google reCAPTCHA admin console

## Step 3: Create Captcha Utility Functions

Create a new file: `src/components/Frame/utils/captcha.ts`

```typescript
type CaptchaData =
  | {
      success: true
      challenge_ts: string
      hostname: string
      score: number
      action: string
    }
  | {
      success: false
      'error-codes': string[]
    }

export async function getCaptchaToken() {
  return new Promise<string | null>((resolve) => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      if (!siteKey) {
        resolve(null)
        return
      }

      const token = await grecaptcha.execute(siteKey, {
        action: 'form_submit',
      })

      resolve(token)
    })
  })
}

export async function verifyCaptchaToken(token: string) {
  const secretKey = process.env.NEXT_PRIVATE_RECAPTCHA_SECRET_KEY
  if (!secretKey) {
    throw new Error('No secret key found')
  }

  const url = new URL('https://www.google.com/recaptcha/api/siteverify')
  url.searchParams.append('secret', secretKey)
  url.searchParams.append('response', token)

  const res = await fetch(url, { method: 'POST' })
  const captchaData: CaptchaData = await res.json()

  if (!res.ok) {return null}

  return captchaData
}
```

## Step 4: Create Server Action for Form Verification

Create a new file: `src/actions/form-verification.ts`

```typescript
'use server'

import { verifyCaptchaToken } from '@/components/Frame/utils/captcha'

export async function formVerificationAction(token: string | null) {
  if (!token) {
    return {
      success: false,
      message: 'Token not found',
    }
  }

  // Verify the token
  const captchaData = await verifyCaptchaToken(token)

  if (!captchaData) {
    return { success: false, message: 'captcha Failed' }
  }

  if (!captchaData.success || captchaData.score < 0.8) {
    return {
      success: false,
      message: 'captcha Failed',
      errors: !captchaData.success ? captchaData['error-codes'] : null,
    }
  }
  return {
    success: true,
    message: 'Message sent successfully!',
  }
}
```

**Important Notes:**
- The `'use server'` directive makes this a server action
- Score threshold is set to 0.8 (adjust as needed)
- Returns structured success/error responses

## Step 5: Load reCAPTCHA Script in Root Layout

Modify `src/app/(frontend)/layout.tsx`:

1. Import `Script` from `next/script` at the top:

```typescript
import Script from 'next/script'
```

2. Add the reCAPTCHA script inside the `<body>` tag, within the `<Providers>` component:

```typescript
<Script
  src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
  strategy="beforeInteractive"
/>
```

**Complete example of the body section:**

```typescript
<body className="relative">
  <Providers>
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      strategy="beforeInteractive"
    />

    <Navigation />
    {children}
    <Footer />
  </Providers>
</body>
```

**Important Notes:**
- Use `strategy="beforeInteractive"` to ensure the script loads before the page becomes interactive
- The script URL includes the site key as a query parameter

## Step 6: Integrate Captcha into Form Component

Modify `src/blocks/Form/Component.tsx`:

1. Add imports at the top:

```typescript
import { formVerificationAction } from '@/actions/form-verification'
import { getCaptchaToken } from '@/components/Frame/utils/captcha'
```

2. Modify the `onSubmit` function to include captcha verification. The form submission flow should be:

```typescript
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

      // Get captcha token and verify
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
```

**Important Notes:**
- Captcha verification happens BEFORE form submission
- If captcha fails, the form submission is blocked
- Error handling displays "Captcha Failed" message to the user

## Step 7: Add reCAPTCHA Privacy Notice

In the same `src/blocks/Form/Component.tsx` file, add the required Google reCAPTCHA privacy notice above the submit button:

```typescript
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
```

**Important Notes:**
- This notice is required by Google's Terms of Service
- Must be visible on pages using reCAPTCHA
- Links must open in a new tab with proper security attributes

## Step 8: Hide reCAPTCHA Badge (Optional)

Add CSS to hide the reCAPTCHA badge in `src/app/(frontend)/globals.css`:

```css
.grecaptcha-badge { visibility: hidden; }
```

**Important Notes:**
- This hides the badge but reCAPTCHA still functions
- You must display the privacy notice (Step 7) if you hide the badge
- The badge can be shown in a different location if desired

## Verification Checklist

- [ ] Dependencies installed (`@types/grecaptcha`)
- [ ] Environment variables configured
- [ ] `captcha.ts` utility file created with both functions
- [ ] `form-verification.ts` server action created
- [ ] reCAPTCHA script loaded in root layout
- [ ] Form component modified to verify captcha before submission
- [ ] Privacy notice added to form
- [ ] reCAPTCHA badge hidden (optional)
- [ ] Form submission flow tested
- [ ] Error handling tested (invalid token, low score, etc.)

## Testing

Tell the user to check the following: 

1. **Test successful submission:**
   - Fill out form with valid data
   - Submit form
   - Verify captcha token is generated and verified
   - Confirm form submits successfully

2. **Test captcha failure:**
   - Simulate captcha failure (low score or invalid token)
   - Verify form does not submit
   - Verify error message displays

3. **Test missing environment variables:**
   - Remove environment variables temporarily
   - Verify graceful error handling
   - Verify no crashes occur

## Troubleshooting

## Additional Notes

- reCAPTCHA v3 runs in the background and doesn't require user interaction
- The score ranges from 0.0 (bot) to 1.0 (human)
- Score threshold of 0.8 is a good balance between security and user experience
- The action name 'form_submit' can be customized for different form types
- All server actions must be in files marked with `'use server'`

