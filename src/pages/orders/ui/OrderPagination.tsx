import { Button } from "@/components/ui/button"

type OrderPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const OrderPagination = ({
  page,
  totalPages,
  onPageChange,
}: OrderPaginationProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </Button>
      <span>
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
