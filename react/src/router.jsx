import { Navigate, createBrowserRouter } from 'react-router-dom'
import { Login } from './views/Login';
import { Signup } from './views/Signup';
import { Users } from './views/Users';
import { NotFound } from './views/NotFound';
import { DefaultLayaout } from './components/DefaultLayaout';
import { GuestLayaout } from './components/GuestLayaout';
import { Dashboard } from './views/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayaout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/users" />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/users',
        element: <Users />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayaout />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  },
])



export default router;
