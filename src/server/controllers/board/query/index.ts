import { UserContext } from "@/server/middleware/token";
import { boardsWithTasks } from "./schema";
import { trpcSuccess } from "@/server/utils/trpc";
import { taskModel } from "@/server/models/task";


export const getAllBoardWithTasksController = async({ user }: UserContext) =>{
  
  await user.populate({
    path: "boards",
    populate: {
      path: "column.tasks",
      model: taskModel
    }
  })
  
  return trpcSuccess(boardsWithTasks.parse(user.boards), "Boards")
}