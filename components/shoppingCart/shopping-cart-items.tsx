'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Search, Minus, Plus, Trash2, ChevronRight } from 'lucide-react'
import { useCart } from '@/context/cart-context'
import { useState } from 'react'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { Product } from '@/interfaces/products'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { EmptyShoppingCart } from './empty-shopping-cart'

export default function ShoppingCartItems() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    getFormattedCartTotal,
    addToCart,
  } = useCart()
  const [searchTerm, setSearchTerm] = useState('')

  const updateQuantity = (
    productId: string,
    newQuantity: number,
    product: Product,
  ) => {
    if (newQuantity < 1) return

    const existingItem = cartItems.find((item) => item.product.id === productId)
    if (!existingItem) return // Evita erro caso o item não exista no carrinho

    const difference = newQuantity - existingItem.quantity
    addToCart(product, difference)
  }

  const filteredItems = cartItems.filter((item) =>
    item.product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      {/* Search */}
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Pesquise um produto no carrinho"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredItems.length === 0 ? (
          <EmptyShoppingCart />
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-3 p-3 border rounded-lg"
            >
              <div className="relative">
                <Image
                  src={normalizeImageUrl(item.product.images[0]?.url)}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                  width={50}
                  height={50}
                />
                {item.discountPercentage && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                    -{item.discountPercentage.toFixed(2)}%
                  </span>
                )}
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-medium text-sm leading-tight">
                  {item.product.name}
                </h3>
                <p className="text-xs text-gray-500">
                  por {item.product.unitOfMeasure}
                </p>

                <div className="flex items-center justify-between">
                  <span className="font-semibold text-green-600">
                    {formatCurrencyBRL(item.unitPrice)}
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity - 1,
                          item.product,
                        )
                      }
                    >
                      <Minus className="w-3 h-3" />
                    </Button>

                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8"
                      onClick={() =>
                        updateQuantity(
                          item.product.id,
                          item.quantity + 1,
                          item.product,
                        )
                      }
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <span className="font-semibold min-w-[80px] text-right">
                    {formatCurrencyBRL(item.subtotal)}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => removeFromCart(item.product.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-4 space-y-4 bg-white">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Valor Total:</span>
          <span className="text-xl font-bold text-green-600">
            {getFormattedCartTotal()}
          </span>
        </div>

        <Button
          className="w-full p-8 bg-gray-800 hover:bg-gray-900 text-white"
          disabled={cartItems.length === 0}
        >
          <span>Concluir orçamento</span>
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>

        <Button
          variant="ghost"
          className="w-full p-8 border text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={clearCart}
          disabled={cartItems.length === 0}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Apagar orçamento
        </Button>
      </div>
    </>
  )
}
