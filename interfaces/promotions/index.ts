import { Product } from '../products'

interface Category {
  id: string
  description: string
  active: boolean
  subcategories: Category[]
}

interface PromotionProduct {
  id: string
  productId: string
  discount: number
  product: Product
  category: Category
}

export interface Promotion {
  id: string
  title: string
  startDate: string
  endDate: string
  active: boolean
  companyId: string
  products: PromotionProduct[]
}
