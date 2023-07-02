import z from "zod"


export const createBoardSchema = z
  .object({
    title: z
      .string({ required_error: "Title is required" })
      .min(1, "Title should not be empty")
      .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
    column: z
      .array(z.object({
        title: z
          .string({ required_error: "Column title is required" })
          .min(1, "Column title should not be empty")
          .regex(/^(?! )[A-Za-z ]*$/, "A-Z only and no special characters"),
        id: z
          .string()
          .optional()
      }))
      .refine((column) => !column.some((item, index) => column.some((innerItem, innerIndex) => index!==innerIndex && item.title===innerItem.title)), {
        message: "Make sure columns have unique names"
      })  
  })

export type CreateBoardSchema = z.infer<typeof createBoardSchema>