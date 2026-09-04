import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { signToken } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function POST(req: Request){
  const body = await req.json()
  const { email, password } = body
  if(!email || !password) return NextResponse.json({ error: 'Missing' }, { status: 400 })

  const admin = await prisma.admin.findUnique({ where: { email } })
  if(!admin) return NextResponse.json({ error: 'Invalid' }, { status: 401 })

  const ok = await bcrypt.compare(password, admin.password)
  if(!ok) return NextResponse.json({ error: 'Invalid' }, { status: 401 })

  const token = signToken({ id: admin.id, email: admin.email })
  const cookie = serialize('novatrack_admin', token, { httpOnly: true, path: '/', maxAge: 60*60*24*7 })

  const res = NextResponse.json({ success: true })
  res.headers.set('Set-Cookie', cookie)
  return res
}
