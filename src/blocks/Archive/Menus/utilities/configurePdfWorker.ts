import { pdfjs } from 'react-pdf'

/**
 * Ensure PDF.js knows where to load its worker from. Safe for client-only usage.
 * Does nothing in SSR / build phase or if already configured.
 */
export const configurePdfWorker = (): void => {
  if (typeof window === 'undefined') return // Skip during SSR/build

  // If already configured, bail early
  if (pdfjs.GlobalWorkerOptions.workerSrc) return

  try {
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url,
    ).toString()
    // eslint-disable-next-line no-empty
  } catch {}
}
