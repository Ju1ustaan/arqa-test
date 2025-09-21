import { useMemo, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import { fetchOrderData } from "../model/api"
import type { OrdersData } from "../model/api"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { OrderDialog } from "./OrderDialog"
import { OrderPagination } from "./OrderPagination"
import { cn } from "@/lib/utils"

export const OrdersTable = () => {
  const { data, isLoading, isError } = useQuery<OrdersData[]>({
    queryKey: ["orders"],
    queryFn: fetchOrderData,
  })

  const [selected, setSelected] = useState<OrdersData | null>(null)

  const [search, setSearch] = useState("")
  const [sortField, setSortField] = useState<keyof OrdersData>("id")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const [page, setPage] = useState(1)
  const pageSize = 10

  const filteredOrders = useMemo(() => {
    if (!data) return []

    let result = data.filter(
      (o) =>
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customerId.toLowerCase().includes(search.toLowerCase()) ||
        o.city.toLowerCase().includes(search.toLowerCase())
    )

    result.sort((a, b) => {
      const valA = a[sortField]
      const valB = b[sortField]
      if (valA == null || valB == null) return 0
      if (valA < valB) return sortOrder === "asc" ? -1 : 1
      if (valA > valB) return sortOrder === "asc" ? 1 : -1
      return 0
    })
    return result
  }, [data, search, sortField, sortOrder])

  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize
  )
  const totalPages = Math.ceil(filteredOrders.length / pageSize)

  const updateStatus = (id: string, status: OrdersData["status"]) => {
    if (!data) return
    data.map((o) => (o.id === id ? { ...o, status } : o))
  }

  const handleSort = (field: keyof OrdersData) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

//   if (isLoading) return <div>Загрузка...</div>
//   if (isError) return <div>Ошибка загрузки</div>

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by ID, customer, or city..."
        value={search}
        onChange={(e) => {
          setPage(1)
          setSearch(e.target.value)
        }}
        className="max-w-sm"
      />

      <Table>
        <TableHeader>
          <TableRow>
            {["id", "date", "customerId", "city", "channel", "status", "total"].map(
              (field) => (
                <TableHead
                  key={field}
                  onClick={() => handleSort(field as keyof OrdersData)}
                  className="cursor-pointer select-none"
                >
                  {field.toUpperCase()}{" "}
                  {sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          (isLoading || isError)?
          Array.from({length:5}).map((_,i)=>(
            <TableRow key={i}>
              <TableCell className={cn("h-10 bg-gray-200 rounded col-span-7 animate-pulse", isError && "bg-red-300 animate-none")} />
              <TableCell className={cn("h-10 bg-gray-200 rounded col-span-7 animate-pulse", isError && "bg-red-300 animate-none")} />
              <TableCell className={cn("h-10 bg-gray-200 rounded col-span-7 animate-pulse", isError && "bg-red-300 animate-none")} />
              <TableCell className={cn("h-10 bg-gray-200 rounded col-span-7 animate-pulse", isError && "bg-red-300 animate-none")} />
              <TableCell className={cn("h-10 bg-gray-200 rounded col-span-7 animate-pulse", isError && "bg-red-300 animate-none")} />
              <TableCell className={cn("h-10 bg-gray-200 rounded col-span-7 animate-pulse", isError && "bg-red-300 animate-none")} />
              <TableCell className={cn("h-10 bg-gray-200 rounded col-span-7 animate-pulse", isError && "bg-red-300 animate-none")} />
            </TableRow>
          )):
          paginatedOrders.map((order) => (
            <TableRow
              key={order.id}
              onClick={() => setSelected(order)}
              className="cursor-pointer hover:bg-muted/50"
            >
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.customerId}</TableCell>
              <TableCell>{order.city}</TableCell>
              <TableCell>{order.channel}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {order.status}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {["New", "Processing", "Shipped"].map((s) => (
                      <DropdownMenuItem
                        key={s}
                        onClick={(e) => {
                          e.stopPropagation()
                          updateStatus(order.id, s as OrdersData["status"])
                        }}
                      >
                        {s}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
              <TableCell className="text-right">
                {order.total.toLocaleString()} ₸
              </TableCell>
            </TableRow>
          ))
          }
        </TableBody>
      </Table>

      <OrderPagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <OrderDialog order={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
