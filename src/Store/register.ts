import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import Auth from "../Services/Auth"
import { RootState } from "../store"
import { AxiosError } from 'axios'
import * as flash from './flash'
import { FromValidationErrorResponse } from "../Interfaces/ErrorResponse"
import { State } from "../Interfaces/Register"
import { useNavigate } from "react-router-dom"

export const register = createAsyncThunk('auth/register', async (_, api) => {
  const { register } = api.getState() as RootState

  try {
    api.dispatch(process())
    const { response } = await Auth.register(register.form)
    api.dispatch(flash.success(response.message))
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

export const name = 'register'
export const initialState: State = {
  processing: false,
  form: {
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
  },
  errors: {
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
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
    builder.addCase(register.fulfilled, (state: State) => {
      state.processing = false
    })

    builder.addCase(register.rejected, (state: State) => {
      state.processing = false
    })
  },
})

export const { error, form, process } = slice.actions

export default slice.reducer
