import axios from "axios";
import { Paginator } from "../../paginator";
import route from "../../route";
import { Role } from "../Auth";

interface Order {
  dir: 'asc'|'desc',
  name: 'name'
}

interface Response {
  status: number
  response: {
    message: string
  }
}

export interface RoleForm {
  id: number|null
  name: string
  permissions: number[]
}

export default {
  paginate: async (search: string, order: Order, { current_page, per_page }: Paginator<Role>['meta']) => {
    const { data: response } = await axios.post(route('role.paginate'), {
      page: current_page,
      per_page,
      search,
      order,
    })

    return response as Paginator<Role>
  },
  store: async (form: RoleForm) => {
    const { status, data: response } = await axios.post(route('role.store'), form)
  
    return { status, response } as Response
  },
  update: async (id: number, form: RoleForm) => {
    const { status, data: response } = await axios.patch(route('role.update', { id }), form)
  
    return { status, response } as Response
  },
  delete: async (id: number) => {
    const { status, data: response } = await axios.delete(route('role.destroy', { id }))
  
    return { status, response } as Response
  },
}