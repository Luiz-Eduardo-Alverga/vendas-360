'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { Product } from '@/interfaces/products'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'

interface CartItem {
  product: Product
  quantity: number
  unitPrice: number
  subtotal: number
  discountPercentage?: number
  discountName?: string
}

interface CartContextData {
  cartItems: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  getCartTotal: () => number
  getFormattedCartTotal: () => string
}

const CartContext = createContext<CartContextData | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const storedCart = localStorage.getItem('softcom_cart')

    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart)
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart)
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error)
      }
    }
  }, [])

  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const calculateUnitPrice = (product: Product) => {
    const activePromotion = product.promotions.find(
      (promo) => promo.active && promo.discount > 0,
    )

    if (activePromotion) {
      const discounted =
        product.priceDefault -
        product.priceDefault * (activePromotion.discount / 100)
      return {
        unitPrice: discounted,
        discountPercentage: activePromotion.discount,
        discountName: activePromotion.name,
      }
    }

    return {
      unitPrice: product.priceDefault,
      discountPercentage: undefined,
      discountName: undefined,
    }
  }

  const addToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id,
      )

      const { unitPrice, discountPercentage, discountName } =
        calculateUnitPrice(product)
      const newSubtotal = unitPrice * quantity

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * unitPrice,
              }
            : item,
        )
      } else {
        return [
          ...prevItems,
          {
            product,
            quantity,
            unitPrice,
            subtotal: newSubtotal,
            discountPercentage,
            discountName,
          },
        ]
      }
    })
  }

  useEffect(() => {
    localStorage.setItem('softcom_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.subtotal, 0)
  }

  const getFormattedCartTotal = () => {
    return formatCurrencyBRL(getCartTotal())
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        getFormattedCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart precisa estar dentro de um CartProvider')
  }
  return context
}
