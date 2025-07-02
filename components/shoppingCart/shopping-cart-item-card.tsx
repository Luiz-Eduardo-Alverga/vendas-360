import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'
import { formatCurrencyBRL } from '@/utils/prodcuts/format-currency-BRL'
import { OrderItem } from '@/interfaces/orders/total-orders'

interface Props {
  item: OrderItem
  quantity: number
  onDecrease: () => void
  onIncrease: () => void
  onDelete: () => void
  isDeleting: boolean
  isUpdatingQuantity: boolean
}

export function ShoppingCartItemCard({
  item,
  quantity,
  onDecrease,
  onIncrease,
  onDelete,
  isDeleting,
  isUpdatingQuantity,
}: Props) {
  const discountPercentage = Math.round(
    ((item.fullPrice - item.price) / item.fullPrice) * 100,
  )

  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <div className="relative">
        <Image
          src={
            item.images.length === 0
              ? normalizeImageUrl(
                  'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748081787471x308714204055397600/image_default.png',
                )
              : normalizeImageUrl(item.images[0].url)
          }
          alt={item.productName}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded"
        />
        {item.fullPrice > item.price && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
            -{discountPercentage.toFixed(2)}%
          </span>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-medium text-sm leading-tight">
            {item.product.name}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            onClick={onDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="w-4 h-4 animate-spin border-2 border-red-500 border-t-transparent rounded-full" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </Button>
        </div>

        <p className="text-xs text-gray-500">{item.unitOfMeasure}</p>

        <div className="flex items-center justify-between">
          <span className="font-semibold">{formatCurrencyBRL(item.price)}</span>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              disabled={isUpdatingQuantity || quantity <= 1}
              onClick={onDecrease}
            >
              <Minus className="w-3 h-3" />
            </Button>

            <span className="w-8 text-center font-medium">{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8"
              disabled={isUpdatingQuantity}
              onClick={onIncrease}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <span className="font-semibold min-w-[80px] text-right">
            {formatCurrencyBRL(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}
