import { createTaskSchema } from "../create/schema";
import z from "zod"


export const editTaskSchema = createTaskSchema
  .omit({ subtasks: true })
  .merge(z.object({
    subtasks: z.array(z.object({
      title: z
        .string({ required_error: "Column title is required" })
        .min(1, "Column title should not be empty")
        .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
      done: z
        .boolean()
        .optional(),
      id: z
        .string()
        .optional()
    })),
    oldStatus: z
      .string()
      .optional()
}))

export type EditTaskSchema = z.infer<typeof editTaskSchema>