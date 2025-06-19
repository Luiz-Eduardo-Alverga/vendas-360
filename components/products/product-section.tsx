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
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1749145645209x428608228199125900/pasta_de_amendoim_crocante_integral_500g_221_1_5793a2c470c6676698cf5fb32685fc8b.webp',
          discount: '-3 % OFF',
          originalPrice: 'R$ 44,59',
          price: 'R$ 43,27',
          isFavorite: true,
        },
        {
          id: 103,
          name: 'Granola Zero açúcar Grano Square 200 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1749145557201x147285848728385920/Granola-Zero-Acucar---800g---Sabores-do-Campo.webp',
          discount: '-3 % OFF',
          originalPrice: 'R$ 55,99',
          price: 'R$ 52,99',
          isFavorite: false,
        },
        {
          id: 104,
          name: 'Granola Tradicional Biosoft 500 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1749145435001x935751736708683600/cookies-morango-coberto-zero-acucar-vitao-120g-cf9.webp',
          discount: '-10 % OFF',
          originalPrice: 'R$ 49,99',
          price: 'R$ 44,99',
          isFavorite: false,
        },
        {
          id: 105,
          name: 'Granola Tradicional Biosoft Square 200 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1749145394166x937963763923144400/farinha-de-linhaca-marrom-490g-d666f15084e60feba817466428269723-1024-1024.png',
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
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1749145500380x864646593737931800/7898975890022_1_3_1200_72_SRGB.png.png',

          originalPrice: 'R$ 39,99',
          price: 'R$ 39,99',
          isFavorite: false,
        },
        {
          id: 202,
          name: 'Jasmine Granola Integral Tradicional 1 kg',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1748379900157x794656067831058300/cookies-7-graos-da-magrinha-maca-e-canela-150g.png',

          originalPrice: 'R$ 37,99',
          price: 'R$ 37,99',
          isFavorite: true,
        },
        {
          id: 203,
          name: 'Uni Sabor Granola Banana 800 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1749145462886x102401029309238110/Cookies_integral_Castanha-do-Para_120g.webp',
          discount: '-13 % OFF',
          originalPrice: 'R$ 22,99',
          price: 'R$ 19,99',
          isFavorite: false,
        },
        {
          id: 204,
          name: 'Vitalin Granola Quinoa & Castanhas 200 g',
          image:
            'https://43eba7a9e7b2ca5208818e2171a13420.cdn.bubble.io/f1749145531567x432944550460590000/granola_sem_acucar_1kg_martigran_5793085_1_20201009134602.webp',
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
