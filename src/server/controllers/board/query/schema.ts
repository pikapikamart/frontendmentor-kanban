import z from "zod"


export const boardWithTasksSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  linkPath: z.string({ required_error: "Linkpath is required" }),
  column: z.array(z.object({
    title: z.string({ required_error: "Column title is required" }),
    id: z.string({ required_error: "Column id is required" }),
    tasks: z.array(z.any(), { required_error: "Tasks is required" })
  }))
})

export type BoardWithTaskSchema = z.infer<typeof boardWithTasksSchema>

export const boardsWithTasksSchema = z.array(boardWithTasksSchema)

export type BoardsWithTask = z.infer<typeof boardsWithTasksSchema>