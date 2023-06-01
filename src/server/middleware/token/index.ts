import { TrpcContext } from "@/server/context";
import { middleware } from "../../trpc";


export const userTokenMiddleware = middleware(async({ctx, next}) => {
  const user = null // fetch in database

  return next({
    ctx: {
      ...ctx,
    }
  })
})

export type UserContext = TrpcContext & {
  
}