import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { ProductFilterOrderBy } from './product-filter-orderBy'

export default function ProductFilterSkeleton() {
  return (
    <div className="flex-1">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-8 w-32" />
          <div className="flex gap-2 items-center">
            <ProductFilterOrderBy />
          </div>
        </div>
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="relative">
            <CardContent className="p-4">
              {/* Product Image Skeleton */}
              <div className="relative mb-3">
                <Skeleton className="w-full h-48 rounded-md" />
                {/* Badge Skeleton */}
                {index % 2 === 0 && (
                  <Skeleton className="absolute top-2 left-2 h-6 w-16 rounded-full" />
                )}
                {/* Heart Icon Skeleton */}
                <Skeleton className="absolute top-2 right-2 h-8 w-8 rounded-md" />
              </div>

              {/* Product Info Skeleton */}
              <div className="space-y-2">
                {/* Product Name */}
                <div className="space-y-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Price Skeleton */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-20" />
                    {index % 2 === 0 && <Skeleton className="h-4 w-16" />}
                  </div>
                  {index % 2 === 0 && <Skeleton className="h-3 w-32" />}
                </div>

                {/* Quantity and Add Button Skeleton */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center border rounded-md">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-6 w-8 mx-2" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                  <Skeleton className="h-8 w-20 rounded-md" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
