import { UserCheck } from '@phosphor-icons/react'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../axios-api'
import { Bounce, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setNameError('')
    setName(event.target.value)
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmailError('')
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPasswordError('')
    setPassword(event.target.value)
  }

  function signUp(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const request = {
      username: name,
      email: email,
      password: password,
    }

    api
      .post('api/Authentication/register', request)
      .then(() => {
        toast.success('Cadastro concluído!', {
          position: 'top-left',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
        setTimeout(() => navigate('/'), 5000)
      })
      .catch((error) => {
        toast.error(error.response.data.title, {
          position: 'top-left',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        })
        setNameError(error.response.data.errors['Username'][0] || '')
        setEmailError(error.response.data.errors['Email'][0] || '')
        setPasswordError(error.response.data.errors['Password'][0] || '')
      })
  }

  return (
    <main className="flex flex-row justify-between items-center h-screen">
      <form className="flex flex-col gap-6 items-center justify-center w-2/5 h-screen max-lg:w-full">
        <h1 className="font-bold text-xl text-zinc-700">Cadastre-se</h1>
        <input
          type="text"
          placeholder="Nome"
          className="px-4 py-2 border-b border-gray-400 rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
          onChange={handleNameChange}
        />
        {nameError && <span className="text-xs">{nameError}</span>}
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 border-b border-gray-400 rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
          onChange={handleEmailChange}
        />
        {emailError && <span className="text-xs">{emailError}</span>}
        <input
          type="password"
          placeholder="Senha"
          className="px-4 py-2 border-b border-gray-400 rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
          onChange={handlePasswordChange}
        />
        {passwordError && <span className="text-xs">{passwordError}</span>}
        <button
          type="submit"
          className="flex flex-row items-center justify-center gap-4 bg-gradient-to-tl from-orange-700 via-orange-400 to-amber-400 text-white font-bold rounded-md w-[480px] max-lg:w-11/12 px-4 py-2 transition duration-300 ease-in-out hover:bg-opacity-10"
          onClick={signUp}
        >
          <UserCheck size={24} />
          Cadastre-se gratuitamente
        </button>
      </form>

      <section className="max-lg:hidden bg-gradient-to-tl from-orange-700 via-orange-400 to-amber-400 w-3/5 h-screen">
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <h1 className="text-white text-6xl font-bold">Orange Tasks</h1>
          <h3 className="text-white text-xl">Já possui uma conta?</h3>
          <button
            onClick={() => navigate('/')}
            className="bg-transparent text-white font-bold border-2 border-white rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-20"
          >
            Acesse o Orange Tasks
          </button>
        </div>
      </section>
    </main>
  )
}
