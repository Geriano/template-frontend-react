import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { Role as R, Permission as P } from "./Services/Auth";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useRole = () => {
  const { user } = useAppSelector(state => state.auth)

  return new class Role {
    protected roles: R[]

    constructor() {
      this.roles = user.roles
    }

    has(names: string|string[]) {
      if (Array.isArray(names)) {
        for (const name of names) {
          if (this.has(name)) {
            return true
          }
        }

        return false
      }

      return this.roles.filter(role => role.name === names).length > 0
    }
  }
}

export const usePermission = () => {
  const { user } = useAppSelector(state => state.auth)

  return new class Permission {
    protected permissions: P[]

    constructor() {
      this.permissions = user.roles.reduce((permissions: P[], role: R) => {
        return permissions.concat(...role.permissions)
      }, user.permissions)
    }

    has(names: string|string[]) {
      if (Array.isArray(names)) {
        for (const name of names) {
          if (this.has(name)) {
            return true
          }
        }

        return false
      }

      return this.permissions.filter(permission => permission.name === names).length > 0
    }
  }
}
