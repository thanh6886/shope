import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/const/HttpStatusCode'
import { User } from 'src/types/user.type'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
export function isAxiosErrorUnprocessableEntity<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const rateSale = (before: number, affter: number) => {
  return Math.round(((before - affter) / before) * 100) + '%'
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const LocalStorageEventTarget = new EventTarget()

// lưu access_token vào ls
export const saveAccesTokentoLS = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}

export const saveRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const clearAccesTokentoLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
  const clearLSEnvet = new Event('clearAccesTokentoLS')
  LocalStorageEventTarget.dispatchEvent(clearLSEnvet)
}

export const clearRefresh_Token = () => {
  localStorage.removeItem('refresh_token')
}
export const getRefresh_token = () => {
  return localStorage.getItem('refresh_token') || ''
}
export const getAccesTokentoLS = () => {
  return localStorage.getItem('access_token') || ''
}

// lưu và sửa profile trong ls

export const getUserls = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}

export const saveUser = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}
