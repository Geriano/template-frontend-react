import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

export interface FromValidationErrorResponse<T = string> {
  errors: {
    field: T
    message: string
  }[]
}

export async function get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
  try {
    return await axios.get(url, config)
  } catch (e) {
    if (e instanceof AxiosError && e.status === 401) {
      // 
    }

    throw e
  }
}

export async function post<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
  try {
    return await axios.post(url, config)
  } catch (e) {
    if (e instanceof AxiosError && e.status === 401) {
      // 
    }

    throw e
  }
}

export async function put<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
  try {
    return await axios.put(url, config)
  } catch (e) {
    if (e instanceof AxiosError && e.status === 401) {
      // 
    }

    throw e
  }
}

export async function patch<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
  try {
    return await axios.patch(url, config)
  } catch (e) {
    if (e instanceof AxiosError && e.status === 401) {
      // 
    }

    throw e
  }
}

export async function del<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
  try {
    return await axios.delete(url, config)
  } catch (e) {
    if (e instanceof AxiosError && e.status === 401) {
      // 
    }

    throw e
  }
}
