import { type } from 'os'
import { ResponseApi, SuccessResponse } from './utils.type'
import { User } from './user.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  refresh_token: string
  expires: string
  user: User
}>

export type AuthResponse_http = SuccessResponse<{
  // lấy thành công
  access_token: string
  refresh_token: string
  expires: string
  user: User
}>
