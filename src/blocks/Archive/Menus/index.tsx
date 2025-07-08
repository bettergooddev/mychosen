'use client'

import type { ArchiveBlock, Menu } from '@/payload-types'
import { MenuSelect } from './menu-select'

// PDF rendering
import { useState, useEffect } from 'react'
import { Document, Page } from 'react-pdf'
import { configurePdfWorker } from './utilities/configurePdfWorker'
import { getPdfUrl } from './utilities/getPdfUrl'

// Import React-PDF styles for annotations & text layer
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Configure PDF.js worker once for the client bundle
configurePdfWorker()

export const Menus: React.FC<ArchiveBlock> = (props) => {
  // Filter out string references and keep only Menu objects
  const menuObjects = (props.menus || []).filter(
    (menu): menu is Menu => typeof menu === 'object' && menu !== null,
  )

  const hasMultipleMenus = menuObjects.length > 1

  // Manage currently selected menu
  const [selectedMenuId, setSelectedMenuId] = useState<string>(menuObjects[0]?.id || '')

  // PDF page count (loaded dynamically)
  const [numPages, setNumPages] = useState<number>()

  useEffect(() => {
    if (menuObjects.length && !menuObjects.some((m) => m.id === selectedMenuId)) {
      setSelectedMenuId(menuObjects[0]?.id || '')
    }
  }, [menuObjects])

  const selectedMenu = hasMultipleMenus
    ? menuObjects.find((m) => m.id === selectedMenuId)
    : menuObjects[0]

  const pdfUrl = getPdfUrl(selectedMenu)

  return (
    <div className="max-w-4xl mx-auto -mt-48" data-theme="pizza">
      {hasMultipleMenus && (
        <>
          <h4 className="type-h4 mb-4">Select a Menu:</h4>
          <MenuSelect menus={menuObjects} value={selectedMenuId} onChange={setSelectedMenuId} />
        </>
      )}

      {/* Render the PDF below the selector (or alone if only one menu) */}
      {pdfUrl && (
        <div className="mt-8 flex flex-col items-center w-full">
          <Document
            className="w-full"
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={<p>Loading menu...</p>}
            error={<p>Failed to load menu.</p>}
          >
            {/* Render all pages */}
            {Array.from({ length: numPages || 0 }, (_, idx) => idx + 1).map((pageNumber) => (
              <Page
                key={`page_${pageNumber}`}
                pageNumber={pageNumber}
                className="mb-4 shadow-lg w-full [&>*]:!w-full [&>*]:!h-auto"
              />
            ))}
          </Document>
        </div>
      )}
    </div>
  )
}
