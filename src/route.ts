import routes, { Routes } from "./routes";

type Param = { [key: string]: { required: boolean } }
type AnyObject = { [key: string]: any }

const sanitize = (url: string) => url.replace(/\/+/g, '/').replace(/^\/|\/$/g, '').replace(/(http|https):\//, '$1://')

export default function<
  T extends keyof typeof routes, 
  K extends {
    [key in keyof Routes[T]['param']]: any
  }
>(name: T, params?: K): string {
  const missingRouteParameter = (key: string) => {
    const fn = typeof queueMicrotask !== undefined ? queueMicrotask : setTimeout
    fn (() => {
      throw Error(`Missing parameter [${key}] for route [${name}]`)
    })
  }
  const base = import.meta.env.VITE_BACKEND_URL
  const { path, param: availables } = routes[name]
  const args: AnyObject = {}
  const queries: AnyObject = {}
  
  if (params) {
    if (availables && Object.keys(availables).length) {
      for (const key in availables) {
        const available = (availables as Param)[key]
        
        if (params.hasOwnProperty(key)) {
          args[key] = (params as AnyObject)[key]
        } else {
          available.required && missingRouteParameter(key)
        }
      }

      for (const key in params) {
        const param = params[key]

        if (availables.hasOwnProperty(key)) {
          continue
        }

        queries[key] = param
      }
    } else {
      for (const key in params) {
        queries[key] = params[key]
      }
    }
  }

  let result = sanitize(`${base}/${path}`)

  if (Object.keys(args).length) {
    const replaced: string[] = []

    for (const key in args) {
      result = result.replace(new RegExp(`{${key}}`, 'g'), `${args[key]}`)
      replaced.push(key)
    }

    for (const key in args) {
      if (replaced.includes(key)) {
        continue
      }

      queries[key] = args[key]
    }
  }

  if (Object.keys(queries).length) {
    result += '?' + new URLSearchParams(queries).toString()
  }

  return result
}