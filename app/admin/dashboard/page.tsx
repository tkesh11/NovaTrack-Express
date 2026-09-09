'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'

export default async function AdminDashboard(){
const cookieStore = await cookies();
const token = cookieStore.get('novatrack_admin')?.value;
  
  const verified = token ? verifyToken(token) : null;
  if(!verified) redirect('/admin/login');

  const shipments = await prisma.shipment.findMany({ orderBy: { updatedAt: 'desc' }, take: 50 })
  const feedback = await prisma.feedback.findMany({ orderBy: { createdAt: 'desc' }, take: 50 })

  return (
    <section>
      <h2 className="text-2xl font-bold text-gold">Admin Dashboard</h2>
      <p className="text-gray-300 mt-2">Manage shipments and view customer feedback.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg text-gold">Shipments</h3>
          <div className="mt-3 space-y-3">
            {shipments.map((s: any) => (
              <div key={s.id} className="bg-brand-gray p-3 rounded">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{s.trackingNumber} — {s.status}</div>
                    <div className="text-sm text-gray-300">{s.origin} → {s.destination}</div>
                   <div>From: {s.origin}</div>
                   <div>To: {s.destination}</div>
                   <div>Sender: {s.senderName || "—"}</div>
                   <div>Receiver: {s.receiverName || "—"}</div>
                   <div>Current: {s.currentLocation || "—"}</div>
                   <div>ETA: {s.estimatedDelivery || "—"}</div>
                   </div>
                   </div>
                  <div className="text-sm text-gray-400">{new Date(s.updatedAt).toLocaleString()}</div>
                 </div>
                 ))}
                </div>
                </div>

                
          <h3 className="text-lg text-gold">Customer Feedback</h3>
          <div className="mt-3 space-y-3">
            {feedback.map((f: any) => (
              <div key={f.id} className="bg-brand-gray p-3 rounded">
                <div className="font-semibold">{f.name || 'Anonymous'}</div>
                <div className="text-sm text-gray-300">{f.email}</div>
                <p className="mt-2 text-gray-300">{f.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
