import z from "zod"
import { createBoardSchema } from "../create/schema"


export const editBoardSchema = createBoardSchema.merge(z.object({
  linkPath: z.string({required_error: "Linkpath is required"})
}))

export type EditBoardSchema = z.infer<typeof editBoardSchema>