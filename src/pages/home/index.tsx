import { SignOut } from '@phosphor-icons/react'

export function Home() {
  return (
    <div>
      <header className="flex items-center justify-between px-4 bg-transparent w-screen h-[60px] shadow-lg fixed">
        <h1 className="text-2xl">Orange Tasks</h1>
        <div className="flex gap-4">
          <h1 className="flex flex-row items-center justify-center text-md">
            Olá, Usuário
          </h1>
          <button className="flex flex-row items-center justify-center gap-4 rounded-md px-4 py-1 border rounded-md transition duration-300 ease-in-out hover:bg-black hover:bg-opacity-10">
            Sair
            <SignOut size={25} />
          </button>
        </div>
      </header>
      <main className="flex flex-row justify-between items-center h-screen"></main>
    </div>
  )
}
