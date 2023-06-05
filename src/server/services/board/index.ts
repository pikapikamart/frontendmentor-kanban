import { 
  Board, 
  BoardDocument, 
  boardModel } from "@/server/models/board/board";
import { 
  DocumentDefinition, 
  FilterQuery, 
  ProjectionType} from "mongoose";


export const findBoardService = async( query: FilterQuery<BoardDocument>, projection: ProjectionType<Board> = "" ) => (
  boardModel.findOne(query, projection)
)

export const createBoardService = async( document: DocumentDefinition<Board> ) =>(
  boardModel.create(document)
)