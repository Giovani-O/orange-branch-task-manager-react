import { create } from 'zustand'

type Task = {
  id: number
  title: string
  description: string
  dueDate: string
}

interface TaskStore {
  tasks: Task[]
  addTasks(tasks: Task[]): void
  removeTasks(): void
}

export const useTasksStore = create<TaskStore>((set) => ({
  tasks: [] as Task[],
  addTasks: (tasks: Task[]) => set({ tasks: tasks }),
  removeTasks: () => set({ tasks: [] }),
}))
