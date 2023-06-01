import { UserContext } from "@/server/middleware/token";


export const getAllBoardWithTasksController = async({ user }: UserContext) =>{
  
  user.populate({
    path: "boards"
  })

  return user
}