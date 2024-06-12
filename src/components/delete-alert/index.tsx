import * as Alert from '@radix-ui/react-alert-dialog'
import { useTasksStore } from '../../stores/tasksStore'
import { api } from '../../axios-api'
import Cookies from 'js-cookie'
import { infoToast } from '../../utils/info-toast'

interface DeleteAlertProps {
  closeAlert: () => void
}

export function DeleteAlert({ closeAlert }: DeleteAlertProps) {
  const tokenCookie = Cookies.get('token-string')
  const { tasks, addTasks, selectedTaskId, removeSelectedTaskId } =
    useTasksStore()
  const task = tasks.find((task) => task.id === selectedTaskId)

  function closeAndCleanAlert() {
    removeSelectedTaskId()
    closeAlert()
  }

  function deleteTask() {
    api
      .delete(`/api/Tasks?id=${selectedTaskId}`, {
        headers: {
          Authorization: `Bearer ${tokenCookie}`,
        },
      })
      .then((response) => {
        console.log(response)
        const updatedTasksList = tasks.filter((t) => t.id !== selectedTaskId)
        addTasks(updatedTasksList)
        removeSelectedTaskId()
        infoToast('Tarefa excluída!')
      })
      .catch((error) => console.error(error))
  }

  return (
    <Alert.Portal>
      <Alert.Overlay className="bg-black bg-opacity-30 fixed inset-0" />
      <Alert.Content className="max-lg:w-11/12 bg-white rounded-md p-6 flex flex-col gap-8 fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <Alert.Title className="font-bold text-xl text-zinc-700">
          Excluir tarefa
        </Alert.Title>
        <Alert.Description>
          Tem certeza que deseja excluir a tarefa <strong>{task?.title}</strong>
          ?
        </Alert.Description>
        <div className="flex justify-between gap-4 w-full">
          <Alert.Cancel
            onClick={closeAndCleanAlert}
            className="border w-full rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-black hover:bg-opacity-10"
          >
            Cancelar
          </Alert.Cancel>
          <Alert.Action
            onClick={deleteTask}
            className="border w-full rounded-md px-4 py-2 bg-red-500 text-white transition duration-300 ease-in-out hover:bg-opacity-90"
          >
            Confirmar
          </Alert.Action>
        </div>
      </Alert.Content>
    </Alert.Portal>
  )
}
