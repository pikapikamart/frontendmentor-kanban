import { UserContext } from "@/server/middleware/token";


export const getAllTaskController = async(context: UserContext) =>{

  return {
    token: context.token
  }
}