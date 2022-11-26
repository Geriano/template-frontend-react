import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
import Swal from "sweetalert2"
import { Paginator } from "../paginator"
import { FromValidationErrorResponse } from "../request"
import { Role as R } from "../Services/Auth"
import Role, { RoleForm } from "../Services/Superuser/Role"
import { RootState } from "../store"
import { success } from "./flash"
import { all } from "./permission"

interface State {
  processing: boolean
  form: RoleForm,
  errors: {
    [key in keyof RoleForm]: string
  }
  open: boolean
  search: string
  paginator: Paginator<R>
}

export const name = 'role'
export const initialState: State = {
  processing: false,
  form: {
    id: null,
    name: '',
    permissions: [],
  },
  errors: {
    id: '',
    name: '',
    permissions: '',
  },
  open: false,
  search: '',
  paginator: {
    meta: {
      total: 0,
      current_page: 1,
      first_page: 1,
      first_page_url: null,
      last_page: 1,
      last_page_url: null,
      next_page_url: null,
      per_page: 10,
      previous_page_url: null,
    },
    data: [],
  },
}

export const paginate = createAsyncThunk('superuser/role/paginate', async (_, { dispatch, rejectWithValue, getState }) => {
  const { role, permission } = getState() as RootState
  const { processing, search, paginator } = role

  try {
    if (processing) {
      return initialState.paginator
    }

    dispatch(process(true))
    const paginated = await Role.paginate(search, { dir: 'asc', name: 'name' }, paginator.meta)

    if (permission.permissions.length === 0) {
      dispatch(all())
    }

    dispatch(process(false))
    return paginated
  } catch (e) {
    return rejectWithValue(e as Error)
  }
})

export const store = createAsyncThunk('superuser/role/store', async (_, { dispatch, rejectWithValue, getState }) => {
  const { role } = getState() as RootState
  const { form } = role

  try {
    console.log(form)
    const { response } = await Role.store(form)

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

export const update = createAsyncThunk('superuser/role/update', async (_, { dispatch, rejectWithValue, getState }) => {
  const { role } = getState() as RootState
  const { form } = role

  try {
    const { response } = await Role.update(form.id!, form)

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

export const destroy = createAsyncThunk('superuser/role/destroy', async (id: number, { dispatch, rejectWithValue }) => {
  const { isConfirmed } = await Swal.fire({
    title: 'Are you sure?',
    text: `After deleted you can't recovery it`,
    icon: 'question',
    showCloseButton: true,
    showCancelButton: true,
  })

  try {
    if (isConfirmed) {
      const { response } = await Role.delete(id)
  
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
    edit(state: State, { payload }: PayloadAction<{ id: number, name: string, permissions: number[] }>) {
      state.form = payload
      state.open = true
    },
  },
  extraReducers: builder => {
    const processing = (state: State) => {
      state.processing = true
    }

    const processed = (state: State) => {
      state.processing = false
      state.open = false

      if (state.form.id || state.form.name) {
        state.open = true
      }
    }

    builder.addCase(paginate.fulfilled, (state: State, { payload }: PayloadAction<Paginator<R>>) => {
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
