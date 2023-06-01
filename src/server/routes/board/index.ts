import { createBoardController } from "@/server/controllers/board/mutation";
import { createBoardSchema } from "@/server/controllers/board/mutation/schema";
import { getAllBoardWithTasksController } from "@/server/controllers/board/query";
import { databaseMiddleware } from "@/server/middleware/database";
import { userTokenMiddleware } from "@/server/middleware/token";
import { 
  procedure, 
  router } from "@/server/trpc";


const boardProcedure = procedure
  .use(databaseMiddleware)
  .use(userTokenMiddleware)

export const boardRouter = router({
  getAll: boardProcedure
    .query(({ ctx }) => getAllBoardWithTasksController(ctx)),
  create: boardProcedure
    .input(createBoardSchema)
    .mutation(({ ctx, input }) => createBoardController(ctx, input))  
})