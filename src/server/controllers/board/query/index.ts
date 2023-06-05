import { UserContext } from "@/server/middleware/token";
import { boardsWithTasks } from "./schema";
import { trpcSuccess } from "@/server/utils/trpc";


export const getAllBoardWithTasksController = async({ user }: UserContext) =>{
  
  await user.populate({
    path: "boards"
  })
  
  return trpcSuccess(boardsWithTasks.parse(user.boards), "Boards")
}