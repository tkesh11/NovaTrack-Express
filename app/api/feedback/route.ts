import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request){
  const body = await req.json()
  const { name, email, message } = body
  if(!message) return NextResponse.json({ error: 'message required' }, { status: 400 })

  const fb = await prisma.feedback.create({ data: { name, email, message } })

  // Optional: send email if SENDGRID_API_KEY is configured (left as configurable)
  // Implementers can wire up SendGrid here using process.env.SENDGRID_API_KEY

  return NextResponse.json({ success: true, feedback: fb })
}
