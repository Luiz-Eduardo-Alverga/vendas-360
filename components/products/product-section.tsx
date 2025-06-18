'use client'

import { ProductCategoryCarousel } from './product-category-carousel'

export function ProductSection() {
  const categories = [
    {
      id: 1,
      name: 'Promoção Granolas Premium',
      isPromotion: true,
      products: [
        {
          id: 101,
          name: 'Granola Keto Australia Hart’s Natural 300 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',
          discount: '-3 % OFF',
          originalPrice: 'R$ 48,99',
          price: 'R$ 47,52',
          isFavorite: false,
        },
        {
          id: 102,
          name: 'Granola Classic Vanilla Puravida 180 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',
          discount: '-3 % OFF',
          originalPrice: 'R$ 44,59',
          price: 'R$ 43,27',
          isFavorite: true,
        },
        {
          id: 103,
          name: 'Granola Zero açúcar Grano Square 200 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',
          discount: '-3 % OFF',
          originalPrice: 'R$ 55,99',
          price: 'R$ 52,99',
          isFavorite: false,
        },
        {
          id: 104,
          name: 'Granola Tradicional Biosoft 500 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',
          discount: '-10 % OFF',
          originalPrice: 'R$ 49,99',
          price: 'R$ 44,99',
          isFavorite: false,
        },
        {
          id: 105,
          name: 'Granola Tradicional Biosoft 500 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',
          discount: '-10 % OFF',
          originalPrice: 'R$ 49,99',
          price: 'R$ 44,99',
          isFavorite: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Cereais Matinais',
      isPromotion: false,
      products: [
        {
          id: 201,
          name: 'Mãe Terra Granola Tradicional Castanhas 800 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',

          originalPrice: 'R$ 39,99',
          price: 'R$ 39,99',
          isFavorite: false,
        },
        {
          id: 202,
          name: 'Jasmine Granola Integral Tradicional 1 kg',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',

          originalPrice: 'R$ 37,99',
          price: 'R$ 37,99',
          isFavorite: true,
        },
        {
          id: 203,
          name: 'Uni Sabor Granola Banana 800 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',
          discount: '-13 % OFF',
          originalPrice: 'R$ 22,99',
          price: 'R$ 19,99',
          isFavorite: false,
        },
        {
          id: 204,
          name: 'Vitalin Granola Quinoa & Castanhas 200 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748282773398x319990631124980300/Aveia-Flocos-Finos---170g-VERSO---Sabores-do-Campo.png',
          discount: '-11 % OFF',
          originalPrice: 'R$ 18,99',
          price: 'R$ 16,99',
          isFavorite: false,
        },
      ],
    },
  ]

  return (
    <>
      {categories.map((category) => (
        <ProductCategoryCarousel
          key={category.id}
          categoryName={category.name}
          products={category.products}
          isPromotion={category.isPromotion}
        />
      ))}
    </>
  )
}
