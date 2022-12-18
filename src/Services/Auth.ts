import axios from "axios"
import route from "../route"
import { LoginParameter, LoginResponse, LogoutResponse, RegisterParameter, RegisterResponse, Response } from "../Interfaces/Auth"
import { User } from "../Interfaces/User"

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
