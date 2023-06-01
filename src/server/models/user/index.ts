import mongoose from "mongoose"
import { MongooseDocument } from "types/utils"
import { 
  BoardDocument, 
  boardModel } from "../board/board"


export type User = {
  token: string,
  boards: BoardDocument["_id"][]
}

export type UserDocument = User & MongooseDocument

const userSchema: mongoose.Schema<UserDocument> = new mongoose.Schema({
  boards: [{
    ref: boardModel,
    type: mongoose.Schema.Types.ObjectId,
  }],
  token: {
    type: String,
    required: true,
    unique: true
  }
})

const userModel: mongoose.Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema)

export { userModel }