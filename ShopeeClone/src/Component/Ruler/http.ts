import axios, { AxiosError, type AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { HttpStatusCode } from 'src/const/HttpStatusCode'
import { AuthResponse_http, clearAccesTokentoLS, getAccesTokentoLS, saveAccesTokentoLS } from 'src/types/auth.type'
class Http {
  instance: AxiosInstance
  private access_Token: string
  constructor() {
    this.access_Token = getAccesTokentoLS()
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com',
      timeout: 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_Token && config.headers) {
          config.headers.authorization = this.access_Token
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/login' || url === '/register') {
          this.access_Token = (response.data as AuthResponse_http).data.access_token
          saveAccesTokentoLS(this.access_Token)
        } else if (url === '/logout') {
          this.access_Token = ''
          clearAccesTokentoLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any = error.response?.data
          const message = data.message || error.message
          toast.error(`${message}`)
        }
        return Promise.reject(error)
      }
    )
  }
}
const http = new Http().instance
export default http
