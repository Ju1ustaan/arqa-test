
type OrdersData = {
    id: string
    date: string
    customerId: string
    city: string
    channel: string
    status: "New" | "Processing" | "Shipped"
    total: number
    items?: { name: string; qty: number; price: number }[]
    comment?: string
}

export const fetchOrderData = (): Promise<OrdersData[]> => {
  const shouldFail = Math.random() < 0.8
  if (shouldFail) {
    return Promise.reject(new Error("Ошибка загрузки данных (mock)"))
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array.from({ length: 32 }, (_, i) => ({
          id: `ORD-${i + 1}`,
          date: "2025-09-19",
          customerId: `Customer ${i + 1}`,
          city: i % 2 === 0 ? "Астана" : "Алматы",
          channel: i % 3 === 0 ? "Website" : "Telegram",
          status: i % 2 === 0 ? "New" : "Processing",
          total: 5000 + i * 300,
          items: [
            { name: "Товар A", qty: 1, price: 2000 },
            { name: "Товар B", qty: 2, price: 1500 },
          ],
          comment: "Без комментариев",
        }))
      )
    }, 1000)
  })
}
