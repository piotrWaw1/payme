import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "@/components/auth/Login.tsx";
import SingUp from "@/components/auth/SingUp.tsx";
import AuthComponent from "@/components/AuthComponent.tsx";
import PrivateRoute from "@/utils/PrivateRoute.tsx";
import PublicRoute from "@/utils/PublicRoute.tsx";
import {SessionProvider} from "@/context/SessionContext.tsx";
import Dashboard from "@/dashboard/Dashboard.tsx";
import AddPayment from "@/components/addPayment/AddPayment.tsx";
import AddPayer from "@/components/addPayer/AddPayer.tsx";
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element:
        <PrivateRoute>
          <App/>
        </PrivateRoute>,
    children: [
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: '/payment',
        element: <AddPayment/>
      },
      {
        path: '/payer',
        element: <AddPayer/>
      }
    ]
  },
  {
    path: '/',
    element:
        <PublicRoute>
          <AuthComponent/>
        </PublicRoute>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <SingUp/>
      },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SessionProvider>
        <RouterProvider router={router}/>
      </SessionProvider>
    </React.StrictMode>,
)
