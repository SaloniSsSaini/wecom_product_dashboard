// src/services/api.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const DUMMY_BASE = import.meta.env.DUMMYJSON_BASE || 'https://dummyjson.com'

// =============== DummyJSON APIs =================

export async function getProducts(limit = 10, skip = 0) {
  const res = await fetch(`${DUMMY_BASE}/products?limit=${limit}&skip=${skip}`)
  if (!res.ok) throw new Error('Failed to fetch from DummyJSON')
  return res.json()
}

export async function searchProducts(q) {
  const res = await fetch(`${DUMMY_BASE}/products/search?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error('Failed to search DummyJSON')
  return res.json()
}

export async function getCategories() {
  const res = await fetch(`${DUMMY_BASE}/products/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return res.json()
}

// =============== Supabase APIs =================

export async function addRecord(table, data) {
  const { data: result, error } = await supabase.from(table).insert([data]).select()
  if (error) throw error
  return result
}

export async function getRecords(table) {
  const { data, error } = await supabase.from(table).select('*')
  if (error) throw error
  return data
}

export async function updateRecord(table, id, newData) {
  const { data, error } = await supabase.from(table).update(newData).eq('id', id).select()
  if (error) throw error
  return data
}

export async function deleteRecord(table, id) {
  const { data, error } = await supabase.from(table).delete().eq('id', id).select()
  if (error) throw error
  return data
}
