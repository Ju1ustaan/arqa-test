import { OrdersTable } from "./OrderTable"
export const Orders = () => {
  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <OrdersTable />
    </div>
  )
}
