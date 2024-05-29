import { Pencil, Trash } from '@phosphor-icons/react'

export function ListItem() {
  return (
    <section className="w-[1120px] max-lg:w-11/12 flex item-center justify-between px-4 py-2 mb-2 border border-gray-200 rounded-md transition duration-100 ease-in-out hover:bg-black hover:bg-opacity-5 cursor-pointer">
      <h1>Nome da tarefa</h1>
      <div className="flex items-center justify-between gap-3">
        <h1>29/05/2024</h1>
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
