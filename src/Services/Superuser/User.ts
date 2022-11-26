import axios from "axios";
import { Paginator } from "../../paginator";
import route from "../../route";
import { User } from "../Auth";

interface Order {
  dir: 'asc'|'desc',
  name: 'name'|'email'|'username'
}

interface Response {
  status: number
  response: {
    message: string
  }
}

export interface UserForm {
  id: number|null
  name: string
  email: string
  username: string
  password: string
  password_confirmation: string
  permissions: number[]
  roles: number[]
}

export default {
  paginate: async (search: string, order: Order, { current_page, per_page }: Paginator<User>['meta']) => {
    const { data: response } = await axios.post(route('user.paginate'), {
      page: current_page,
      per_page,
      search,
      order,
    })

    return response as Paginator<User>
  },
  store: async (form: UserForm) => {
    const { status, data: response } = await axios.post(route('user.store'), form)
  
    return { status, response } as Response
  },
  update: async (id: number, form: UserForm) => {
    const { status, data: response } = await axios.patch(route('user.update', { id }), form)
  
    return { status, response } as Response
  },
  delete: async (id: number) => {
    const { status, data: response } = await axios.delete(route('user.destroy', { id }))
  
    return { status, response } as Response
  },
}