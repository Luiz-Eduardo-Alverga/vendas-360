import { getProducts } from "@/services/products/get-products"
import { useQuery } from "@tanstack/react-query"
import { ProductCategoryCarousel } from "../carrosel/product-category-carousel"
import { Product } from "@/interfaces/products"

interface RelatedProductsProps {
    categoryId: string
    
}

export function RelatedProducts ({categoryId }: RelatedProductsProps){

    const {data: products, isLoading, error} = useQuery({
        queryKey: ['products', categoryId],
        queryFn: () => getProducts({ categoryId: categoryId }),          
        retry: 1,
        
    })

    if(isLoading) {
        return <span>Carregando</span>
    }

    return (
        <div className="flex flex-col items-center mt-8">
            <h2 className="font-bold text-xl">Produtos Relacionados</h2>
            <ProductCategoryCarousel                
                products={products as Product[]}
                isShowAllButtonVisible={false}
            />
        </div>
    )
}