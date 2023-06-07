import { 
  TaskDocument, 
  taskModel } from "@/server/models/task";
import { FilterQuery } from "mongoose";


export const deleteMultipleTask = async(query: FilterQuery<TaskDocument>) => (
  taskModel.deleteMany(query)
)