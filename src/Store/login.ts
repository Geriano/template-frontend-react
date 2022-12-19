import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import Auth from "../Services/Auth"
import { RootState } from "../store"
import { authenticate } from "./auth"
import { AxiosError } from 'axios'
import * as flash from './flash'
import { FromValidationErrorResponse } from "../Interfaces/ErrorResponse"
import { State } from "../Interfaces/Login"

export const login = createAsyncThunk('auth/login', async (_, api) => {
  const { login } = api.getState() as RootState
  const { username, password } = login.form

  try {
    api.dispatch(process())
    const { response } = await Auth.login({ username, password })
    const { user, token } = response

    api.dispatch(authenticate({ user, token }))
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof State['form']>
        errors.forEach(e => api.dispatch(error({
          field: e.field,
          value: e.message,
        })))
      } else if (status === 401) {
        api.dispatch(flash.error(data))
      } else {
        return api.rejectWithValue(e)
      }
    } else {
      return api.rejectWithValue(e)
    }
  }
})

export const name = 'login'
export const initialState: State = {
  processing: false,
  form: {
    username: '',
    password: '',
  },
  errors: {
    username: '',
    password: '',
  },
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    form<T extends keyof State['form'], K extends State['form'][T]>(state: State, action: PayloadAction<{ field: T, value: K }>) {
      const { field, value } = action.payload
      state.form[field] = value
    },
    error<T extends keyof State['errors'], K extends State['errors'][T]>(state: State, action: PayloadAction<{ field: T, value: K }>) {
      const { field, value } = action.payload
      state.errors[field] = value
    },
    process(state: State, action: PayloadAction<boolean|undefined>) {
      if (typeof action.payload !== 'undefined') {
        state.processing = action.payload
      } else {
        state.processing = true
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state: State) => {
      state.processing = false
    })

    builder.addCase(login.rejected, (state: State) => {
      state.processing = false
    })
  },
})

export const { error, form, process } = slice.actions

export default slice.reducer
