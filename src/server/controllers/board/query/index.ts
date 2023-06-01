import { UserContext } from "@/server/middleware/token";
import { boardsWithTasks } from "./schema";


export const getAllBoardWithTasksController = async({ user }: UserContext) =>{
  
  user.populate({
    path: "boards"
  })

  return boardsWithTasks.parse(user.boards)
}