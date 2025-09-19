import { useMemo, useState } from "react"
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Order = {
    id: string
    date: string
    customer: string
    city: string
    channel: string
    status: "New" | "Processing" | "Shipped"
    total: number
    items?: { name: string; qty: number; price: number }[]
    comment?: string
}

const mockOrders: Order[] = Array.from({ length: 32 }, (_, i) => ({
    id: `ORD-${i + 1}`,
    date: "2025-09-19",
    customer: `Customer ${i + 1}`,
    city: i % 2 === 0 ? "Астана" : "Алматы",
    channel: i % 3 === 0 ? "Website" : "Telegram",
    status: i % 2 === 0 ? "New" : "Processing",
    total: 5000 + i * 300,
    items: [
        { name: "Товар A", qty: 1, price: 2000 },
        { name: "Товар B", qty: 2, price: 1500 },
    ],
    comment: "Без комментариев",
}))

export const OrdersTable = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders)
    const [selected, setSelected] = useState<Order | null>(null)

    const [search, setSearch] = useState("")
    const [sortField, setSortField] = useState<keyof Order>("id")
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

    const [page, setPage] = useState(1)
    const pageSize = 10

    
    const filteredOrders = useMemo(() => {
        let result = orders.filter(
            (o) =>
                o.id.toLowerCase().includes(search.toLowerCase()) ||
                o.customer.toLowerCase().includes(search.toLowerCase()) ||
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
    }, [orders, search, sortField, sortOrder])


    const paginatedOrders = filteredOrders.slice(
        (page - 1) * pageSize,
        page * pageSize
    )
    const totalPages = Math.ceil(filteredOrders.length / pageSize)

    const updateStatus = (id: string, status: Order["status"]) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === id ? { ...o, status } : o))
        )
    }

    const handleSort = (field: keyof Order) => {
        if (field === sortField) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortOrder("asc")
        }
    }

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
                        {["id", "date", "customer", "city", "channel", "status", "total"].map((field) => (
                            <TableHead
                                key={field}
                                onClick={() => handleSort(field as keyof Order)}
                                className="cursor-pointer select-none"
                            >
                                {field.toUpperCase()}{" "}
                                {sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedOrders.map((order) => (
                        <TableRow
                            key={order.id}
                            onClick={() => setSelected(order)}
                            className="cursor-pointer hover:bg-muted/50"
                        >
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.customer}</TableCell>
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
                                                    updateStatus(order.id, s as Order["status"])
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
                    ))}
                </TableBody>
            </Table>


            <div className="flex justify-end gap-2">
                <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    Prev
                </Button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                </Button>
            </div>


            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Заказ {selected?.id}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <p>
                            <b>Дата:</b> {selected?.date}
                        </p>
                        <p>
                            <b>Клиент:</b> {selected?.customer}
                        </p>
                        <p>
                            <b>Город:</b> {selected?.city}
                        </p>
                        <p>
                            <b>Комментарий:</b> {selected?.comment}
                        </p>
                        <div>
                            <b>Состав заказа:</b>
                            <ul className="list-disc list-inside">
                                {selected?.items?.map((i) => (
                                    <li key={i.name}>
                                        {i.name} × {i.qty} = {(i.qty * i.price).toLocaleString()} ₸
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <p className="font-bold">
                            Итого: {selected?.total.toLocaleString()} ₸
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
