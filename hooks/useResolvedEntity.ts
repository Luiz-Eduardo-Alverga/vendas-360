import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/services/categories/get-categories'
import { getPromotions } from '@/services/promotions/get-promotions'
import { getHighlights } from '@/services/highlights/get-highlights'
import { useAuth } from '@/context/AuthContext'

export function useResolvedEntity(id: string) {
  const { accessToken, isAuthLoading } = useAuth()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: promotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: highlights } = useQuery({
    queryKey: ['highlights'],
    queryFn: getHighlights,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const category = categories?.find((cat) => cat.id === id)
  const promotion = promotions?.find((promo) => promo.id === id)
  const highlight = highlights?.find((hl) => hl.id === id)

  const type = category
    ? 'category'
    : promotion
      ? 'promotion'
      : highlight
        ? 'highlight'
        : null

  const name =
    category?.description ||
    promotion?.title ||
    highlight?.title ||
    'Resultados'

  const entity = category || promotion || highlight || null

  return {
    type, // 'category' | 'promotion' | 'highlight' | null
    name, // string (para exibir no título)
    entity, // objeto da entidade original
    isLoading: !categories || !promotions || !highlights,
  }
}
