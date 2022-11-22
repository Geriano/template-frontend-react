import { ServiceNames, Services, services } from "./service"

const background = typeof queueMicrotask === 'function' ? queueMicrotask : setTimeout
const sanitize = (url: string) => url.replace(/\/+/g, '/').replace(/^\/|\/$/g, '').replace(/(http|https):\//, '$1://')

export function route<T extends ServiceNames>(
  service: ServiceNames,
  route: string,
  params?: any
): string | undefined {
  const missingRouteParameter = (key: string) => background(() => {
    throw Error(`missing parameter [${key}] on [${service}][${route}]`)
  })

  const s = services[service], hostname = s.hostname, prefix = s.prefix || '/', routes = s.routes, base = `${hostname}/${prefix}`

  if (routes.hasOwnProperty(route)) {
    const match = routes[route], availableParams = match.params, args = {} as { [name: string]: any }
    let path = match.path

    if (availableParams && Object.keys(availableParams).length > 0) {
      Object.keys(availableParams).forEach((key: string) => {
        const param = availableParams[key]

        if (typeof params !== 'undefined' && params !== null) {
          if (Object.keys(availableParams).length === 1 && typeof params !== 'object') {
            args[key] = params
          } else {
            if (typeof params === 'object' && params.hasOwnProperty(key)) {
              args[key] = params[key]
            } else {
              param.required && missingRouteParameter(key)
            }
          }
        } else {
          param.required && missingRouteParameter(key)
        }
      })
    }

    if (typeof params !== 'undefined' && params !== null) {
      if (Array.isArray(params)) {
        params.forEach((value: any, key: number) => {
          if (!args.hasOwnProperty(key)) {
            args[key] = value
          }
        })
      } else {
        Object.keys(params).forEach((key) => {
          if (!args.hasOwnProperty(key)) {
            args[key] = params[key]
          }
        })
      }
    }

    const matches = path.match(/\{([\w\d]+)\}/g), solved = [] as string[]

    if (matches) {
      matches.forEach((match: string) => {
        const key = match.substring(1, match.length - 1)
        const value = args[key]
        path = path.replace(new RegExp(match, 'g'), value)

        if (!solved.includes(key)) {
          solved.push(key)
        }
      })
    }

    const query = {} as { [name: string]: any }
    Object.keys(args).filter(key => !solved.includes(key)).forEach(key => query[key] = args[key])
    path = path.replace(/\/+/g, '/').replace(/^\/|\/$/g, '')

    if (Object.keys(query).length > 0) {
      path += '?' + new URLSearchParams(query).toString()
    }

    return sanitize(`${base}/${path}`)
  } else {
    background(() => {
      throw Error(`route [${route}] not exists on service [${service}]`)
    })
  }
}

Object.defineProperty(window, 'route', { value: route })

export default route
