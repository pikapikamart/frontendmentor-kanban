import { z } from "zod";


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