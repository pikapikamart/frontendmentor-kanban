import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";


export const trpcError = (code: TRPC_ERROR_CODE_KEY, message: string) => {
  throw new TRPCError({
    code,
    message
  })
}

export const trpcSuccess = <T = {}>( content: T, message: string ) => {

  return {
    content, 
    message
  }
}