import { configureStore } from "@reduxjs/toolkit";
import DashboardLayout from "./Store/DashboardLayout";
import auth from "./Store/auth";
import login from "./Store/login";
import flash from "./Store/flash";

export const store = configureStore({
  reducer: {
    DashboardLayout,
    auth,
    login,
    flash,
  },
  middleware: middleware => middleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
