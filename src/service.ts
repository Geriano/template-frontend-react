export interface Service<T> {
  hostname: string
  prefix?: string
  routes: {
    [name in T as string]: {
      methods: Method[]
      path: string
      params?: RouteParam
    }
  },
}

export type Method = 'GET'|'POST'|'PUT'|'PATCH'|'DELETE'

export interface RouteParam {
  [name: string]: {
    required: boolean
  }
}

export type Services = {
  authentication: Service<'login'|'register'|'logout'|'user'>
  profile: Service<'update-user-general-information'|'photo'|'remove-profile-photo'|'update-user-password'>
  permission: Service<'all'|'store'|'update'|'destroy'>
  role: Service<'paginate'|'store'|'update'|'destroy'>
  user: Service<'paginate'|'store'|'update'|'destroy'>
}

export const services: Services = {
  "authentication": {
    "hostname": "http://localhost:3333",
    "routes": {
      "login": {
        "methods": ["POST"],
        "path": "login",
      },
      "register": {
        "methods": ["POST"],
        "path": "register",
      },
      "logout": {
        "methods": ["DELETE"],
        "path": "logout",
      },
      "user": {
        "methods": ["GET"],
        "path": "user",
      },
    },
  },
  "profile": {
    "hostname": "http://localhost:3333",
    "routes": {
      "update-user-general-information": {
        "methods": ["PATCH"],
        "path": "/update-user-general-information"
      },
      "photo": {
        "methods": ["GET"],
        "path": "/{path}",
        "params": {
          "path": {
            "required": true,
          },
        },
      },
      "remove-profile-photo": {
        "methods": ["DELETE"],
        "path": "/remove-profile-photo",
      },
      "update-user-password": {
        "methods": ["PATCH"],
        "path": "/update-user-password",
      },
    },
  },
  "permission": {
    "hostname": "http://localhost:3333",
    "prefix": "/superuser/permission",
    "routes": {
      "all": {
        "methods": ["GET"],
        "path": "/",
      },
      "store": {
        "methods": ["POST"],
        "path": "/",
      },
      "update": {
        "methods": ["PUT", "PATCH"],
        "path": "/{id}",
        "params": {
          "id": {
            "required": true,
          },
        },
      },
      "destroy": {
        "methods": ["DELETE"],
        "path": "/{id}",
        "params": {
          "id": {
            "required": true,
          },
        },
      },
    },
  },
  "role": {
    "hostname": "http://localhost:3333",
    "prefix": "/superuser/role",
    "routes": {
      "all": {
        "methods": ["GET"],
        "path": "/",
      },
      "paginate": {
        "methods": ["GET"],
        "path": "/paginate",
      },
      "store": {
        "methods": ["POST"],
        "path": "/",
      },
      "update": {
        "methods": ["PUT", "PATCH"],
        "path": "/{id}",
        "params": {
          "id": {
            "required": true,
          },
        },
      },
      "destroy": {
        "methods": ["DELETE"],
        "path": "/{id}",
        "params": {
          "id": {
            "required": true,
          },
        },
      },
    },
  },
  "user": {
    "hostname": "http://localhost:3333",
    "prefix": "/user",
    "routes": {
      "paginate": {
        "methods": ["GET"],
        "path": "/paginate",
      },
      "store": {
        "methods": ["POST"],
        "path": "/",
      },
      "update": {
        "methods": ["PUT", "PATCH"],
        "path": "/{id}",
        "params": {
          "id": {
            "required": true,
          },
        },
      },
      "destroy": {
        "methods": ["DELETE"],
        "path": "/{id}",
        "params": {
          "id": {
            "required": true,
          },
        },
      },
    },
  },
}

export type ServiceNames = keyof typeof services

export default services
