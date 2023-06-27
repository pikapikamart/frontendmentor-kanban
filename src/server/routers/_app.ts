import { boardRouter } from "../routes/board";
import { columnRouter } from "../routes/column";
import { taskRouter } from "../routes/task";
import { router } from "../trpc";


export const appRouter = router({
  board: boardRouter,
  task: taskRouter,
  column: columnRouter
})

export type AppRouter = typeof appRouter