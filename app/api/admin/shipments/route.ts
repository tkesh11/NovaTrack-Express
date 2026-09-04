import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

function requireAuth(req: Request){
  const cookie = req.headers.get('cookie') || ''
  const match = cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('novatrack_admin='))
  if(!match) return null
  const token = match.split('=')[1]
  return verifyToken(token as string)
}

export async function GET(req: Request){
  const auth = requireAuth(req)
  if(!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const shipments = await prisma.shipment.findMany({ orderBy: { updatedAt: 'desc' } })
  return NextResponse.json(shipments)
}

export async function POST(req: Request){
  const auth = requireAuth(req)
  if(!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { trackingNumber, status, origin, destination, details } = body
  if(!trackingNumber) return NextResponse.json({ error: 'trackingNumber required' }, { status: 400 })

  const s = await prisma.shipment.create({ data: { trackingNumber, status: status || 'Created', origin, destination, details, history: [{ timestamp: new Date().toISOString(), status: status || 'Created', note: 'Created' }] } })
  return NextResponse.json(s)
}

export async function PUT(req: Request){
  const auth = requireAuth(req)
  if(!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { id, status, note } = body
  if(!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  const existing = await prisma.shipment.findUnique({ where: { id } })
  if(!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const newHistory = Array.isArray(existing.history) ? existing.history : []
  newHistory.push({ timestamp: new Date().toISOString(), status, note })

  const updated = await prisma.shipment.update({ where: { id }, data: { status: status || existing.status, history: newHistory } })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request){
  const auth = requireAuth(req)
  if(!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { id } = body
  if(!id) return NextResponse.json({ error: 'id required' }, { status: 400 })

  await prisma.shipment.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
