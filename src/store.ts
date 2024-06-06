import { create } from 'zustand'

type Task = {
  id: number
  title: string
  description: string
  dueDate: string
}

interface TaskStore {
  tasks: Task[]
  selectedTaskId: number
  addTasks(tasks: Task[]): void
  removeTasks(): void
  setSelectedTaskId(id: number): void
  removeSelectedTaskId(): void
}

export const useTasksStore = create<TaskStore>((set) => ({
  tasks: [] as Task[],
  selectedTaskId: -1,
  addTasks: (tasks: Task[]) => set({ tasks: tasks }),
  removeTasks: () => set({ tasks: [] }),
  setSelectedTaskId: (id: number) => set({ selectedTaskId: id }),
  removeSelectedTaskId: () => set({ selectedTaskId: -1 }),
}))
