import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filename: string[] }> }
) {
  const { filename } = await context.params
  const safeFilename = path.join(...filename).replace(/^(\.\.[\/\\])+/, '')
  const filePath = path.join(process.cwd(), 'uploads', safeFilename)

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File not found', { status: 404 })
  }

  const stat = fs.statSync(filePath)
  if (!stat.isFile()) {
    return new NextResponse('Not a file', { status: 400 })
  }

  const ext = path.extname(filePath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'

  const fileBuffer = fs.readFileSync(filePath)
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Length': stat.size.toString(),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
