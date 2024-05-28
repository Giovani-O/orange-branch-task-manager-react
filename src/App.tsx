import { BrowserRouter } from 'react-router-dom'
import './styles/output.css'
import { Router } from './Router'
import { ToastContainer } from 'react-toastify'

export function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />
    </BrowserRouter>
  )
}
