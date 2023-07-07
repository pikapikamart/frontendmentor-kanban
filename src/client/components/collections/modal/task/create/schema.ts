import z from "zod"


export const createTaskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title should not be empty")
    .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, "Description should not be empty"),
  subtasks: z.array(z.object({
    title: z
      .string({ required_error: "Column title is required" })
      .min(1, "Column title should not be empty")
      .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
  })),
  status: z
    .string({ required_error: "Status is required" })
    .min(1, "Status should not be empty"),
  boardPath: z
    .string({ required_error: "Boardpath is required" })
    .min(1, "Boardpath should not be empty"),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>