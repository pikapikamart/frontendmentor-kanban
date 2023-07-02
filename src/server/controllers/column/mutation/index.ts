import { UserContext } from "@/server/middleware/token";
import { CreateColumnSchema } from "./schema";
import { updateBoardService } from "@/server/services/board";
import { customNanoid } from "@/server/utils/nanoid";
import { 
  trpcError, 
  trpcSuccess } from "@/server/utils/trpc";
import randomColor from "randomcolor";


export const createColumnController = async({ user }: UserContext, input: CreateColumnSchema) =>{
  const newColumn = {
    ...input,
    id: customNanoid(10),
    backgroundColor: randomColor({ luminosity: "light" }),
    tasks: []
  }
  const updatedBoard = await updateBoardService(
    {
      owner: user._id,
      linkPath: input.linkPath
    },
    {
      $push: { column: newColumn }
    }
  )

  if ( !updatedBoard ) return trpcError("NOT_FOUND", "No board found to update")

  return trpcSuccess(newColumn, "Success")
}