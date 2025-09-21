import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchDashboardData } from "../model/api"
import type { DashboardFilters } from "../model/api"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { BarChart, LineChart } from "lucide-react"

import MetricCard from "./MetricCard"
import Filters from "./Filters"
import RevenuChart from "./RevenuChart"

import { cn } from "@/lib/utils"

export const Dashboard = () => {
    const [chartType, setChartType] = useState<"line" | "bar">("line")
     const [filters, setFilters] = useState<DashboardFilters>(() => {
    const saved = localStorage.getItem("filters")
    return saved ? JSON.parse(saved) : { period: "7d", channel: "Web", city: "Алматы" }
  })

    useEffect(() => {
        const savedFilters = localStorage.getItem("filters")
        setFilters(savedFilters ? JSON.parse(savedFilters) : { period: "7d", channel: "Web", city: "Алматы" })
    }, [])

    const { data, isLoading, isError } = useQuery({
        queryKey: ["dashboard", filters],
        queryFn: () => fetchDashboardData(filters),
    })
    return (
        <div className="p-6 space-y-6 w-full">

            <div className="flex justify-between items-center">
                <Filters onApply={setFilters} />
                <Button variant="secondary">Экспорт</Button>
            </div>

            {
                (isLoading || isError) ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Skeleton className={cn("h-[100px] w-full rounded-lg", isError ? "bg-red-400 animate-none" : "")} />
                        <Skeleton className={cn("h-[100px] w-full rounded-lg", isError ? "bg-red-400 animate-none" : "")} />
                        <Skeleton className={cn("h-[100px] w-full rounded-lg", isError ? "bg-red-400 animate-none" : "")} />
                        <Skeleton className={cn("h-[100px] w-full rounded-lg", isError ? "bg-red-400 animate-none" : "")} />
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

            <div className="flex gap-2">
                <Button
                    variant={chartType === "bar" ? "default" : "ghost"}
                    onClick={() => setChartType("bar")}
                >
                    <BarChart className="w-5 h-5" />
                </Button>
                <Button
                    variant={chartType === "line" ? "default" : "ghost"}
                    onClick={() => setChartType("line")}
                >
                    <LineChart className="w-5 h-5" />
                </Button>
            </div>
            {
                (isLoading || isError) ? (
                    <Skeleton className={cn("h-[300px] w-full rounded-lg", isError ? "bg-red-400 animate-none" : "")} />
                ) : (
                    <RevenuChart type={chartType} data={data!.chart} />
                )
            }
        </div>
    )
}
