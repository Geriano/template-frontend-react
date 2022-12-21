import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Primary } from "../../Components/Button";
import { Card } from "../../Components/Card";
import Input from "../../Components/Input";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { form as f, register } from "../../Store/register";

export default function Register() {
  const { processing, form, errors } = useAppSelector(state => state.register)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const input = (field: keyof typeof form, target: HTMLInputElement) => dispatch(f({
    field,
    value: target.value,
  }))

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(register())
      .unwrap()
      .then(() => navigate('/login'))
  }

  return (
    <form onSubmit={submit} className="w-full max-w-sm">
      <Card>
        <Card.Header>
          <div className="flex items-center justify-center text-3xl capitalize font-bold py-4">
            <h1>register</h1>
          </div>
        </Card.Header>
        
        <div className="flex flex-col space-y-2 p-4">
          <Input 
            label="Name"
            name="name"
            value={form.name}
            onInput={e => input('name', e.target as HTMLInputElement)}
            autoFocus
            required
          />

          <p className="text-red-500 text-right">{errors.name}</p>

          <Input 
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onInput={e => input('email', e.target as HTMLInputElement)}
            required
          />

          <p className="text-red-500 text-right">{errors.email}</p>

          <Input 
            label="Username"
            name="username"
            value={form.username}
            onInput={e => input('username', e.target as HTMLInputElement)}
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

          <Input 
            label="Password confirmation"
            name="password_confirmation"
            type="password"
            value={form.password_confirmation}
            onInput={e => input('password_confirmation', e.target as HTMLInputElement)}
            required
          />

          <p className="text-red-500 text-right">{errors.password_confirmation}</p>
        </div>

        <Card.Footer>
          <div className="flex items-center justify-end p-2">

            <Primary disabled={processing} type="submit" className="bg-primary-0 hover:bg-primary-1 active:bg-primary-2 text-white">
              <i className="mdi mdi-check" />
              <p className="capitalize font-medium">
                register
              </p>
            </Primary>
          </div>
        </Card.Footer>
      </Card>

      <p className="mt-4 text-center">
        Already have account?
        <Link to="/login" className="ml-1 text-primary-0">
          login
        </Link>
      </p>

      <p className="mt-1 text-center">
        Forgot your password?
        <Link to="/forgot-password" className="ml-1 text-primary-0">
          recovery
        </Link>
      </p>
    </form>
  )
}