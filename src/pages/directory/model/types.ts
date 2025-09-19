export type Client = {
  id: string
  name: string
  email: string
  city: string
  ltv: number
  ordersCount: number
  orders?: { id: string; date: string; total: number }[]
}