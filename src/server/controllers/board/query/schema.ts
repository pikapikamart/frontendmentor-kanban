import z from "zod"
import { taskSchema } from "../../task/query/schema"


export const boardWithTasksSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  linkPath: z.string({ required_error: "Linkpath is required" }),
  oldPath: z.string().optional(),
  column: z.array(z.object({
    title: z.string({ required_error: "Column title is required" }),
    backgroundColor: z.string({ required_error: "Background color is required" }),
    id: z.string({ required_error: "Column id is required" }),
    tasks: z.array(taskSchema)
  }))
})

export type BoardWithTaskSchema = z.infer<typeof boardWithTasksSchema>

export const boardsWithTasksSchema = z.array(boardWithTasksSchema)

export type BoardsWithTaskSchema = z.infer<typeof boardsWithTasksSchema>

export const getBoardSchema = z.object({
  linkPath: z.string({ required_error: "Linkpath is required" })
})

export type GetBoardSchema = z.infer<typeof getBoardSchema>