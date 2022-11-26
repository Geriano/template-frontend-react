import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import Swal from "sweetalert2"
import { initial, Paginator } from "../paginator"
import { FromValidationErrorResponse } from "../request"
import { User as U } from "../Services/Auth"
import User, { UserForm } from "../Services/Superuser/User"
import { RootState } from "../store"
import { success, error as danger } from "./flash"
import { all as getAllPermission } from "./permission"
import { all as getAllRole } from "./role"

interface State {
  processing: boolean
  form: UserForm,
  errors: {
    [key in keyof UserForm]: string
  }
  open: boolean
  search: string
  paginator: Paginator<U>
}

export const name = 'user'
export const initialState: State = {
  processing: false,
  form: {
    id: null,
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    permissions: [],
    roles: [],
  },
  errors: {
    id: '',
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    permissions: '',
    roles: '',
  },
  open: false,
  search: '',
  paginator: initial,
}

export const paginate = createAsyncThunk('superuser/user/paginate', async (_, { dispatch, rejectWithValue, getState }) => {
  const { user, permission, role } = getState() as RootState
  const { processing, search, paginator } = user

  try {
    if (processing) {
      return initialState.paginator
    }

    dispatch(process(true))
    const paginated = await User.paginate(search, { dir: 'asc', name: 'name' }, paginator.meta)
    await dispatch(getAllPermission()).unwrap()
    await dispatch(getAllRole()).unwrap()

    dispatch(process(false))
    return paginated
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status } = e.response!

      if (status === 401) {
        dispatch(danger('unautorized'))
      }
    }
    return rejectWithValue(e as Error)
  }
})

export const store = createAsyncThunk('superuser/user/store', async (_, { dispatch, rejectWithValue, getState }) => {
  const { user } = getState() as RootState
  const { form } = user

  try {
    const { response } = await User.store(form)

    dispatch(resetForm())
    dispatch(clearError())
    dispatch(success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof State['form']>
        errors.forEach(({ field, message: value }) => {
          dispatch(error({ field, value }))
        })
      } else {
        return rejectWithValue(e)
      }
    } else {
      return rejectWithValue(e)
    }
  }
})

export const update = createAsyncThunk('superuser/user/update', async (_, { dispatch, rejectWithValue, getState }) => {
  const { user } = getState() as RootState
  const { form } = user

  try {
    const { response } = await User.update(form.id!, form)

    dispatch(resetForm())
    dispatch(clearError())
    dispatch(success(response.message))
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof State['form']>
        errors.forEach(({ field, message: value }) => {
          dispatch(error({ field, value }))
        })
      } else {
        return rejectWithValue(e)
      }
    } else {
      return rejectWithValue(e)
    }
  }
})

export const destroy = createAsyncThunk('superuser/user/destroy', async (id: number, { dispatch, rejectWithValue }) => {
  const { isConfirmed } = await Swal.fire({
    title: 'Are you sure?',
    text: `After deleted you can't recovery it`,
    icon: 'question',
    showCloseButton: true,
    showCancelButton: true,
  })

  try {
    if (isConfirmed) {
      const { response } = await User.delete(id)
  
      dispatch(success(response.message))
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const { status, data } = e.response!

      if (status === 422) {
        const { errors } = data as FromValidationErrorResponse<keyof State['form']>
        errors.forEach(({ field, message: value }) => {
          dispatch(error({ field, value }))
        })
      } else {
        return rejectWithValue(e)
      }
    } else {
      return rejectWithValue(e)
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
    error<T extends keyof State['form']>(state: State, { payload }: PayloadAction<{ field: T, value: string }>) {
      state.errors[payload.field] = payload.value
    },
    resetForm(state: State) {
      state.form = initialState.form
    },
    clearError(state: State) {
      state.errors = initialState.errors
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
    edit(state: State, { payload }: PayloadAction<UserForm>) {
      state.form = payload
      state.open = true
    },
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

    builder.addCase(paginate.fulfilled, (state: State, { payload }: PayloadAction<Paginator<U>>) => {
      state.paginator = payload
    })
    builder.addCase(paginate.rejected, (state: State, { payload }) => {
      state.processing = false
    })

    builder.addCase(store.pending, processing)
    builder.addCase(store.fulfilled, processed)
    builder.addCase(store.rejected, processed)
    builder.addCase(update.pending, processing)
    builder.addCase(update.fulfilled, processed)
    builder.addCase(update.rejected, processed)
    builder.addCase(destroy.pending, processing)
    builder.addCase(destroy.fulfilled, processed)
    builder.addCase(destroy.rejected, processed)
  },
})

export const { form, error, resetForm, clearError, process, searching,  toggle, edit } = slice.actions

export default slice.reducer
