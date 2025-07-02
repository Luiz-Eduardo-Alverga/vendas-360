'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { useFavoriteProduct } from '@/hooks/useFavoriteProduct'
import { useAddToCart } from '@/hooks/useAddToCart'
import { getProduct } from '@/services/products/get-product'
import { getCategorie } from '@/services/categories/get-categorie'
import { getProductPricing } from '@/utils/promotion/get-active-promotion'
import { getShoppingCartOrder } from '@/services/shoppingCart/get-shopping-cart-order'

import { Separator } from '@/components/ui/separator'
import { Breadcrumb } from '@/components/breadcrumb'
import { RelatedProducts } from './related-products'
import { ProductDetailsSkeleton } from './product-details-skeleton'
import { ProductImageGallery } from './product-image-gallery'
import { ProductInfoSection } from './product-info-section'

export default function ProductDetails({ id }: { id: string }) {
  const { accessToken, isAuthLoading } = useAuth()
  const { addToCart, isLoading: isAddingToCart } = useAddToCart()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [productQuantities, setProductQuantities] = useState<{
    [key: string]: number
  }>({})

  const handleQuantityChange = (productId: string, newQty: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQty),
    }))
  }

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct({ productId: id }),
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: cartData } = useQuery({
    queryKey: ['shoppingCartOrder'],
    queryFn: () =>
      getShoppingCartOrder({
        orderStatus: 'EmOrcamento',
        startDate: '2000-04-12T04:53:57.844Z',
        finishDate: '2050-04-12T04:53:57.844Z',
        withProductsAndPayments: true,
        salesChannel: 'EcommerceB2b',
      }),
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  const { data: category } = useQuery({
    queryKey: ['category', product?.categoryId],
    queryFn: () => getCategorie({ categoryId: product?.categoryId as string }),
    enabled: !!product?.categoryId,
    retry: 1,
  })

  const {
    isFavorite,
    toggleFavorite,
    isLoading: isLoadingFavoritesProducts,
  } = useFavoriteProduct(
    product?.id || '',
    !!accessToken && !isAuthLoading && !!product?.id,
  )

  if (isLoading) return <ProductDetailsSkeleton />

  if (error || !product)
    return (
      <div className="p-8 text-center text-red-500">
        Erro ao carregar produto.
      </div>
    )

  const quantity = productQuantities[product.id] ?? 1
  const { hasPromotion, promotion, discountedPrice } =
    getProductPricing(product)

  const itemInCart = cartData?.[0]?.items.find(
    (item) => item.product.id === product.id,
  )

  return (
    <div className="min-h-screen bg-white pt-20 border-b">
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-10 py-4">
          <Breadcrumb
            firtsDescription={category?.description}
            secondDescription={product.name}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductImageGallery
              images={product.images}
              currentIndex={currentImageIndex}
              onNext={() =>
                setCurrentImageIndex(
                  (prev) => (prev + 1) % product.images.length,
                )
              }
              onPrev={() =>
                setCurrentImageIndex(
                  (prev) =>
                    (prev - 1 + product.images.length) % product.images.length,
                )
              }
              onSelect={setCurrentImageIndex}
              isFavorite={isFavorite}
              isLoading={isLoadingFavoritesProducts}
              onToggleFavorite={toggleFavorite}
              discount={promotion?.discount}
              productName={product.name}
            />

            <ProductInfoSection
              product={product}
              quantity={quantity}
              handleQuantityChange={handleQuantityChange}
              isAddingToCart={isAddingToCart}
              hasPromotion={hasPromotion}
              discountedPrice={discountedPrice}
              onAddToCart={async () => {
                await addToCart({
                  product,
                  quantity,
                  orderItemId: itemInCart?.id,
                  currentQuantity: itemInCart?.quantity,
                })
                handleQuantityChange(product.id, 1)
              }}
            />
          </div>
        </div>

        <Separator />

        <RelatedProducts
          categoryId={product.categoryId}
          currentProductId={product.id}
        />
      </div>
    </div>
  )
}
