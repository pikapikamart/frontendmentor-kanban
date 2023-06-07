import { 
  createBoardController, 
  deleteBoardController } from "@/server/controllers/board/mutation";
import { 
  createBoardSchema, 
  deleteBoardSchema } from "@/server/controllers/board/mutation/schema";
import { getAllBoardController } from "@/server/controllers/board/query";
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
    .query(({ ctx }) => getAllBoardController(ctx)),
  create: boardProcedure
    .input(createBoardSchema)
    .mutation(({ ctx, input }) => createBoardController(ctx, input)),
  delete: boardProcedure
    .input(deleteBoardSchema)
    .mutation(({ ctx, input }) => deleteBoardController(ctx, input))
})