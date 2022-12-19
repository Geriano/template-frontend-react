import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { State, t } from "../Interfaces/Flash"

export const name = 'flash'
export const initialState: State = {
  value: []
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const success = createAsyncThunk('flash/success', async (message: string, api) => {
  api.dispatch(slice.actions.set({
    type: 'success',
    message,
  }))

  const { flash } = api.getState() as RootState
  const index = flash.value.length - 1
  
  await sleep(3000)
  api.dispatch(slice.actions.remove(index))
})

export const error = createAsyncThunk('flash/error', async (message: string, api) => {
  api.dispatch(slice.actions.set({
    type: 'error',
    message,
  }))

  const { flash } = api.getState() as RootState
  const index = flash.value.length - 1
  
  await sleep(3000)
  api.dispatch(slice.actions.remove(index))
})

export const info = createAsyncThunk('flash/info', async (message: string, api) => {
  api.dispatch(slice.actions.set({
    type: 'info',
    message,
  }))

  const { flash } = api.getState() as RootState
  const index = flash.value.length - 1
  
  await sleep(3000)
  api.dispatch(slice.actions.remove(index))
})

export const warning = createAsyncThunk('flash/warning', async (message: string, api) => {
  api.dispatch(slice.actions.set({
    type: 'warning',
    message,
  }))

  const { flash } = api.getState() as RootState
  const index = flash.value.length - 1
  
  await sleep(3000)
  api.dispatch(slice.actions.remove(index))
})

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    set(state: State, action: PayloadAction<{ type: t, message: string }>) {
      state.value.push(action.payload)
    },
    remove(state: State, action: PayloadAction<number>) {
      state.value[action.payload] = null
    },
  },
})

export default slice.reducer
