import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "react-i18next"
type Props = {
  search: string
  setSearch: (v: string) => void
  city: string
  setCity: (v: string) => void
}

export const ClientFilters = ({ search, setSearch, city, setCity }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="flex gap-4 mb-4">
      <Input
        placeholder={t("searchPlaceholderByName")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-1/3"
      />
      <Select value={city} onValueChange={setCity}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Фильтр по городу" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все города</SelectItem>
          <SelectItem value="Алматы">Алматы</SelectItem>
          <SelectItem value="Астана">Астана</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}