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
import { useCart } from '@/context/cart-context'

export function ShoppingCartSheet() {
  const { cartItems, getFormattedCartTotal } = useCart()

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = getFormattedCartTotal()

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center  border p-3 rounded-full cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="relative">
            <ShoppingCartIcon className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {totalQuantity}
            </span>
          </div>
          <span className="text-sm font-semibold min-w-[80px] text-right block">
            {cartTotal}
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

        <ShoppingCartItems />
      </SheetContent>
    </Sheet>
  )
}
