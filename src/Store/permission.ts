import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import { Permission as P } from "../Interfaces/Permission"
import Permission from '../Services/Superuser/Permission'
import { RootState } from "../store"
import { success, error as danger } from "./flash"
import Swal from 'sweetalert2'
import { FromValidationErrorResponse } from "../Interfaces/ErrorResponse"

interface State {
  processing: boolean
  form: {
    id: number|null
    name: string
  }
  errors: {
    [key in keyof State['form']]: string
  }
  open: boolean,
  search: string
  permissions: P[]
}

export const name = 'permission'
export const initialState: State = {
  processing: false,
  form: {
    id: null,
    name: '',
  },
  errors: {
    id: '',
    name: '',
  },
  open: false,
  search: '',
  permissions: [],
}

export const all = createAsyncThunk('superuser/permission/all', async (_, api) => {
  const { permission } = api.getState() as RootState
  const { processing } = permission

  try {
    if (!processing) {
      api.dispatch(process())
      const response = await Permission.all()
      api.dispatch(permissions(response))
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status } = e.response!

      if (status === 401) {
        api.dispatch(danger('unautorized'))
        return api.rejectWithValue(e)
      } else {
        return api.rejectWithValue(e)
      }
    } else {
      return api.rejectWithValue(e)
    }
  }
})

export const store = createAsyncThunk('superuser/permission/store', async (_, api) => {
  const { permission } = api.getState() as RootState
  const { form } = permission

  try {
    const { response } = await Permission.store(form)

    api.dispatch(resetForm())
    api.dispatch(clearError())
    api.dispatch(success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof State['form']>
        errors.forEach(({ field, message: value }) => {
          api.dispatch(error({ field, value }))
        })
      } else {
        return api.rejectWithValue(e)
      }
    } else {
      return api.rejectWithValue(e)
    }
  }
})

export const update = createAsyncThunk('superuser/permission/update', async (_, api) => {
  const { permission } = api.getState() as RootState
  const { form } = permission

  try {
    const { response } = await Permission.update(form.id!, form)

    api.dispatch(resetForm())
    api.dispatch(clearError())
    api.dispatch(success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof State['form']>
        errors.forEach(({ field, message: value }) => {
          api.dispatch(error({ field, value }))
        })
      } else {
        return api.rejectWithValue(e)
      }
    } else {
      return api.rejectWithValue(e)
    }
  }
})

export const destroy = createAsyncThunk('superuser/permission/destroy', async (id: number, api) => {
  const { isConfirmed } = await Swal.fire({
    title: 'Are you sure?',
    text: `After deleted you can't recovery it`,
    icon: 'question',
    showCloseButton: true,
    showCancelButton: true,
  })

  try {
    if (isConfirmed) {
      const { response } = await Permission.delete(id)
  
      api.dispatch(success(response.message))
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof State['form']>
        errors.forEach(({ field, message: value }) => {
          api.dispatch(error({ field, value }))
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
    form<T extends keyof State['form'], K extends State['form'][T]>(state: State, { payload }: PayloadAction<{ field: T, value: K }>) {
      state.form[payload.field] = payload.value
    },
    error<T extends keyof State['errors'], K extends State['errors'][T]>(state: State, { payload }: PayloadAction<{ field: T, value: K }>) {
      state.errors[payload.field] = payload.value
    },
    resetForm(state: State) {
      state.form = initialState.form
    },
    clearError(state: State) {
      state.errors = initialState.errors
    },
    permissions(state: State, { payload }: PayloadAction<P[]>) {
      state.permissions = payload
    },
    process(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.processing = typeof payload === 'undefined' ? ! state.processing : payload
    },
    searching(state: State, { payload }: PayloadAction<string>) {
      state.search = payload
    },
    toggle(state: State, { payload }: PayloadAction<boolean|undefined>) {
      state.open = typeof payload === 'undefined' ? ! state.open : payload

      if (state.open === false) {
        state.form = initialState.form
        state.errors = initialState.errors
      }
    },
    edit(state: State, { payload }: PayloadAction<{ id: number, name: string }>) {
      state.form = payload
      state.open = true
    }
  },
  extraReducers: builder => {
    const processing = (state: State) => {
      state.processing = true
      state.errors = initialState.errors
    }

    const processed = (state: State) => {
      state.processing = false
      state.open = false

      Object.values(state.errors).forEach(e => {
        if (e) {
          state.open = true
        }
      })
    }

    builder.addCase(all.fulfilled, processed)
    builder.addCase(all.rejected, processed)
    builder.addCase(store.pending, processing)
    builder.addCase(store.fulfilled, processed)
    builder.addCase(store.rejected, processed)
    builder.addCase(update.pending, processing)
    builder.addCase(update.fulfilled, processed)
    builder.addCase(update.rejected, processed)
    builder.addCase(destroy.pending, processing)
    builder.addCase(destroy.fulfilled, processed)
    builder.addCase(destroy.rejected, processed)
  }
})

export const { form, error, resetForm, clearError, permissions, process, searching, toggle, edit } = slice.actions

export default slice.reducer
