import { Dispatch } from "react"
import { createContainer } from "react-tracked"
import { useImmerReducer } from "use-immer"

  
type Draft = {
  darkmode: boolean
}

type Action = |
  { type: "DARKMODE" }

const reducer = ( draft: Draft, action: Action ) => {
  
  switch(action.type) {
    case "DARKMODE":
      draft.darkmode = true

      return
    default:
      return draft
  }
}

const initialState: Draft = {
  darkmode: false
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