import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import Auth, { User } from "../Services/Auth"
import { RootState } from "../store"
import axios from 'axios'

export interface State {
  processing: boolean
  authenticated: boolean
  user: User
  token: string
}

export const relog = createAsyncThunk('auth/relog', async (_, api) => {
  const { auth } = api.getState() as RootState

  if (auth.processing) {
    return api.rejectWithValue(undefined)
  }

  api.dispatch(process())
  
  try {
    return await Auth.relog(auth.token)
  } catch (e) {
    return api.rejectWithValue(e)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, api) => {
  try {
    return await Auth.logout()
  } catch (e) {
    return api.rejectWithValue(e)
  }
})

export const name = 'auth'
export const initialState: State = {
  authenticated: false,
  processing: false,
  user: {
    id: 0,
    name: '',
    email: '',
    username: '',
    profile_photo_url: '',
    permissions: [],
    roles: [],
  },
  token: localStorage.getItem('token') || ''
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    authenticate(state: State, action: PayloadAction<{ user: User, token: string }>) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.authenticated = true

      localStorage.setItem('token', state.token)
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
    },
    process(state: State, action: PayloadAction<boolean|undefined>) {
      if (typeof action.payload === 'undefined') {
        state.processing = ! state.processing
      } else {
        state.processing = action.payload
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(logout.fulfilled, (state: State) => {
      localStorage.removeItem('token')
      
      state.authenticated = initialState.authenticated
      state.user = initialState.user
      state.token = initialState.token
    })

    builder.addCase(relog.fulfilled, (state: State, action) => {
      state.authenticated = true
      state.user = action.payload.response
      
      localStorage.setItem('token', state.token)
      axios.defaults.headers.common.Authorization = `Bearer ${state.token}`
    })

    builder.addCase(relog.rejected, (state: State) => {
      localStorage.removeItem('token')
    })
  },
})

export const { authenticate, process } = slice.actions

export default slice.reducer
