import { databaseMiddleware } from "@/server/middleware/database";
import { userTokenMiddleware } from "@/server/middleware/token";
import { 
  procedure, 
  router } from "@/server/trpc";


export const taskProcedure = procedure
  .use(databaseMiddleware)
  .use(userTokenMiddleware)

export const taskRouter = router({})