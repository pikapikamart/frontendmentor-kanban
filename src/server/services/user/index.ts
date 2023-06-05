import { 
  User, 
  UserDocument, 
  userModel } from "@/server/models/user"
import { 
  DocumentDefinition, 
  FilterQuery, 
  PopulateOptions, 
  UpdateQuery} from "mongoose"


export const findUserService = async( query: FilterQuery<UserDocument> ) => (
  userModel.findOne(query)
)

export const createUserService = async( document: DocumentDefinition<User> ) => (
  userModel.create(document)
)

export const updateUserService = async(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) =>(
  userModel.updateOne(query, update)
)

export const populateUserService = async(
  user: UserDocument,
  populate: PopulateOptions
) => (
  await user.populate(populate)
)