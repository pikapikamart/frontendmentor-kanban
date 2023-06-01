import z from "zod"


export const createBoardSchema = z.object({
  title: z.string(),
  column: z.array(z.object({
    title: z.string({ required_error: "Column title is required" })
  }))
})

export type CreateBoardSchema = z.infer<typeof createBoardSchema>