import { connectDatabase } from "@/server/database"
import { middleware } from "@/server/trpc"


export const databaseMiddleware = middleware(async({ ctx, next }) => {
  await connectDatabase()

  return next({ ctx })
})