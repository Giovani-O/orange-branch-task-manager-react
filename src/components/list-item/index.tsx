import { Pencil, Trash } from '@phosphor-icons/react'
import { useTasksStore } from '../../store'
import { format } from 'date-fns'
import * as Dialog from '@radix-ui/react-dialog'
import * as Alert from '@radix-ui/react-alert-dialog'
import { TaskModal } from '../task-modal'
import { useState } from 'react'
import { DeleteAlert } from '../delete-alert'

interface ListItemProps {
  id: number
}
export function ListItem({ id }: ListItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const { tasks, setSelectedTaskId } = useTasksStore()
  const task = tasks.find((task) => task.id === id)

  function openDialog() {
    setSelectedTaskId(id)
    setIsDialogOpen(true)
  }
  function closeDialog() {
    setIsDialogOpen(false)
  }
  function openAlert() {
    setSelectedTaskId(id)
    setIsAlertOpen(true)
  }
  function closeAlert() {
    setIsAlertOpen(false)
  }

  return (
    <section className="w-[1120px] max-lg:w-11/12 flex item-center justify-between px-4 py-2 mb-2 border border-gray-200 rounded-md transition duration-100 ease-in-out hover:bg-black hover:bg-opacity-5">
      <h1>{task?.title}</h1>
      <div className="flex items-center justify-between gap-3">
        <h1>
          {format(task?.dueDate ?? '0001-01-01T00:00:00.00', 'dd/MM/yyyy')}
        </h1>
        <span>•</span>
        <Dialog.Root open={isDialogOpen}>
          <button type="button" onClick={openDialog}>
            <Pencil size={24} />
          </button>

          <TaskModal isOpen={isDialogOpen} onClose={closeDialog} />
        </Dialog.Root>

        <Alert.Root open={isAlertOpen}>
          <button type="button" onClick={openAlert}>
            <Trash size={24} />
          </button>

          <DeleteAlert closeAlert={closeAlert} />
        </Alert.Root>
      </div>
    </section>
  )
}
