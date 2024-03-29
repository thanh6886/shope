import http from 'src/Component/Ruler/http'
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { AuthResponse, AuthResponse_http } from 'src/types/auth.type'
import { SuccessResponse } from 'src/types/utils.type'

const URL = 'products'

const ProductApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>('products', {
      params
    })
  },
  getProductDetail(_id: string) {
    return http.get<SuccessResponse<Product>>(`products/${_id}`)
  }
}

export default ProductApi
