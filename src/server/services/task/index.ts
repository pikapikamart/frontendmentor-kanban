import { 
  Task,
  TaskDocument, 
  taskModel } from "@/server/models/task";
import { 
  DocumentDefinition, 
  FilterQuery, 
  ProjectionType,
  QueryOptions} from "mongoose";


export const deleteMultipleTaskService = async(query: FilterQuery<TaskDocument>) => (
  taskModel.deleteMany(query)
)

export const createTaskService = async( task: DocumentDefinition<Task> ) => (
  taskModel.create(task)
)

export const findTaskService = async( 
  query: FilterQuery<TaskDocument>, 
  projection: ProjectionType<TaskDocument> = "" ,
  option: QueryOptions = { lean: true }) => (
  taskModel.findOne(query, projection, option)
)