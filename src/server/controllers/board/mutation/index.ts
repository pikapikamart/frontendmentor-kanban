import { 
  createBoardService, 
  deleteBoardService, 
  findMultipleBoardService, 
  updateBoardService} from "@/server/services/board"
import { 
  CreateBoardSchema, 
  DeleteBoardSchema, 
  EditBoardSchema } from "./schema"
import { boardWithTasksSchema } from "../query/schema"
import { UserContext } from "@/server/middleware/token"
import { 
  trpcError, 
  trpcSuccess } from "@/server/utils/trpc"
import { updateUserService } from "@/server/services/user"
import { Types } from "mongoose"
import { deleteMultipleTaskService } from "@/server/services/task"
import { customNanoid } from "@/server/utils/nanoid"
import { 
  removeWhitespace, 
  sanitizeString } from "@/server/utils/strings"
import randomColor from "randomcolor"
import { taskModel } from "@/server/models/task"


export const createBoardController = async( { user }: UserContext, input: CreateBoardSchema ) => {
  const title = sanitizeString(input.title)
  let linkPath = removeWhitespace(title).toLowerCase()
  const foundBoards = await findMultipleBoardService({ owner: user._id }, "title linkPath")
  
  if ( foundBoards.some(board => board.title===title) ) return trpcError("BAD_REQUEST", "Board already existed")

  if ( foundBoards.some(board => board.linkPath===linkPath) ) {
    linkPath+= customNanoid(8)
  }

  const newBoard = await createBoardService({
    owner: user._id,
    title,
    linkPath,
    column: input.column.map(column => ({
      title: sanitizeString(column.title),
      backgroundColor: randomColor({ luminosity: "light" }),
      id: customNanoid(10),
      tasks: []
    }))
  })

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
  const title = sanitizeString(input.title)
  let newLinkPath = removeWhitespace(title).toLowerCase()
  const foundBoards = await findMultipleBoardService({ owner: user._id }, "title linkPath column")
    
  if ( foundBoards.some(board => board.linkPath!==input.linkPath && board.title===title) ) return trpcError("BAD_REQUEST", "Board title already existed")

  const foundBoard = foundBoards.find(board => board.linkPath===input.linkPath)

  if ( !foundBoard ) return trpcError("NOT_FOUND", "No board exists to update")

  if ( foundBoards.some(board => board.title.toLowerCase()===title.toLowerCase() && board.linkPath!==input.linkPath) ) {
    newLinkPath = input.linkPath.includes(newLinkPath)? input.linkPath : newLinkPath+customNanoid(9)
  }

  const columnUpdate = input.column.map(column => {
    const foundColumn = foundBoard.column.find(docuColumn => docuColumn.id===column.id);

    return foundColumn? {
      id: foundColumn.id,
      backgroundColor: foundColumn.backgroundColor,
      title: sanitizeString(column.title),
      tasks: foundColumn.tasks
    } : {
      title: sanitizeString(column.title),
      backgroundColor: randomColor({ luminosity: "light" }),
      id: customNanoid(10),
      tasks: []
    }
  })

  const removedTasks = foundBoard.column
    .filter(column => !columnUpdate.some(update => update.id===column.id))
    .flatMap(column => column.tasks)
  
  const updatedBoard = await updateBoardService(
    {
      owner: user._id,
      linkPath: input.linkPath
    },
    {
      title,
      linkPath: newLinkPath,
      column: columnUpdate
    },
    {
      new: true,
    }
  )

  await deleteMultipleTaskService({ _id: { $in: removedTasks } })

  if ( !updatedBoard ) return trpcError("BAD_REQUEST", "Error")

  await updatedBoard.populate({
    path: "column.tasks",
    model: taskModel
  })

  return trpcSuccess(boardWithTasksSchema.parse(Object.assign(updatedBoard, 
    {
      column: updatedBoard.column.map(column => ({
        ...column,
        tasks: column.tasks.map(task => {
          
          return Object.assign(task, { status: column.title })
        })
      }))
    },
    input.linkPath!==newLinkPath? { oldPath: input.linkPath }: null)), "Board successfully edited")
}

export const deleteBoardController = async({ user }: UserContext, input: DeleteBoardSchema) =>{
  const deletedBoard = await deleteBoardService({
    ...input,
    owner: user._id
  })
  
  if ( !deletedBoard ) return trpcError("NOT_FOUND", "No board exists")
  
  const boardTasks = deletedBoard.column.reduce((accu, curr) => accu.concat(curr.tasks), [] as Types.ObjectId[])
  
  await deleteMultipleTaskService({ _id: { $in: boardTasks } })
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