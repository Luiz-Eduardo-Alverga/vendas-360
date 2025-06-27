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

export function ProductSection() {
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    retry: 1,
  })

  const productQueries = useQueries({
    queries: (categories ?? []).map((category) => ({
      queryKey: ['products', category.id],
      queryFn: () => getProducts({ categoryId: category.id }),
      enabled: !!categories,
      retry: 1,
    })),
  })

  const { data: promotions, isLoading: isLoadingPromotions } = useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
    retry: 1,
  })

  const { data: highlights, isLoading: isLoadingHighlights } = useQuery({
    queryKey: ['highlights'],
    queryFn: getHighlights,
    retry: 1,
  })

  const promotionsGroupedByTitle: Record<
    string,
    { id: string; products: APIProduct[] }
  > = {}

  promotions?.forEach((promotion) => {
    promotion.products.forEach((promoProd) => {
      const productWithPromo: APIProduct = {
        ...promoProd.product,
        promotions: [
          {
            id: promotion.id,
            name: promotion.title,
            discount: promoProd.discount,
            startDate: promotion.startDate,
            endDate: promotion.endDate,
            active: promotion.active,
          } as ProductPromotion,
        ],
      }

      if (!promotionsGroupedByTitle[promotion.title]) {
        promotionsGroupedByTitle[promotion.title] = {
          id: promotion.id,
          products: [],
        }
      }

      promotionsGroupedByTitle[promotion.title].products.push(productWithPromo)
    })
  })

  const activeHighlights = highlights?.filter(isHighlightActive)

  if (categoriesLoading || isLoadingPromotions || isLoadingHighlights) {
    return <ProductCategoryCarouselSkeleton />
  }

  return (
    <>
      {Object.entries(promotionsGroupedByTitle).map(
        ([promoTitle, { id: promoId, products: promoProducts }]) => (
          <div
            key={`promotion-${promoTitle}`}
            id={slugify(promoTitle)}
            className="scroll-mt-24"
          >
            <ProductCategoryCarousel
              categoryName={promoTitle}
              products={promoProducts}
              isPromotion
              categoryId={promoId}
            />
          </div>
        ),
      )}

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
