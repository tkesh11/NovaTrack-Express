import React, { useState } from 'react'

export default function ContactPage(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState('')

  async function submit(e: React.FormEvent){
    e.preventDefault();
    const res = await fetch('/api/feedback', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ name, email, message })})
    if(res.ok){ setSuccess('Thanks — your message has been sent.'); setName(''); setEmail(''); setMessage('') }
    else setSuccess('Failed to send — try again later.')
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gold">Contact & Feedback</h2>
      <p className="text-gray-300 mt-2">Have questions or feedback? Send us a message.</p>

      <form onSubmit={submit} className="mt-6 space-y-3 max-w-xl">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 bg-gray-900 rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" className="w-full px-4 py-3 bg-gray-900 rounded" />
        <textarea value={message} onChange={e=>setMessage(e.target.value)} placeholder="Message" className="w-full px-4 py-3 bg-gray-900 rounded h-32" />
        <button className="px-4 py-3 bg-gold text-black rounded">Send Message</button>
      </form>

      {success && <div className="mt-4 text-green-400">{success}</div>}
    </section>
  )
}
