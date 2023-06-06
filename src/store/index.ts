import { BoardsWithTask } from "@/server/controllers/board/query/schema"
import { Dispatch } from "react"
import { createContainer } from "react-tracked"
import { useImmerReducer } from "use-immer"

  
type Draft = {
  darkmode: boolean,
  boards: BoardsWithTask,
}

type Action = |
  { type: "DARKMODE" } |
  { type: "SET_BOARDS", payload: BoardsWithTask }

const reducer = ( draft: Draft, action: Action ) => {
  
  switch(action.type) {
    case "DARKMODE":
      draft.darkmode = true

      return
    case "SET_BOARDS":
      draft.boards = action.payload

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