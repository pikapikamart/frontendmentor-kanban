import { z } from "zod";


export const createColumnSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  linkPath: z.string({ required_error: "Link path is required" })
})

export type CreateColumnSchema = z.infer<typeof createColumnSchema >