import { UserContext } from "@/server/middleware/token";
import { boardsWithTasksSchema } from "./schema";
import { trpcSuccess } from "@/server/utils/trpc";
import { taskModel } from "@/server/models/task";
import { populateUserService } from "@/server/services/user";
import { BoardDocument } from "@/server/models/board/board";


export const getAllBoardWithTasksController = async({ user }: UserContext) =>{

  await populateUserService(user, {
    path: "boards",
    populate: {
      path: "column.tasks",
      model: taskModel
    },
    options: {
      lean: true
    },
    transform: (doc: BoardDocument, id): Partial<BoardDocument> => ({
      title: doc.title,
      column: []
    })
  })
  
  return trpcSuccess(boardsWithTasksSchema.parse(user.boards), "Boards")
}