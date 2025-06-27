'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductQuantity } from './product-quantity'
import { Product } from '@/interfaces/products'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { CustomCartAddedIcon } from '../icon/custom-cart-added-icon'
import { getProductPricing } from '@/utils/promotion/get-active-promotion'

interface ProductCardProps {
  product: Product
  quantity: number
  isInCart: boolean
  onQuantityChange: (productId: string, newQty: number) => void
  onAddToCart: (product: Product, quantity: number) => void
}

export function ProductCard({
  product,
  quantity,
  isInCart,
  onQuantityChange,
  onAddToCart,
}: ProductCardProps) {
  const { hasPromotion, promotion, discountedPrice } =
    getProductPricing(product)

  return (
    <div className="flex-shrink-0" style={{ width: '300px' }}>
      <div className="p-4 border-none h-full flex flex-col gap-1 justify-between min-h-[380px]">
        <Link href={`/produto/${product.id}`} className="cursor-pointer">
          <div className="relative mb-1">
            {promotion?.discount && (
              <span className="absolute font-extrabold top-1 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tl-md z-10">
                -{promotion.discount.toFixed(2)}% OFF
              </span>
            )}
            <Button
              variant="link"
              size="sm"
              className="absolute top-0 right-0 p-1 z-10 cursor-pointer bg-white/40 hover:bg-white/50 rounded-full"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          <div className="relative aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
            <Image
              src={
                product.images.length === 0
                  ? normalizeImageUrl(
                      'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748081787471x308714204055397600/image_default.png',
                    )
                  : normalizeImageUrl(product.images[0]?.url)
              }
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-full object-cover bg-white"
            />
            {isInCart && (
              <div className="absolute flex w-full justify-center items-center gap-2 p-1.5 bottom-0 bg-chart-5">
                <CustomCartAddedIcon className="w-6 h-6" />
                <span className="font-semibold text-sm">
                  Já adicionado ao carrinho
                </span>
              </div>
            )}
          </div>

          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {hasPromotion ? (
            <div className="space-x-2 flex items-baseline">
              <p className="text-lg font-bold text-red-600">
                {formatCurrencyBRL(discountedPrice)}
              </p>
              <p className="text-xs text-gray-500 line-through">
                {formatCurrencyBRL(product.priceDefault)}
              </p>
            </div>
          ) : (
            <p className="text-lg font-bold">
              {formatCurrencyBRL(product.priceDefault)}
            </p>
          )}
        </Link>

        <div className="flex justify-between text-sm">
          <span>{product.unitOfMeasure}</span>
          <span className="font-thin">Código: {product.externalCode}</span>
        </div>

        <div className="flex space-x-1 mt-1">
          <ProductQuantity
            productId={product.id}
            quantity={quantity}
            onQuantityChange={onQuantityChange}
          />
          <div className="flex-1">
            <Button
              className="w-full h-full rounded-sm cursor-pointer"
              onClick={() => {
                onAddToCart(product, quantity)
                onQuantityChange(product.id, 1)
              }}
            >
              <ShoppingCart />
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
