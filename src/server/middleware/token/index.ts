import { TrpcContext } from "@/server/context";
import { middleware } from "../../trpc";
import { 
  createUserService, 
  findUserService } from "@/server/services/user";
import { UserDocument } from "@/server/models/user";


export const userTokenMiddleware = middleware(async({ctx, next}) => {
  let user = await findUserService({ token: ctx.token })

  if ( !user ) {
    user = await createUserService({
      token: ctx.token,
      boards: []
    })
  } 

  return next({
    ctx: {
      ...ctx,
      user
    }
  })
})

export type UserContext = TrpcContext & {
  user: UserDocument
}