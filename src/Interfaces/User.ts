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