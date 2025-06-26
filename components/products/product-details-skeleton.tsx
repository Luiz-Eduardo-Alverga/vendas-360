import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-white pt-20 border-b">
      {/* Breadcrumb skeleton */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-10 py-4">
          <div className="flex items-center text-sm space-x-2">
            <Skeleton className="h-4 w-32" />
            <span>›</span>
            <Skeleton className="h-4 w-24" />
            <span>›</span>
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Images Skeleton */}
            <div className="flex gap-4">
              {/* Thumbnails Column */}
              <div className="flex flex-col gap-2 w-20">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={index} className="w-20 h-20 rounded-lg" />
                ))}
              </div>

              {/* Main Image Container */}
              <div className="relative flex flex-1">
                {/* Main Image Skeleton */}
                <div className="relative aspect-square w-full border bg-white rounded-lg overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>
              </div>
            </div>

            {/* Right Column - Product Info Skeleton */}
            <div className="space-y-6 flex flex-col justify-between">
              {/* Tags Skeleton */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-[34px] w-20 rounded" />
                <Skeleton className="h-[34px] w-16 rounded" />
                <Skeleton className="h-[34px] w-24 rounded" />
              </div>

              {/* Product Title Skeleton */}
              <Skeleton className="h-8 w-3/4" />

              {/* Description Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Product Details Skeleton */}
              <div className="flex justify-between items-center mt-8">
                <Skeleton className="h-3 w-16" />
                <div className="flex space-x-4">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              {/* Price Section Skeleton */}
              <div className="space-y-4">
                <div className="space-x-2 flex items-baseline">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Quantity and Add to Cart Skeleton */}
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="my-6">
          <Skeleton className="h-px w-full" />
        </div>

        {/* Related Products Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
