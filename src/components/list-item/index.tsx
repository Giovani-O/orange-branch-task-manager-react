import { Pencil, Trash } from '@phosphor-icons/react'
import { useTasksStore } from '../../store'
import { format } from 'date-fns'

interface ListItemProps {
  id: number
}
export function ListItem({ id }: ListItemProps) {
  const { tasks } = useTasksStore()
  const task = tasks.find((task) => task.id === id)

  return (
    <section className="w-[1120px] max-lg:w-11/12 flex item-center justify-between px-4 py-2 mb-2 border border-gray-200 rounded-md transition duration-100 ease-in-out hover:bg-black hover:bg-opacity-5 cursor-pointer">
      <h1>{task?.title}</h1>
      <div className="flex items-center justify-between gap-3">
        <h1>
          {format(task?.dueDate ?? '0001-01-01T00:00:00.00', 'dd/MM/yyyy')}
        </h1>
        <span>•</span>
        <button type="button">
          <Pencil size={24} />
        </button>
        <button type="button">
          <Trash size={24} />
        </button>
      </div>
    </section>
  )
}
