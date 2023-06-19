import { z } from "zod";
import { 
  baseTaskSchema, 
  createTaskSchema } from "../mutation/schema";


export const taskSchema = createTaskSchema
  .omit({ boardPath: true })
  .merge(baseTaskSchema)

export type TaskSchema = z.infer<typeof taskSchema>