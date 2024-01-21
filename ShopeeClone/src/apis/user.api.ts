import http from 'src/Component/Ruler/http'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'

interface BodyUpdate extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt' | 'email'> {
  password?: string
  newPassword?: string
}

const UserApi = {
  getProfile() {
    return http.get<SuccessResponse<User>>('me')
  },
  uploadProfile(body: BodyUpdate) {
    return http.put<SuccessResponse<User>>('user', body)
  },
  uploadAvata(body: FormData) {
    return http.post<SuccessResponse<string>>('user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
export default UserApi
