import { getAllTaskController } from "@/server/controllers/tasks/query";
import { router } from "@/server/trpc";
import { taskProcedure } from "../task";


export const tasksRouter = router({
  get: taskProcedure
    .query(({ ctx }) => getAllTaskController(ctx))
})