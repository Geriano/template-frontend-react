import { Paginator } from "../paginator"
import { Permission } from "./Permission"
import { Role } from "./Role"

export interface User {
  id: number
  name: string
  email: string
  username: string
  profile_photo_url: string
  permissions: Permission[]
  roles: Role[]
}

export interface State {
  processing: boolean
  form: UserForm,
  errors: {
    [key in keyof UserForm]: string
  }
  open: boolean
  search: string
  paginator: Paginator<User>
}

export interface Order {
  dir: 'asc'|'desc',
  name: 'name'|'email'|'username'
}

export interface Response {
  status: number
  response: {
    message: string
  }
}

export interface UserForm {
  id: number|null
  name: string
  email: string
  username: string
  password: string
  password_confirmation: string
  permissions: number[]
  roles: number[]
}