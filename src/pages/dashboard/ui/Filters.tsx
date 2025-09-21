import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

import type {DashboardFilters} from "../model/api"


interface FiltersProps {
  onApply?: (filters: DashboardFilters) => void;
}

const periodOptions = [
  { value: "7d", label: "7 дней" },
  { value: "30d", label: "30 дней" },
  { value: "qtd", label: "QTD" },
  { value: "ytd", label: "YTD" },
]

const salesOptions = [
  { value: "Web", label: "Web" },
  { value: "Mobile", label: "Mobile" },
  { value: "Offline", label: "Offline" },
]

const cityOptions = [
  { value: "Алматы", label: "Алматы" },
  { value: "Астана", label: "Астана" },
]

const Filters = ({ onApply }: FiltersProps) => {
  const [open, setOpen] = useState(false)
  const [period, setPeriod] = useState<DashboardFilters["period"]>("7d")
  const [channel, setChannel] = useState<DashboardFilters["channel"]>("Web")
  const [city, setCity] = useState<DashboardFilters["city"]>("Алматы")
  
  useEffect(() => {
    const savedFilters = localStorage.getItem("filters")
    if (savedFilters) {
      const { period, channel, city } = JSON.parse(savedFilters)
      if (period) setPeriod(period)
      if (channel) setChannel(channel)
      if (city) setCity(city)
    }
  }, [])

  const applyFilters = () => {
    const filters = { period, channel, city }
    localStorage.setItem("filters", JSON.stringify(filters))
    onApply?.(filters)  
    setOpen(false)   
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Фильтры</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Фильтрация</SheetTitle>
        </SheetHeader>

        <div className="space-y-4 mt-4 px-2">
          <div>
            <label className="text-sm">Период</label>
            <Select value={period} onValueChange={(val) => setPeriod(val as DashboardFilters["period"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {
                  periodOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm">Канал продаж</label>
            <Select value={channel} onValueChange={(val) => setChannel(val as DashboardFilters["channel"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {
                  salesOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm">Город</label>
            <Select value={city} onValueChange={(val) => setCity(val as DashboardFilters["city"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {
                  cityOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-4" onClick={applyFilters}>Применить</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Filters