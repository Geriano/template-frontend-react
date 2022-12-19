import { Paginator } from "../paginator"
import { Permission } from "./Permission"

export interface Role {
  id: number
  name: string
  permissions: Permission[]
}

export interface State {
  processing: boolean
  form: RoleForm,
  errors: {
    [key in keyof RoleForm]: string
  }
  open: boolean
  search: string
  paginator: Paginator<Role>
  roles: Role[]
}

export interface Order {
  dir: 'asc'|'desc',
  name: 'name'
}

export interface Response {
  status: number
  response: {
    message: string
  }
}

export interface RoleForm {
  id: number|null
  name: string
  permissions: number[]
}