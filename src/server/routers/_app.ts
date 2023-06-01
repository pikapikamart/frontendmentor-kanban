import { boardRouter } from "../routes/board";
import { taskRouter } from "../routes/task";
import { router } from "../trpc";


export const appRouter = router({
  board: boardRouter,
  task: taskRouter,
})

export type AppRouter = typeof appRouter