'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ProductQuantity } from './product-quantity'
import { CustomDiamondIcon } from '../custom-diamond-icon'

interface Product {
  id: number
  name: string
  image: string
  discount?: string
  originalPrice: string
  price: string
  isFavorite: boolean
}

interface CategoryProps {
  categoryName: string
  products: Product[]
  isPromotion: boolean
}

export function ProductCategoryCarousel({
  categoryName,
  products,
  isPromotion,
}: CategoryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [productQuantities, setProductQuantities] = useState<{
    [key: number]: number
  }>({})
  const itemsPerView = 4

  const handleQuantityChange = (productId: number, newQty: number) => {
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

  const toggleFavorite = (productId: number) => {
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

            <h2 className="text-xl font-bold text-gray-900">{categoryName}</h2>
          </div>
          <Button variant="link" className="text-blue-600 hover:text-blue-800">
            Ver tudo
          </Button>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-4"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                width: `${(products.length / itemsPerView) * 100}%`,
              }}
            >
              {products.map((product) => {
                const quantity = productQuantities[product.id] ?? 1

                return (
                  <div
                    key={product.id}
                    className="flex-shrink-0"
                    style={{ width: `${100 / products.length}%` }}
                  >
                    <div className="p-4 border-none h-full flex flex-col gap-1 justify-between min-h-[380px]">
                      <div>
                        {/* Discount Badge */}
                        <div className="relative mb-1">
                          {product.discount && (
                            <span className="absolute top-1 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
                              {product.discount}
                            </span>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            className={`absolute top-0 right-0 p-1 z-10 ${
                              product.isFavorite
                                ? 'text-red-500'
                                : 'text-gray-400'
                            }`}
                            onClick={() => toggleFavorite(product.id)}
                          >
                            <Heart
                              className={`w-4 h-4 ${product.isFavorite ? 'fill-current' : ''}`}
                            />
                          </Button>
                        </div>

                        {/* Image */}
                        <div className="aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover bg-white"
                          />
                        </div>

                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>

                        {product.discount ? (
                          <div className="space-x-2 flex items-baseline">
                            <p className="text-lg font-bold text-red-600">
                              {product.price}
                            </p>
                            <p className="text-xs text-gray-500 line-through">
                              {product.originalPrice}
                            </p>
                          </div>
                        ) : (
                          <p className="text-lg font-bold">
                            {product.originalPrice}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Unidade</span>
                        <span>Código: 213131313</span>
                      </div>

                      <div className="flex space-x-1 mt-2">
                        <ProductQuantity
                          productId={product.id}
                          quantity={quantity}
                          onQuantityChange={handleQuantityChange}
                        />
                        <div className="flex-1">
                          <Button className="w-full h-full rounded-sm">
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

          {/* Navigation Arrows */}
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
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
