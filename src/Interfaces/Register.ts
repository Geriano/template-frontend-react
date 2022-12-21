export interface State {
  processing: boolean
  form: {
    name: string
    email: string
    username: string
    password: string
    password_confirmation: string
  }
  errors: {
    [key in keyof State['form']]: string
  }
}