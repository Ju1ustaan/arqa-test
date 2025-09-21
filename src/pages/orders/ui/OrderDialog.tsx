import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type OrderDialogProps = {
  order: {
    id: string
    date: string
    customerId: string
    city: string
    comment?: string
    total: number
    items?: { name: string; qty: number; price: number }[]
  } | null
  onClose: () => void
}

export const OrderDialog = ({ order, onClose }: OrderDialogProps) => {
  return (
    <Dialog open={!!order} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Заказ {order?.id}</DialogTitle>
        </DialogHeader>
        {order && (
          <div className="space-y-2">
            <p>
              <b>Дата:</b> {order.date}
            </p>
            <p>
              <b>Клиент:</b> {order.customerId}
            </p>
            <p>
              <b>Город:</b> {order.city}
            </p>
            <p>
              <b>Комментарий:</b> {order.comment || "—"}
            </p>
            <div>
              <b>Состав заказа:</b>
              <ul className="list-disc list-inside">
                {order.items?.map((i) => (
                  <li key={i.name}>
                    {i.name} × {i.qty} = {(i.qty * i.price).toLocaleString()} ₸
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-bold">
              Итого: {order.total.toLocaleString()} ₸
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
