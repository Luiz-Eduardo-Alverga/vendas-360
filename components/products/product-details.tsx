'use client'

import { Heart, ChevronLeft, ChevronRight, Star, Tag, Home } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '@/services/products/get-product'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { ProductQuantity } from '../carrosel/product-quantity'
import { getProductPricing } from '@/utils/promotion/get-active-promotion'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { Separator } from '../ui/separator'
import { RelatedProducts } from './related-products'
import { ProductDetailsSkeleton } from './product-details-skeleton'
import Link from 'next/link'
import { getCategorie } from '@/services/categories/get-categorie'
import { Breadcrumb } from '../breadcrumb'

const CustomTag = ({ icon: Icon, label }: { icon?: any; label: string }) => {
  return (
    <div className="flex items-center h-[34px] bg-white/80 rounded px-2 py-1 border border-gray-200">
      {Icon && <Icon className="w-4 h-4 text-black-500 mr-1" />}
      {label && (
        <span className="text-xs font-medium text-gray-700">{label}</span>
      )}
    </div>
  )
}

export default function ProductDetails({ id }: { id: string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
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
    queryKey: ['products', id],
    queryFn: () => getProduct({ productId: id }),
    retry: 1,
  })

  const categoryId = product?.categoryId

  const { data: category } = useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => getCategorie({ categoryId: categoryId as string }),
    enabled: !!categoryId,
    retry: 1,
  })

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product?.images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + product?.images.length) % product?.images.length,
    )
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="min-h-screen bg-white pt-20  border-b">
      {/* Breadcrumb section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-10 py-4">
          <Breadcrumb
            firtsDescription={category?.description}
            secondDescription={product.name}
          />
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="bg-white rounded-lg px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="flex gap-4">
              {/* Thumbnails Column */}
              <div className="flex flex-col gap-2 w-20">
                {product?.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative w-20 h-20 border rounded-lg overflow-hidden ${
                      currentImageIndex === index
                        ? 'border-2 border-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.id}
                      fill
                      className={`object-cover p-1 ${currentImageIndex !== index ? 'grayscale' : ''}`}
                      sizes="80px"
                      unoptimized
                    />
                  </button>
                ))}
              </div>

              {/* Main Image Container */}
              <div className="relative flex flex-1 ">
                {promotion && promotion.discount && (
                  <span className="absolute font-extrabold top-0 left-0 bg-red-500 text-white text-xs  px-2 py-1 rounded-tl-md z-10">
                    -{promotion.discount.toFixed(2)}% OFF
                  </span>
                )}

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-white rounded-full shadow-sm hover:bg-gray-50"
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : ''}`}
                  />
                </Button>

                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md hover:bg-white"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow-md hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Main Image */}
                <div className="relative aspect-square w-full border bg-white rounded-lg overflow-hidden">
                  {product.images.length === 0 ? (
                    <Image
                      src={normalizeImageUrl(
                        'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748081787471x308714204055397600/image_default.png',
                      )}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-full"
                    />
                  ) : (
                    <Image
                      src={normalizeImageUrl(
                        product?.images[currentImageIndex].url,
                      )}
                      alt={product?.images[currentImageIndex].id || ''}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 78px) 100vw, 50vw"
                      priority
                      unoptimized
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6 flex flex-col justify-between">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <CustomTag icon={Star} label="Pra você" />
                {hasPromotion && <CustomTag icon={Tag} label="Promo" />}
                {product.tags.map((tag) => (
                  <CustomTag label={tag.name} key={tag.id} />
                ))}
              </div>

              {/* Product Title */}
              <h1 className="text-2xl font-semibold">{product?.name}</h1>

              {/* Description */}
              <p className="text-gray-600">{product?.description}</p>

              <p className="text-gray-600">
                A farinha de linhaça marrom da Vitao é moída de forma fina, o
                que a torna fácil de incorporar em diversas receitas, como pães,
                bolos, panquecas, smoothies e barras de cereais.
              </p>

              {/* Product Details */}
              <div className="flex justify-between items-center mt-8 text-[12px] text-[#666666]">
                <span>{product?.unitOfMeasure}</span>
                <div className="flex space-x-4">
                  <span>EAN: {product?.gtin}</span>
                  <span>Código: {product?.externalCode}</span>
                </div>
              </div>

              {/* Price Section */}
              <div className="space-y-4">
                {hasPromotion ? (
                  <div className="space-x-2 flex items-baseline">
                    <p className="text-lg font-bold text-red-600">
                      {formatCurrencyBRL(discountedPrice)}
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                      {formatCurrencyBRL(product.priceDefault)}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold">
                    {formatCurrencyBRL(product.priceDefault)}
                  </p>
                )}

                {/* Quantity and Add to Cart */}
                <div className="flex items-center gap-4">
                  <ProductQuantity
                    productId={product?.id || ''}
                    quantity={quantity}
                    onQuantityChange={handleQuantityChange}
                  />
                  <Button className="flex-1 bg-white text-black border border-gray-200 hover:bg-gray-200 hover:border-gray-300">
                    Adicionar ao Carrinho
                  </Button>
                  <Button
                    variant="secondary"
                    className="bg-black text-white hover:bg-black hover:text-white"
                  >
                    Comprar Agora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <RelatedProducts categoryId={product.categoryId} />
      </div>
    </div>
  )
}
