import React from 'react'
import Button from '../../components/ui/Button'

export default function ProductRowActions({ product, onEdit, onDelete, deleting }) {
  return (
    <div className="flex gap-2">
      <button className="px-2 py-1 rounded border" onClick={onEdit}>Edit</button>
      <button className="px-2 py-1 rounded bg-red-600 text-white" onClick={onDelete} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete'}</button>
    </div>
  )
}
