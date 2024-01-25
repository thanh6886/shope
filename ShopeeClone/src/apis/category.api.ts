import http from 'src/Component/Ruler/http'
import { Category } from 'src/types/category.type'
import { SuccessResponse } from 'src/types/utils.type'

const _URL = 'categories'
const CategoryAPI = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(_URL)
  }
}
export default CategoryAPI
