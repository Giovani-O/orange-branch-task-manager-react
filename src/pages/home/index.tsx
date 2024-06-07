import { OrangeSlice, Plus, SignOut } from '@phosphor-icons/react'
import { ListItem } from '../../components/list-item'
import { api } from '../../axios-api'
import { ChangeEvent, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Task, useTasksStore } from '../../store'
import * as Dialog from '@radix-ui/react-dialog'
import { TaskModal } from '../../components/task-modal'
import { useNavigate } from 'react-router-dom'
import { infoToast } from '../../utils/info-toast'

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([] as Task[])
  const { tasks, addTasks } = useTasksStore()
  const navigate = useNavigate()

  function openDialog() {
    setIsDialogOpen(true)
  }
  function closeDialog() {
    setIsDialogOpen(false)
  }

  function getTasks() {
    const tokenCookie = Cookies.get('token-string')

    api
      .get('api/Tasks', {
        headers: {
          Authorization: `Bearer ${tokenCookie}`,
        },
      })
      .then((response) => {
        console.log(response)
        addTasks(response.data)
        setFilteredTasks(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function handleTasksFilter(event: ChangeEvent<HTMLInputElement>) {
    const filteredTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(event.target.value.toLowerCase()),
    )

    setFilteredTasks(filteredTasks)
  }

  function signOut() {
    Cookies.remove('token-string')
    infoToast('Sessão encerrada')
    navigate('/')
  }

  useEffect(() => {
    getTasks()
  }, [])

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
          <button
            onClick={signOut}
            className="flex flex-row items-center justify-center gap-4 rounded-md px-4 py-1 border rounded-md transition duration-300 ease-in-out hover:bg-black hover:bg-opacity-10"
          >
            Sair
            <SignOut size={25} />
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-start pt-[94px] h-screen">
        <div className="w-[1120px] max-lg:w-11/12 h-8 flex items-center justify-between">
          <h1 className="text-2xl">Tarefas</h1>

          <Dialog.Root open={isDialogOpen}>
            <button
              type="submit"
              className="flex flex-row items-center justify-center gap-4 bg-gradient-to-tl from-orange-700 via-orange-400 to-amber-400 text-white font-bold rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-opacity-10"
              onClick={openDialog}
            >
              <Plus size={24} />
              Adicionar
            </button>

            <TaskModal isOpen={isDialogOpen} onClose={closeDialog} />
          </Dialog.Root>
        </div>
        <input
          type="text"
          placeholder="Busque por uma tarefa..."
          className="w-[1120px] max-lg:w-11/12 my-8 px-4 py-2 border-b border-gray-300 rounded-md transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none"
          onChange={handleTasksFilter}
        />

        {filteredTasks.map((task) => (
          <ListItem key={task.id} id={task.id} />
        ))}
      </main>
    </div>
  )
}
