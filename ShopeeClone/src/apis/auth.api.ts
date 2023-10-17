import http from 'src/Component/Ruler/http'
import { AuthResponse } from 'src/types/auth.type'

export const registerAccount = (body: { email: string; password: string }) => http.post<AuthResponse>('/register', body)
export const loginAccount = (body: { email: string; password: string }) => http.post('/login', body)
