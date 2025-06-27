import { ProductFilter } from '@/components/category/product-filter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categoria',
}

export default async function CategoryFilterPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <ProductFilter id={id} />
}
