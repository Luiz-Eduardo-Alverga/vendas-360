import { useMutation, useQueryClient } from '@tanstack/react-query'
import { insertItemInShoppingCart } from '@/services/orders/items/insert-item'
import { Product } from '@/interfaces/products'
import { changeItemQuantityFromShoppingCart } from '@/services/orders/items/change-item-quantity'

interface AddToCartParams {
  product: Product
  quantity: number
  orderItemId?: string
  currentQuantity?: number
}

export function useAddToCart() {
  const queryClient = useQueryClient()

  const insertMutation = useMutation({
    mutationFn: insertItemInShoppingCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingCartOrder'] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: changeItemQuantityFromShoppingCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shoppingCartOrder'] })
    },
  })

  const addToCart = async ({
    product,
    quantity,
    orderItemId,
    currentQuantity,
  }: AddToCartParams) => {
    const hasPromotion =
      product.promotions &&
      product.promotions.some((p) => p.active && p.discount > 0)

    const activePromotion = product.promotions?.find(
      (p) => p.active && p.discount > 0,
    )

    const price =
      hasPromotion && activePromotion
        ? product.priceDefault -
          product.priceDefault * (activePromotion.discount / 100)
        : product.priceDefault

    const updatedQuantity = currentQuantity
      ? currentQuantity + quantity
      : quantity

    if (orderItemId) {
      await updateMutation.mutateAsync({
        orderItemId,
        quantity: updatedQuantity,
      })
    } else {
      await insertMutation.mutateAsync({
        fullPrice: product.priceDefault,
        price,
        productId: product.id,
        productName: product.name,
        quantity: updatedQuantity,
        unitOfMeasure: product.unitOfMeasure,
        productExternalCode: product.externalCode,
        productGtin: product.gtin,
        discount:
          hasPromotion && activePromotion ? activePromotion.discount : 0,
      })
    }
  }

  return {
    addToCart,
    isLoading: insertMutation.isPending || updateMutation.isPending,
  }
}
