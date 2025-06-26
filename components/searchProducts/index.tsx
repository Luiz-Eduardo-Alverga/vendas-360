'use client'

import type React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/products/get-products'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { getProductPricing } from '@/utils/promotion/get-active-promotion'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { useDebounce } from 'use-debounce'

const searchProductsSchema = z.object({
  find: z.string(),
})

type SearchProductsSchema = z.infer<typeof searchProductsSchema>

export function SearchProducts() {
  const { register, watch } = useForm<SearchProductsSchema>({
    resolver: zodResolver(searchProductsSchema),
  })

  const productName = watch('find')?.trim() || ''
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [debouncedSearch] = useDebounce(productName, 500)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const { data: searchProducts } = useQuery({
    queryKey: ['product', debouncedSearch],
    queryFn: () => getProducts({ find: debouncedSearch }),
    enabled: debouncedSearch.length > 2,
  })
  useEffect(() => {
    if (productName.length > 2 && searchProducts) {
      setIsDropdownOpen(true)
    } else {
      setIsDropdownOpen(false)
    }
  }, [productName, searchProducts])

  return (
    <div className="flex-1 max-w-2xl mx-8 relative" ref={wrapperRef}>
      <div className="relative">
        <Input
          autoComplete="off"
          type="text"
          {...register('find')}
          placeholder="Busque aqui o seu produto"
          className="w-full pl-4 pr-12 py-6 border border-gray-300 rounded-sm shadow-2xl"
          onFocus={() => {
            if (productName.length > 2) {
              setIsDropdownOpen(true)
            }
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsDropdownOpen(false)
            }, 100)
          }}
        />
        <Button
          size="sm"
          className="absolute right-1 top-2 bottom-1 px-3 text-black"
          variant="link"
        >
          <Search className="w-6 h-6" />
        </Button>
      </div>

      {isDropdownOpen && searchProducts && searchProducts.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-sm shadow-2xl z-50 max-h-[450px] overflow-y-auto mt-1">
          <div className="p-3 border-b bg-gray-50">
            <span className="text-sm text-gray-600">
              {searchProducts.length} produto(s) encontrado(s)
            </span>
          </div>

          {searchProducts.map((product) => {
            const { hasPromotion, discountedPrice } = getProductPricing(product)

            return (
              <div
                key={product.id}
                className="flex gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className=" h-22 w-22 border bg-white rounded flex items-center justify-center flex-shrink-0">
                  <Image
                    src={
                      product.images.length === 0
                        ? normalizeImageUrl(
                            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748081787471x308714204055397600/image_default.png',
                          )
                        : normalizeImageUrl(product.images[0].url)
                    }
                    alt={product.name}
                    width={100}
                    height={10}
                  />
                </div>

                <div className="flex-1 min-w-0  flex flex-col justify-between ">
                  <div className="flex justify-between items-start -mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1 truncate">
                        {product.name}
                      </h3>
                    </div>

                    <div className="text-xs text-gray-500">
                      {product.unitOfMeasure}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-500">
                        Código: {product.externalCode}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 justify-end">
                      {hasPromotion ? (
                        <>
                          <span className="text-md font-bold text-red-600">
                            {formatCurrencyBRL(discountedPrice)}
                          </span>
                          <p className="text-xs text-gray-500 line-through">
                            {formatCurrencyBRL(product.priceDefault)}
                          </p>
                        </>
                      ) : (
                        <p className="text-md font-bold">
                          {formatCurrencyBRL(product.priceDefault)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {isDropdownOpen && searchProducts && searchProducts.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-sm shadow-2xl z-50 mt-1">
          <div className="p-4 text-center text-gray-500">
            Nenhum produto encontrado para {productName}
          </div>
        </div>
      )}
    </div>
  )
}
