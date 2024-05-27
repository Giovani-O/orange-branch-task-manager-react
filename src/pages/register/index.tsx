import { UserCheck } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

export function Register() {
  const navigate = useNavigate()

  return (
    <main className="flex flex-row justify-between items-center h-screen">
      <form className="flex flex-col gap-6 items-center justify-center w-2/5 h-screen max-lg:w-full">
        <h1 className="font-bold text-xl text-zinc-700">Cadastre-se</h1>
        <input
          type="text"
          placeholder="Nome"
          className="px-4 py-2 border-b border-gray-400 rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 border-b border-gray-400 rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
        />
        <input
          type="password"
          placeholder="Senha"
          className="px-4 py-2 border-b border-gray-400 rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
        />
        <button
          type="submit"
          className="flex flex-row items-center justify-center gap-4 bg-gradient-to-tl from-orange-700 via-orange-400 to-amber-400 text-white font-bold rounded-md w-[480px] max-lg:w-11/12 px-4 py-2 transition duration-300 ease-in-out hover:bg-opacity-10"
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
