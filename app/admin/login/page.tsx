import React, { useState } from 'react'

export default function AdminLogin(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function login(e: React.FormEvent){
    e.preventDefault()
    setError('')
    const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email, password }) })
    if(res.ok) window.location.href = '/admin/dashboard'
    else setError('Invalid credentials')
  }

  return (
    <section className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gold">Admin Login</h2>
      <form onSubmit={login} className="mt-6 space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 bg-gray-900 rounded" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 bg-gray-900 rounded" />
        <button className="px-4 py-3 bg-gold text-black rounded">Sign in</button>
      </form>
      {error && <div className="mt-3 text-red-400">{error}</div>}
    </section>
  )
}
