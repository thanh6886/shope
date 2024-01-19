import http from 'src/Component/Ruler/http'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'

const UserApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  uploadProfile(body: FormData) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  uploadAvata(body: FormData) {
    return http.post<SuccessResponse<User>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
