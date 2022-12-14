import { configureStore } from "@reduxjs/toolkit";
import DashboardLayout from "./Store/DashboardLayout";
import auth from "./Store/auth";
import login from "./Store/login";
import register from "./Store/register";
import flash from "./Store/flash";
import profile from "./Store/profile";
import permission from "./Store/permission";
import role from "./Store/role";
import user from "./Store/user";

export const store = configureStore({
  reducer: {
    DashboardLayout,
    auth,
    login,
    register,
    flash,
    profile,
    permission,
    role,
    user,
  },
  middleware: middleware => middleware({
    serializableCheck: false,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
