import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./pages/Home";
import { Desenvolvedores } from "./pages/Desenvolvedores";
import { Error } from "./pages/Error";
import { Niveis } from "./pages/Niveis";

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/desenvolvedores',
        element: <Desenvolvedores />
      },
      {
        path: '/niveis',
        element: <Niveis />
      },
      {
        path: '*',
        element: <Error />
      }
    ]
  }
])