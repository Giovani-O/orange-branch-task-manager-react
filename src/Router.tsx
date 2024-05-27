import { Route, Routes, useLocation } from 'react-router-dom'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { Home } from './pages/home'
import { useEffect } from 'react'

export function Router() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/home" element={<Home />}></Route>
    </Routes>
  )
}
