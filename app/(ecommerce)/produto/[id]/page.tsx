import ProductDetails from '@/components/products/product-details'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Produto',
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Suspense>
      <ProductDetails id={id} />
    </Suspense>
  )
}
