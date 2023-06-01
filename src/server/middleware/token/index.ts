import { TrpcContext } from "@/server/context";
import { middleware } from "../../trpc";
import { 
  createUser, 
  findUser } from "@/server/services/user";
import { UserDocument } from "@/server/models/user";


export const userTokenMiddleware = middleware(async({ctx, next}) => {
  let user = await findUser({ token: ctx.token })

  if ( !user ) {
    user = await createUser({
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