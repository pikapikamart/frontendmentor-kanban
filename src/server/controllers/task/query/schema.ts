import { z } from "zod";
import { createTaskSchema } from "../mutation/schema";


export const taskSchema = createTaskSchema.merge(z.object({
  id: z.string({ required_error: "Id is required" }),
  subtasks: z.array(z.object({
    title: z.string({ required_error: "Subtask title is required" }),
    done: z
      .boolean({ required_error: "Subtasks done is required" })
      .optional(),
    id: z.string({ required_error: "Subtask id is required" })
  }))
}))
  .omit({ boardPath: true })

export type TaskSchema = z.infer<typeof taskSchema>