import axios from 'axios'
import route from '../route'
import { GeneralInformationForm, UpdatePasswordForm } from '../Interfaces/Profile'

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
