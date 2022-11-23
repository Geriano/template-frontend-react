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

import DashboardLayout from './Layouts/DashboardLayout';
import Dashboard from './Pages/Dashboard';
import AuthLayout from './Layouts/AuthLayout';
import Login from './Pages/Auth/Login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={
        createBrowserRouter(createRoutesFromElements(
          <>
            <Route path='/' element={<DashboardLayout />}>
              <Route path='/' element={<Navigate to="/dashboard" />} />
              <Route path='/dashboard' element={<Dashboard />} />
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