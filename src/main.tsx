import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard.tsx';
import Edit from './pages/Edit.tsx';
// import {CookieCheckLogin} from './CookieCheck.tsx'
import Default from './layouts/Default.tsx';
import New from './pages/New.tsx';
import Login from './pages/Login.tsx';
import Archives from './pages/Archives.tsx';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },

  {
    path: '/',
    element: <Default />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/dashboard'} />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/criar',
        element: <New />,
      },
      {
        path: 'notebook/:noteCode',
        element: <Edit />,
      },
      {
        path: 'arquivos',
        element: <Archives />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);
