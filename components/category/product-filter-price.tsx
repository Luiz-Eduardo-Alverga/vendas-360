'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

interface ProductFilterByPriceProps {
  maxPrice: number
}

export function ProductFilterByPrice({ maxPrice }: ProductFilterByPriceProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const urlPriceMin = searchParams.get('priceMin') ?? ''
  const urlPriceMax = searchParams.get('priceMax') ?? ''

  const [priceMin, setPriceMin] = useState(urlPriceMin)
  const [priceMax, setPriceMax] = useState(urlPriceMax)

  // Atualiza os inputs ao mudar a URL
  useEffect(() => {
    setPriceMin(urlPriceMin)
    setPriceMax(urlPriceMax)
  }, [urlPriceMin, urlPriceMax])

  const applyPriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString())

    priceMin !== ''
      ? params.set('priceMin', priceMin)
      : params.delete('priceMin')
    priceMax !== ''
      ? params.set('priceMax', priceMax)
      : params.delete('priceMax')

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString())

    params.delete('priceMin')
    params.delete('priceMax')
    params.delete('tags')
    params.delete('orderBy')

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Faixa de preço</h3>

      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Mínimo"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          min={0}
        />
        <Input
          type="number"
          placeholder="Máximo"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          min={0}
          max={maxPrice}
        />
      </div>

      <Button onClick={applyPriceFilter} className="w-full">
        Aplicar
      </Button>

      <Button
        variant="outline"
        onClick={clearAllFilters}
        className="w-full text-red-600 border-red-300 hover:bg-red-50"
      >
        Remover filtros
      </Button>

      {(priceMin || priceMax) && (
        <p className="text-sm text-muted-foreground">
          Faixa: {priceMin ? formatCurrencyBRL(Number(priceMin)) : '—'} —{' '}
          {priceMax ? formatCurrencyBRL(Number(priceMax)) : '—'}
        </p>
      )}
    </div>
  )
}
