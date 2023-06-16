import { 
  BoardWithTaskSchema, 
  BoardsWithTaskSchema } from "@/server/controllers/board/query/schema"
import { TaskSchema } from "@/server/controllers/task/query/schema"
import { Dispatch } from "react"
import { createContainer } from "react-tracked"
import { ArrayElement } from "types/utils"
import { useImmerReducer } from "use-immer"


type BoardWithTask = BoardWithTaskSchema & { hasLoaded?: boolean }
export type BoardColumn = ArrayElement<BoardWithTask["column"]>

type Draft = {
  darkmode: boolean,
  boardsLoaded: boolean,
  boards: BoardWithTask[],
}

type Action = |
  { type: "DARKMODE" } |
  { type: "SET_BOARDS", payload: BoardsWithTaskSchema } |
  { type: "ADD_BOARD", payload: BoardWithTaskSchema } |
  { type: "DELETE_BOARD", payload: string } |
  { type: "EDIT_BOARD", payload: BoardWithTaskSchema } |
  { type: "SET_BOARD", payload: BoardWithTask } |
  { type: "ADD_TASK", payload: TaskSchema & { boardPath: string } }

const reducer = ( draft: Draft, action: Action ) => {
  
  switch(action.type) {
    case "DARKMODE":
      draft.darkmode = true

      return
    case "SET_BOARDS":
      draft.boards = action.payload
      draft.boardsLoaded = true

      return
    case "ADD_BOARD":
      draft.boards = draft.boards.concat(action.payload)

      return
    case "DELETE_BOARD":
      draft.boards = draft.boards.filter(board => board.linkPath!==action.payload)

      return
    case "EDIT_BOARD":
      draft.boards = draft.boards.map(board => board.linkPath===action.payload.linkPath? {
        ...action.payload,
        boardsLoaded: true
      } : board)

      return
    case "SET_BOARD":
      draft.boards = draft.boards.map(board => board.linkPath===action.payload.linkPath? {
        ...action.payload,
        boardsLoaded: true
      } : board)
      
      return
    case "ADD_TASK":
      const { boardPath, ...newTask } = action.payload
      draft.boards = draft.boards.map(board => board.linkPath!==boardPath? board : {
        ...board,
        column: board.column.map(column => column.title!==newTask.status? column : {
          ...column,
          tasks: column.tasks.concat(newTask)
        })
      })

      return
    default:
      return draft
  }
}

const initialState: Draft = {
  darkmode: false,
  boardsLoaded: false,
  boards: []
}

const useValue = (): [ Draft, Dispatch<Action> ] => {
  const [ state, dispatch ] = useImmerReducer(reducer, initialState)

  return [ state, dispatch ]
}

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch
} = createContainer(useValue)