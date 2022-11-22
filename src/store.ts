import { configureStore } from "@reduxjs/toolkit";
import DashboardLayout from "./Store/DashboardLayout";

export const store = configureStore({
  reducer: {
    DashboardLayout,
  },
  middleware: middleware => middleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
