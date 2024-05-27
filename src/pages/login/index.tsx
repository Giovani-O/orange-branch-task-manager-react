import { SignIn } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../axios-api'
import { ChangeEvent, MouseEvent, useState } from 'react'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function signIn(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const request = {
      email: email,
      password: password,
    }
    api
      .post('api/Authentication/login', request)
      .then(() => {
        navigate('/home')
      })
      .catch((error) => {
        console.log('Tratar erro: ', error)
      })
  }

  return (
    <main className="flex flex-row justify-between items-center h-screen">
      <section className="max-lg:hidden bg-gradient-to-tr from-orange-700 via-orange-400 to-amber-400 w-3/5 h-screen">
        <div className="flex flex-col gap-6 items-center justify-center h-full">
          <h1 className="text-white text-6xl font-bold">Orange Tasks</h1>
          <h3 className="text-white text-xl">Ainda não tem uma conta?</h3>
          <button
            onClick={() => navigate('/register')}
            className="bg-transparent text-white font-bold border-2 border-white rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-white hover:bg-opacity-20"
          >
            Cadastre-se gratuitamente
          </button>
        </div>
      </section>

      <form className="flex flex-col gap-6 items-center justify-center w-2/5 h-screen max-lg:w-full">
        <h1 className="font-bold text-xl text-zinc-700">Acesse sua conta</h1>
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 border-b border-gray-400 rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Senha"
          className="px-4 py-2 border-b border-gray-400 rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className="flex flex-row items-center justify-center gap-4 bg-gradient-to-tl from-orange-700 via-orange-400 to-amber-400 text-white font-bold rounded-md w-[480px] max-lg:w-11/12 px-4 py-2 transition duration-300 ease-in-out hover:bg-opacity-10"
          onClick={signIn}
        >
          <SignIn size={24} />
          Entrar
        </button>
      </form>
    </main>
  )
}
