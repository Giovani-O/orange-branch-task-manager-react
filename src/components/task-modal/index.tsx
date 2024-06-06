import { X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { TextInput } from '../text-input'

export function TaskModal() {
  function handleChangeTitle() {}

  function handleChangeDescription() {}

  function handleChangeDueDate() {}

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black bg-opacity-30 fixed inset-0" />

      <Dialog.Content className="max-lg:w-11/12 bg-white rounded-md p-6 flex flex-col gap-8 fixed top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <div className="flex flex-row-reverse justify-between">
          <Dialog.Close>
            <X />
          </Dialog.Close>

          <Dialog.Title>Visualizar/Editar/Adicionar</Dialog.Title>
        </div>

        <form className="flex flex-col gap-6">
          <TextInput
            inputType="text"
            placeholder="Título"
            errorMessage=""
            handleChangeFunction={handleChangeTitle}
          />

          <TextInput
            inputType="date"
            placeholder="Data de entrega"
            errorMessage=""
            handleChangeFunction={handleChangeDueDate}
          />

          <textarea
            className={`px-4 py-2 border rounded-md w-[480px] max-lg:w-11/12 transition duration-300 ease-in-out focus:border-blue-400 focus:border-b outline-none`}
            onChange={handleChangeDescription}
          />

          <button
            type="submit"
            className="flex flex-row items-center justify-center gap-4 bg-gradient-to-tl from-orange-700 via-orange-400 to-amber-400 text-white font-bold rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-opacity-10"
          >
            Salvar Tarefa
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
