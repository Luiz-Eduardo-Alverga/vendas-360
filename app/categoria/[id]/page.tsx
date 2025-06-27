import { ProductFilter } from '@/components/category/product-filter'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Categoria',
}

export default async function CategoryFilterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <Suspense>
      <ProductFilter id={id} />
    </Suspense>
  )
}
