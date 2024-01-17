import React from 'react'
import NavSideUser from '../Components/NavSideUser'
import { Outlet } from 'react-router-dom'

export default function LayoutUser() {
  return (
    <div>
      <NavSideUser />
      <Outlet />
    </div>
  )
}
