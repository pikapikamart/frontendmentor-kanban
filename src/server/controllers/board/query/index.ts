import { UserContext } from "@/server/middleware/token";
import { 
  GetBoardSchema, 
  boardWithTasksSchema, 
  boardsWithTasksSchema } from "./schema";
import { trpcError, trpcSuccess } from "@/server/utils/trpc";
import { taskModel } from "@/server/models/task";
import { populateUserService } from "@/server/services/user";
import { BoardDocument } from "@/server/models/board/board";
import { findBoardService } from "@/server/services/board";


export const getAllBoardController = async({ user }: UserContext) =>{

  await populateUserService(user, {
    path: "boards",
    options: {
      lean: true
    },
    transform: (doc: BoardDocument, id): Partial<BoardDocument> => ({
      title: doc.title,
      linkPath: doc.linkPath,
      column: []
    })
  })
  
  return trpcSuccess(boardsWithTasksSchema.parse(user.boards), "Boards")
}

export const getBoardController = async({ user }: UserContext, input: GetBoardSchema) =>{
  const foundBoard = await findBoardService(
    {
      owner: user._id,
      linkPath: input.linkPath,
      title: input.title
    },
    "",
    {
      path: "column.tasks",
      model: taskModel,
      select: "-owner -_id"
    }
  )

  if ( !foundBoard ) return trpcError("NOT_FOUND", "No board exists")

  return trpcSuccess(boardWithTasksSchema.parse(foundBoard), "Successfully found board")
}