import { Bounce, toast } from 'react-toastify'

export function errorToast(message: string) {
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  })
}
