import http from 'src/Component/Ruler/http'
import { Purchase, PurchaseListStatus } from 'src/types/purchase.type'
import { ErrorResponse, SuccessResponse } from 'src/types/utils.type'

const URL = 'purchases'

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body)
  },

  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<ErrorResponse<Purchase[]>>(`${URL}`, {
      params
    })
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<ErrorResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<ErrorResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<ErrorResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}
export default purchaseApi
