import { 
  createBoardService, 
  findBoardService } from "@/server/services/board"
import { CreateBoardSchema } from "./schema"
import { Board } from "@/server/models/board/board"
import { boardWithTasksSchema } from "../query/schema"
import { UserContext } from "@/server/middleware/token"
import { 
  trpcError, 
  trpcSuccess } from "@/server/utils/trpc"
import { updateUserService } from "@/server/services/user"

export const createBoardController = async( { user }: UserContext, input: CreateBoardSchema ) => {
  
  if ( await findBoardService({ owner: user._id, title: input.title }, "_id") ) {
    return trpcError("BAD_REQUEST", "Board already existed")
  }

  const boardData: Board = {
    title: input.title,
    owner: user._id,
    column: input.column.map(column => ({
      title: column.title,
      tasks: []
    }))
  }

  const newBoard = await createBoardService(boardData)

  await updateUserService(
    { _id: user._id },
    {
      $push: {
        boards: newBoard._id
      }
    }
  )

  return trpcSuccess(boardWithTasksSchema.parse(newBoard), "Board successfully created")
}