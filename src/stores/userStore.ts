import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserStore {
  username: string
  setUsername(username: string): void
  removeUsename(): void
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      username: '',
      setUsername: (username: string) => set({ username: username }),
      removeUsename: () => set({ username: '' }),
    }),
    {
      name: '@orange-tasks:user-store-v1.0',
    },
  ),
)
