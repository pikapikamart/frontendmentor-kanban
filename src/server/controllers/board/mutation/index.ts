import { 
  createBoardService, 
  deleteBoardService, 
  findBoardService } from "@/server/services/board"
import { CreateBoardSchema, DeleteBoardSchema } from "./schema"
import { Board, boardModel } from "@/server/models/board/board"
import { boardWithTasksSchema } from "../query/schema"
import { UserContext } from "@/server/middleware/token"
import { 
  trpcError, 
  trpcSuccess } from "@/server/utils/trpc"
import { updateUserService } from "@/server/services/user"
import mongoose, { ObjectId } from "mongoose"
import { deleteMultipleTask } from "@/server/services/task"


export const createBoardController = async( { user }: UserContext, input: CreateBoardSchema ) => {
  
  if ( await findBoardService({ owner: user._id, title: input.title }, "_id") ) {
    return trpcError("BAD_REQUEST", "Board already existed")
  }

  const boardData: Board = {
    owner: user._id,
    title: input.title,
    linkPath: input.title
      .split(" ")
      .map(word => word.toLowerCase())
      .join(""),
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

export const deleteBoardController = async({ user }: UserContext, input: DeleteBoardSchema) =>{
  const deletedBoard = await deleteBoardService({
    ...input,
    owner: user._id
  })
  
  if ( !deletedBoard ) return trpcError("NOT_FOUND", "No board exists")
  
  // @ts-ignore
  const boardTasks = deletedBoard.column.reduce((accu, curr) => accu.concat(curr.tasks), [] as ObjectId[])
  
  await deleteMultipleTask({ _id: { $in: boardTasks } })

  return trpcSuccess("Success", "Board successfully deleted")
}