import { Product } from './product.type'

export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

export type PurchaseListStatus = PurchaseStatus | 0

export interface Purchase {
  _id: string
  buy_count: number
  status: PurchaseStatus
  price: number
  price_before_discount: number
  createdAt: string
  updatedAt: string
  user: string
  product: Product
}

export interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}
