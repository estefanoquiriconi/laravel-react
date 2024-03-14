import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import { DefaultLayaout } from './DefaultLayaout'

export const GuestLayaout = () => {

  const { token } = useStateContext()

  if (token) {
    return <Navigate to="/" />
  }

  return (
    <div>
      <Outlet />
    </div>
  )
}
