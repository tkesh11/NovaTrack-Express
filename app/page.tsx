export default function Home(){
  return (
    <section className="text-center py-20">
      <h2 className="text-4xl font-bold text-gold">NovaTrack Express</h2>
      <p className="mt-4 text-gray-300">Premium Logistics Tracking Worldwide</p>

      <div className="mt-8 flex justify-center">
        <a href="/tracking" className="px-6 py-3 bg-gold text-black font-semibold rounded">Track a Package</a>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-brand-gray p-6 rounded">
          <h3 className="font-semibold text-gold">Fast Updates</h3>
          <p className="text-gray-300 mt-2">Real-time internal tracking and status changes managed by our admins.</p>
        </div>
        <div className="bg-brand-gray p-6 rounded">
          <h3 className="font-semibold text-gold">Secure Admin</h3>
          <p className="text-gray-300 mt-2">Password protected admin dashboard for shipment management.</p>
        </div>
        <div className="bg-brand-gray p-6 rounded">
          <h3 className="font-semibold text-gold">Feedback</h3>
          <p className="text-gray-300 mt-2">Customers can leave feedback and contact support directly.</p>
        </div>
      </div>
    </section>
  )
}
