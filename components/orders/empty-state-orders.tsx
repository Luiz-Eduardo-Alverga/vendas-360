"use client"

import { Package, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  title: string
  description: string
  actionText?: string
  onAction?: () => void
}

export function OrdersEmptyState({ title, description, actionText, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Package className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          {actionText}
        </Button>
      )}
    </div>
  )
}
