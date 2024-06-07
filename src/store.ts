import { create } from 'zustand'

export type Task = {
  id: number
  title: string
  description: string
  dueDate: string
}

interface TaskStore {
  tasks: Task[]
  selectedTaskId: number
  addTasks(tasks: Task[]): void
  updateTask(updatedTask: Task): void
  removeTasks(): void
  setSelectedTaskId(id: number): void
  removeSelectedTaskId(): void
}

export const useTasksStore = create<TaskStore>((set) => ({
  tasks: [] as Task[],
  selectedTaskId: -1,
  addTasks: (tasks: Task[]) => set({ tasks: tasks }),
  updateTask: (updatedTask: Task) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    })),
  removeTasks: () => set({ tasks: [] }),
  setSelectedTaskId: (id: number) => set({ selectedTaskId: id }),
  removeSelectedTaskId: () => set({ selectedTaskId: -1 }),
}))

interface UserStore {
  username: string
  setUsername(username: string): void
  removeUsename(): void
}

export const useUserStore = create<UserStore>((set) => ({
  username: '',
  setUsername: (username: string) => set({ username: username }),
  removeUsename: () => set({ username: '' }),
}))
