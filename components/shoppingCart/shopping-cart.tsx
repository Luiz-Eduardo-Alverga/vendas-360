'use client'

import { ShoppingCartIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import ShoppingCartItems from './shopping-cart-items'
import { useQuery } from '@tanstack/react-query'
import { getShoppingCartOrder } from '@/services/shoppingCart/get-shopping-cart-order'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { useAuth } from '@/context/AuthContext'
import { ShoppingCartPayments } from './shopping-cart-payments'
import { useState } from 'react'

export function ShoppingCartSheet() {
  const { accessToken, isAuthLoading } = useAuth()
  const [view, setView] = useState<'items' | 'payment'>('items')

  const { data } = useQuery({
    queryKey: ['shoppingCartOrder'],
    queryFn: () =>
      getShoppingCartOrder({
        orderStatus: 'EmOrcamento',
        startDate: '2000-04-12T04:53:57.844Z',
        finishDate: '2050-04-12T04:53:57.844Z',
        withProductsAndPayments: true,
        salesChannel: 'EcommerceB2b',
      }),
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const totalAmount =
    data &&
    data[0].items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center  border p-3 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="relative">
            <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {data &&
                data[0].items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <span className="text-sm font-semibold min-w-[80px] text-right block">
            {data && formatCurrencyBRL(totalAmount || 0)}
          </span>
        </div>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader className="flex flex-row gap-2">
          <ShoppingCartIcon className="w-8 h-8" />
          <SheetTitle className="text-left text-2xl">
            Itens do Seu Carrinho
          </SheetTitle>
        </SheetHeader>

        {view === 'items' ? (
          data && data[0] ? (
            <ShoppingCartItems
              totalAmount={totalAmount || 0}
              items={data[0].items}
              goToPayment={() => setView('payment')}
            />
          ) : (
            <p className="p-4 text-sm text-gray-500">Carrinho vazio</p>
          )
        ) : (
          <ShoppingCartPayments
            totalAmount={totalAmount || 0}
            onGoBack={() => setView('items')}
          />
        )}
      </SheetContent>
    </Sheet>
  )
}
