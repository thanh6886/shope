import { type } from 'os'
import { ResponseApi } from './utils.type'
import { User } from './user.type'

export type AuthResponse = ResponseApi<{
  access_token: string
  refresh_token: string
  expires: string
  user: User
}>
