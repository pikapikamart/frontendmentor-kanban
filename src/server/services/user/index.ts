import { 
  User, 
  UserDocument, 
  userModel } from "@/server/models/user"
import { 
  DocumentDefinition, 
  FilterQuery, 
  UpdateQuery} from "mongoose"


export const findUser = async( query: FilterQuery<UserDocument> ) => (
  userModel.findOne(query)
)

export const createUser = async( document: DocumentDefinition<User> ) => (
  userModel.create(document)
)

export const updateUser = async(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) =>(
  userModel.updateOne(query, update)
)