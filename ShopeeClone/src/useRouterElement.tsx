import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import Nopage from './pages/Nopage'
import RegisterLayout from './Layouts/RegisterLayout'
import MainLayout from './Layouts/MainLayout'
import Profile from './pages/Profile'
import { useContext } from 'react'
import { AppContext } from './Contexts/app.Contexts'
import ProductItem from './pages/ProductItem'
import path from './const/path'

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' /> // kiểm soát nếu chưa login thì ko cho vào
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' /> // kiểm soát nếu  login thì ko cho vào nữa dùng trong trang login và register
}

export default function useRouterElement() {
  const RouteElements = useRoutes([
    {
      path: path.productDetail,
      index: true,
      element: (
        <MainLayout>
          <ProductItem />
        </MainLayout>
      )
    },
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />, // router cha
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return RouteElements
}
