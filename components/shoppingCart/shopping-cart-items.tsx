'use client'

import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAddToCart } from '@/hooks/useAddToCart'
import { Product } from '@/interfaces/products'
import { OrderItem } from '@/interfaces/orders/total-orders'
import { deleteItemFromShoppingCart } from '@/services/orders/items/delete-item'

import { ShoppingCartSearchBar } from './shopping-cart-search-bar'
import { ShoppingCartItemCard } from './shopping-cart-item-card'
import { ShoppingCartFooter } from './shopping-cart-footer'
import { EmptyShoppingCart } from './empty-shopping-cart'

interface Props {
  items: OrderItem[]
}

export default function ShoppingCartItems({ items }: Props) {
  const queryClient = useQueryClient()
  const { addToCart, isLoading: isUpdatingQuantity } = useAddToCart()

  const [deletingItemId, setDeletingItemId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const debounceTimeouts = useRef<Record<string, NodeJS.Timeout>>({})

  const filteredItems = items.filter((item) =>
    item.product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    const initial = Object.fromEntries(
      items.map((item) => [item.id, item.quantity]),
    )
    setQuantities(initial)
  }, [items])

  const { mutate: deleteItem } = useMutation({
    mutationKey: ['deleteItemFromCart'],
    mutationFn: deleteItemFromShoppingCart,
    onMutate: ({ orderItemId }) => setDeletingItemId(orderItemId),
    onSettled: () => {
      setDeletingItemId(null)
      queryClient.invalidateQueries({ queryKey: ['shoppingCartOrder'] })
    },
  })

  function updateQuantityWithDebounce(itemId: string, newQuantity: number) {
    setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }))
    if (debounceTimeouts.current[itemId]) {
      clearTimeout(debounceTimeouts.current[itemId])
    }

    debounceTimeouts.current[itemId] = setTimeout(() => {
      const item = items.find((i) => i.id === itemId)
      if (!item) return

      addToCart({
        product: item.product as Product,
        quantity: newQuantity - item.quantity,
        orderItemId: item.id,
        currentQuantity: item.quantity,
      })
    }, 600)
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const handleDeleteAllItems = async () => {
    await Promise.all(
      items.map((item) => deleteItemFromShoppingCart({ orderItemId: item.id })),
    )
    queryClient.invalidateQueries({ queryKey: ['shoppingCartOrder'] })
    setIsDialogOpen(false)
  }

  return (
    <>
      <ShoppingCartSearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredItems.length === 0 ? (
          <EmptyShoppingCart />
        ) : (
          filteredItems.map((item) => (
            <ShoppingCartItemCard
              key={item.id}
              item={item}
              quantity={quantities[item.id] ?? item.quantity}
              isDeleting={deletingItemId === item.id}
              isUpdatingQuantity={isUpdatingQuantity}
              onDecrease={() =>
                updateQuantityWithDebounce(item.id, quantities[item.id] - 1)
              }
              onIncrease={() =>
                updateQuantityWithDebounce(item.id, quantities[item.id] + 1)
              }
              onDelete={() => deleteItem({ orderItemId: item.id })}
            />
          ))
        )}
      </div>

      <ShoppingCartFooter
        totalAmount={totalAmount}
        isDisabled={items.length === 0}
        onClearCart={handleDeleteAllItems}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </>
  )
}
