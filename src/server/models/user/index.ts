import mongoose from "mongoose"


export type User = {
  token: string
}

export type UserDocument = User & mongoose.Document<mongoose.Types.ObjectId> & {
  _id: mongoose.Types.ObjectId
}

const userSchema: mongoose.Schema<UserDocument> = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  }
})

const userModel: mongoose.Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>("User", userSchema)

export { userModel }