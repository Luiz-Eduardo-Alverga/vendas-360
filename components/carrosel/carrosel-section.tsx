'use client'

import { useQuery, useQueries } from '@tanstack/react-query'
import { ProductCategoryCarousel } from './product-category-carousel'
import { getCategories } from '@/services/categories/get-categories'
import { getProducts } from '@/services/products/get-products'
import { getPromotions } from '@/services/promotions/get-promotions'
import { getHighlights } from '@/services/highlights/get-highlights'
import { slugify } from '@/utils/slugify'
import { Product as APIProduct, ProductPromotion } from '@/interfaces/products'
import { ProductCategoryCarouselSkeleton } from './product-category-carousel-skeleton'
import { isHighlightActive } from '@/utils/highlights/is-highlights-active'
import { useAuth } from '@/context/AuthContext'
import { isPromotionActive } from '@/utils/promotion/is-promotion-active'

export function ProductSection() {
  const { accessToken, isAuthLoading } = useAuth()
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const productQueries = useQueries({
    queries: (categories ?? []).map((category) => ({
      queryKey: ['products', category.id],
      queryFn: () => getProducts({ categoryId: category.id }),
      enabled: !!categories && !!accessToken && !isAuthLoading,
      retry: 1,
    })),
  })

  const { data: promotions = [], isLoading: isLoadingPromotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: highlights, isLoading: isLoadingHighlights } = useQuery({
    queryKey: ['highlights'],
    queryFn: getHighlights,
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const promotionsGroupedByTitle: Record<
    string,
    { id: string; products: APIProduct[] }
  > = {}

  const activeHighlights = highlights?.filter(isHighlightActive)
  const activePromotions = promotions.filter(isPromotionActive)

  if (categoriesLoading || isLoadingPromotions || isLoadingHighlights) {
    return <ProductCategoryCarouselSkeleton />
  }

  return (
    <>
      {activePromotions?.map((promotion) => (
        <div
          key={promotion.id}
          id={slugify(promotion.title)}
          className="scroll-mt-24"
        >
          <ProductCategoryCarousel
            categoryName={promotion.title}
            products={promotion.products.map((hp) => hp.product)}
            isPromotion
            categoryId={promotion.id}
          />
        </div>
      ))}

      {activeHighlights?.map((highlight) => (
        <div
          key={highlight.id}
          id={slugify(highlight.title)}
          className="scroll-mt-24"
        >
          <ProductCategoryCarousel
            categoryName={highlight.title}
            products={highlight.products.map((hp) => hp.product)}
            isHighlight
            categoryId={highlight.id}
          />
        </div>
      ))}

      {categories?.map((category, index) => {
        const productsQuery = productQueries[index]

        if (productsQuery.isLoading) {
          return <ProductCategoryCarouselSkeleton key={category.id} />
        }

        const products = (productsQuery.data ?? []) as APIProduct[]

        return (
          <div
            key={category.id}
            id={slugify(category.description)}
            className="scroll-mt-24"
          >
            <ProductCategoryCarousel
              categoryName={category.description}
              products={products}
              isPromotion={false}
              categoryId={category.id}
            />
          </div>
        )
      })}
    </>
  )
}
