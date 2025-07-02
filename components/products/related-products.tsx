import { getProducts } from '@/services/products/get-products'
import { useQuery } from '@tanstack/react-query'
import { ProductCategoryCarousel } from '../carrosel/product-category-carousel'
import { Product } from '@/interfaces/products'
import { useAuth } from '@/context/AuthContext'

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({
  categoryId,
  currentProductId,
}: RelatedProductsProps) {
  const { accessToken, isAuthLoading } = useAuth()

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => getProducts({ categoryId }),
    retry: 1,
    enabled: !!accessToken && !isAuthLoading,
  })

  if (isLoading) {
    return <span>Carregando</span>
  }

  const filteredProducts = (products as Product[]).filter(
    (product) => product.id !== currentProductId,
  )

  if (filteredProducts.length === 0) {
    return null // ou uma mensagem indicando que não há produtos relacionados
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="font-bold text-xl">Produtos Relacionados</h2>
      <ProductCategoryCarousel
        products={filteredProducts}
        isShowAllButtonVisible={false}
      />
    </div>
  )
}
