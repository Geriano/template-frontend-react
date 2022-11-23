import axios from "axios"
import route from "../route"

export interface Permission {
  id: number
  name: string
}

export interface Role {
  id: number
  name: string
  permissions: Permission[]
}

export interface User {
  id: number
  name: string
  email: string
  username: string
  profile_photo_url: string
  permissions: Permission[]
  roles: Role[]
}

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

export async function login(form: LoginParameter) {
  const { status, data: response } = await axios.post(route('login'), form)

  return { status, response } as Response<LoginResponse>
}

export async function logout() {
  const { status, data: response } = await axios.post(route('logout'))

  return { status, response } as Response<LogoutResponse>
}

export async function register(form: RegisterParameter) {
  const { status, data: response } = await axios.post(route('register'), form)

  return { status, response } as Response<RegisterResponse>
}

export async function relog(token: string) {
  const { status, data: response } = await axios.get(route('user'), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return { status, response } as Response<User>
}

export default {
  login, logout, register, relog,
}
