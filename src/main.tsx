import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import './index.css';
import Dashboard from './pages/Dashboard.tsx';
import Default from './layouts/Default.tsx';
import Login from './pages/Login.tsx';
import Archives from './pages/Archives.tsx';
import Form from './components/layout/Form.tsx';

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
        element: <Form typeForm="create" />,
      },
      {
        path: 'notebook/:noteCode',
        element: <Form typeForm="edit" />,
      },
      {
        path: 'arquivos',
        element: <Archives />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/dashboard'} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);
