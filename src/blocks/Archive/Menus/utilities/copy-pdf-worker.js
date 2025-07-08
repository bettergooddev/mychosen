import path from 'node:path'
import fs from 'node:fs'
import { createRequire } from 'node:module'

// Resolve the path to the worker file inside pdfjs-dist
const require = createRequire(import.meta.url)
const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'))
const workerSrcPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.mjs')

// Destination path inside the project
const destPath = path.join(process.cwd(), 'public', 'pdf.worker.mjs')

// Ensure the destination directory exists
fs.mkdirSync(path.dirname(destPath), { recursive: true })

// Copy the file
fs.copyFileSync(workerSrcPath, destPath)

console.log(`Copied pdf.worker.mjs to ${destPath}`)
