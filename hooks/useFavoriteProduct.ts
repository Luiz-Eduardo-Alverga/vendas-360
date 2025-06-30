import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { insertFavoriteProduct } from '@/services/customers/insert-favorite-product'
import { removeFavoriteProduct } from '@/services/customers/remove-favorite-product'
import { getCustomer } from '@/services/customers/get-customer'
import { useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'

export function useFavoriteProduct(productId: string, enabled: boolean) {
  const { accessToken, isAuthLoading } = useAuth()
  const [isFavorite, setIsFavorite] = useState(false)
  const queryClient = useQueryClient()

  const { data: customerData } = useQuery({
    queryKey: ['customer'],
    queryFn: getCustomer,
    enabled: !!accessToken && !isAuthLoading,
    retry: 1,
  })

  const { mutate: favoriteProduct, isPending: isFavoriting } = useMutation({
    mutationFn: insertFavoriteProduct,
    onSuccess: () => {
      setIsFavorite(true)
      queryClient.invalidateQueries({ queryKey: ['customer'] })  
    },
    onError: (error) => console.error('Erro ao favoritar produto:', error),
  })
  
  const { mutate: unfavoriteProduct, isPending: isUnfavoriting } = useMutation({
    mutationFn: removeFavoriteProduct,
    onSuccess: () => {
      setIsFavorite(false)
      queryClient.invalidateQueries({ queryKey: ['customer'] })
    },
    onError: (error) => console.error('Erro ao remover dos favoritos:', error),
  })

  useEffect(() => {
    if (!customerData || !productId) return
    setIsFavorite(customerData.favoritesProducts?.includes(productId))
  }, [customerData, productId])

  const toggleFavorite = () => {
    if (isFavorite) {
      unfavoriteProduct([productId])
    } else {
      favoriteProduct([{ productId }])
    }
  }

  return {
    isFavorite,
    toggleFavorite,
    isLoading: isFavoriting || isUnfavoriting,
  }
}
