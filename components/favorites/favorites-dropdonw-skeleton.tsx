'use client'

import type React from 'react'

import { X } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

interface FavoritesDropdownLoadingProps {
  isOpen: boolean
  onClose: () => void
  triggerRef: React.RefObject<HTMLButtonElement>
}

export const FavoritesDropdownLoading: React.FC<
  FavoritesDropdownLoadingProps
> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="absolute right-0 top-full w-[480px] max-w-[90vw] bg-white border border-gray-200 shadow-2xl rounded-lg overflow-hidden z-[400] animate-in fade-in-0 zoom-in-95 duration-200">
      <Card className="border-0 shadow-none">
        <CardHeader className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-h-96 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Skeleton para 3 itens de produtos */}
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-3 p-3 rounded-lg border border-gray-100"
                >
                  {/* Imagem do produto */}
                  <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />

                  <div className="flex-1 space-y-2">
                    {/* Nome do produto */}
                    <Skeleton className="h-4 w-3/4" />

                    {/* Preço */}
                    <Skeleton className="h-5 w-20" />

                    {/* Botões */}
                    <div className="flex gap-2 pt-1">
                      <Skeleton className="h-8 w-24 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
