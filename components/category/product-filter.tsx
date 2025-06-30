'use client'

import { useState } from 'react'

import { Separator } from '@/components/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/products/get-products'
import { ProductCard } from '../carrosel/product'
import { useCart } from '@/context/cart-context'
import { Breadcrumb } from '../breadcrumb'
import { ProductFilterByCategory } from './product-filter-category'
import { ProductFilterByTags } from './product-filter-tags'
import { ProductFilterOrderBy } from './product-filter-orderBy'
import { ProductFilterByPrice } from './product-filter-price'
import { useSearchParams } from 'next/navigation'
import { useResolvedEntity } from '@/hooks/useResolvedEntity'
import ProductFilterSkeleton from './product-filter-skeleton'
import ProductFilterEmptyState from './product-filter-empty-state'
import { useAuth } from '@/context/AuthContext'

export function ProductFilter({ id }: { id: string }) {
  const { accessToken, isAuthLoading } = useAuth()
  const { addToCart, cartItems } = useCart()
  const { type, name: entityName, isLoading } = useResolvedEntity(id)
  const searchParams = useSearchParams()
  const [productQuantities, setProductQuantities] = useState<{
    [key: string]: number
  }>({})

  const tag = searchParams.get('tags') ?? undefined
  const orderBy = searchParams.get('orderBy') ?? undefined
  const rawMin = searchParams.get('priceMin')
  const rawMax = searchParams.get('priceMax')

  const priceMin = rawMin !== null ? Number(rawMin) : undefined
  const priceMax = rawMax !== null ? Number(rawMax) : undefined

  const handleQuantityChange = (productId: string, newQty: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQty),
    }))
  }

  const isInCart = (productId: string) =>
    cartItems.some((item) => item.product.id === productId)

  const { data: products, isLoading: isLoadingProcuts } = useQuery({
    queryKey: ['products', id, tag, priceMax, priceMin, orderBy],
    queryFn: () => {
      if (type === 'category')
        return getProducts({
          categoryId: id,
          tags: tag,
          priceMin,
          priceMax,
          orderBy,
        })
      if (type === 'promotion')
        return getProducts({
          promotionsId: id,
          tags: tag,
          priceMin,
          priceMax,
          orderBy,
        })
      if (type === 'highlight')
        return getProducts({
          highlightsId: id,
          tags: tag,
          priceMin,
          priceMax,
          orderBy,
        })
      return Promise.resolve([])
    },
    enabled: !isLoading && !!accessToken && !isAuthLoading,
    retry: 1,
  })

  const maxPrice = Math.max(...(products?.map((p) => p.priceDefault) ?? []))

  return (
    <div className="container max-w-[1400px] mx-auto pt-24 py-6 px-4 border-b">
      <nav className="text-sm text-muted-foreground mb-4">
        <Breadcrumb firtsDescription="Busca" secondDescription="Produtos" />
      </nav>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 space-y-6 border h-full p-4">
          {/* Filtros */}
          <div className="text-sm text-muted-foreground mb-4">FILTROS</div>

          <Separator />

          {/* Categorias */}
          <ProductFilterByCategory />

          {/* Etiquetas */}
          <ProductFilterByTags />

          {/* Faixa de preço */}
          <ProductFilterByPrice maxPrice={maxPrice} />
        </div>

        {/* Main Content */}
        {isLoadingProcuts ? (
          <ProductFilterSkeleton />
        ) : (
          <div className="flex-1">
            {/* Breadcrumb */}
            {/* Category Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-bold">{entityName}</h1>
                <ProductFilterOrderBy />
              </div>

              {products && products?.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {products?.length} produtos encontrados
                </p>
              )}
            </div>

            {products?.length === 0 && <ProductFilterEmptyState />}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products &&
                products.map((product) => {
                  const quantity = productQuantities[product.id] ?? 1
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      quantity={quantity}
                      isInCart={isInCart(product.id)}
                      onQuantityChange={handleQuantityChange}
                      onAddToCart={addToCart}
                    />
                  )
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
