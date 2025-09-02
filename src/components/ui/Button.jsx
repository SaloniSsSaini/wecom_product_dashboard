import React from 'react'

export default function Button({ children, className = '', ...props }) {
  return (
    <button {...props} className={`px-3 py-1.5 rounded-md font-medium inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 ${className}`}>
      {children}
    </button>
  )
}
