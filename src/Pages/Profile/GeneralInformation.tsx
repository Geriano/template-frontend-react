import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalForm, setGeneralInformationFromUser, updateGeneralInformation } from "../../Store/profile";
import Button from "../../Components/Button";
import Card from "../../Components/Card";
import Input from "../../Components/Input";

export default function GeneralInformation() {
  const { processing, general } = useAppSelector(state => state.profile)
  const { form, errors } = general
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setGeneralInformationFromUser())
  }, [])

  const input = (field: keyof typeof form, { value }: HTMLInputElement) => dispatch(generalForm({ field, value }))
  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(updateGeneralInformation())
  }

  return (
    <div className="grid md:grid-cols-12 gap-4">
      <div className="col-span-5">
        <h1 className="text-xl font-semibold capitalize">
          general information
        </h1>
      </div>
      <form onSubmit={submit} className="col-span-7">
        <Card
          footer={
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
          }
        >
          <div className="flex flex-col space-y-2 p-4">
            <div className="flex flex-col items-center space-y-2 justify-center"></div>

            <div className="flex flex-col space-y-1 max-w-sm">
              <Input
                onChange={(e) => input('name', e.target as HTMLInputElement)}
                value={form.name}
                label="Name"
              />

              <p className="text-red-500 text-xs">{errors.name}</p>
            </div>

            <div className="flex flex-col space-y-1 max-w-sm">
              <Input
                onChange={(e) => input('email', e.target as HTMLInputElement)}
                value={form.email}
                type="email"
                label="Email"
              />

              <p className="text-red-500 text-xs">{errors.email}</p>
            </div>

            <div className="flex flex-col space-y-1 max-w-sm">
              <Input
                onChange={(e) => input('username', e.target as HTMLInputElement)}
                value={form.username}
                label="Username"
              />

              <p className="text-red-500 text-xs">{errors.username}</p>
            </div>
          </div>
        </Card>
      </form>
    </div>
  )
}