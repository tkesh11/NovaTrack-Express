"use client"

import React, { useState } from 'react'

export default function TrackingPage(){
  const [tracking, setTracking] = useState('')
  const [result, setResult] = useState(null as any)
  const [error, setError] = useState('')

  async function lookup(e: React.FormEvent){
    e.preventDefault()
    setError('')
    setResult(null)
    if(!tracking) { setError('Enter a tracking number'); return }
    try{
      const res = await fetch(`/api/track/?t=${encodeURIComponent(tracking)}`)
      if(!res.ok) throw new Error('Not found')
      const data = await res.json()
      setResult(data)
    }catch(err:any){
      setError(err.message || 'Lookup failed')
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gold">Track a Package</h2>
      <p className="text-gray-300 mt-2">Enter your tracking number to see the current status.</p>

      <form onSubmit={lookup} className="mt-6 flex gap-2">
        <input value={tracking} onChange={e=>setTracking(e.target.value)} className="flex-1 px-4 py-3 bg-gray-900 rounded" placeholder="e.g. NTX123456" />
        <button className="px-4 py-3 bg-gold text-black rounded">Lookup</button>
      </form>

      {error && <div className="mt-4 text-red-400">{error}</div>}

      {result && (
        <div className="mt-6 bg-brand-gray p-4 rounded">
          <h3 className="font-semibold text-gold">{result.trackingNumber} — {result.status}</h3>
          <p className="text-gray-300">Origin: {result.origin || '—'}</p>
          <p className="text-gray-300">Destination: {result.destination || '—'}</p>
          <div className="mt-3">
            <h4 className="text-sm text-gray-300">History</h4>
            <ul className="mt-2 list-disc pl-6 text-gray-300">
              {(result.history || []).map((h:any, idx:number)=>(
                <li key={idx}>{h.timestamp}: {h.status} — {h.note || ''}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
