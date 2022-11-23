export interface Route {
  path: string
  param: undefined
}

export interface RouteWithParam<T extends string[]> {
  path: string
  param: {
    [key in Extract<T, string>]: {
      required: boolean
    }
  }
}
