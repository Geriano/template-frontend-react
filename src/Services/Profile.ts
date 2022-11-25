import axios from 'axios'
import route from '../route'

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

export const updateGeneralInformation = async (form: GeneralInformationForm) => {
  const { status, data: response } = await axios.patch(route('update-user-general-information'), form)

  return { status, response }
}

export const updatePassword = async (form: UpdatePasswordForm) => {
  const { status, data: response } = await axios.patch(route('update-user-password'), form)

  return { status, response }
}

export const removeProfilePhoto = async () => {
  const { status, data: response } = await axios.delete(route('remove-profile-photo'))

  return { status, response }
}

export default {
  updateGeneralInformation, updatePassword, removeProfilePhoto,
}
