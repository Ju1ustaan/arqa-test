import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Client } from "../model/types"

type Props = {
  client: Client | null
  open: boolean
  onOpenChange: (v: boolean) => void
}

export function ClientDialog({ client, open, onOpenChange }: Props) {
  if (!client) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{client.name} — заказы</DialogTitle>
        </DialogHeader>
        <ul className="space-y-2">
          {client.orders?.map((order) => (
            <li key={order.id} className="border p-2 rounded">
              <div>Order ID: {order.id}</div>
              <div>Date: {order.date}</div>
              <div>Total: ${order.total}</div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  )
}