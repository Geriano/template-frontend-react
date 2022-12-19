import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Navigate,
} from "react-router-dom";
import './index.css'

const boot = async () => {
  await import('./request')
}

const start = async () => {
  const DashboardLayout = await import('./Layouts/DashboardLayout').then(r => r.default)
  const Dashboard = await import('./Pages/Dashboard').then(r => r.default)
  const AuthLayout = await import('./Layouts/AuthLayout').then(r => r.default)
  const Login = await import('./Pages/Auth/Login').then(r => r.default)
  const Profile = await import('./Pages/Profile/Index').then(r => r.default)
  const Permission = await import('./Pages/Superuser/Permission/Index').then(r => r.default)
  const Role = await import('./Pages/Superuser/Role/Index').then(r => r.default)
  const User = await import('./Pages/Superuser/User/Index').then(r => r.default)

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={
          createBrowserRouter(createRoutesFromElements(
            <>
              <Route path='/' element={<DashboardLayout />}>
                <Route path='/' element={<Navigate to="/dashboard" />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/superuser/permission' element={<Permission />} />
                <Route path='/superuser/role' element={<Role />} />
                <Route path='/superuser/user' element={<User />} />
              </Route>

              <Route path='/' element={<AuthLayout />}>
                <Route path='/login' element={<Login />} />
              </Route>
            </>
          ))
        } />
      </Provider>
    </React.StrictMode>
  )
}

boot()
start()