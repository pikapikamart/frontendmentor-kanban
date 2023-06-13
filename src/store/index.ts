import { 
  BoardWithTaskSchema, 
  BoardsWithTaskSchema } from "@/server/controllers/board/query/schema"
import { Dispatch } from "react"
import { createContainer } from "react-tracked"
import { useImmerReducer } from "use-immer"


type BoardWithTask = BoardWithTaskSchema & { hasLoaded?: boolean }

type Draft = {
  darkmode: boolean,
  boards: BoardWithTask[],
}

type Action = |
  { type: "DARKMODE" } |
  { type: "SET_BOARDS", payload: BoardsWithTaskSchema } |
  { type: "ADD_BOARD", payload: BoardWithTaskSchema } |
  { type: "DELETE_BOARD", payload: string } |
  { type: "EDIT_BOARD", payload: BoardWithTaskSchema } |
  { type: "SET_BOARD", payload: BoardWithTask }

const reducer = ( draft: Draft, action: Action ) => {
  
  switch(action.type) {
    case "DARKMODE":
      draft.darkmode = true

      return
    case "SET_BOARDS":
      draft.boards = action.payload

      return
    case "ADD_BOARD":
      draft.boards = draft.boards.concat(action.payload)

      return
    case "DELETE_BOARD":
      draft.boards = draft.boards.filter(board => board.linkPath!==action.payload)

      return
    case "EDIT_BOARD":
      draft.boards = draft.boards.map(board => board.linkPath===action.payload.linkPath? action.payload : board)

      return
    case "SET_BOARD":
      draft.boards = draft.boards.map(board => board.linkPath===action.payload.linkPath? {
        ...action.payload,
        hasLoaded: true
      } : board)
      
      return
    default:
      return draft
  }
}

const initialState: Draft = {
  darkmode: false,
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