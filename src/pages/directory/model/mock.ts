import type { Client } from "./types"

export const clients: Client[] = [
  {
    id: "1",
    name: "Иван Иванов",
    email: "ivan@example.com",
    city: "Алматы",
    ltv: 1200,
    ordersCount: 5,
    orders: [
      { id: "ORD-101", date: "2024-09-01", total: 300 },
      { id: "ORD-102", date: "2024-09-05", total: 200 },
    ],
  },
  {
    id: "2",
    name: "Айжан Садыкова",
    email: "aizhan@example.com",
    city: "Астана",
    ltv: 800,
    ordersCount: 3,
    orders: [
      { id: "ORD-201", date: "2024-09-02", total: 400 },
    ],
  },
]
