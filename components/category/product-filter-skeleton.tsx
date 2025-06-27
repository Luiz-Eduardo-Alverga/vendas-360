import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export default function ProductFilterSkeleton() {
  return (
    <div className="container mx-auto pt-24 py-6">
      <div className="flex gap-6">
        {/* Sidebar Skeleton */}
        <div className="w-64 space-y-6">
          {/* Filtros */}
          <Skeleton className="h-4 w-16" />

          {/* Categorias */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-4" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Etiquetas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-4" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Marcas */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-4" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>

          {/* Faixa de preço */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-2 w-full" />
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 mb-4">
            <Skeleton className="h-4 w-12" />
            <span>&gt;</span>
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Category Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <Skeleton className="h-8 w-32" />
              <div className="flex gap-2 items-center">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-48" />
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
      </div>
    </div>
  )
}
