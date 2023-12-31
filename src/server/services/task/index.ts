import { 
  Task,
  TaskDocument, 
  taskModel } from "@/server/models/task";
import { 
  DocumentDefinition, 
  FilterQuery, 
  ProjectionType,
  QueryOptions,
  UpdateQuery} from "mongoose";


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

export const updateTaskService = async(
  query: FilterQuery<TaskDocument>,
  update: UpdateQuery<TaskDocument>,
  options: QueryOptions = { new: true, lean: true }
) => (
  taskModel.findOneAndUpdate(query, update, options)
)

export const deleteTaskService = async( query: FilterQuery<TaskDocument> ) => (
  taskModel.findOneAndDelete(query)
)