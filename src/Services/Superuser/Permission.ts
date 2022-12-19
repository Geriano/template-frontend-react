import axios from "axios"
import route from "../../route"
import { Permission, PermissionForm, Response } from "../../Interfaces/Permission"

export default {
  all: async () => {
    const { status, data: response } = await axios.get(route('permission.all'))

    return response as Permission[]
  },
  store: async (form: PermissionForm) => {
    const { status, data: response } = await axios.post(route('permission.store'), form)
  
    return { status, response } as Response
  },
  update: async (id: number, form: PermissionForm) => {
    const { status, data: response } = await axios.patch(route('permission.update', { id }), form)
  
    return { status, response } as Response
  },
  delete: async (id: number) => {
    const { status, data: response } = await axios.delete(route('permission.destroy', { id }))
  
    return { status, response } as Response
  },
}
