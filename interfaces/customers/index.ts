export interface Address {
  id: string
  addressNickname: string
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
  active: boolean
}

export interface User {
  id: string
  userName: string
  email: string
  dateBirth: string
  avatarPath: string
  active: boolean
}

export interface Contact {
  name: string
  phoneNumber: string
  email: string
}

export interface Receivable {
  amount: number
  dueDate: string
  orderNumber: string
  installment: string
}

export interface Customer {
  id: string
  entityName: string
  legalName: string
  registrationType: string
  registrationNumber: string
  openingDate: string
  phone: string
  whatsApp: string
  email: string
  externalCode: string
  stateRegistrationIndicator: string
  stateRegistration: string
  observations: string
  creditLimit: number
  canExceedCreditLimit: boolean
  active: boolean
  priceTableId: string
  sellerId: string | null
  createdAt: string
  contacts: Contact[]
  addresses: Address[]
  favoritesProducts: string[]
  paymentTerms: string[]
  receivables: Receivable[]
  pendingDebit: number | null
  user: User
}
