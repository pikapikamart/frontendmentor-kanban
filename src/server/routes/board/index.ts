import { 
  createBoardController, 
  deleteBoardController, 
  editBoardController} from "@/server/controllers/board/mutation";
import { 
  createBoardSchema, 
  deleteBoardSchema, 
  editBoardschema} from "@/server/controllers/board/mutation/schema";
import { getAllBoardController, getBoardController } from "@/server/controllers/board/query";
import { getBoardSchema } from "@/server/controllers/board/query/schema";
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
  get: boardProcedure
    .input(getBoardSchema)
    .query(({ ctx, input }) => getBoardController(ctx, input)),
  create: boardProcedure
    .input(createBoardSchema)
    .mutation(({ ctx, input }) => createBoardController(ctx, input)),
  edit: boardProcedure
    .input(editBoardschema)
    .mutation(({ ctx, input }) => editBoardController(ctx, input)),
  delete: boardProcedure
    .input(deleteBoardSchema)
    .mutation(({ ctx, input }) => deleteBoardController(ctx, input))
})