import { createColumnController } from "@/server/controllers/column/mutation";
import { createColumnSchema } from "@/server/controllers/column/mutation/schema";
import { router } from "@/server/trpc";
import { baseProcedure } from "@/server/utils/trpc";


export const columnRouter = router({
  create: baseProcedure
    .input(createColumnSchema)
    .mutation(({ ctx, input }) => createColumnController(ctx, input)),
})