import { OrangeSlice, SignOut } from '@phosphor-icons/react'
import { useUserStore } from '../../stores/userStore'
import Cookies from 'js-cookie'
import { infoToast } from '../../utils/info-toast'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const { username, removeUsename } = useUserStore()
  const navigate = useNavigate()

  function signOut() {
    Cookies.remove('token-string')
    localStorage.removeItem('@orange-tasks:tasks-store-v1.0')
    localStorage.removeItem('@orange-tasks:user-store-v1.0')
    removeUsename()
    infoToast('Sessão encerrada')
    navigate('/')
  }

  return (
    <header className="bg-white flex items-center justify-between px-4 bg-transparent w-screen h-[60px] border-b border-gray-200 fixed">
      <h1 className="flex flex-row items-center justify-center gap-4 text-2xl">
        <OrangeSlice size={32} weight="fill" />
        Orange Tasks
      </h1>
      <div className="flex gap-4">
        <h1 className="max-sm:hidden flex flex-row items-center justify-center text-md">
          Olá, {username}
        </h1>
        <button
          onClick={signOut}
          className="flex flex-row items-center justify-center gap-4 rounded-md px-4 py-1 border rounded-md transition duration-300 ease-in-out hover:bg-black hover:bg-opacity-10"
        >
          Sair
          <SignOut size={25} />
        </button>
      </div>
    </header>
  )
}
