import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import './index.css'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Edit from './pages/Edit.tsx'
import Default from './layouts/Default.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login/>
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
