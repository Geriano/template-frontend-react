import React from 'react'
import { useAppDispatch, useAppSelector } from "../../hooks";
import { passwordForm, updatePassword } from "../../Store/profile";
import Button from "../../Components/Button";
import Card from "../../Components/Card";
import Input from "../../Components/Input";

export default function UpdatePassword() {
  const { processing, password } = useAppSelector(state => state.profile)
  const { form, errors } = password
  const dispatch = useAppDispatch()

  const input = (field: keyof typeof form, { value }: HTMLInputElement) => dispatch(passwordForm({ field, value }))
  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(updatePassword())
  }

  return (
    <div className="grid md:grid-cols-12 gap-4">
      <div className="col-span-5 h-full">
        <h1 className="text-xl font-semibold capitalize">
          update
        </h1>
      </div>
      <form onSubmit={submit} className="col-span-7">
        <Card>
          <div className="flex flex-col space-y-2 p-4">
            <div className="flex flex-col items-center space-y-2 justify-center"></div>

            <div className="flex flex-col space-y-1 max-w-sm">
              <Input
                onChange={(e) => input('current_password', e.target as HTMLInputElement)}
                value={form.current_password}
                type="password"
                label="Current Password"
              />

              <p className="text-red-500 text-xs">{errors.current_password}</p>
            </div>

            <div className="flex flex-col space-y-1 max-w-sm">
              <Input
                onChange={(e) => input('password', e.target as HTMLInputElement)}
                value={form.password}
                type="password"
                label="New Password"
              />

              <p className="text-red-500 text-xs">{errors.password}</p>
            </div>

            <div className="flex flex-col space-y-1 max-w-sm">
              <Input
                onChange={(e) => input('password_confirmation', e.target as HTMLInputElement)}
                value={form.password_confirmation}
                type="password"
                label="Password Confirmation"
              />

              <p className="text-red-500 text-xs">{errors.password_confirmation}</p>
            </div>
          </div>

          <Card.Footer>
            <div className="flex items-center justify-end p-2">
              <Button 
                disabled={processing} 
                type="submit" 
                className="bg-primary-0 hover:bg-primary-1 active:bg-primary-2 text-white px-6 py-2"
              >
                <p className="capitalize font-medium">
                  update
                </p>
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </form>
    </div>
  )
}