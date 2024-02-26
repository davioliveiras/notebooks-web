import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard.tsx'
import Edit from './pages/Edit.tsx'
// import {CookieCheckLogin} from './CookieCheck.tsx'
import Default from './layouts/Default.tsx'
import { CheckLogin } from './CheckLogin.tsx'
import New from './pages/New.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <CheckLogin/>
  },
  {
    path: '/',
    element: <Default/>,
    children: [
      {
        path: '/',
        element: <Dashboard/>
      },
      {
        path: '/novo',
        element: <New/>
      },
      {
        path: '/edit/:noteId',
        element: <Edit/>
      }
    ]
  },
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
