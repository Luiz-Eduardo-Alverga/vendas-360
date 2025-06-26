export interface ProductTag {
  id: string
  tagId: string
  name: string
}

export interface ProductImage {
  id: string
  url: string
  active: boolean
}

export interface ProductStock {
  quantity: number
  companyId: string
}

export interface ProductPromotion {
  id: string
  name: string
  startDate: string
  endDate: string
  active: boolean
  discount: number
}

export interface Product {
  id: string
  name: string
  description: string
  unitOfMeasure: string
  externalCode: string
  integrationId: string | null
  gtin: string
  priceDefault: number
  priceA: number
  priceB: number
  priceC: number
  priceD: number
  discountLimit: number
  active: boolean
  createdAt: string
  brandId: string
  categoryId: string
  subcategoryId: string | null
  tags: ProductTag[]
  images: ProductImage[]
  stock: ProductStock[]
  promotions: ProductPromotion[]
} 
