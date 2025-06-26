'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProductQuantity } from './product-quantity'
import { CustomDiamondIcon } from '../icon/custom-diamond-icon'
import { Product } from '@/interfaces/products'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { useCart } from '@/context/cart-context'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { CustomStarIcon } from '../icon/custor-star-icon'
import { CustomCartAddedIcon } from '../icon/custom-cart-added-icon'
import { getProductPricing } from '@/utils/promotion/get-active-promotion'
import Link from 'next/link'

interface CategoryProps {
  categoryName?: string
  products: Product[]
  isPromotion?: boolean
  isHighlight?: boolean
  isShowAllButtonVisible?: boolean
}

export function ProductCategoryCarousel({
  categoryName,
  products,
  isPromotion = false,
  isHighlight,
  isShowAllButtonVisible = true
}: CategoryProps) {
  const { addToCart, cartItems } = useCart()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [productQuantities, setProductQuantities] = useState<{
    [key: string]: number
  }>({})
  const itemsPerView = 4

  const isInCart = (productId: string) =>
    cartItems.some((item) => item.product.id === productId)

  const handleQuantityChange = (productId: string, newQty: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, newQty),
    }))
  }

  const maxIndex = Math.max(0, products.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const toggleFavorite = (productId: string) => {
    console.log(`Toggle favorite for product ${productId}`)
  }

  return (
    <div className="py-4">
      <div className="max-w-[1250px] mx-auto py-4 px-6 bg-white rounded-md">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isPromotion && (
              <CustomDiamondIcon className="w-6 h-6 text-red-600 bg-red-100 rounded-full" />
            )}

            {isHighlight && (
              <CustomStarIcon className="w-6 h-6 text-yellow-500 bg-yellow-100 rounded-full" />
            )}

            <h2 className="text-xl font-bold text-gray-900">{categoryName}</h2>
          </div>
          {isShowAllButtonVisible && (
            <Button
            variant="link"
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Ver tudo
          </Button>
          )}
          
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * 380}px)`,
                width: `${products.length * (100 / itemsPerView)}%`,
              }}
            >
              {products.map((product) => {
                const quantity = productQuantities[product.id] ?? 1

                const { hasPromotion, promotion, discountedPrice } =
                  getProductPricing(product)

                return (
                  <div
                    key={product.id}
                    className="flex-shrink-0"
                    style={{ width: '300px' }}
                  >
                    <div className="p-4 border-none h-full flex flex-col gap-1 justify-between min-h-[380px]">
                      <Link
                        href={`/produto/${product.id}`} 
                        className="cursor-pointer">
                        {/* Discount Badge */}
                        <div className="relative mb-1">
                          {promotion && promotion.discount && (
                            <span className="absolute font-extrabold top-1 left-0 bg-red-500 text-white text-xs  px-2 py-1 rounded-tl-md z-10">
                              -{promotion.discount.toFixed(2)}% OFF
                            </span>
                          )}

                          <Button
                            variant="link"
                            size="sm"
                            className={`absolute top-0 right-0 p-1 z-10 cursor-pointer bg-white/40 hover:bg-white/50 rounded-full`}
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <Heart className={`w-4 h-4 `} />
                          </Button>
                        </div>

                        {/* Image */}
                        <div className="relative aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
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
                              src={normalizeImageUrl(product.images[0]?.url)}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-cover bg-white"
                            />
                          )}

                          {isInCart(product.id) && (
                            <div className="absolute flex w-full justify-center items-center gap-2 p-1.5 t bottom-0 bg-chart-5">
                              <CustomCartAddedIcon className="w-6 h-6" />
                              <span className="font-semibold text-sm">
                                Já adicionado ao carrinho
                              </span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
                          {product.name}
                        </h3>

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
                      </Link>

                      <div className="flex justify-between text-sm">
                        <span>{product.unitOfMeasure}</span>
                        <span className="font-thin">
                          Código: {product.externalCode}
                        </span>
                      </div>

                      <div className="flex space-x-1 mt-1">
                        <ProductQuantity
                          productId={product.id}
                          quantity={quantity}
                          onQuantityChange={handleQuantityChange}
                        />
                        <div className="flex-1">
                          <Button
                            className="w-full h-full rounded-sm cursor-pointer"
                            onClick={() => {
                              addToCart(product, quantity)
                              handleQuantityChange(product.id, 1)
                            }}
                          >
                            <ShoppingCart />
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-md ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-md ${
              currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={nextSlide}
            disabled={currentIndex === maxIndex || products.length < 3}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}