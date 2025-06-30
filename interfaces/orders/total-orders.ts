export interface OrderItemImage {
  id: string
  url: string
  active: boolean
}

export interface Product {
  id: string
  name: string
  priceDefault: number
  priceA: number
  priceB: number
  priceC: number
  priceD: number
  discountLimit: number
}

export interface PriceTable {
  id: string
  name: string
}

export interface OrderItem {
  id: string
  productId: string
  productExternalCode: string
  productGtin: string
  productName: string
  unitOfMeasure: string
  quantity: number
  price: number
  fullPrice: number
  discount: number
  images: OrderItemImage[]
  product: Product
  priceTable: PriceTable
}

export interface Payment {
  amount: number
  cardBrand: string
  installments: number
  dueDate: string
  paymentMethodName: string
}

export interface DeliveryAddress {
  id: string
  addressStreet: string
  addressNumber: string
  addressComplement: string
  addressNeighborhood: string
  addressCity: string
  addressCityCode: string
  addressState: string
  addressZipCode: string
  isBillingAddress: boolean
  isMainAddress: boolean
}

export interface Customer {
  id: string
  entityName: string
  legalName: string
  phone: string
  whatsApp: string
  registrationNumber: string
  externalCode: string
  deliveryAddress: DeliveryAddress
}

export interface Company {
  id: string
  companyName: string
  legalName: string
  registrationNumber: string
  stateRegistration: string
}

interface PaymentTerm {
  id: string
  name: string
}

export interface Order {
  id: string
  orderStatus: string
  orderNumber: string
  orderDate: string
  orderDeliveryForecast: string
  orderInvoice: string
  invoiceNumber: string
  orderDone: string
  orderCanceled: string
  totalAmount: number
  discountValue: number
  discountPercentage: number
  finalAmount: number
  observations: string
  salesChannel: string
  items: OrderItem[]
  payments: Payment[]
  paymentTerm: PaymentTerm
  customer: Customer
  company: Company
}
