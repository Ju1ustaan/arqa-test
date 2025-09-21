import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Client } from "../model/types"
import { useTranslation } from "react-i18next"

type Props = {
  data: Client[]
  onSelect: (client: Client) => void
}

export function ClientsTable({ data, onSelect }: Props) {
  const { t } = useTranslation()  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {
            ["Name", "Email", "City", "LTV", "Orders"].map((field) => (
              <TableHead key={field}>{t(`directory.columns.${field}`)}</TableHead>

            ))
          }
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((client) => (
          <TableRow
            key={client.id}
            className="cursor-pointer hover:bg-muted"
            onClick={() => onSelect(client)}
          >
            <TableCell>{client.name}</TableCell>
            <TableCell>{client.email}</TableCell>
            <TableCell>{client.city}</TableCell>
            <TableCell>${client.ltv}</TableCell>
            <TableCell>{client.ordersCount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}