import { type } from 'os'
import { ErrorResponse, ResponseApi } from './utils.type'
import { User } from './user.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  refresh_token: string
  expires: string
  user: User
}>

export type AuthResponse_http = ErrorResponse<{
  access_token: string
  refresh_token: string
  expires: string
  user: User
}>

// lưu access_token vào ls
export const saveAccesTokentoLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const clearAccesTokentoLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}
export const getAccesTokentoLS = () => {
  return localStorage.getItem('access_token') || ''
}

export const clear = clearAccesTokentoLS()

// lưu và sửa profile trong ls

export const getUserls = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const saveUser = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
