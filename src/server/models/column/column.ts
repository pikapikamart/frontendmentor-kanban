import mongoose from "mongoose"
import { TaskDocument } from "../task"
import { MongooseDocument } from "types/utils"


export type Column = {
  title: string,
  id: string,
  tasks: TaskDocument["_id"][]
}

export type ColumnDocument = Column & MongooseDocument

const columnSchema: mongoose.Schema<ColumnDocument> = new mongoose.Schema({
  title: String,
  id: String,
  tasks: [{
    ref: "Task",
    type: mongoose.Schema.Types.ObjectId
  }]
})

const columnModel: mongoose.Model<ColumnDocument> = mongoose.models.Column || mongoose.model<ColumnDocument>("Column", columnSchema)

export { columnModel }