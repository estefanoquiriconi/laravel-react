import { createBrowserRouter } from 'react-router-dom'
import { Login } from './views/Login';
import { Singup } from './views/Singup';
import { Users } from './views/Users';
import { NotFound } from './views/NotFound';

const router = createBrowserRouter([
  {
    path: '/login',
    element : <Login />
  },
  {
    path: '/signup',
    element : <Singup />
  },
  {
    path: '/users',
    element : <Users />
  },
  {
    path: '*',
    element : <NotFound />
  },
])



export default router;
