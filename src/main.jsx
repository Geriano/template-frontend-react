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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={
        createBrowserRouter(createRoutesFromElements(
          <Route path='/' element={<DashboardLayout />}>
            <Route path='/' element={<Navigate to="/dashboard" />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>
        ))
      } />
    </Provider>
  </React.StrictMode>
)