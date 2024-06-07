import { SignIn } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../axios-api'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { InputErrorMessage } from '../../components/input-error-message'
import { TextInput } from '../../components/text-input'
import Cookies from 'js-cookie'
import { successToast } from '../../utils/success-toast'
import { errorToast } from '../../utils/error-toast'
import { useUserStore } from '../../store'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { setUsername } = useUserStore()

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
    setEmailError('')
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
    setPasswordError('')
  }

  function signIn(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const request = {
      email: email,
      password: password,
    }

    console.log(request)
    api
      .post('api/Authentication/login', request)
      .then((response) => {
        successToast('Bem vindo(a)!')

        Cookies.set('token-string', response.data.token, {
          expires: new Date(response.data.validTo),
        })

        setUsername(response.data.userName)

        navigate('/home')
      })
      .catch((error) => {
        errorToast(error.response.data.title)
        setEmailError(error.response.data.errors['Email'][0] || '')
        setPasswordError(error.response.data.errors['Password'][0] || '')
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

        <TextInput
          inputType="email"
          value={email}
          placeholder="Email"
          errorMessage={emailError}
          handleChangeFunction={handleEmailChange}
        />
        {emailError && <InputErrorMessage message={emailError} />}
        <TextInput
          inputType="password"
          value={password}
          placeholder="Senha"
          errorMessage={passwordError}
          handleChangeFunction={handlePasswordChange}
        />
        {passwordError && <InputErrorMessage message={passwordError} />}
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
