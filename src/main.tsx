import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "@/components/auth/Login.tsx";
import SingUp from "@/components/auth/SingUp.tsx";
import AuthComponent from "@/components/AuthComponent.tsx";
import PrivateRoute from "@/utils/PrivateRoute.tsx";
import PublicRoute from "@/utils/PublicRoute.tsx";
import {SessionProvider} from "@/context/SessionContext.tsx";
import Dashboard from "@/components/dashboard/Dashboard.tsx";
import AddPayerForm from "@/components/payer/addPayer/AddPayerForm.tsx";
import Payer from "@/components/payer/Payer.tsx";
import PaymentsTable from "@/components/payments/PaymentsTable.tsx";
import AddPayment from "@/components/payments/AddPayment.tsx";
import EditPayment from "@/components/payments/EditPayment.tsx";
import Callback from "@/Callback.tsx";
import {ParamProvider} from "@/context/ParamContext.tsx";
import {DarkModeProvider} from "@/context/DarkModeContext.tsx";
import PayersTable from "@/components/payer/PayersTable.tsx";
import "react-big-calendar/lib/css/react-big-calendar.css"
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element:
        <PrivateRoute>
          <DarkModeProvider>
            <App/>
          </DarkModeProvider>
        </PrivateRoute>,
    children: [
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: '/payments',
        element:
            <ParamProvider>
              <PaymentsTable/>
            </ParamProvider>
      },
      {
        path: '/payments/add',
        element: <AddPayment/>
      },
      {
        path: '/payments/not-found',
        element: <Navigate to={"/"} replace/>
      },
      {
        path: '/payments/:id',
        element: <EditPayment/>
      },
      {
        path: '/payers',
        element:
            <ParamProvider>
              <PayersTable/>
            </ParamProvider>
      },
      {
        path: '/payers/add',
        element: <AddPayerForm/>
      },
      {
        path: '/payers/:id',
        element: <Payer/>
      },

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
  {
    path: '/callback',
    element: <Callback/>
  },
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SessionProvider>
        <RouterProvider router={router}/>
      </SessionProvider>
    </React.StrictMode>
)
