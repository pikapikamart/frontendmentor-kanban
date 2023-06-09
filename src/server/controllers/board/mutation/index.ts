import { 
  createBoardService, 
  deleteBoardService, 
  findBoardService, 
  updateBoardService} from "@/server/services/board"
import { 
  CreateBoardSchema, 
  DeleteBoardSchema, 
  EditBoardSchema } from "./schema"
import { Board } from "@/server/models/board/board"
import { boardWithTasksSchema } from "../query/schema"
import { UserContext } from "@/server/middleware/token"
import { 
  trpcError, 
  trpcSuccess } from "@/server/utils/trpc"
import { updateUserService } from "@/server/services/user"
import { ObjectId } from "mongoose"
import { deleteMultipleTask } from "@/server/services/task"
import { customNanoid } from "@/server/utils/nanoid"


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
      id: customNanoid(10),
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

export const editBoardController = async({ user }: UserContext, input: EditBoardSchema ) =>{
  const foundBoard = await findBoardService({
    owner: user._id,
    linkPath: input.linkPath
  })

  if ( !foundBoard ) return trpcError("NOT_FOUND", "No board exists")

  const columnUpdate = input.column.map(column => {
    const foundColumn = foundBoard.column.find(docuColumn => docuColumn.id===column.id);

    return foundColumn? {
      ...column,
      tasks: foundColumn.tasks
    } : {
      title: column.title,
      id: customNanoid(10),
      tasks: []
    }
  })
  
  const updatedBoard = await updateBoardService(
    {
      owner: user._id,
      linkPath: input.linkPath
    },
    {
      title: input.title,
      linkPath: input.title
        .split(" ")
        .map(word => word.toLowerCase())
        .join(""),
      column: columnUpdate
    },
    { new: true}
  )

  return updatedBoard
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
  await updateUserService(
    { _id: user._id },
    {
      $pull: {
        boards: deletedBoard._id
      }
    }
  )

  return trpcSuccess(deletedBoard.linkPath, "Board successfully deleted")
}