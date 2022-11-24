export interface Route {
  path: string
  params: undefined
}

export interface RouteWithParam<T extends string[]> {
  path: string
  params: {
    [key in Extract<T, string>]: {
      required: boolean
    }
  }
}
