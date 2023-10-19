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

export const saveAccesTokentoLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const clearAccesTokentoLS = () => {
  localStorage.removeItem('access_token')
}
export const getAccesTokentoLS = () => {
  return localStorage.getItem('access_token') || ''
}
