export type DashboardFilters = {
  period: "7d" | "30d" | "qtd" | "ytd"
  channel: "Web" | "Mobile" | "Offline"
  city: "Алматы" | "Астана"
}

export type DashboardData = {
  revenue: number
  orders: number
  aov: number
  conversionRate: number
  chart: { date: string; value: number }[]
}

export const fetchDashboardData = (filters: DashboardFilters): Promise<DashboardData> => {
  const shouldFail = Math.random() < 0.2 // 20% шанс ошибки
  if (shouldFail) {
    throw new Error("Ошибка загрузки данных (mock)")
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      // Базовые данные
      let revenue = 24000
      let orders = 320
      let aov = 75
      let conversionRate = 2.3

      // 📊 модификация по фильтрам
      if (filters.city === "Астана") {
        revenue *= 1.2
        orders *= 1.1
      }
      if (filters.channel === "Mobile") {
        revenue *= 0.8
        orders *= 0.9
      }
      if (filters.period === "30d") {
        revenue *= 4
        orders *= 4
      }
      if (filters.period === "ytd") {
        revenue *= 12
        orders *= 12
      }

      // моковый график
      const chart = [
        { date: "2025-09-01", value: revenue * 0.2 },
        { date: "2025-09-02", value: revenue * 0.25 },
        { date: "2025-09-03", value: revenue * 0.15 },
        { date: "2025-09-04", value: revenue * 0.4 },
      ]

      resolve({
        revenue: Math.round(revenue),
        orders: Math.round(orders),
        aov,
        conversionRate,
        chart,
      })
    }, 1000)
  })
}