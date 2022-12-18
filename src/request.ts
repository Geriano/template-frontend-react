import axios, { AxiosError, AxiosResponse } from "axios";

export const success = (response: AxiosResponse) => {
  return response
}

export const error = (e: AxiosError) => {
  if (e.response?.status === 401) {
    window.location.reload()
  }
  
  throw e
}

axios.interceptors.response.use(success, error)