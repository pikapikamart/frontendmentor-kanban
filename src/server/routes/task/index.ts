import { 
  createTaskController, 
  editSubtasksWithStatusController } from "@/server/controllers/task/mutation";
import { 
  createTaskSchema, 
  editSubtasksWithStatus } from "@/server/controllers/task/mutation/schema";
import { databaseMiddleware } from "@/server/middleware/database";
import { userTokenMiddleware } from "@/server/middleware/token";
import { 
  procedure, 
  router } from "@/server/trpc";


export const taskProcedure = procedure
  .use(databaseMiddleware)
  .use(userTokenMiddleware)

export const taskRouter = router({
  create: taskProcedure
    .input(createTaskSchema)
    .mutation(({ ctx, input }) => createTaskController(ctx, input)),
  editSubtasksWithStatus: taskProcedure
    .input(editSubtasksWithStatus)
    .mutation(({ ctx, input }) => editSubtasksWithStatusController(ctx, input)) 
})