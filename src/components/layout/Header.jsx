import React from 'react'

export default function Header({ children }) {
  return (
    <header className="w-full border-b bg-white p-4 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-lg font-semibold">Product Dashboard</div>
        <div>{children}</div>
      </div>
    </header>
  )
}
