export interface State {
  processing: boolean
  form: {
    username: string
    password: string
  }
  errors: {
    [key in keyof State['form']]: string
  }
}