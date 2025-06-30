import { Badge } from "@/components/ui/badge"

interface OrderStatusBadgeProps {
  status: string
}

const statusMap: Record<
  string,
  { label: string; color: string; textColor?: string }
> = {
  EmOrcamento: { label: "Pedido em andamento", color: "#FFA600", textColor: "#000000" },
  PedidoPendenteSincronizacao: { label: "Pedido em andamento", color: "#FFA600", textColor: "#000000" },
  PedidoSincronizado: { label: "Pedido em andamento", color: "#FFA600", textColor: "#000000" },
  PedidoEmTransporte: { label: "Pedido em andamento", color: "#FFA600", textColor: "#000000" },

  PedidoFaturado: { label: "Faturado", color: "#4C25FB", textColor: "#ffffff" },

  PedidoEntregue: { label: "Concluído", color: "#00BB0C1A", textColor: "#00BB0C" },
  PedidoFinalizado: { label: "Concluído", color: "#00BB0C1A", textColor: "#00BB0C" },

  PedidoCancelado: { label: "Cancelado", color: "#FF1D251A", textColor: "#FF1D25" },
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusMap[status]

  if (!config) return null

  return (
    <Badge
      className="font-medium"
      style={{
        backgroundColor: config.color,
        color: config.textColor ?? "#000",
      }}
    >
      {config.label}
    </Badge>
  )
}
