import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { TabsList, TabsTrigger } from '../ui/tabs'

export function LoadingOrdersTabs() {
  return (
    <TabsList className="grid w-full grid-cols-4 mb-6">
      <TabsTrigger value="andamento" className="flex items-center gap-2">
        Pedidos em andamento
        <Badge variant="secondary">
          <Skeleton className="w-2 h-4" />
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="faturados" className="flex items-center gap-2">
        Faturados
        <Badge variant="secondary">
          <Skeleton className="w-2 h-4" />
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="concluidos" className="flex items-center gap-2">
        Concluídos
        <Badge variant="secondary">
          <Skeleton className="w-2 h-4" />
        </Badge>
      </TabsTrigger>
      <TabsTrigger value="cancelados" className="flex items-center gap-2">
        Cancelados
        <Badge variant="secondary">
          <Skeleton className="w-2 h-4" />
        </Badge>
      </TabsTrigger>
    </TabsList>
  )
}
