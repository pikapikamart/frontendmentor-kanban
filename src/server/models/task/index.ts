import mongoose from "mongoose"
import { MongooseDocument } from "types/utils"


export type Task = {
  id: string,
  title: string,
  description: string,
  subtask: {
    title: string,
    id: string
  }[],
  status: {
    title: string,
    id: string
  }
} 

export type TaskDocument = Task & MongooseDocument

const taskSchema: mongoose.Schema<TaskDocument> = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: String,
  description: String,
  subtask: [{
    title: String,
    id: {
      type: String,
      required: true,
      unique: true
    }
  }],
  status: {
    title: String,
    id: String
  }
})

const taskModel: mongoose.Model<TaskDocument> = mongoose.models.Task || mongoose.model<TaskDocument>("Task", taskSchema)

export { taskModel }