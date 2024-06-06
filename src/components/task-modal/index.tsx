import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { TextInput } from '../text-input'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { api } from '../../axios-api'
import Cookies from 'js-cookie'
import { useTasksStore } from '../../store'

interface TaskModalProps {
  closeDialog: () => void
}

export function TaskModal({ closeDialog }: TaskModalProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState(Date.now().toString())
  const [description, setDescription] = useState('')
  const [titleError, setTitleError] = useState('')
  const [dueDateError, setDueDateError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')

  const tokenCookie = Cookies.get('token-string')

  const { tasks, addTasks } = useTasksStore()

  function handleChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value)
    setTitleError('')
  }

  function handleChangeDueDate(event: ChangeEvent<HTMLInputElement>) {
    setDueDate(event.target.value)
    setDueDateError('')
  }

  function handleChangeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
    setDescription(event.target.value)
    setDescriptionError('')
  }

  function createTask(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    const request = {
      title: title,
      description: description,
      dueDate: dueDate,
    }

    api
      .post('/api/Tasks', request, {
        headers: {
          Authorization: `Bearer ${tokenCookie}`,
        },
      })
      .then((response) => {
        addTasks([...tasks, response.data])
        cleanTaskModal()
        closeDialog()
      })
      .catch((error) => {
        setTitleError(error.response.data.errors['taskData'][0] || '')
        setDueDateError(error.response.data.errors['dueDate'][0] || '')
        setDescriptionError(error.response.data.errors['description'][0] || '')
      })
  }

  function cleanTaskModal() {
    setTitle('')
    setDueDate(Date.now().toString())
    setDescription('')
    setTitleError('')
    setDueDateError('')
    setDescriptionError('')
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black bg-opacity-30 fixed inset-0" />

      <Dialog.Content className="max-lg:w-11/12 bg-white rounded-md p-6 flex flex-col gap-8 fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <div className="flex flex-row-reverse justify-between">
          <Dialog.Close onClick={closeDialog}>
            <X />
          </Dialog.Close>

          <Dialog.Title className="font-bold text-xl text-zinc-700">
            Visualizar/Editar/Criar
          </Dialog.Title>
        </div>

        <form className="flex flex-col gap-6">
          <TextInput
            inputType="text"
            placeholder="Título"
            errorMessage={titleError}
            handleChangeFunction={handleChangeTitle}
          />

          <TextInput
            inputType="date"
            placeholder="Data de entrega"
            errorMessage={dueDateError}
            handleChangeFunction={handleChangeDueDate}
          />

          <textarea
            className={`px-4 py-2 border rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none`}
            onChange={handleChangeDescription}
          />

          <button
            type="submit"
            className="flex flex-row items-center justify-center gap-4 bg-gradient-to-tl from-orange-700 via-orange-400 to-amber-400 text-white font-bold rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-opacity-10"
            onClick={createTask}
          >
            Salvar Tarefa
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
