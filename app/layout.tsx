import './globals.css'
import React from 'react'
import { ReactNode } from 'react'

export const metadata = {
  title: 'NovaTrack Express',
  description: 'Premium Logistics Tracking Worldwide'
}

export default function RootLayout({ children }: { children: ReactNode }){
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-brand-black text-gray-100">
          <header className="border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-gold">NovaTrack Express</h1>
                <p className="text-sm text-gray-300">Premium Logistics Tracking Worldwide</p>
              </div>
              <nav className="space-x-4">
                <a href="/" className="text-gray-200 hover:text-gold">Home</a>
                <a href="/tracking" className="text-gray-200 hover:text-gold">Track</a>
                <a href="/contact" className="text-gray-200 hover:text-gold">Contact</a>
                <a href="/admin/login" className="text-gold font-semibold">Admin</a>
              </nav>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

          <footer className="border-t border-gray-800 mt-16">
            <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-400 flex justify-between">
              <div>© {new Date().getFullYear()} NovaTrack Express</div>
              <div>Designed with ❤️ in black & gold</div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
