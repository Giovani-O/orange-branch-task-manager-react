import { Plus } from '@phosphor-icons/react'
import { ListItem } from '../../components/list-item'
import { api } from '../../axios-api'
import { ChangeEvent, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Task, useTasksStore } from '../../stores/tasksStore'
import * as Dialog from '@radix-ui/react-dialog'
import { TaskModal } from '../../components/task-modal'

import { Header } from '../../components/header'

export function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filteredTasks, setFilteredTasks] = useState([] as Task[])
  const { tasks, addTasks } = useTasksStore()

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

  useEffect(() => {
    getTasks()
  }, [])

  useEffect(() => {
    setFilteredTasks(tasks)
  }, [tasks])

  return (
    <div>
      <Header />
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
