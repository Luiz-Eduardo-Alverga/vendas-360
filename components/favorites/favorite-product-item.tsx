'use client'

import { Button } from '../ui/button'
import { HeartIcon } from 'lucide-react'
import { Product } from '@/interfaces/products'
import { useFavoriteProduct } from '@/hooks/useFavoriteProduct'
import Image from 'next/image'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { getProductPricing } from '@/utils/promotion/get-active-promotion'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import Link from 'next/link'

interface FavoriteProductItemProps {
  product: Product
  onAddToCart?: (product: Product) => void
}

export function FavoriteProductItem({ product }: FavoriteProductItemProps) {
  const { toggleFavorite, isLoading } = useFavoriteProduct(product.id, true)
  const { hasPromotion, discountedPrice, promotion } =
    getProductPricing(product)

  return (
    <Link
      href={`/produto/${product.id}`}
      key={product.id}
      className="flex cursor-pointer items-center gap-4 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow group"
    >
      <div className="relative">
        <Image
          src={normalizeImageUrl(product.images[0]?.url)}
          alt={product.name}
          width={64}
          height={64}
          className="w-16 h-16 object-cover rounded-lg"
        />
        {hasPromotion && (
          <div className="absolute -top-1 -left-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
            -{promotion?.discount.toFixed(0)}% OFF
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-red-600 text-sm">
            {formatCurrencyBRL(
              hasPromotion ? discountedPrice : product.priceDefault,
            )}
          </span>
          {hasPromotion && (
            <span className="text-xs text-gray-400 line-through">
              {formatCurrencyBRL(product.priceDefault)}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          disabled={isLoading}
          className="w-8 h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <HeartIcon
            className={`w-4 h-4 fill-current ${
              isLoading ? 'animate-pulse opacity-50' : ''
            }`}
          />
        </Button>
      </div>
    </Link>
  )
}
