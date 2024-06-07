import { ReactNode } from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = Cookies.get('token-string')

  if (!token) return <Navigate to="/" />
  else return children
}
