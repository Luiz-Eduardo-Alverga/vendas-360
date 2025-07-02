'use client'

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'

import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'
import { Breadcrumb } from '../breadcrumb'
import { ProgressOrderTab } from './progress-orders-tabs'
import { BilledOrderTabs } from './billed-orders-tabs'
import { FinishedOrdersTabs } from './finished-oders-tabs'
import { CanceledOrdersTabs } from './canceled-orders-tabs'
import { useQuery } from '@tanstack/react-query'
import { getCustomerTotalOrders } from '@/services/orders/get-customer-total-oders'
import { endOfMonth, startOfMonth } from 'date-fns'
import { DateRange } from 'react-day-picker'
import { CalendarPicker } from '../calendar/calendar-picker-range'
import { LoadingOrders } from './loading-orders'
import { useAuth } from '@/context/AuthContext'
import { LoadingOrdersTabs } from './loading-orders-tabs'

export default function UserOrders() {
  const { accessToken, isAuthLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('andamento')
  const [searchTerm, setSearchTerm] = useState('')
  const today = new Date()
  const firstDayOfMonth = startOfMonth(today)
  const lastDayOfMonth = endOfMonth(today)
  const [date, setDate] = useState<DateRange | undefined>({
    from: firstDayOfMonth,
    to: lastDayOfMonth,
  })

  const finishDate = date?.to
    ? new Date(
        date.to.getFullYear(),
        date.to.getMonth(),
        date.to.getDate(),
        23,
        59,
        59,
        999,
      ).toISOString()
    : undefined

  const { data: orders, isLoading: isLoadingOrders } = useQuery({
    queryKey: ['orders', date],
    queryFn: () =>
      getCustomerTotalOrders({
        startDate: date?.from ? date.from.toISOString() : undefined,
        finishDate,
        withProductsAndPayments: true,
      }),
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const ordersInProgress =
    orders?.filter((order) =>
      [
        'PedidoPendenteSincronizacao',
        'PedidoSincronizado',
        'PedidoEmTransporte',
      ].includes(order.orderStatus),
    ) ?? []

  const ordersBilled =
    orders?.filter((order) => order.orderStatus === 'PedidoFaturado') ?? []

  const ordersFinished =
    orders?.filter((order) =>
      ['PedidoEntregue', 'PedidoFinalizado'].includes(order.orderStatus),
    ) ?? []

  const ordersCanceled =
    orders?.filter((order) => order.orderStatus === 'PedidoCancelado') ?? []

  return (
    <div className="container min-h-screen mx-auto px-4 pb-6 mt-24  max-w-7xl border-b">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        <Breadcrumb
          firtsDescription="Usuário"
          secondDescription="Histórico de pedidos"
        />
      </nav>

      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Histórico de pedidos
          </h1>
          <p className="text-gray-600">
            Acompanhe o andamento de todos os seus pedidos!
          </p>
        </div>
        <CalendarPicker date={date} setDate={setDate} />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {isLoadingOrders ? (
          <LoadingOrdersTabs />
        ) : (
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="andamento" className="flex items-center gap-2">
              Pedidos em andamento
              <Badge variant="secondary">{ordersInProgress.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="faturados" className="flex items-center gap-2">
              Faturados
              <Badge variant="secondary">{ordersBilled.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="concluidos" className="flex items-center gap-2">
              Concluídos
              <Badge variant="secondary">{ordersFinished.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="cancelados" className="flex items-center gap-2">
              Cancelados
              <Badge variant="secondary">{ordersCanceled.length}</Badge>
            </TabsTrigger>
          </TabsList>
        )}

        {/* Search and Filters */}
        <div className="flex justify-between items-center mb-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Pesquise o número do pedido ou nome da loja"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isLoadingOrders ? (
          <LoadingOrders columns={5} />
        ) : (
          <>
            <ProgressOrderTab orders={ordersInProgress} />

            <BilledOrderTabs orders={ordersBilled} />

            <FinishedOrdersTabs orders={ordersFinished} />

            <CanceledOrdersTabs orders={ordersCanceled} />
          </>
        )}
      </Tabs>
    </div>
  )
}
