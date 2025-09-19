import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Client } from "../model/types"

type Props = {
  data: Client[]
  onSelect: (client: Client) => void
}

export function ClientsTable({ data, onSelect }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>City</TableHead>
          <TableHead>LTV</TableHead>
          <TableHead>Orders</TableHead>
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