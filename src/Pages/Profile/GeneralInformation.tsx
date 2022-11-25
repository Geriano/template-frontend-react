import React, { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalForm, removeProfilePhoto, setGeneralInformationFromUser, updateGeneralInformation } from "../../Store/profile";
import Button from "../../Components/Button";
import Card from "../../Components/Card";
import Input from "../../Components/Input";
import route from '../../route';
import { Dropdown } from 'flowbite-react';

export default function GeneralInformation() {
  const { user } = useAppSelector(state => state.auth)
  const { processing, general } = useAppSelector(state => state.profile)
  const { form, errors } = general
  const dispatch = useAppDispatch()
  const fileElement = useRef<HTMLInputElement|null>(null)
  const [open, set] = useState(false)

  useEffect(() => {
    dispatch(setGeneralInformationFromUser())
  }, [])

  const input = (field: keyof typeof form, { value }: HTMLInputElement) => dispatch(generalForm({ field, value }))
  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    dispatch(updateGeneralInformation())
  }

  const remove = () => {
    if (form.photo) {
      dispatch(generalForm({
        field: 'photo',
        value: null,
      }))
    } else {
      if (user.profile_photo_url) {
        dispatch(removeProfilePhoto())
      }
    }
  }

  const setTemporaryImage = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement
    const files = target.files!
    dispatch(generalForm({
      field: 'photo',
      value: files[0]
    }))
  }

  return (
    <div className="grid md:grid-cols-12 gap-4">
      <div className="col-span-5">
        <h1 className="text-xl font-semibold capitalize">
          general information
        </h1>
      </div>
      <form onSubmit={submit} className="col-span-7">
        <Card>
          <div className="flex flex-col items-center justify-center pt-4">
            <input 
              ref={fileElement} 
              onChange={setTemporaryImage}
              type="file" 
              className="hidden" 
            />

            <div className="relative w-24 h-24 rounded-full">
              {form.photo === null && user.profile_photo_url === null && (
                <div className="flex items-center justify-center border rounded-full w-24 h-24">
                  <i className="text-5xl mdi mdi-account" />
                </div>
              )}

              {form.photo === null && user.profile_photo_url !== null && (
                <img src={route('static', { path: user.profile_photo_url })} alt={user.name} className="object-cover object-center w-full h-full border rounded-full" />
              )}

              {form.photo !== null && (
                <img src={URL.createObjectURL(form.photo)} alt={user.name} className="object-cover object-center w-full h-full border rounded-full" />
              )}

              <div className="absolute bottom-0 right-0">
                <div className="relative">
                  <Button 
                    onClick={() => set(!open)}
                    className="bg-primary-0 hover:bg-primary-1 active:bg-primary-2 text-white bg-opacity-80 rounded-full px-2"
                  >
                    <i 
                      className="mdi mdi-dots-vertical" 
                    />
                  </Button>

                  {open && (
                    <div className="absolute top-7 -right-4 w-32 p-2 bg-white border rounded-md z-10">
                      <div onClick={() => { set(false); fileElement.current?.click() }} className="flex items-center space-x-1 border-b px-2 py-1 cursor-pointer transition-all duration-300 hover:bg-gray-50">
                        <i className="mdi mdi-sync"></i>
                        <p className="capitalize font-medium">
                          change
                        </p>
                      </div>
                      {(user.profile_photo_url !== null || form.photo) && (
                        <div onClick={() => { set(false); remove() }} className="flex items-center space-x-1 border-b px-2 py-1 cursor-pointer transition-all duration-300 hover:bg-gray-50">
                          <i className="mdi mdi-delete"></i>
                          <p className="capitalize font-medium">
                            remove
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

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