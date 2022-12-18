import { User } from "./User"

export interface RegisterParameter {
  name: string
  email: string
  username: string
  password: string
  password_confirmation: string
}

export interface RegisterResponse {
  message: string
}

export interface LoginParameter {
  username: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface LogoutResponse {
  message: string
}

export interface Response<T> {
  status: number
  response: T
}

export interface State {
  processing: boolean
  authenticated: boolean
  user: User
  token: string
}