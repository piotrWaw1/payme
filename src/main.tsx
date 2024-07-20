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
import Dashboard from "@/components/dashboard/Dashboard.tsx";
import AddPayerForm from "@/components/payer/addPayer/AddPayerForm.tsx";
import Payer from "@/components/payer/Payer.tsx";
import Payments from "@/components/payments/Payments.tsx";
import AddPayment from "@/components/payments/AddPayment.tsx";
import EditPayment from "@/components/payments/EditPayment.tsx";
import Callback from "@/Callback.tsx";
import {ParamProvider} from "@/context/ParamContext.tsx";
import {ThemeProvider} from "@/context/ThemeProvider.tsx";
import Payers from "@/components/payer/Payers.tsx";
import "react-big-calendar/lib/css/react-big-calendar.css"
import './index.css'
import ErrorPage from "@/pages/ErrorPage.tsx";
import Error404 from "@/pages/Error404.tsx";

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
        path: '/payments',
        element:
            <ParamProvider>
              <Payments/>
            </ParamProvider>
      },
      {
        path: '/payments/add',
        element: <AddPayment/>
      },
      {
        path: '/payments/not-found',
        element: <Error404 desc={"The payment you're looking for doesn't exist."}/>
      },
      {
        path: '/payments/:id',
        element: <EditPayment/>
      },
      {
        path: '/payers',
        element:
            <ParamProvider>
              <Payers/>
            </ParamProvider>
      },
      {
        path: '/payers/add',
        element: <AddPayerForm/>
      },
      {
        path: '/payers/not-found',
        element: <Error404 desc={"The payer you're looking for doesn't exist."}/>
      },
      {
        path: '/payers/:id',
        element: <Payer/>
      },
      {
        path: '*',
        element: <ErrorPage/>
      },
      {
        path: '/error404',
        element: <Error404 desc={"The page you're looking for doesn't exist."}/>
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
      }
    ]
  },
  {
    path: '/callback',
    element: <Callback/>
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SessionProvider>
        <ThemeProvider storageKey="theme">
          <RouterProvider router={router}/>
        </ThemeProvider>
      </SessionProvider>
    </React.StrictMode>
)
