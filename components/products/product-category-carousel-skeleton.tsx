'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { CustomDiamondIcon } from '../custom-diamond-icon'

interface ProductCategoryCarouselSkeletonProps {
  categoryName?: string
  isPromotion?: boolean
  itemCount?: number
}

export function ProductCategoryCarouselSkeleton({
  categoryName,
  isPromotion = false,
  itemCount = 4,
}: ProductCategoryCarouselSkeletonProps) {
  return (
    <div className="py-4">
      <div className="max-w-[1250px] mx-auto py-4 px-6 bg-white rounded-md">
        {/* Section Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isPromotion && (
              <CustomDiamondIcon className="w-6 h-6 text-gray-300 bg-gray-100 rounded-full" />
            )}
            {categoryName ? (
              <h2 className="text-xl font-bold text-gray-900">
                {categoryName}
              </h2>
            ) : (
              <Skeleton className="h-6 w-32" />
            )}
          </div>
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Products Carousel Skeleton */}
        <div className="relative">
          <div className="overflow-hidden">
            <div className="flex gap-4">
              {Array.from({ length: itemCount }).map((_, index) => (
                <div
                  key={index}
                  className="flex-shrink-0"
                  style={{ width: `${100 / itemCount}%` }}
                >
                  <div className="p-4 border-none h-full flex flex-col gap-1 justify-between min-h-[380px]">
                    <div>
                      {/* Discount Badge and Favorite Button Skeleton */}
                      <div className="relative mb-1">
                        {isPromotion && (
                          <Skeleton className="absolute top-1 left-0 h-6 w-20 rounded-tl-md" />
                        )}
                      </div>

                      {/* Image Skeleton */}
                      <Skeleton className="aspect-square mb-3 rounded-lg" />

                      {/* Product Name Skeleton */}
                      <div className="space-y-2 mb-3">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>

                      {/* Price Skeleton */}
                      <div className="space-y-1">
                        <Skeleton className="h-6 w-24" />
                        {isPromotion && <Skeleton className="h-3 w-20" />}
                      </div>
                    </div>

                    {/* Unit and Code Skeleton */}
                    <div className="flex justify-between text-sm">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>

                    {/* Quantity and Add Button Skeleton */}
                    <div className="flex space-x-1 mt-1">
                      <Skeleton className="h-10 w-24 rounded-sm" />
                      <Skeleton className="flex-1 h-10 rounded-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-md opacity-50 cursor-not-allowed"
            disabled
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-md opacity-50 cursor-not-allowed"
            disabled
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
