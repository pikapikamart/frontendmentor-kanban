import { 
  User, 
  UserDocument, 
  userModel } from "@/server/models/user"
import { 
  DocumentDefinition, 
  FilterQuery } from "mongoose"


export const findUser = async( query: FilterQuery<UserDocument> ) => (
  userModel.findOne(query)
)

export const createUser = async( document: DocumentDefinition<User> ) => (
  userModel.create(document)
)