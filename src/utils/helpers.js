export const formatCurrency = (n) => {
  if (n == null) return '-'
  return `₹${Number(n).toFixed(0)}`
}
