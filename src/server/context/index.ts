import * as trpcNext from "@trpc/server/adapters/next"
import { inferAsyncReturnType } from "@trpc/server"
import { getToken } from "next-auth/jwt"


export const createContext = async(opts: trpcNext.CreateNextContextOptions) =>{
  const { req, res } = opts
  const token = await getToken({ req })

  return {
    req,
    res,
    token
  }
}

export type TrpcContext = inferAsyncReturnType<typeof createContext>