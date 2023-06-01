import z from "zod"


export const boardWithTasks = z.object({
  title: z.string({ required_error: "Title is required" }),
  linkPath: z.string({ required_error: "Linkpath is required" }),
  column: z.array(z.object({
    title: z.string({ required_error: "Column title is required" }),
    tasks: z.array(z.any(), { required_error: "Tasks is required" })
  }))
})

export const boardsWithTasks = z.array(boardWithTasks)

export type BoardsWithTask = z.infer<typeof boardsWithTasks>