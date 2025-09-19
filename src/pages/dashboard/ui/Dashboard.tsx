import { Button } from "@/components/ui/button"
import MetricCard from "./MetricCard"
import Filters from "./Filters"
import RevenuChart from "./RevenuChart"

export const Dashboard = () => {
    return (
        <div className="p-6 space-y-6 w-full">

            <div className="flex justify-between items-center">
                <Filters />
                <Button variant="secondary">Экспорт</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard title="Revenue" value="$24,000" />
                <MetricCard title="Orders" value="320" />
                <MetricCard title="AOV" value="$75" />
                <MetricCard title="Conversion Rate" value="2.3%" />
            </div>

            <RevenuChart type="bar" />
        </div>
    )
}
