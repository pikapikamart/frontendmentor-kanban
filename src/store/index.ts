import { BoardsWithTask } from "@/server/controllers/board/query/schema"
import { Dispatch } from "react"
import { createContainer } from "react-tracked"
import { useImmerReducer } from "use-immer"

  
type Draft = {
  darkmode: boolean,
  boards: BoardsWithTask,
  currentBoard: string
}

type Action = |
  { type: "DARKMODE" } |
  { type: "SET_BOARDS", payload: BoardsWithTask } | 
  { type: "SET_CURRENT_BOARD", payload: string }

const reducer = ( draft: Draft, action: Action ) => {
  
  switch(action.type) {
    case "DARKMODE":
      draft.darkmode = true

      return
    case "SET_BOARDS":
      draft.boards = action.payload

      return
    case "SET_CURRENT_BOARD":
      draft.currentBoard = action.payload

      return
    default:
      return draft
  }
}

const initialState: Draft = {
  darkmode: false,
  boards: [],
  currentBoard: ""
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