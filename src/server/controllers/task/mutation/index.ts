import { UserContext } from "@/server/middleware/token";
import { 
  CreateTaskSchema, 
  DeleteTaskSchema, 
  EditTaskPartial, 
  EditTaskSchema,
  deleteTaskSchema} from "./schema";
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
  deleteTaskService, 
  findTaskService, 
  updateTaskService} from "@/server/services/task";
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
    description: input.description.trim(),
    owner: user._id,
    id: customNanoid(10),
    subtasks: input.subtasks.map(subtask => ({
      title: subtask.title,
      done: false,
      id: customNanoid(10)
    }))
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

export const editTaskController = async({ user }: UserContext, input: EditTaskSchema) => {
  const foundTask = await findTaskService({
    owner: user._id,
    id: input.id
  })

  if ( !foundTask ) return trpcError("NOT_FOUND", "No task found")

  const mappedSubtasks = input.subtasks.map(subtask => {
    const foundSubtask = foundTask.subtasks.find(subtaskInner => subtaskInner.id===subtask.id);

    return foundSubtask? {
      ...foundSubtask,
      title: subtask.title
    } : {
      title: subtask.title,
      id: customNanoid(10),
      done: false
    }
  })

  const updatedTask = await updateTaskService(
    {
      owner: user._id,
      id: input.id
    },
    {
      ...input,
      subtasks: mappedSubtasks
    }
  )

  return trpcSuccess(taskSchema.parse(updatedTask), "Success")
}

export const editTaskPartialController = async({user}: UserContext, input: EditTaskPartial) =>{
  const foundBoard = await findBoardService({
    owner: user._id,
    linkPath: input.linkPath
  })

  if ( !foundBoard ) return trpcError("NOT_FOUND", "No board found")

  const foundTask = await findTaskService(
    {
      owner: user._id,
      id: input.id
    }
  )

  if ( !foundTask ) return trpcError("NOT_FOUND", "No task found")

  if ( input.status!==foundTask.status ) {
    const findColumnIndex = ( title: string ) => foundBoard.column.findIndex(column => column.title===title)

    await updateBoardService(
      {
        linkPath: input.linkPath,
        owner: user._id
      },
      {
        $pull: { [`column.${ findColumnIndex(foundTask.status) }.tasks`]: foundTask._id },
        $push: { [`column.${ findColumnIndex(input.status) }.tasks`]: foundTask._id }
      }
    )
  }

  const mappedSubtasks = foundTask.subtasks.map(subtask => input.subtasks.find(change => change.id===subtask.id)? {
    ...subtask,
    done: !subtask.done
  } : subtask)

  const updatedTask = await updateTaskService(
    {
      owner: user._id,
      id: input.id
    },
    {
      status: input.status,
      subtasks: mappedSubtasks
    }
  )

  if ( !updatedTask ) return trpcError("NOT_FOUND", "No task found to update")

  return trpcSuccess(taskSchema.parse(updatedTask), "Success")
}

export const deleteTaskController = async({ user }: UserContext, input: DeleteTaskSchema) =>{
  const deletedTask = await deleteTaskService({
    owner: user._id,
    id: input.id
  })

  if ( !deletedTask ) return trpcError("NOT_FOUND", "No task found to delete")

  await updateBoardService(
    {
      owner: user._id,
      linkPath: input.linkPath,
      "column.title": deletedTask.status
    },
    {
      $pull: {
        "column.$.tasks": deletedTask._id
      }
    }
  )

  return trpcSuccess(taskSchema.parse(deletedTask), "Success")
}