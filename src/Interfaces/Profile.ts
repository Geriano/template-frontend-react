export interface GeneralInformationForm {
  photo: File|null
  name: string
  email: string
  username: string
}

export interface UpdatePasswordForm {
  current_password: string
  password: string
  password_confirmation: string
}

export interface State {
  processing: boolean
  general: {
    form: GeneralInformationForm
    errors: {
      [key in keyof GeneralInformationForm]: string
    }
  }
  password: {
    form: UpdatePasswordForm
    errors: {
      [key in keyof UpdatePasswordForm]: string
    }
  }
}