import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "@/components/auth/Login.tsx";
import SingUp from "@/components/auth/SingUp.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/sing',
    element: <SingUp/>
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>,
)
