import { taskRouter } from "../routes/task";
import { tasksRouter } from "../routes/tasks";
import { router } from "../trpc";


export const appRouter = router({
  task: taskRouter,
  tasks: tasksRouter
})

export type AppRouter = typeof appRouter