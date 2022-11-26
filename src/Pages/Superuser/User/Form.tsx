import { Modal } from "flowbite-react";
import React from "react";
import { Primary } from "../../../Components/Button";
import Input from "../../../Components/Input";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { form as f, paginate, store, toggle, update } from "../../../Store/user";
import Select from 'react-select'

export default function Form() {
  const { permissions } = useAppSelector(state => state.permission)
  const { roles } = useAppSelector(state => state.role)
  const { processing, open, form, errors } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(form.id ? update() : store())
      .unwrap()
      .finally(() => {
        dispatch(paginate())
      })
  }

  return (
    <Modal show={open} onClose={() => dispatch(toggle(false))} size="md">
      <Modal.Header>
        { form.id ? 'Update' : 'Create' }
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={submit} id="form" className="text-sm">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-1">
              <Input 
                onInput={e => {
                  dispatch(f({
                    field: 'name',
                    value: (e.target as HTMLInputElement).value,
                  }))
                }}
                value={form.name}
                label="Name"
                autoFocus
              />

              <p className="text-danger-0 text-xs text-right">
                {errors.name}
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <Input 
                onInput={e => {
                  dispatch(f({
                    field: 'email',
                    value: (e.target as HTMLInputElement).value,
                  }))
                }}
                value={form.email}
                type="email"
                label="Email"
              />

              <p className="text-danger-0 text-xs text-right">
                {errors.email}
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <Input 
                onInput={e => {
                  dispatch(f({
                    field: 'username',
                    value: (e.target as HTMLInputElement).value,
                  }))
                }}
                value={form.username}
                label="Username"
              />

              <p className="text-danger-0 text-xs text-right">
                {errors.username}
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <Input 
                onInput={e => {
                  dispatch(f({
                    field: 'password',
                    value: (e.target as HTMLInputElement).value,
                  }))
                }}
                value={form.password}
                type="password"
                label="Password"
              />

              <p className="text-danger-0 text-xs text-right">
                {errors.password}
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <Input 
                onInput={e => {
                  dispatch(f({
                    field: 'password_confirmation',
                    value: (e.target as HTMLInputElement).value,
                  }))
                }}
                value={form.password_confirmation}
                type="password"
                label="Password Confirmation"
              />

              <p className="text-danger-0 text-xs text-right">
                {errors.password_confirmation}
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <label>Permission</label>
              <Select 
                options={permissions.map(permission => ({
                  label: permission.name,
                  value: permission.id,
                }))}
                onChange={e => {
                  dispatch(f({
                    field: 'permissions',
                    value: e.map(option => option.value),
                  }))
                }}
                value={form.permissions.map(id => ({
                  label: permissions.find(permission => permission.id === id)!.name,
                  value: id,
                }))}
                isMulti
              />

              <p className="text-danger-0 text-xs text-right">
                {errors.permissions}
              </p>
            </div>

            <div className="flex flex-col space-y-1">
              <label>Role</label>
              <Select 
                options={roles.map(role => ({
                  label: role.name,
                  value: role.id,
                }))}
                onChange={e => {
                  dispatch(f({
                    field: 'roles',
                    value: e.map(option => option.value),
                  }))
                }}
                value={form.roles.map(id => ({
                  label: roles.find(role => role.id === id)!.name,
                  value: id,
                }))}
                isMulti
              />

              <p className="text-danger-0 text-xs text-right">
                {errors.roles}
              </p>
            </div>
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="px-2 py-1 text-sm">
        <div className="flex items-center justify-end w-full">
          <Primary disabled={processing} onClick={submit} type="submit" form="form" className="px-6 py-2">
            <p className="capitalize font-medium">
              {form.id ? 'Update' : 'Create'}
            </p>
          </Primary>
        </div>
      </Modal.Footer>
    </Modal>
  )
}