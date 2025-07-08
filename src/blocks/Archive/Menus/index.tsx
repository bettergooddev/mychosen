'use client'

import type { ArchiveBlock, Menu } from '@/payload-types'
import { useState, useMemo } from 'react'

import { MenuSelect } from './menu-select'

import { Document, Page, pdfjs } from 'react-pdf'
import { getPdfUrl } from './utilities/getPdfUrl'
import { useWindowWidth } from '@/react/useWindowWidth'

// Configure the PDF.js worker (required by react-pdf)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export const Menus: React.FC<ArchiveBlock> = (props) => {
  const { menus: menuProps } = props

  // Filter out any non-object entries that may come through the relation
  const menus = (menuProps || []).filter(
    (menu): menu is Menu => typeof menu === 'object' && menu !== null,
  )

  const hasMultipleMenus = menus.length > 1

  // State to track the currently-selected menu
  const [selectedMenuId, setSelectedMenuId] = useState<string>(menus[0]?.id ?? '')

  // Derive the selected menu object whenever the id changes
  const selectedMenu = useMemo(
    () => menus.find((m) => m.id === selectedMenuId),
    [menus, selectedMenuId],
  )

  // Determine the PDF URL for the selected menu
  const pdfUrl = useMemo(() => getPdfUrl(selectedMenu), [selectedMenu])

  // Track how many pages are in the PDF so we can render them all
  const [numPages, setNumPages] = useState<number>(0)

  // Optional: adapt page width to viewport
  const windowWidth = useWindowWidth()
  const pageWidth = Math.min(windowWidth || 640, 640) // cap at 640px to fit container

  return (
    <div className="max-w-4xl mx-auto -mt-48 space-y-8" data-theme="pizza">
      {hasMultipleMenus && (
        <>
          <h4 className="type-h4 mb-4">Select a Menu:</h4>
          <MenuSelect menus={menus} value={selectedMenuId} onChange={setSelectedMenuId} />
        </>
      )}

      {pdfUrl && (
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<p className="type-body">Loading menu…</p>}
          className="flex flex-col items-center gap-8 w-full"
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              className="w-full  [&>*]:!w-full [&>*]:!h-auto"
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={pageWidth}
              renderAnnotationLayer={false}
              renderTextLayer={false}
            />
          ))}
        </Document>
      )}
    </div>
  )
}
