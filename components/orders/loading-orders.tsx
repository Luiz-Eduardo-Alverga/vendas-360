"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonProps {
  columns: number
  rows?: number
}

export function LoadingOrders({ columns, rows = 5 }: TableSkeletonProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header Skeleton */}
      <div className="bg-gray-50 px-6 py-3">
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-20" />
          ))}
        </div>
      </div>

      {/* Rows Skeleton */}
      <div className="bg-white divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="flex items-center">
                  {colIndex === columns - 1 ? (
                    // Última coluna (Ações) - botão skeleton
                    <Skeleton className="h-6 w-20" />
                  ) : colIndex === 0 ? (
                    // Primeira coluna (Data) - formato de data
                    <Skeleton className="h-4 w-24" />
                  ) : colIndex === 1 ? (
                    // Segunda coluna (Número) - formato de número
                    <Skeleton className="h-4 w-16" />
                  ) : colIndex === columns - 3 && columns > 4 ? (
                    // Coluna de chave NF-e - ícones
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded" />
                      <Skeleton className="h-6 w-6 rounded" />
                    </div>
                  ) : (
                    // Outras colunas - texto genérico
                    <Skeleton className="h-4 w-full max-w-32" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
