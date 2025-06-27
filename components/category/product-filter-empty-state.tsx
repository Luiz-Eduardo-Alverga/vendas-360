'use client'

import type React from 'react'

import { Package, Search, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  showRefreshButton?: boolean
  showSearchSuggestion?: boolean
  onRefresh?: () => void
  onClearFilters?: () => void
}

export default function ProductFilterEmptyState({
  title = 'Nenhum produto encontrado',
  description = 'Não encontramos produtos que correspondam aos seus critérios de busca.',
  icon,
  showRefreshButton = true,
  showSearchSuggestion = true,
  onRefresh,
  onClearFilters,
}: EmptyStateProps) {
  const defaultIcon = <Package className="h-16 w-16 text-muted-foreground" />

  return (
    <div className="flex items-center  justify-center w-full">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted">
            {icon || defaultIcon}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground max-w-sm">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {onClearFilters && (
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="flex items-center gap-2 bg-transparent"
              >
                <Search className="h-4 w-4" />
                Limpar filtros
              </Button>
            )}

            {showRefreshButton && onRefresh && (
              <Button onClick={onRefresh} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Tentar novamente
              </Button>
            )}
          </div>

          {/* Search Suggestions */}
          {showSearchSuggestion && (
            <div className="pt-4 border-t w-full">
              <p className="text-xs text-muted-foreground mb-2">Sugestões:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>
                  • Remova todos os filtros aplicados clicando no botão de
                  remover filtros
                </li>
                <li>
                  • Altere os filtros utilizados para buscar o(s) produto(s)
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
