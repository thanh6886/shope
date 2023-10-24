import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/const/HttpStatusCode'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}
export function isAxiosErrorUnprocessableEntity<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export const rateSale = (before: number, affter: number) => {
  return Math.round(((before - affter) / before) * 100) + '%'
}
