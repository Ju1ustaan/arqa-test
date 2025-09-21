import { useQuery } from "@tanstack/react-query"
import { fetchDashboardData } from "../model/api"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import MetricCard from "./MetricCard"
import Filters from "./Filters"
import RevenuChart from "./RevenuChart"
import { cn } from "@/lib/utils"

export const Dashboard = () => {

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['dashboardData'],
        queryFn: fetchDashboardData
    })

    // if (isLoading) return <div>Загрузка...</div>
    // if (error) return <div>Ошибка загрузки данных</div>

    return (
        <div className="p-6 space-y-6 w-full">

            <div className="flex justify-between items-center">
                <Filters />
                <Button variant="secondary">Экспорт</Button>
            </div>

            {
                (isLoading || isError) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Skeleton className={cn("h-[100px] w-full rounded-lg", isError? "bg-red-400 animate-none": "")} />
                        <Skeleton className={cn("h-[100px] w-full rounded-lg", isError? "bg-red-400 animate-none": "")} />
                        <Skeleton className={cn("h-[100px] w-full rounded-lg", isError? "bg-red-400 animate-none": "")} />
                        <Skeleton className={cn("h-[100px] w-full rounded-lg", isError? "bg-red-400 animate-none": "")} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard title="Revenue" value={`$${data!.revenue}`} />
                        <MetricCard title="Orders" value={data!.orders.toString()} />
                        <MetricCard title="AOV" value={`$${data!.aov}`} />
                        <MetricCard title="Conversion Rate" value={`${data!.conversionRate}%`} />
                    </div>
                )
            }


            {
                (isLoading || isError) ? (
                    <Skeleton className={cn("h-[300px] w-full rounded-lg", isError? "bg-red-400 animate-none": "")} />
                ) : (
                    <RevenuChart type="bar" data={data!.chart} />
                )
            }
        </div>
    )
}
