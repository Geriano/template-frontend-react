import { Route, RouteWithParam } from "./route-defs"

export interface Routes {
  "login": Route,
  "register": Route,
  "logout": Route,
  "user": Route,

  "static": RouteWithParam<'path'>,
  "update-user-general-information": Route,
  "remove-profile-photo": Route,
  "update-user-password": Route,

  "permission.all": Route,
  "permission.store": Route,
  "permission.update": RouteWithParam<'id'>,
  "permission.destroy": RouteWithParam<'id'>,

  "role.all": Route,
  "role.paginate": Route,
  "role.store": Route,
  "role.update": RouteWithParam<'id'>,
  "role.destroy": RouteWithParam<'id'>,

  "user.all": Route,
  "user.paginate": Route,
  "user.store": Route,
  "user.update": RouteWithParam<'id'>,
  "user.destroy": RouteWithParam<'id'>,
}

declare const routes: Routes
declare export default routes
