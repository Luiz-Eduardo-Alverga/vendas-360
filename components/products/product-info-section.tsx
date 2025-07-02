'use client'

import { ProductQuantity } from '@/components/carrosel/product-quantity'
import { ProductTag } from './product-tag'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { Star, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Product } from '@/interfaces/products'

interface Props {
  product: Product
  quantity: number
  handleQuantityChange: (productId: string, newQty: number) => void
  isAddingToCart: boolean
  onAddToCart: () => void
  hasPromotion: boolean
  discountedPrice: number
}

export function ProductInfoSection({
  product,
  quantity,
  handleQuantityChange,
  isAddingToCart,
  onAddToCart,
  hasPromotion,
  discountedPrice,
}: Props) {
  return (
    <div className="space-y-6 flex flex-col justify-between">
      <div className="flex flex-wrap gap-2">
        <ProductTag icon={Star} label="Pra você" />
        {hasPromotion && <ProductTag icon={Tag} label="Promo" />}
        {product.tags.map((tag) => (
          <ProductTag label={tag.name} key={tag.id} />
        ))}
      </div>

      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>

      <div className="flex justify-between items-center mt-8 text-[12px] text-[#666666]">
        <span className="text-sm">{product.unitOfMeasure}</span>
        <div className="flex space-x-4">
          <span className="text-sm">EAN: {product.gtin}</span>
          <span className="text-sm">Código: {product.externalCode}</span>
        </div>
      </div>

      <div className="space-y-4">
        {hasPromotion ? (
          <div className="space-x-2 flex items-baseline">
            <p className="text-2xl font-bold text-red-600">
              {formatCurrencyBRL(discountedPrice)}
            </p>
            <p className="text-lg text-gray-500 line-through">
              {formatCurrencyBRL(product.priceDefault)}
            </p>
          </div>
        ) : (
          <p className="text-2xl font-bold">
            {formatCurrencyBRL(product.priceDefault)}
          </p>
        )}

        <div className="flex items-center gap-4">
          <ProductQuantity
            productId={product.id}
            quantity={quantity}
            onQuantityChange={handleQuantityChange}
          />
          <Button
            className="flex-1 bg-white text-black border border-gray-200 hover:bg-gray-200 hover:border-gray-300"
            disabled={isAddingToCart}
            onClick={onAddToCart}
          >
            {isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}
          </Button>
          <Button variant="secondary" className="bg-black text-white">
            Comprar Agora
          </Button>
        </div>
      </div>
    </div>
  )
}
