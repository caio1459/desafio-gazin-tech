import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={AppRoutes} />
  </React.StrictMode>,
)
