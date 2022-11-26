import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { FromValidationErrorResponse } from "../request"
import Profile, { GeneralInformationForm, UpdatePasswordForm } from "../Services/Profile"
import { RootState } from "../store"
import { relog } from "./auth"
import { success } from "./flash"

interface State {
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

export const name = 'profile'
export const initialState: State = {
  processing: false,
  general: {
    form: {
      photo: null,
      name: '',
      email: '',
      username: '',
    },
    errors: {
      photo: '',
      name: '',
      email: '',
      username: '',
    },
  },
  password: {
    form: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
    errors: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
  },
}

export const setGeneralInformationFromUser = createAsyncThunk('profile/init', async (_, api) => {
  const { auth } = api.getState() as RootState
  const { user } = auth

  api.dispatch(generalForm({
    field: 'name',
    value: user.name,
  }))

  api.dispatch(generalForm({
    field: 'email',
    value: user.email,
  }))

  api.dispatch(generalForm({
    field: 'username',
    value: user.username,
  }))
})

export const updateGeneralInformation = createAsyncThunk('profile/update/information', async (_, api) => {
  const { profile } = api.getState() as RootState
  const { form } = profile.general

  try {
    const { response } = await Profile.updateGeneralInformation(form)

    api.dispatch(success(
      response.message
    ))

    api.dispatch(relog())
    api.dispatch(clearError('general'))
    api.dispatch(resetForm('general'))
    api.dispatch(setGeneralInformationFromUser())
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof GeneralInformationForm>
        errors.forEach(error => {
          api.dispatch(generalError({
            field: error.field,
            value: error.message,
          }))
        })
      } else {
        return api.rejectWithValue(e)
      }
    } else {
      return api.rejectWithValue(e)
    }
  }
})

export const updatePassword = createAsyncThunk('profile/update/password', async (_, api) => {
  const { profile } = api.getState() as RootState
  const { form } = profile.password

  try {
    const { response } = await Profile.updatePassword(form)

    api.dispatch(success(
      response.message
    ))

    api.dispatch(clearError('password'))
    api.dispatch(resetForm('password'))
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof UpdatePasswordForm>
        errors.forEach(error => {
          api.dispatch(passwordError({
            field: error.field,
            value: error.message,
          }))
        })
      } else {
        return api.rejectWithValue(e)
      }
    } else {
      return api.rejectWithValue(e)
    }
  }
})

export const removeProfilePhoto = createAsyncThunk('profile/remove/photo', async (_, api) => {
  try {
    const { response } = await Profile.removeProfilePhoto()

    api.dispatch(success(
      response.message
    ))
    
    api.dispatch(relog())
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof UpdatePasswordForm>
        errors.forEach(error => {
          api.dispatch(passwordError({
            field: error.field,
            value: error.message,
          }))
        })
      } else {
        return api.rejectWithValue(e)
      }
    } else {
      return api.rejectWithValue(e)
    }
  }
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    generalForm<T extends keyof State['general']['form'], K extends State['general']['form'][T]>(state: State, action: PayloadAction<{ field: T, value: K }>) {
      const { field, value } = action.payload
      state.general.form[field] = value
    },
    generalError<T extends keyof State['general']['errors'], K extends State['general']['errors'][T]>(state: State, action: PayloadAction<{ field: T, value: K }>) {
      const { field, value } = action.payload
      state.general.errors[field] = value
    },
    passwordForm<T extends keyof State['password']['form'], K extends State['password']['form'][T]>(state: State, action: PayloadAction<{ field: T, value: K }>) {
      const { field, value } = action.payload
      state.password.form[field] = value
    },
    passwordError<T extends keyof State['password']['errors'], K extends State['password']['errors'][T]>(state: State, action: PayloadAction<{ field: T, value: K }>) {
      const { field, value } = action.payload
      state.password.errors[field] = value
    },
    clearError<T extends 'general'|'password'>(state: State, action: PayloadAction<T>) {
      state[action.payload].errors = initialState[action.payload].errors
    },
    resetForm<T extends 'general'|'password'>(state: State, action: PayloadAction<T>) {
      state[action.payload].form = initialState[action.payload].form
    },
  },
  extraReducers: builder => {
    const process = (state: State, value: boolean = true) => {
      state.processing = value
    }

    builder.addCase(updateGeneralInformation.pending, (state: State) => process(state))
    builder.addCase(updateGeneralInformation.fulfilled, (state: State) => process(state, false))
    builder.addCase(updateGeneralInformation.rejected, (state: State) => process(state, false))

    builder.addCase(updatePassword.pending, (state: State) => process(state))
    builder.addCase(updatePassword.fulfilled, (state: State) => process(state, false))
    builder.addCase(updatePassword.rejected, (state: State) => process(state, false))
  },
})

export const { generalForm, generalError, passwordForm, passwordError, clearError, resetForm } = slice.actions

export default slice.reducer
