import { useState } from "react"
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

const Filters = () => {
  const [period, setPeriod] = useState("7d")
  const [channel, setChannel] = useState("Web")
  const [city, setCity] = useState("Алматы")

  return (
    <Sheet>
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
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">7 дней</SelectItem>
                <SelectItem value="30d">30 дней</SelectItem>
                <SelectItem value="qtd">QTD</SelectItem>
                <SelectItem value="ytd">YTD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm">Канал продаж</label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Web">Web</SelectItem>
                <SelectItem value="Mobile">Mobile</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm">Город</label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Алматы">Алматы</SelectItem>
                <SelectItem value="Астана">Астана</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full mt-4">Применить</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default Filters