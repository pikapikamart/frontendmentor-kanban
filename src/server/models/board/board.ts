import mongoose from "mongoose"
import { TaskDocument } from "../task"
import { MongooseDocument } from "types/utils"
import { UserDocument } from "../user"


export type Board = {
  owner: UserDocument["_id"],
  title: string,
  column: {
    title: string,
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
  column: [{
    title: String,
    tasks: [{
      ref: "Task",
      type: mongoose.Schema.Types.ObjectId
    }]
  }]
})

const boardModel: mongoose.Model<BoardDocument> = mongoose.models.Board || mongoose.model<BoardDocument>("Board", boardSchema)

export { boardModel }