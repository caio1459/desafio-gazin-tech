import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RouterProvider } from 'react-router-dom'
import { AppRoutes } from './routes'
import { QueryClient, QueryClientProvider } from 'react-query'

//Utilizando react-query para gerenciamento de estado e cacheamento 
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={AppRoutes} />
    </QueryClientProvider>
  </React.StrictMode>,
)
