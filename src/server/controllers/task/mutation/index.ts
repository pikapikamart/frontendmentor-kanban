import { UserContext } from "@/server/middleware/token";
import { CreateTaskSchema } from "./schema";
import { customNanoid } from "@/server/utils/nanoid";
import { Task } from "@/server/models/task";
import { 
  findBoardService, 
  updateBoardService } from "@/server/services/board";
import { 
  trpcError, 
  trpcSuccess } from "@/server/utils/trpc";
import { 
  createTaskService, 
  findTaskService } from "@/server/services/task";
import { taskSchema } from "../query/schema";


export const createTaskController = async({ user }: UserContext, input: CreateTaskSchema) =>{
  const foundBoard = await findBoardService({
    owner: user.id,
    linkPath: input.boardPath,
    "column.title": input.status
  })

  if ( !foundBoard ) return trpcError("NOT_FOUND", "No board exists")

  const newTask: Task = {
    ...input,
    owner: user._id,
    id: customNanoid(10),
    subtasks: input.subtasks.map(subtask => ({
      title: subtask.title,
      id: customNanoid(10)
    })),
  }
  
  const foundTask = await findTaskService(
    {
      owner: user._id,
      title: input.title
    }
  )

  if ( foundTask ) return trpcError("CONFLICT", "Task already created")
    
  const createdTask = await createTaskService(newTask)

  await updateBoardService(
    {
      _id: foundBoard._id,
      "column.title": input.status
    },
    {
      $push: {
        "column.$.tasks": createdTask._id
      }
    }
  )

  return trpcSuccess(taskSchema.parse(createdTask), "Success")
}