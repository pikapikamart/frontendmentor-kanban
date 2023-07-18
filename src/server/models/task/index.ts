import mongoose from "mongoose"
import { MongooseDocument } from "types/utils"
import { UserDocument } from "../user"


export type Task = {
  owner: UserDocument["_id"],
  id: string,
  title: string,
  description: string,
  subtasks: {
    title: string,
    done: boolean,
    id: string
  }[],
  board: string
} 

export type TaskDocument = Task & MongooseDocument

const taskSchema: mongoose.Schema<TaskDocument> = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  description: String,
  subtasks: [{
    title: String,
    done: {
      type: Boolean,
      default: false
    },
    id: String
  }],
  board: String
})

const taskModel: mongoose.Model<TaskDocument> = mongoose.models.Task || mongoose.model<TaskDocument>("Task", taskSchema)

export { taskModel }