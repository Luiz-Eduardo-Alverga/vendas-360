'use client'

import { HeartIcon, X } from 'lucide-react'
import type React from 'react'
import { useEffect, useRef } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useQuery, useQueries } from '@tanstack/react-query'
import { getCustomer } from '@/services/customers/get-customer'
import { useAuth } from '@/context/AuthContext'
import { getProduct } from '@/services/products/get-product'
import type { Product } from '@/interfaces/products'
import { FavoriteProductItem } from './favorite-product-item'
import { FavoritesDropdownLoading } from './favorites-dropdonw-skeleton'

interface FavoritesDropdownProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement>
}

export const FavoritesDropdown: React.FC<FavoritesDropdownProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const { accessToken, isAuthLoading } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: customerData, isLoading: isCustomerLoading } = useQuery({
    queryKey: ['customer'],
    queryFn: getCustomer,
    enabled: !!accessToken && !isAuthLoading,
    retry: 1,
  })

  const favoriteIds = customerData?.favoritesProducts || []

  const favoriteProductsQueries = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ['product', id],
      queryFn: () => getProduct({ productId: id }),
      enabled:
        !!accessToken && !isAuthLoading && favoriteIds.length > 0 && isOpen,
    })),
  })

  const favoriteItems = favoriteProductsQueries
    .map((query) => query.data)
    .filter(Boolean) as Product[]

  const isLoadingProducts = favoriteProductsQueries.some(
    (query) => query.isLoading,
  )

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose, triggerRef])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Show loading state
  if (isCustomerLoading || isLoadingProducts) {
    return (
      <FavoritesDropdownLoading
        isOpen={isOpen}
        onClose={onClose}
        triggerRef={triggerRef}
      />
    )
  }

  if (!isOpen) return null

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full w-[480px] max-w-[90vw] bg-white border border-gray-200 shadow-2xl rounded-lg overflow-hidden z-[400] animate-in fade-in-0 zoom-in-95 duration-200"
    >
      <Card className="border-0 shadow-none">
        <CardHeader className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Meus Favoritos
              </CardTitle>
              <Badge className="bg-gray-100 text-gray-700 text-xs">
                {favoriteItems.length}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {favoriteItems.length > 0 ? (
            <>
              <div className="max-h-96 overflow-y-auto">
                <div className="p-4 space-y-4">
                  {favoriteItems.map((product) => (
                    <FavoriteProductItem
                      key={product.id}
                      product={product}
                      onAddToCart={(p) => console.log('Add to cart:', p)}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <HeartIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum favorito ainda
              </h3>
              <p className="text-gray-600 text-sm">
                Adicione produtos aos seus favoritos para vê-los aqui
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
