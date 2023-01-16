import { initTRPC } from "@trpc/server"
import { TrpcContext } from "../context"


const trpc = initTRPC.context<TrpcContext>().create()

export const router = trpc.router
export const procedure = trpc.procedure
export const middleware = trpc.middleware