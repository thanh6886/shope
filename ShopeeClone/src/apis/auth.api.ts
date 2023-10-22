import http from 'src/Component/Ruler/http'
import { AuthResponse, AuthResponse_http } from 'src/types/auth.type'

const authApi = {
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse_http>('/register', body)
  },
  loginAccount(body: { email: string; password: string }) {
    return http.post('/login', body)
  },
  logoutAccount() {
    return http.post('/logout')
  }
}

export default authApi
