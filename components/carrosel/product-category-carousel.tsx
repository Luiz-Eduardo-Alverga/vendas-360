'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CustomDiamondIcon } from '../icon/custom-diamond-icon'
import { Product } from '@/interfaces/products'
import { useCart } from '@/context/cart-context'
import { CustomStarIcon } from '../icon/custor-star-icon'
import { ProductCard } from './product'
import Link from 'next/link'

interface CategoryProps {
  categoryId?: string
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
  isShowAllButtonVisible = true,
  categoryId,
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
            <Link href={`/categoria/${categoryId}`}>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800 cursor-pointer"
              >
                Ver tudo
              </Button>
            </Link>
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
