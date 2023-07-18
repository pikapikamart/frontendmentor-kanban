import { UserContext } from "@/server/middleware/token";
import { 
  GetBoardSchema, 
  boardWithTasksSchema, 
  boardsWithTasksSchema } from "./schema";
import { trpcError, trpcSuccess } from "@/server/utils/trpc";
import { Task, taskModel } from "@/server/models/task";
import { populateUserService } from "@/server/services/user";
import { Board, BoardDocument } from "@/server/models/board/board";
import { findBoardService } from "@/server/services/board";
import { ArrayElement } from "@/types/utils";


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

type PopulatedBoardWithTasks = Omit<Board, "column"> & {
  column: (Omit<ArrayElement<Board["column"]>, "tasks"> & {
    tasks: Task[]
  })[]
}


export const getBoardController = async({ user }: UserContext, input: GetBoardSchema) =>{
  const foundBoard = await findBoardService(
    {
      owner: user._id,
      linkPath: input.linkPath,
    },
    "",
    {
      path: "column.tasks",
      model: taskModel,
      select: "-owner -_id"
    }
  ) as unknown as PopulatedBoardWithTasks | null

  if ( !foundBoard ) return trpcError("NOT_FOUND", "No board exists")

  foundBoard.column = foundBoard.column.map(column => ({
    ...column,
    tasks: column.tasks.map(task => ({
      ...task,
      status: column.title
    }))
  }))

  return trpcSuccess(boardWithTasksSchema.parse(foundBoard), "Successfully found board")
}