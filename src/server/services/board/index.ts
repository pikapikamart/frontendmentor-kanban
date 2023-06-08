import { 
  Board, 
  BoardDocument, 
  boardModel } from "@/server/models/board/board";
import { 
  DocumentDefinition, 
  FilterQuery, 
  ProjectionType,
  QueryOptions,
  UpdateQuery} from "mongoose";


export const findBoardService = async( query: FilterQuery<BoardDocument>, projection: ProjectionType<Board> = "" ) => (
  boardModel.findOne(query, projection)
)

export const createBoardService = async( document: DocumentDefinition<Board> ) =>(
  boardModel.create(document)
)

export const updateBoardService = async(
  query: FilterQuery<BoardDocument>,
  update: UpdateQuery<BoardDocument>,
  options: QueryOptions = {}
) => (
  boardModel.findOneAndUpdate(query, update, options)
)

export const deleteBoardService = async(query: FilterQuery<BoardDocument>) => (
  boardModel.findOneAndDelete(query)
)
