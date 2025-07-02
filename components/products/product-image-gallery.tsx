'use client'

import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { normalizeImageUrl } from '@/utils/prodcuts/normalize-image-url'

interface Props {
  images: { id: string; url: string }[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onSelect: (index: number) => void
  isFavorite: boolean
  isLoading: boolean
  onToggleFavorite: () => void
  discount?: number
  productName: string
}

export function ProductImageGallery({
  images,
  currentIndex,
  onNext,
  onPrev,
  onSelect,
  isFavorite,
  isLoading,
  onToggleFavorite,
  discount,
  productName,
}: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2 w-20">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => onSelect(i)}
            className={`relative w-20 h-20 border rounded-lg overflow-hidden ${
              currentIndex === i
                ? 'border-2 border-blue-500'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Image
              src={img.url}
              alt={img.id}
              fill
              className={`object-cover p-1 ${currentIndex !== i ? 'grayscale' : ''}`}
              sizes="80px"
              unoptimized
            />
          </button>
        ))}
      </div>

      <div className="relative flex flex-1">
        {discount && (
          <span className="absolute font-extrabold top-0 left-0 bg-red-500 text-white text-xs px-2 py-1 rounded-tl-md z-10">
            -{discount.toFixed(2)}% OFF
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-white rounded-full shadow-sm hover:bg-gray-50"
          onClick={onToggleFavorite}
          disabled={isLoading}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-500'
            } ${isLoading || isFavorite ? 'animate-pulse' : ''}`}
          />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80"
          onClick={onPrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80"
          onClick={onNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="relative aspect-square w-full border bg-white rounded-lg overflow-hidden">
          {images.length === 0 ? (
            <Image
              src={normalizeImageUrl(
                'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748081787471x308714204055397600/image_default.png',
              )}
              alt={productName}
              width={200}
              height={200}
              className="w-full h-full"
            />
          ) : (
            <Image
              src={normalizeImageUrl(images[currentIndex].url)}
              alt={images[currentIndex].id || ''}
              fill
              className="object-contain p-4"
              sizes="(max-width: 78px) 100vw, 50vw"
              priority
              unoptimized
            />
          )}
        </div>
      </div>
    </div>
  )
}
