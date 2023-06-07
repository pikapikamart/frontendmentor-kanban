import z from "zod"


export const createBoardSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  column: z.array(z.object({
    title: z.string({ required_error: "Column title is required" })
  }))
})

export type CreateBoardSchema = z.infer<typeof createBoardSchema>

export const deleteBoardSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  linkPath: z.string({ required_error: "Link path is required" })
})

export type DeleteBoardSchema = z.infer<typeof deleteBoardSchema>