// utils/products/promotion.ts

import { Product } from '@/interfaces/products'

export function getActivePromotion(product: Product) {
  return product.promotions.find((promo) => promo.active && promo.discount > 0)
}

export function calculateDiscountedPrice(
  originalPrice: number,
  discount: number,
) {
  return originalPrice - originalPrice * (discount / 100)
}

export function getProductPricing(product: Product) {
  const promotion = getActivePromotion(product)

  if (promotion) {
    const discountedPrice = calculateDiscountedPrice(
      product.priceDefault,
      promotion.discount,
    )

    return {
      hasPromotion: true,
      promotion,
      discountedPrice,
      originalPrice: product.priceDefault,
    }
  }

  return {
    hasPromotion: false,
    promotion: null,
    discountedPrice: product.priceDefault,
    originalPrice: product.priceDefault,
  }
}
