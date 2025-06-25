import { Product } from '../products'

interface Category {
  id: string
  description: string
  active: boolean
  subcategories: Category[]
}

interface HighlightProduct {
  id: string
  productId: string
  product: Product
  category: Category
}

export interface Highlight {
  id: string
  title: string
  startDate: string
  endDate: string
  companyId: string
  active: boolean
  products: HighlightProduct[]
}
