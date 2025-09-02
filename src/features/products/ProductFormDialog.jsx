import React, { useEffect } from 'react'
import Dialog from '../../components/ui/Dialog'
import Button from '../../components/ui/Button'
import { useForm } from 'react-hook-form'
import { addRecord, updateRecord } from '../../services/api'
import { useState } from 'react'

export default function ProductFormDialog({ open, onClose, editItem }) {
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editItem) reset({ title: editItem.title, price: editItem.price, category: editItem.category, stock: editItem.stock })
    else reset({ title: '', price: 0, category: '', stock: 0 })
  }, [editItem, reset])

  const onSubmit = async (values) => {
    setLoading(true)
    try {
      const payload = { title: values.title, price: Number(values.price), category: values.category, stock: Number(values.stock) }
      if (editItem) {
        await updateRecord('products', editItem.id, payload)
      } else {
        await addRecord('products', payload)
      }
      onClose()
    } catch (e) {
      alert('Error: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} title={editItem ? 'Edit Product' : 'Add Product'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="block text-sm">Title</label>
          <input className="border rounded w-full px-3 py-2" {...register('title', { required: true })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm">Price</label>
            <input type="number" className="border rounded w-full px-3 py-2" {...register('price', { required: true })} />
          </div>
          <div>
            <label className="block text-sm">Stock</label>
            <input type="number" className="border rounded w-full px-3 py-2" {...register('stock', { required: true })} />
          </div>
        </div>
        <div>
          <label className="block text-sm">Category</label>
          <input className="border rounded w-full px-3 py-2" {...register('category')} />
        </div>

        <div className="flex items-center gap-2 justify-end">
          <button type="button" className="px-3 py-1.5 rounded-md border" onClick={onClose}>Cancel</button>
          <Button type="submit">{loading ? 'Saving...' : (editItem ? 'Save' : 'Add')}</Button>
        </div>
      </form>
    </Dialog>
  )
}
