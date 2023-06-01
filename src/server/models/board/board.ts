import mongoose from "mongoose"
import { TaskDocument } from "../task"
import { MongooseDocument } from "types/utils"


export type Board = {
  title: string,
  linkPath: string,
  column: {
    title: string,
    tasks: TaskDocument["_id"][]
  }[]
}

export type BoardDocument = Board & MongooseDocument

const boardSchema: mongoose.Schema<BoardDocument> = new mongoose.Schema({
  title: String,
  linkPath: String,
  column: [{
    title: String,
    tasks: [{
      ref: "Task",
      type: mongoose.Types.ObjectId
    }]
  }]
})

const boardModel: mongoose.Model<BoardDocument> = mongoose.models.User || mongoose.model<BoardDocument>("Board", boardSchema)

export { boardModel }