import { 
  createTaskController, 
  deleteTaskController, 
  editTaskController, 
  editTaskPartialController } from "@/server/controllers/task/mutation";
import { 
  createTaskSchema, 
  editTaskPartial, 
  editTaskSchema,
  deleteTaskSchema} from "@/server/controllers/task/mutation/schema";
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
  edit: taskProcedure
    .input(editTaskSchema)
    .mutation(({ ctx, input }) => editTaskController(ctx, input)),
  editPartial: taskProcedure
    .input(editTaskPartial)
    .mutation(({ ctx, input }) => editTaskPartialController(ctx, input)),
  delete: taskProcedure
    .input(deleteTaskSchema)
    .mutation(({ ctx, input }) => deleteTaskController(ctx, input))
})