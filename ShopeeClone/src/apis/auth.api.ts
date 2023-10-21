import http from 'src/Component/Ruler/http'
import { AuthResponse, AuthResponse_http } from 'src/types/auth.type'

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse_http>('/register', body)
export const loginAccount = (body: { email: string; password: string }) => http.post('/login', body)
export const logoutAccount = () => http.post('/logout')
