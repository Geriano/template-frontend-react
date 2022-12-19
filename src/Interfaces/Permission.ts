export interface Permission {
  id: number
  name: string
}

export interface Response {
  status: number
  response: {
    message: string
  }
}

export interface PermissionForm {
  name: string
}