import React from 'react'

export default function Sidebar() {
  return (
    <aside className="hidden md:block w-60 bg-slate-50 border-r p-4 h-screen sticky top-0">
      <div className="text-xl font-bold mb-6">Weecom</div>
      <nav className="space-y-2 text-sm">
        <div className="px-2 py-2 rounded hover:bg-slate-100">Dashboard</div>
        <div className="px-2 py-2 rounded hover:bg-slate-100">Products</div>
        <div className="px-2 py-2 rounded hover:bg-slate-100">Settings</div>
      </nav>
    </aside>
  )
}
