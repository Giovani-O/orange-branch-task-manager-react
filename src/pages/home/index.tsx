import { OrangeSlice, Plus, SignOut } from '@phosphor-icons/react'
import { ListItem } from '../../components/list-item'

export function Home() {
  return (
    <div>
      <header className="flex items-center justify-between px-4 bg-transparent w-screen h-[60px] border-b border-gray-200 fixed">
        <h1 className="flex flex-row items-center justify-center gap-4 text-2xl">
          <OrangeSlice size={32} weight="fill" />
          Orange Tasks
        </h1>
        <div className="flex gap-4">
          <h1 className="max-sm:hidden flex flex-row items-center justify-center text-md">
            Olá, Usuário
          </h1>
          <button className="flex flex-row items-center justify-center gap-4 rounded-md px-4 py-1 border rounded-md transition duration-300 ease-in-out hover:bg-black hover:bg-opacity-10">
            Sair
            <SignOut size={25} />
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-start pt-[94px] h-screen">
        <div className="w-[1120px] max-lg:w-11/12 h-8 flex items-center justify-between">
          <h1 className="text-2xl">Tarefas</h1>
          <button
            type="submit"
            className="flex flex-row items-center justify-center gap-4 bg-gradient-to-tl from-orange-700 via-orange-400 to-amber-400 text-white font-bold rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-opacity-10"
          >
            <Plus size={24} />
            Adicionar
          </button>
        </div>
        <input
          type="text"
          placeholder="Busque por uma tarefa..."
          className="w-[1120px] max-lg:w-11/12 my-8 px-4 py-2 border-b border-gray-300 rounded-md transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
        />

        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </main>
    </div>
  )
}
