import { useState } from "react"
import { clients } from "../model/mock"
import type { Client } from "../model/types"

import { ClientFilters} from "./ClientFilters"
import { ClientsTable } from "./ClientsTable"
import { ClientDialog } from "./ClientDialog"

export const Directory = () => {
  const [search, setSearch] = useState("")
  const [city, setCity] = useState("")
  const [selected, setSelected] = useState<Client | null>(null)
  const [open, setOpen] = useState(false)

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
    const matchesCity = city ? c.city === city : true
    return matchesSearch && matchesCity
  })

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-4">Сustomer directory</h1>

      <ClientFilters search={search} setSearch={setSearch} city={city} setCity={setCity} />
      <ClientsTable
        data={filtered}
        onSelect={(c) => {
          setSelected(c)
          setOpen(true)
        }}
      />
      <ClientDialog client={selected} open={open} onOpenChange={setOpen} />
    </div>
  )
}