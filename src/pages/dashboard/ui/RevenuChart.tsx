import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Пн", revenue: 4000 },
  { name: "Вт", revenue: 3000 },
  { name: "Ср", revenue: 5000 },
  { name: "Чт", revenue: 2780 },
  { name: "Пт", revenue: 3890 },
  { name: "Сб", revenue: 4390 },
  { name: "Вс", revenue: 3490 },
]


type ChartData = { date: string; value: number }

interface RevenueChartProps {
  type?: "line" | "bar";
  data?: ChartData [];
}

const RevenuChart = ({ type = "line", data }: RevenueChartProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Revenue по дням</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#1E3A85" strokeWidth={2} />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#1E3A85" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export default RevenuChart