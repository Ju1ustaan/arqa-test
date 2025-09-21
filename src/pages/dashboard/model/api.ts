export type DashboardData = {
    revenue: number
    orders: number
    aov: number
    conversionRate: number
    chart: { date: string; value: number }[]
}

export const fetchDashboardData = (): Promise<DashboardData> => {

    const shouldFail = Math.random() < 0.3 
    
    if (shouldFail) {
        throw new Error("Ошибка загрузки данных (mock)")
    }
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                revenue: 24000,
                orders: 320,
                aov: 75,
                conversionRate: 2.3,
                chart: [
                    { date: "2025-09-01", value: 500 },
                    { date: "2025-09-02", value: 700 },
                    { date: "2025-09-03", value: 800 },
                    { date: "2025-09-04", value: 600 },
                ],
            })
        }, 1000)
    })
}