import { BrowserRouter } from 'react-router-dom'
import './styles/output.css'
import { Router } from './Router'

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}
