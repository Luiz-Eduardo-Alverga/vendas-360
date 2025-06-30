'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'

export function OrderDetailsSkeleton() {
  return (
    <DialogContent className="max-w-lg max-h-[90vh] min-h-[50vh] overflow-y-auto">
      <DialogHeader>
        <div className="flex items-center justify-between pt-1">
          <div className="flex-1 flex items-center justify-between gap-3">
            <DialogTitle className="text-xl font-semibold">
              <Skeleton className="h-6 w-32" />
            </DialogTitle>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-4 w-48 mt-1" />
      </DialogHeader>

      <Separator />

      <div className="space-y-4">
        {/* Produtos Skeleton */}
        <div className="space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex items-start justify-between py-2">
              <div className="flex items-start gap-3 min-w-0">
                {/* Imagem skeleton */}
                <Skeleton className="w-[50px] h-[50px] rounded" />

                <div className="min-w-0 space-y-1">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              <div className="flex flex-col items-end space-y-1 whitespace-nowrap pl-2">
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Resumo Skeleton */}
        <div className="flex gap-4 justify-between">
          <div className="space-y-1">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>

        {/* Condição de pagamento Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>

        {/* Tabela de Parcelas Skeleton */}
        <div>
          <div className="overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">
                    <Skeleton className="h-3 w-12" />
                  </th>
                  <th className="px-4 py-2 text-left">
                    <Skeleton className="h-3 w-12" />
                  </th>
                  <th className="px-4 py-2 text-left">
                    <Skeleton className="h-3 w-16" />
                  </th>
                  <th className="px-4 py-2 text-right">
                    <Skeleton className="h-3 w-8" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 2 }).map((_, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-2">
                      <Skeleton className="h-3 w-4" />
                    </td>
                    <td className="px-4 py-2">
                      <Skeleton className="h-3 w-12" />
                    </td>
                    <td className="px-4 py-2">
                      <Skeleton className="h-3 w-16" />
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Skeleton className="h-3 w-12" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Observações Skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>

        {/* Chave de acesso Skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        </div>
      </div>
    </DialogContent>
  )
}
