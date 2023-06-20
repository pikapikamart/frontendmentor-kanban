import { z } from "zod";


export const subtaskSchema = z.object({
  title: z.string({ required_error: "Subtask title is required" }),
  done: z.boolean({ required_error: "Done is required" }),
  id: z.string({ required_error: "Id is required" })
})

export const baseTaskSchema = z.object({
  id: z.string({ required_error: "Id is required" }),
  subtasks: z.array(subtaskSchema)
})

export const createTaskSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  subtasks: z.array(z.object({
    title: z.string({ required_error: "Subtask title is required" })
  })),
  status: z.string({ required_error: "Status is required" }),
  boardPath: z.string({ required_error: "Board path is required" })
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>

export const editTaskPartial = baseTaskSchema.merge(z.object({
  status: z.string({ required_error: "Status is required" }),
}))

export type EditTaskPartial = z.infer<typeof editTaskPartial>