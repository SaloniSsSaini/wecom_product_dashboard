import React, { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { getProducts } from '../../services/api'
import Skeleton from '../../components/ui/Skeleton'
import ProductRowActions from './ProductRowActions'
import { formatCurrency } from '../../utils/helpers'

export default function ProductsTable({ onEdit }) {
  const [page, setPage] = useState(0)
  const [q, setQ] = useState('')
  const limit = 10
  const qc = useQueryClient()

  const { data, isLoading, isError, isFetching } = qc.ensureQuery ? qc.ensureQuery(['products', { page, limit, q }], () => getProducts(limit, page*limit)) : { data: null, isLoading: true, isError: false, isFetching: false }

  // fallback if above not supported in older clients
  // We'll fetch directly for initial implementation:
  const [localData, setLocalData] = React.useState(null)
  React.useEffect(() => {
    getProducts(limit, page*limit).then(d => setLocalData(d)).catch(()=>{})
  }, [page, q])

  const products = localData?.products ?? []
  const total = localData?.total ?? 0
  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
        <div className="flex items-center gap-2">
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} placeholder="Search products..." className="border rounded-md px-3 py-2" />
        </div>
        <div className="text-sm text-gray-600">{isFetching ? 'Updating...' : `Showing ${products.length} of ${total}`}</div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="text-left text-sm text-gray-600">
            <tr>
              <th className="pb-3">Title</th>
              <th className="pb-3">Price</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Stock</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {localData == null ? (
              Array.from({ length: 6 }).map((_, i) => (
                <tr key={i}>
                  <td className="py-3"><Skeleton className="h-5 w-64" /></td>
                  <td className="py-3"><Skeleton className="h-5 w-20" /></td>
                  <td className="py-3"><Skeleton className="h-5 w-28" /></td>
                  <td className="py-3"><Skeleton className="h-5 w-12" /></td>
                  <td className="py-3"><Skeleton className="h-8 w-20" /></td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="py-6 text-gray-600">No products found.</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-3">{p.title}</td>
                  <td className="py-3">{formatCurrency(p.price)}</td>
                  <td className="py-3">{p.category}</td>
                  <td className="py-3">{p.stock}</td>
                  <td className="py-3">
                    <ProductRowActions product={p} onEdit={() => onEdit(p)} onDelete={() => { /* delete handled elsewhere */ }} deleting={false} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">Page {page + 1} of {totalPages || 1}</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-md border" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Previous</button>
          <button className="px-3 py-1.5 rounded-md border" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page + 1 >= totalPages}>Next</button>
        </div>
      </div>
    </div>
  )
}
