import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { OrderDetails } from "./orderDetails/order-details"

interface OpenDetailsOrderProps {
  orderId: string
}

export function OpenDetailsOrder({ orderId }: OpenDetailsOrderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="text-blue-600 cursor-pointer">
          Ver detalhes
        </Button>
      </DialogTrigger>

      <OrderDetails orderId={orderId} isOpen={isOpen} />
    </Dialog>
  )
}
