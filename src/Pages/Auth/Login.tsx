import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button";
import { Card } from "../../Components/Card";
import Input from "../../Components/Input";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { form as f, login } from "../../Store/login";

export default function Login() {
  const { processing, form, errors } = useAppSelector(state => state.login)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const input = (field: keyof typeof form, target: HTMLInputElement) => dispatch(f({
    field,
    value: target.value,
  }))

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(login())
      .unwrap()
      .then(() => navigate('/'))
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <Card
        header={
          <div className="flex items-center justify-center text-3xl capitalize font-bold py-4">
            <h1>login</h1>
          </div>
        }
        footer={
          <div className="flex items-center justify-end p-2">
            <Button type="submit" className="bg-primary-0 hover:bg-primary-1 active:bg-primary-2 text-white">
              <i className="mdi mdi-check" />
              <p className="capitalize font-medium">
                login
              </p>
            </Button>
          </div>
        }
      >
        <div className="flex flex-col space-y-2 p-4">
          <Input 
            label="Username"
            name="username"
            value={form.username}
            onInput={e => input('username', e.target as HTMLInputElement)}
            autoFocus
            required
          />

          <p className="text-red-500 text-right">{errors.username}</p>

          <Input 
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onInput={e => input('password', e.target as HTMLInputElement)}
            required
          />

          <p className="text-red-500 text-right">{errors.password}</p>
        </div>
      </Card>
    </form>
  )
}