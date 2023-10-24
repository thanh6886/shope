import http from 'src/Component/Ruler/http'
import path from 'src/const/path'
import { AuthResponse, AuthResponse_http } from 'src/types/auth.type'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse_http>(path.register, body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post(path.login, body)
  },
  logoutAccount() {
    return http.post(path.logout)
  }
}

export default authApi
