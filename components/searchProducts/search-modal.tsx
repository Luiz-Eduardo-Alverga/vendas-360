/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { Search, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Input } from '../ui/input'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/services/products/get-products'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import Image from 'next/image'
import { Product } from '@/interfaces/products'
import { getProductPricing } from '@/utils/promotion/get-active-promotion'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { accessToken, isAuthLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [hasSearched, setHasSearched] = useState(false)
  const [isWaitingForUser, setIsWaitingForUser] = useState(false)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const {
    data: searchProducts,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: ['product', debouncedSearchTerm],
    queryFn: () => getProducts({ find: debouncedSearchTerm }),
    enabled: debouncedSearchTerm.length > 2 && !!accessToken && !isAuthLoading,
    retry: 1,
  })

  const products = searchProducts || []
  console.log(products)

  const handleProductSelect = (product: Product) => {
    router.push(`/produto/${product.id}`)
    onClose()
  }

  useEffect(() => {
    if (debouncedSearchTerm.length > 2) {
      setHasSearched(true)
    } else {
      setHasSearched(false)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) {
      // User is still typing
      return
    }

    setIsWaitingForUser(false)
  }, [debouncedSearchTerm, searchTerm])

  useEffect(() => {
    if (searchTerm && searchTerm !== debouncedSearchTerm) {
      setIsWaitingForUser(true)
    }
  }, [searchTerm, debouncedSearchTerm])

  useEffect(() => {
    if (isOpen) {
      setSearchTerm('')
      setSelectedIndex(-1)
      setHasSearched(false)
      setIsWaitingForUser(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedIndex >= 0 && itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < products.length - 1 ? prev + 1 : prev,
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && products[selectedIndex]) {
            handleProductSelect(products[selectedIndex])
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, products, onClose, handleProductSelect])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex((prev) =>
            prev < products.length - 1 ? prev + 1 : prev,
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && products[selectedIndex]) {
            handleProductSelect(products[selectedIndex])
          }
          break
        case 'Escape':
          onClose()
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, products, onClose])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
    setSelectedIndex(-1)
  }

  const renderContent = () => {
    if (!searchTerm.trim() && !hasSearched) {
      return (
        <div className="flex flex-col items-center justify-center min-h-0 flex-1 px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Encontre seus produtos favoritos
          </h3>
          <p className="text-gray-600 mb-1">
            Digite o nome do produto, código ou categoria
          </p>
          <p className="text-sm text-gray-500">
            Comece digitando para ver os resultados em tempo real
          </p>
        </div>
      )
    }

    if (isWaitingForUser) {
      return (
        <div className="flex items-center justify-center h-32 flex-1">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></div>
            </div>
            <span className="text-sm font-medium">
              Aguardando você terminar de digitar...
            </span>
          </div>
        </div>
      )
    }

    if (isFetching) {
      return (
        <div className="flex items-center justify-center h-32  flex-1">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            <span className="text-sm font-medium">Buscando produtos...</span>
          </div>
        </div>
      )
    }

    if (isSuccess && products.length > 0) {
      return (
        <div className="flex flex-col min-h-0 flex-1">
          <div className="px-4 lg:px-6 py-3 text-sm text-gray-600 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            {products.length} produto{products.length !== 1 ? 's' : ''}{' '}
            encontrado{products.length !== 1 ? 's' : ''} para {searchTerm}
          </div>
          <div className="flex-1 overflow-y-auto max-h-[350px] min-h-0">
            <div className="space-y-1">
              {products.map((product: Product, index: number) => {
                const { hasPromotion, discountedPrice } =
                  getProductPricing(product)
                return (
                  <div
                    key={product.id}
                    ref={(el) => {
                      itemRefs.current[index] = el
                    }}
                    className={`flex gap-3 p-3 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                      index === selectedIndex
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <Link
                      href={`/produto/${product.id}`}
                      onClick={onClose}
                      className="flex gap-3 w-full"
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
                                <span className="text-lg font-bold text-red-600">
                                  {formatCurrencyBRL(discountedPrice)}
                                </span>
                                <p className="text-xs text-gray-500 line-through">
                                  {formatCurrencyBRL(product.priceDefault)}
                                </p>
                              </>
                            ) : (
                              <p className="text-lg font-bold">
                                {formatCurrencyBRL(product.priceDefault)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    if (isSuccess && products.length === 0 && searchTerm.trim()) {
      return (
        <div className="flex flex-col items-center justify-center min-h-0 flex-1 px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-600 mb-1">
            Não encontramos produtos para {searchTerm}
          </p>
          <p className="text-sm text-gray-400">
            Tente usar termos diferentes ou mais gerais
          </p>
        </div>
      )
    }

    return null
  }

  if (!isOpen) return null

  return (
    <>
      {/* Mobile */}
      <div className="fixed inset-0 bg-white flex flex-col lg:hidden">
        <div className="flex items-center gap-4 p-4 border-b border-gray-200 bg-white flex-shrink-0">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Busque aqui o seu produto"
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-12 pr-4 py-3 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>
        <div className="flex flex-col min-h-0 flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </div>

      {/* Desktop */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="hidden lg:flex max-w-2xl p-0 bg-white rounded-lg shadow-2xl overflow-hidden border-0 flex-col"
          style={{
            height: hasSearched && products.length > 0 ? 'auto' : '400px',
            maxHeight: '80vh',
          }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
          <DialogHeader className="p-6 pb-4 border-b border-gray-100">
            <DialogTitle className="sr-only">Buscar produtos</DialogTitle>
            <div className="relative pr-12">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Busque aqui o seu produto"
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-12 pr-4 py-3 text-base border-0 bg-gray-50 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">{renderContent()}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
