import { Modal } from "flowbite-react";
import React from "react";
import { Primary } from "../../../Components/Button";
import Input from "../../../Components/Input";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { all, form as f, store, toggle, update } from "../../../Store/permission";

export default function Form() {
  const { processing, open, form, errors } = useAppSelector(state => state.permission)
  const dispatch = useAppDispatch()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(form.id ? update() : store())
      .unwrap()
      .finally(() => {
        dispatch(all())
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