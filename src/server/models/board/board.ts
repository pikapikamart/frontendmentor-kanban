import mongoose from "mongoose"
import { TaskDocument } from "../task"
import { MongooseDocument } from "types/utils"
import { UserDocument } from "../user"


export type Board = {
  owner: UserDocument["_id"],
  title: string,
  linkPath: string,
  column: {
    title: string,
    backgroundColor: string,
    id: string,
    tasks: TaskDocument["_id"][]
  }[]
}

export type BoardDocument = Board & MongooseDocument

const boardSchema: mongoose.Schema<BoardDocument> = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: String,
  linkPath: String,
  column: [{
    title: String,
    backgroundColor: String,
    id: String,
    tasks: [{
      ref: "Task",
      type: mongoose.Schema.Types.ObjectId
    }]
  }]
})

const boardModel: mongoose.Model<BoardDocument> = mongoose.models.Board || mongoose.model<BoardDocument>("Board", boardSchema)

export { boardModel }