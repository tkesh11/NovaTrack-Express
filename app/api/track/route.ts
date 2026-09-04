import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request){
  const { searchParams } = new URL(req.url)
  const tracking = searchParams.get('t')
  if(!tracking) return NextResponse.json({ error: 'tracking required' }, { status: 400 })

  const s = await prisma.shipment.findUnique({ where: { trackingNumber: tracking } })
  if(!s) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(s)
}

export async function POST(req: Request){
  const body = await req.json()
  const { trackingNumber, status, origin, destination, details } = body
  if(!trackingNumber) return NextResponse.json({ error: 'trackingNumber required' }, { status: 400 })
  const s = await prisma.shipment.create({ data: { trackingNumber, status: status || 'Created', origin, destination, details, history: [{ timestamp: new Date().toISOString(), status: status || 'Created', note: 'Created' }] } })
  return NextResponse.json(s)
}
