import axios from "axios";
import { Paginator } from "../../Interfaces/paginator";
import route from "../../route";
import { Order, Response, Role, RoleForm } from "../../Interfaces/Role";

export default {
  all: async () => {
    const { data } = await axios.get(route('role.all'))

    return data as Role[]
  },
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