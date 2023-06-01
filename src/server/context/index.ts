import * as trpcNext from "@trpc/server/adapters/next"
import { inferAsyncReturnType } from "@trpc/server"


export const createContext = async(opts: trpcNext.CreateNextContextOptions) =>{
  const { req, res } = opts

  return {
    req,
    res,
    token: req.headers.fingerprint
  }
}

export type TrpcContext = inferAsyncReturnType<typeof createContext>