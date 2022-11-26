import { configureStore } from "@reduxjs/toolkit";
import DashboardLayout from "./Store/DashboardLayout";
import auth from "./Store/auth";
import login from "./Store/login";
import flash from "./Store/flash";
import profile from "./Store/profile";
import permission from "./Store/permission";
import role from "./Store/role";

export const store = configureStore({
  reducer: {
    DashboardLayout,
    auth,
    login,
    flash,
    profile,
    permission,
    role,
  },
  middleware: middleware => middleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
