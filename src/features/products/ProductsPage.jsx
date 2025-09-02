import React, { useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Header from '../../components/layout/Header'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import ProductsTable from './ProductsTable'
import ProductFormDialog from './ProductFormDialog'

export default function ProductsPage() {
  const [open, setOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header>
            <div className="flex items-center gap-3">
              <Button onClick={() => { setEditItem(null); setOpen(true); }}>Add Product</Button>
            </div>
          </Header>

          <main className="p-6 max-w-7xl mx-auto">
            <Card>
              <ProductsTable onEdit={(p) => { setEditItem(p); setOpen(true); }} />
            </Card>
          </main>
        </div>
      </div>

      <ProductFormDialog open={open} onClose={() => setOpen(false)} editItem={editItem} />
    </div>
  )
}
