import { OrdersTable } from "./OrderTable"
import { useTranslation } from "react-i18next"

export const Orders = () => {
  const { t } = useTranslation()
  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">{t('orders.title')}</h2>
      <OrdersTable />
    </div>
  )
}
