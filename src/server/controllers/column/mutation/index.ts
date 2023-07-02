import { UserContext } from "@/server/middleware/token";
import { CreateColumnSchema } from "./schema";
import { updateBoardService } from "@/server/services/board";
import { customNanoid } from "@/server/utils/nanoid";
import { 
  trpcError, 
  trpcSuccess } from "@/server/utils/trpc";
import randomColor from "randomcolor";


export const createColumnController = async({ user }: UserContext, input: CreateColumnSchema) =>{
  const columnId = customNanoid(10)
  const updatedBoard = await updateBoardService(
    {
      owner: user._id,
      linkPath: input.linkPath
    },
    {
      $push: {
        column: {
          title: input.title,
          backgroundColor: randomColor({ luminosity: "light" }),
          id: columnId,
          tasks:[]
        }
      }
    }
  )

  if ( !updatedBoard ) return trpcError("NOT_FOUND", "No board found to update")

  return trpcSuccess({
    title: input.title,
    id: columnId
  }, "Success")
}