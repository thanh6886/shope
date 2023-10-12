import { useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import Nopage from './pages/Nopage'

export default function useRouterElement() {
  const RouteElements = useRoutes([
    {
      path: '/',
      element: <ProductList />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/registor',
      element: <Register />
    },
    {
      path: '*',
      element: <Nopage />
    }
  ])
  return RouteElements
}
