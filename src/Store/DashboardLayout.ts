import { createSlice, PayloadAction } from "@reduxjs/toolkit"


export const name = 'DashboardLayout'
export const initialState = {
  open: {
    sidebar: Boolean(Number(localStorage.getItem('sidebar_open'))),
    dropdown: false,
  },
}

export const slice = createSlice({
  name,
  initialState,
  reducers: {
    sidebar: (state, action: PayloadAction<boolean|undefined>) => {
      if (typeof action.payload === 'undefined') {
        state.open.sidebar = ! state.open.sidebar
      } else {
        state.open.sidebar = !!action.payload
      }

      localStorage.setItem('sidebar_open', Number(state.open.sidebar).toString())
    },
    dropdown: (state, action: PayloadAction<boolean|undefined>) => {
      if (typeof action.payload === 'undefined') {
        state.open.dropdown = ! state.open.dropdown
      } else {
        state.open.dropdown = !!action.payload
      }
    },
  },
})

export const { sidebar, dropdown } = slice.actions

export default slice.reducer
